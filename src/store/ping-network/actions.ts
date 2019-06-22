// import redux types
import {ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';

// Import Ping Network Typing
import {IPingNetworkSchedule, IPingNetworkState } from './reducers';
import {API_BASE_URL} from '../../appConstants/global'

// Create Action Constants
export enum PingNetworkActionTypes {
    GET_ALL_PING_NETWORK_SCHEDULE = 'GET_ALL_PING_NETWORK_SCHEDULE',
    ADD_PING_NETWORK_SCHEDULE = 'ADD_PING_NETWORK_SCHEDULE',
}

// Interface for Get All Action Type
export interface IGetAllPingNetworkScheduleAction {
    type: PingNetworkActionTypes.GET_ALL_PING_NETWORK_SCHEDULE;
    schedules: IPingNetworkSchedule[];
}

export interface IAddPingNetworkScheduleAction {
    type: PingNetworkActionTypes.ADD_PING_NETWORK_SCHEDULE;
    schedules: IPingNetworkSchedule[];
}

/* 
Combine the action types with a union (we assume there are more)
example: export type CharacterActions = IGetAllAction | IGetOneAction ... 
*/
export type PingNetworkActions = IGetAllPingNetworkScheduleAction | IAddPingNetworkScheduleAction;

/* Get All Action
<Promise<Return Type>, State Interface, Type of Param, Type of Action> */

export const getAllSchedule: ActionCreator<
    ThunkAction<Promise<any>, IPingNetworkState, null, IGetAllPingNetworkScheduleAction>
> = () => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await axios.get(`${API_BASE_URL}pingnetwork/schedules`);
            dispatch({
                schedules: response.data.data,
                type: PingNetworkActionTypes.GET_ALL_PING_NETWORK_SCHEDULE,
            });
        }catch(err){
            console.error(err);
        }
    }
}

export const addSchedule: ActionCreator<
    ThunkAction<Promise<any>, IPingNetworkState, null, IGetAllPingNetworkScheduleAction>
> = (newSchedule: any) => {
    return async (dispatch: Dispatch) => {
        try {
            await axios.post(`${API_BASE_URL}pingnetwork/schedules/add`, newSchedule);
            const response = await axios.get(`${API_BASE_URL}pingnetwork/schedules`);
            dispatch({
                schedules: response.data.data,
                type: PingNetworkActionTypes.GET_ALL_PING_NETWORK_SCHEDULE,
            });
        }catch(err){
            console.error(err);
        }
    }
}