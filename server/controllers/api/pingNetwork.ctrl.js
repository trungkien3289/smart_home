const PingNetworkResultModel = require('../../models/PingNetworkResult')
const PingNetworkScheduleModel = require('../../models/PingNetworkSchedule')
var ping = require('ping');
var moment = require('moment');
const pingNetworkEventType = require('../../events/ping-network-events/event-types')
const eventManagement = require('../../events/event-management');
const eventManagementTypeEnum = require('../../events/event-management-type');
const pingNetworkEventManagement = eventManagement[eventManagementTypeEnum.PING_NETWORK_MANAGEMENT]

module.exports = {
    getResults: (req, res, next) => {
        PingNetworkResultModel.find({})
            .exec()
            .then(results => {
                res.send({ success: true, data: results });
                next()
            }).catch(error => {
                res.send(error);
                next()
            });
    },
    addResult: function (req, res, next) {
        let { host, datetime, averageTime } = req.body;

        const newResult = new PingNetworkResultModel({
            host: host,
            datetime: datetime,
            averageTime: averageTime
        });

        newResult.save()
            .then(newResult => {
                res.send({ success: true, data: newResult });
                next()
            })
            .catch(error => {
                res.send({ success: false, data: error });
                next()
            });
    },
    pingNetwork: function (req, res, next) {
        var host = "google.com";
        //hosts.forEach(function (host) {
        ping.promise.probe(host, {
            timeout: 10,
        }).then(
            function (result) {
                console.log(result);
                var requestTime = moment().format('MM-DD-YYYY hh:mm:ss');
                //var listNewItems = results.map(function(item){
                var newItem = new PingNetworkResultModel({
                    host: result.host,
                    datetime: requestTime,
                    averageTime: result.avg
                });

                return newItem.save();
                //})
                //return PingNetworkResultModel.insertMany(listNewItems);
            },
            function (error) {
                res.send({ success: false, data: error });
            }
        )
            .then(function (doc) {
                res.send({ success: true, data: doc });
                next()
            }, function (error) {
                res.send({ success: false, data: error });
            });
        //});
    },
    getSchedules: function (req, res, next) {
        PingNetworkScheduleModel.find({})
            .exec()
            .then(schedules => {
                res.send({ success: true, data: schedules });
                next()
            }).catch(error => {
                res.send(error);
                next()
            });
    },
    addSchedule: function (req, res, next) {
        let { name, expression, active, createdDate, hosts, description } = req.body;

        const newOne = new PingNetworkScheduleModel({
            name: name,
            expression: expression,
            active: active,
            createdDate: createdDate,
            hosts: hosts,
            description: description,
        });

        newOne.save()
            .then(newResult => {
                res.send({ success: true, data: newResult });
                pingNetworkEventManagement.fireEvent(pingNetworkEventType.ADD_SCHEDULE, newResult)
                next()
            })
            .catch(error => {
                res.send({ success: false, data: error });
                next()
            });
    },
    deleteSchedule: function (req, res, next) {
        let { name } = req.body;

        PingNetworkScheduleModel.remove({name: name}).exec()
        .then(newResult => {
            res.send({ success: true, data: newResult });
            pingNetworkEventManagement.fireEvent(pingNetworkEventType.DELETE_SCHEDULE, newResult)
            next()
        })
        .catch(error => {
            res.send({ success: false, data: error });
            next()
        });
    },
    setScheduleStatus: function (req, res, next) {
        let { name, status } = req.body;
        PingNetworkScheduleModel.find({ name: name })
            .exec()
            .then(results => {
                if (results.length > 0) {
                    let found = results[0];
                    found.active = status;
                    return found.save();
                } else {
                    res.send({ success: false, data: null, message: "Cannot found schedule with name " + name });
                    next()
                }
            })
            .catch(error => {
                res.send({ success: false, data: error });
                next()
            }).then(updatedItem => {

                if (updatedItem.active) {
                    pingNetworkEventManagement.fireEvent(pingNetworkEventType.ACTIVE_SCHEDULE, updatedItem.name)
                }else{
                    pingNetworkEventManagement.fireEvent(pingNetworkEventType.DEACTIVE_SCHEDULE, updatedItem.name)
                }

                res.send({ success: true, data: updatedItem });
                next()
            })
            .catch(error => {
                res.send({ success: false, data: error, message: "Update Schedule status fail." });
                next()
            });
    },
    editSchedule: function (req, res, next) {
        let { name, expression, active, hosts, description } = req.body;
    
        PingNetworkScheduleModel.find({ name: name })
        .exec()
        .then(results => {
            if (results.length > 0) {
                let found = results[0];
                Object.assign(found, {
                    expression: expression,
                    active: active,
                    hosts: hosts,
                    description: description,
                })
                return found.save();
            } else {
                res.send({ success: false, data: null, message: "Cannot found schedule with name " + name });
                next()
            }
        })
        .catch(error => {
            res.send({ success: false, data: error });
            next()
        }).then(updatedItem => {
            pingNetworkEventManagement.fireEvent(pingNetworkEventType.EDIT_SCHEDULE, updatedItem)
            res.send({ success: true, data: updatedItem });
            next()
        })
        .catch(error => {
            res.send({ success: false, data: error, message: "Update Schedule status fail." });
            next()
        });
    },
}

//#region private function
//#endregion

