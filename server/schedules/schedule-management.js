const cron = require('node-cron');
const PingNetworkScheduleModel = require('../models/PingNetworkSchedule')
const eventManagement = require('../events/event-management')
const eventManagementTypeEnum = require('../events/event-management-type')
const pingNetworkEventTypeEnum = require('../events/ping-network-events/event-types')
const pingNetworkService = require('../services/ping-network-service')
module.exports = () => {
    let schedules = [];
    let task = {};
    const pingNetworkEventManagement = eventManagement[eventManagementTypeEnum.PING_NETWORK_MANAGEMENT];

    let startTask = (savedSchedules) => {
        savedSchedules.forEach(element => {
            task[element.name] = cron.schedule(element.expression, () => {
                console.log(`Task ${element.name} run`);
                pingNetworkService.ping(element.hosts);
            }, {
                scheduled: false,
            });

            if(element.active){
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
        if(newSchedule.active){
            task[newSchedule.name].start();
        }
    }

    let updateTaskStatus = (name, active) => {
        if(task[name] !== undefined){
            active? task[name].start() : task[name].stop();
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

    let setEventHandler = () => {
        pingNetworkEventManagement.addListener(pingNetworkEventTypeEnum.ADD_SCHEDULE, (newSchedule) => {
            addSchedule(newSchedule);
            console.log("ADD_SCHEDULE event handler run");
        });
        pingNetworkEventManagement.addListener(pingNetworkEventTypeEnum.DELETE_SCHEDULE, (name) => {
            deleteTask(name);
            console.log("DELETE_SCHEDULE event handler run");
        });
        pingNetworkEventManagement.addListener(pingNetworkEventTypeEnum.ACTIVE_SCHEDULE, (name) => {
            updateTaskStatus(name, true);
            console.log("ACTIVE_SCHEDULE event handler run");
        });
        pingNetworkEventManagement.addListener(pingNetworkEventTypeEnum.DEACTIVE_SCHEDULE, (name) => {
            updateTaskStatus(name, false);
            console.log("DEACTIVE_SCHEDULE event handler run");
        });
    }

    return {
        task:task,
        start : () => {
            PingNetworkScheduleModel.find({})
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