// import redux types
import {ActionCreator, Dispatch, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';

// Import Ping Network Typing
import {IPingNetworkSchedule, IPingNetworkState } from './reducers';
import {API_BASE_URL} from '../../appConstants/global'

// Create Action Constants
export enum PingNetworkActionTypes {
    GET_ALL_PING_NETWORK_SCHEDULE = 'GET_ALL_PING_NETWORK_SCHEDULE',
    ADD_PING_NETWORK_SCHEDULE = 'ADD_PING_NETWORK_SCHEDULE',
    TOGGLE_ADD_SCHEDULE_DIALOG = 'TOGGLE_ADD_SCHEDULE_DIALOG',
    DELETE_SCHEDULE = 'DELETE_SCHEDULE',
    EDIT_PING_NETWORK_SCHEDULE = 'EDIT_PING_NETWORK_SCHEDULE',
    TOGGLE_EDIT_SCHEDULE_DIALOG = 'TOGGLE_EDIT_SCHEDULE_DIALOG',
}

// Interface for Get All Action Type
export interface IGetAllPingNetworkScheduleAction extends Action<any> {
    type: PingNetworkActionTypes.GET_ALL_PING_NETWORK_SCHEDULE;
    schedules: IPingNetworkSchedule[];
}

export interface IAddPingNetworkScheduleAction {
    type: PingNetworkActionTypes.ADD_PING_NETWORK_SCHEDULE;
    schedules: IPingNetworkSchedule[];
}

export interface IToggleAddScheduleDialogAction{
    type: PingNetworkActionTypes.TOGGLE_ADD_SCHEDULE_DIALOG;
}

export interface IDeleteScheduleAction{
    type: PingNetworkActionTypes.DELETE_SCHEDULE;
    name: string;
}

export interface IEditPingNetworkScheduleAction {
    type: PingNetworkActionTypes.EDIT_PING_NETWORK_SCHEDULE;
    schedules: IPingNetworkSchedule;
}

export interface IToggleEditScheduleDialogAction{
    type: PingNetworkActionTypes.TOGGLE_EDIT_SCHEDULE_DIALOG;
}

/* 
Combine the action types with a union (we assume there are more)
example: export type CharacterActions = IGetAllAction | IGetOneAction ... 
*/
export type PingNetworkActions = IGetAllPingNetworkScheduleAction 
                                    | IAddPingNetworkScheduleAction 
                                    | IToggleAddScheduleDialogAction
                                    |IDeleteScheduleAction
                                    |IEditPingNetworkScheduleAction
                                    |IToggleEditScheduleDialogAction;

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
    ThunkAction<Promise<any>, IPingNetworkState, null, IAddPingNetworkScheduleAction>
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

export const updateScheduleStatus: ActionCreator<
    ThunkAction<Promise<any>, IPingNetworkState, null, IGetAllPingNetworkScheduleAction>
> = (name: string, status: boolean) => {
    return async (dispatch: Dispatch) => {
        try {
            await axios.post(`${API_BASE_URL}pingnetwork/schedules/setStatus`, {name, status});
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

export const toggleAddScheduleDialog: ActionCreator<
    ThunkAction<Promise<any>, IPingNetworkState, null, IToggleAddScheduleDialogAction>
> = () => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({
                type: PingNetworkActionTypes.TOGGLE_ADD_SCHEDULE_DIALOG,
            });
        }catch(err){
            console.error(err);
        }
    }
}

export const deleteSchedule: ActionCreator<
ThunkAction<Promise<any>, IPingNetworkState, null, IToggleAddScheduleDialogAction>
> = (name: string) => {
return async (dispatch: Dispatch) => {
    try {
        const deleteResponse = await axios.post(`${API_BASE_URL}pingnetwork/schedules/delete`, {name});
        if(deleteResponse.data.success){
            const response = await axios.get(`${API_BASE_URL}pingnetwork/schedules`);
            dispatch({
                schedules: response.data.data,
                type: PingNetworkActionTypes.GET_ALL_PING_NETWORK_SCHEDULE,
            });
        }else{
            console.log(deleteResponse.data.message)
        }
    }catch(err){
        console.error(err);
    }
}
}

export const editSchedule: ActionCreator<
    ThunkAction<Promise<any>, IPingNetworkState, null, IEditPingNetworkScheduleAction>
> = (updatedSchedule: any) => {
    return async (dispatch: Dispatch) => {
        try {
            const udpateResult = await axios.post(`${API_BASE_URL}pingnetwork/schedules/edit`, updatedSchedule);
            if(udpateResult.data.success){
                const response = await axios.get(`${API_BASE_URL}pingnetwork/schedules`);
                dispatch({
                    schedules: response.data.data,
                    type: PingNetworkActionTypes.GET_ALL_PING_NETWORK_SCHEDULE,
                });
            }else{
                console.log("Update schedule fail", udpateResult.data.message);                
            }
           
        }catch(err){
            console.error(err);
        }
    }
}

export const toggleEditScheduleDialog: ActionCreator<
    ThunkAction<Promise<any>, IPingNetworkState, null, IToggleEditScheduleDialogAction>
> = () => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({
                type: PingNetworkActionTypes.TOGGLE_EDIT_SCHEDULE_DIALOG,
            });
        }catch(err){
            console.error(err);
        }
    }
}