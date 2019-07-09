const ScheduleModel = require('../../models/Schedule')
const ActionModel = require('../../models/Action')
const scheduleEventType = require('../../events/schedule-events/event-types')
const eventManagement = require('../../events/event-management');
const eventManagementTypeEnum = require('../../events/event-management-type');
const scheduleEventManagement = eventManagement[eventManagementTypeEnum.SCHEDULE_MANAGEMENT]

module.exports = {
    getSchedules: function (req, res, next) {
        ScheduleModel.find({})
            .exec()
            .then(schedules => {
                let scheduleViewModels = schedules.map((schedule) => {
                    let {id, name, description, expression, isActive, createdDate, actions} = schedule;
                    return {
                        id: id,
                        name: name,
                        description: description,
                        expression: expression,
                        isActive: isActive,
                        createdDate: createdDate,
                        actions: actions
                    }
                });
                res.send({ success: true, data: scheduleViewModels });
                next()
            }).catch(error => {
                res.send(error);
                next()
            });
    },
    addSchedule: function (req, res, next) {
        let { name, description, expression, isActive, createdDate, actions } = req.body;

        ActionModel.insertMany(actions)
        .then(addedActions => {
            let addedActionIds = addedActions.map(action => {
                return action._id
            })
            const newSchedule = new ScheduleModel({
                name: name,
                description: description,
                expression: expression,
                isActive: isActive,
                createdDate: createdDate,
                actions: addedActionIds,
            });

            return newSchedule.save();
        })
        .catch(error => {
            res.send({ success: false, data: error });
            next()
        })
        .then(addedSchedule => {
            res.send({ success: true, data: addedSchedule });
            scheduleEventManagement.fireEvent(scheduleEventType.ADD_SCHEDULE, addedSchedule)
            next()
        })
        .catch(error => {
            res.send({ success: false, data: error });
            next()
        })
    },
    deleteSchedule: function (req, res, next) {
        let { id } = req.body;

        ScheduleModel.remove({_id: id}).exec()
        .then(newResult => {
            res.send({ success: true, data: newResult });
            scheduleEventManagement.fireEvent(scheduleEventType.DELETE_SCHEDULE, newResult)
            next()
        })
        .catch(error => {
            res.send({ success: false, data: error });
            next()
        });
    },
    setScheduleStatus: function (req, res, next) {
        let { id, isActive } = req.body;
        ScheduleModel.find({ _id: id })
            .exec()
            .then(results => {
                if (results.length > 0) {
                    let found = results[0];
                    found.isActive = isActive;
                    return found.save();
                } else {
                    res.send({ success: false, data: null, message: "Cannot found schedule." });
                    next()
                }
            })
            .catch(error => {
                res.send({ success: false, data: error });
                next()
            }).then(updatedItem => {
                if (updatedItem.isActive) {
                    scheduleEventManagement.fireEvent(scheduleEventType.ACTIVE_SCHEDULE, updatedItem.name)
                }else{
                    scheduleEventManagement.fireEvent(scheduleEventType.DEACTIVE_SCHEDULE, updatedItem.name)
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
        let {  id, description, expression, isActive, actions } = req.body;
    
        ScheduleModel.find({ _id: id })
        .exec()
        .then(results => {
            if (results.length > 0) {
                let found = results[0];
                Object.assign(found, {
                    description: description,
                    expression: expression,
                    isActive: isActive,
                    actions: actions,
                })
                return found.save();
            } else {
                res.send({ success: false, data: null, message: "Cannot found schedule with" });
                next()
            }
        })
        .catch(error => {
            res.send({ success: false, data: error });
            next()
        }).then(updatedItem => {
            scheduleEventManagement.fireEvent(scheduleEventType.EDIT_SCHEDULE, updatedItem)
            res.send({ success: true, data: updatedItem });
            next()
        })
        .catch(error => {
            res.send({ success: false, data: error, message: "Update Schedule status fail." });
            next()
        });
    },
}