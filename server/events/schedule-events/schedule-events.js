
var events = require('events');
var eventTypeEnum = require('./event-types');
module.exports = () => {
    let eventEmitter = new events.EventEmitter();
    return {
        addListener : (eventType, actionFnc) => {
            switch(eventType){
                case eventTypeEnum.ADD_SCHEDULE:
                case eventTypeEnum.DELETE_SCHEDULE:
                case eventTypeEnum.ACTIVE_SCHEDULE:
                case eventTypeEnum.DEACTIVE_SCHEDULE:
                case eventTypeEnum.EDIT_SCHEDULE:{
                    eventEmitter.addListener(eventType, actionFnc);
                    break;
                }
                default: throw new Error("Event type does not support in system.")
            }
        },
        removeEventListener :(eventType, actionFnc) => {
            switch(eventType){
                case eventTypeEnum.ADD_SCHEDULE:
                case eventTypeEnum.DELETE_SCHEDULE:
                case eventTypeEnum.ACTIVE_SCHEDULE:
                case eventTypeEnum.EDIT_SCHEDULE:
                case eventTypeEnum.DEACTIVE_SCHEDULE:{
                    eventEmitter.removeListener(eventType, actionFnc);
                    break;
                }
                default: throw new Error("Event type does not support in system.")
            }
        },
        fireEvent : (type, param) => {
            switch(type){
                case eventTypeEnum.ADD_SCHEDULE:
                case eventTypeEnum.DELETE_SCHEDULE:
                case eventTypeEnum.ACTIVE_SCHEDULE:
                case eventTypeEnum.EDIT_SCHEDULE:
                case eventTypeEnum.DEACTIVE_SCHEDULE:{
                    eventEmitter.emit(type, param);
                    break;
                }
                default: throw new Error("Event type does not support in system.")
            }
        }
    }
    
}