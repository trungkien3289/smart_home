import { Reducer } from 'redux';
import { EntityStatus } from '../../appConstants/enum';
import { ScheduleActions,ScheduleActionTypes } from './actions';
import { ScheduleStautsEnum } from './constants';

// Define the Character type
export interface ISchedule {
    id: string,
    name: string,
    description: string,
    expression: string,
    isActive: boolean,
    createdDate: string,
    actions: string[],
}

// Define Customer State
export interface IScheduleState {
    schedules: ISchedule[];
    isScheduleDialogOpen: boolean;
    isEditScheduleDialogOpen: boolean;
}

// Define the initial state
const initialScheduleState: IScheduleState = {
    schedules : [],
    isScheduleDialogOpen: false,
    isEditScheduleDialogOpen: false,
};

export const scheduleReducer: Reducer<IScheduleState, ScheduleActions> = (
    state = initialScheduleState,
    action
) => {
    switch (action.type) {
        case ScheduleActionTypes.GET_ALL_SCHEDULE:{
            return {
                ...state,
                schedules: action.schedules
            }
        }
        case ScheduleActionTypes.TOGGLE_ADD_SCHEDULE_DIALOG: {
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
        case ScheduleActionTypes.TOGGLE_EDIT_SCHEDULE_DIALOG: {
            return {
                ...state,
                isEditScheduleDialogOpen:!state.isEditScheduleDialogOpen
            }
        }
        default:
            return state;
    }
}