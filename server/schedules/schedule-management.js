const cron = require('node-cron');
const ScheduleModel = require('../models/Schedule')
const eventManagement = require('../events/event-management')
const eventManagementTypeEnum = require('../events/event-management-type')
const scheduleEventTypeEnum = require('../events/schedule-events/event-types')
const pingNetworkService = require('../services/ping-network-service')
const SystemCompiler = require('../resource-management/resource-management')
module.exports = () => {
    let schedules = [];
    let task = {};
    const scheduleEventManagement = eventManagement[eventManagementTypeEnum.SCHEDULE_MANAGEMENT];
    let actions = [
        {
            Id: 1,
            Name: "Turn_On_Light",
            Device: {
                Name: "Living Room",
                Type: "Light"
            },
            Parameters:[]
        },
        {
            Id: 2,
            Name: "Turn_Off_Light",
            Device: {
                Name: "Living Room",
                Type: "Light"
            },
            Parameters:[]
        },
    ]

    let startTask = (savedSchedules) => {
        schedules = savedSchedules;
        savedSchedules.forEach(element => {
            task[element.name] = cron.schedule(
                element.expression,
                () => {
                    // console.log(`Task ${element.name} run`);
                    // pingNetworkService.ping(element.hosts);
                    element.actions.forEach(action => {
                        SystemCompiler.compile(action, SystemCompiler);
                        // console.log(SystemCompiler);
                    });
                },
                {
                    scheduled: false,
                }
            );

            if(element.isActive){
                task[element.name].start();
                console.log("Task "+ element.name + " started.");
            }
        });
    }
    
    let addSchedule = (newSchedule) => {
        schedules.push(newSchedule);
        task[newSchedule.name] = cron.schedule(newSchedule.expression, () => {
            console.log(`Task ${newSchedule.name} run`);
        }, {
            scheduled: false,
        });
        if(newSchedule.isActive){
            task[newSchedule.name].start();
        }
    }

    let updateTaskStatus = (name, isActive) => {
        if(task[name] !== undefined){
            isActive? task[name].start() : task[name].stop();
        }else{
            throw new Error("Cannot found task with name " + name);
        }
    }

    let deleteTask = (name) => {
        if(task[name] !== undefined) {
            let newList = schedules.slice();
            schedules = newList.filter((item) => {
                return item.name === name
            });

            task[name].destroy();
            delete task[name];
        }
    }

    let updateTask = (updatedSchedule) => {
        try{
            let found = getScheduleByName(updatedSchedule.name);
            Object.assign(
                found,
                updatedSchedule
            );

            task[updatedSchedule.name].stop();
            if(updatedSchedule.isActive){
                task[updatedSchedule.name].start();
            }
        }catch(err){
            console.log(err);
        }
    }

    let getScheduleByName = (name) => {
        let results = schedules.filter((item) => {
            return item.name == name;
        })

        if(results.length>0){
            return results[0];
        }else{
            throw new Error(`Cannot found schedule with name ${name}`);
        }
    }

    let setEventHandler = () => {
        scheduleEventManagement.addListener(scheduleEventTypeEnum.ADD_SCHEDULE, (newSchedule) => {
            addSchedule(newSchedule);
            console.log("ADD_SCHEDULE event handler run");
        });
        scheduleEventManagement.addListener(scheduleEventTypeEnum.DELETE_SCHEDULE, (name) => {
            deleteTask(name);
            console.log("DELETE_SCHEDULE event handler run");
        });
        scheduleEventManagement.addListener(scheduleEventTypeEnum.ACTIVE_SCHEDULE, (name) => {
            updateTaskStatus(name, true);
            console.log("ACTIVE_SCHEDULE event handler run");
        });
        scheduleEventManagement.addListener(scheduleEventTypeEnum.DEACTIVE_SCHEDULE, (name) => {
            updateTaskStatus(name, false);
            console.log("DEACTIVE_SCHEDULE event handler run");
        });
        scheduleEventManagement.addListener(scheduleEventTypeEnum.EDIT_SCHEDULE, (updatedSchedule) => {
            updateTask(updatedSchedule);
            console.log("EDIT_SCHEDULE event handler run");
        });
    }

    return {
        task:task,
        start : () => {
            ScheduleModel.find({})
            .populate('actions')
            .exec()
            .then(schedules => {
                this.schedules = schedules;
                startTask(schedules);
                setEventHandler();
            }).catch(error => {
                console.log("Cannot start schedules")
            });
        },
        addTask : (newSchedule) => {
            if(this.task[newSchedule.name] !== undefined){
                throw new Error("Schedule is existed");
            }else{
                addSchedule(newSchedule);
            }
        },
        stopTask : (name) => {
            updateTaskStatus(name, false);
        },
        startTask:(name) => {
            updateTaskStatus(name, true);
        },
        deleteTask : deleteTask
    }
}