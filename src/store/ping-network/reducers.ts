import { Reducer } from 'redux';
import { EntityStatus } from '../../appConstants/enum';
import { PingNetworkActions, PingNetworkActionTypes } from './actions';
import { ScheduleStautsEnum } from './constants';

// Define the Character type
export interface IPingNetworkSchedule {
    name: string,
    expression: string,
    active: boolean,
    createdDate: Date
}

// Define Customer State
export interface IPingNetworkState {
    schedules: IPingNetworkSchedule[];
}

// Define the initial state
const initialScheduleState: IPingNetworkState = {
    schedules : [],
};

export const pingNetworkReducer: Reducer<IPingNetworkState, PingNetworkActions> = (
    state = initialScheduleState,
    action
) => {
    switch (action.type) {
        case PingNetworkActionTypes.GET_ALL_PING_NETWORK_SCHEDULE:{
            return {
                ...state,
                schedules: action.schedules
            }
        }
        default:
            return state;
    }
}