// import redux types
import {ActionCreator, Dispatch, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';

// Import Ping Network Typing
import {ISchedule, IScheduleState } from './reducers';
import {API_BASE_URL} from '../../appConstants/global'

// Create Action Constants
export enum ScheduleActionTypes {
    GET_ALL_SCHEDULE = 'GET_ALL_SCHEDULE',
    ADD_SCHEDULE = 'ADD_SCHEDULE',
    TOGGLE_ADD_SCHEDULE_DIALOG = 'TOGGLE_ADD_SCHEDULE_DIALOG',
    DELETE_SCHEDULE = 'DELETE_SCHEDULE',
    EDIT_SCHEDULE = 'EDIT_SCHEDULE',
    TOGGLE_EDIT_SCHEDULE_DIALOG = 'TOGGLE_EDIT_SCHEDULE_DIALOG',
}

// Interface for Get All Action Type
export interface IGetAllScheduleAction extends Action<any> {
    type: ScheduleActionTypes.GET_ALL_SCHEDULE;
    schedules: ISchedule[];
}

export interface IAddScheduleAction {
    type: ScheduleActionTypes.ADD_SCHEDULE;
    schedules: ISchedule[];
}

export interface IToggleAddScheduleDialogAction{
    type: ScheduleActionTypes.TOGGLE_ADD_SCHEDULE_DIALOG;
}

export interface IDeleteScheduleAction{
    type: ScheduleActionTypes.DELETE_SCHEDULE;
    name: string;
}

export interface IEditScheduleAction {
    type: ScheduleActionTypes.EDIT_SCHEDULE;
    schedules: ISchedule;
}

export interface IToggleEditScheduleDialogAction{
    type: ScheduleActionTypes.TOGGLE_EDIT_SCHEDULE_DIALOG;
}

/* 
Combine the action types with a union (we assume there are more)
example: export type CharacterActions = IGetAllAction | IGetOneAction ... 
*/
export type ScheduleActions = IGetAllScheduleAction 
                                    | IAddScheduleAction 
                                    | IToggleAddScheduleDialogAction
                                    |IDeleteScheduleAction
                                    |IEditScheduleAction
                                    |IToggleEditScheduleDialogAction;

/* Get All Action
<Promise<Return Type>, State Interface, Type of Param, Type of Action> */

export const getAllSchedule: ActionCreator<
    ThunkAction<Promise<any>, IScheduleState, null, IGetAllScheduleAction>
> = () => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await axios.get(`${API_BASE_URL}schedule/schedules`);
            dispatch({
                schedules: response.data.data,
                type: ScheduleActionTypes.GET_ALL_SCHEDULE,
            });
        }catch(err){
            console.error(err);
        }
    }
}

export const addSchedule: ActionCreator<
    ThunkAction<Promise<any>, IScheduleState, null, IAddScheduleAction>
> = (newSchedule: any) => {
    return async (dispatch: Dispatch) => {
        try {
            await axios.post(`${API_BASE_URL}schedule/add`, newSchedule);
            const response = await axios.get(`${API_BASE_URL}schedule/schedules`);
            dispatch({
                schedules: response.data.data,
                type: ScheduleActionTypes.GET_ALL_SCHEDULE,
            });
        }catch(err){
            console.error(err);
        }
    }
}

export const updateScheduleStatus: ActionCreator<
    ThunkAction<Promise<any>, IScheduleState, null, IGetAllScheduleAction>
> = (id: string, isActive: boolean) => {
    return async (dispatch: Dispatch) => {
        try {
            await axios.post(`${API_BASE_URL}schedule/setStatus`, {id, isActive});
            const response = await axios.get(`${API_BASE_URL}schedule/schedules`);
            dispatch({
                schedules: response.data.data,
                type: ScheduleActionTypes.GET_ALL_SCHEDULE,
            });
        }catch(err){
            console.error(err);
        }
    }
}

export const toggleAddScheduleDialog: ActionCreator<
    ThunkAction<Promise<any>, IScheduleState, null, IToggleAddScheduleDialogAction>
> = () => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({
                type: ScheduleActionTypes.TOGGLE_ADD_SCHEDULE_DIALOG,
            });
        }catch(err){
            console.error(err);
        }
    }
}

export const deleteSchedule: ActionCreator<
ThunkAction<Promise<any>, IScheduleState, null, IToggleAddScheduleDialogAction>
> = (id: string) => {
return async (dispatch: Dispatch) => {
    try {
        const deleteResponse = await axios.post(`${API_BASE_URL}schedule/delete`, {id});
        if(deleteResponse.data.success){
            const response = await axios.get(`${API_BASE_URL}schedule/schedules`);
            dispatch({
                schedules: response.data.data,
                type: ScheduleActionTypes.GET_ALL_SCHEDULE,
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
    ThunkAction<Promise<any>, IScheduleState, null, IEditScheduleAction>
> = (updatedSchedule: any) => {
    return async (dispatch: Dispatch) => {
        try {
            const udpateResult = await axios.post(`${API_BASE_URL}schedule/edit`, updatedSchedule);
            if(udpateResult.data.success){
                const response = await axios.get(`${API_BASE_URL}schedule/schedules`);
                dispatch({
                    schedules: response.data.data,
                    type: ScheduleActionTypes.GET_ALL_SCHEDULE,
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
    ThunkAction<Promise<any>, IScheduleState, null, IToggleEditScheduleDialogAction>
> = () => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({
                type: ScheduleActionTypes.TOGGLE_EDIT_SCHEDULE_DIALOG,
            });
        }catch(err){
            console.error(err);
        }
    }
}