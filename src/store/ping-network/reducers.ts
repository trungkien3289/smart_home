import { Reducer } from 'redux';
import { EntityStatus } from '../../appConstants/enum';
import { PingNetworkActions, PingNetworkActionTypes } from './actions';
import { ScheduleStautsEnum } from './constants';

// Define the Character type
export interface IPingNetworkSchedule {
    name: string,
    expression: string,
    active: boolean,
    createdDate: string,
    hosts: string[],
    description: string,
}

// Define Customer State
export interface IPingNetworkState {
    schedules: IPingNetworkSchedule[];
    isScheduleDialogOpen: boolean;
    isEditScheduleDialogOpen: boolean;
}

// Define the initial state
const initialScheduleState: IPingNetworkState = {
    schedules : [],
    isScheduleDialogOpen: false,
    isEditScheduleDialogOpen: false,
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
        case PingNetworkActionTypes.TOGGLE_ADD_SCHEDULE_DIALOG: {
            return {
                ...state,
                isScheduleDialogOpen:!state.isScheduleDialogOpen
            }
        }
        // case PingNetworkActionTypes.DELETE_SCHEDULE: {
        //     return {
        //         ...state,
        //         isScheduleDialogOpen:!state.isScheduleDialogOpen
        //     }
        // }
        case PingNetworkActionTypes.TOGGLE_EDIT_SCHEDULE_DIALOG: {
            return {
                ...state,
                isEditScheduleDialogOpen:!state.isEditScheduleDialogOpen
            }
        }
        default:
            return state;
    }
}