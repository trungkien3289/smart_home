
import Device from '../Device'
import RaspiActionType from './type'
import setRaspiPin from './actions'
export default class RaspiDevice extends Device{
    constructor(deviceId, name) {
        this.name = name;
        this.deviceId = deviceId;
    }

    getAction = (actionType) => {
        switch(actionType){
            case RaspiActionType.SET_STATUS:{
                return setRaspiPin(this, 13, true);
                break;
            }
            default: break;
        }
    }

    setStatus = (pinNumber, status) => {
        console.log("Set pin " + pinNumber + " to value: "+ status);
    }
}