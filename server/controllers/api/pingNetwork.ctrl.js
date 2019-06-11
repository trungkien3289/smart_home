const PingNetworkResultModel = require('../../models/PingNetworkResult')
const PingNetworkScheduleModel = require('../../models/PingNetworkSchedule')
var ping = require('ping');
var moment = require('moment');

module.exports = {
    getResults: (req, res, next) => {
        PingNetworkResultModel.find({})
        .exec()
        .then(results => {
            res.send({success: true, data: results});
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
            res.send({success: true, data: newResult});
            next()
        })
        .catch(error => {
            res.send({success: false, data: error});
            next()
        });
    },
    pingNetwork: function(req, res, next){
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
                function (error){
                    res.send({success: false, data: error});
                }
            )
            .then(function(doc){
                res.send({success: true, data: doc});
                next()
            }, function(error){
                res.send({success: false, data: error});
            });
        //});
    },
    getSchedules: function(req, res, next){
        PingNetworkScheduleModel.find({})
        .exec()
        .then(schedules => {
            res.send({success: true, data: schedules});
            next()
        }).catch(error => {
            res.send(error);
            next()
        });
    },
    addSchedule: function (req, res, next) {
        let { name, expression, active, createdDate } = req.body;

        const newOne = new PingNetworkResultModel({
            name: name,
            expression: expression,
            active: active,
            createdDate: createdDate
        });

        newOne.save()
            .then(newResult => {
            res.send({success: true, data: newResult});
            next()
        })
        .catch(error => {
            res.send({success: false, data: error});
            next()
        });
    },
}

//#region private function
//#endregion

