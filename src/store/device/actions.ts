// import redux types
import {ActionCreator, Dispatch, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';

// Import Ping Network Typing
import {IDevice, IDeviceState, IDeviceType } from './reducers';
import {API_BASE_URL} from '../../appConstants/global'

// Create Action Constants
export enum DeviceActionTypes {
    GET_ALL_DEVICE = 'GET_ALL_DEVICE',
    ADD_DEVICE = 'ADD_DEVICE',
    TOGGLE_ADD_DEVICE_DIALOG = 'TOGGLE_ADD_DEVICE_DIALOG',
    DELETE_DEVICE = 'DELETE_DEVICE',
    EDIT_DEVICE = 'EDIT_DEVICE',
    TOGGLE_EDIT_DEVICE_DIALOG = 'TOGGLE_EDIT_DEVICE_DIALOG',
    GET_DEVICE_TYPE = 'GET_DEVICE_TYPE',
    GET_DEVICE_DICTIONARY = 'GET_DEVICE_DICTIONARY',
}

// Interface for Get All Action Type
export interface IGetAllDeviceAction extends Action<any> {
    type: DeviceActionTypes.GET_ALL_DEVICE;
    devices: IDevice[];
}

export interface IAddDeviceAction {
    type: DeviceActionTypes.ADD_DEVICE;
    device: IDevice;
}

export interface IToggleAddDeviceDialogAction{
    type: DeviceActionTypes.TOGGLE_ADD_DEVICE_DIALOG;
}

export interface IDeleteDeviceAction{
    type: DeviceActionTypes.DELETE_DEVICE;
    name: string;
}

export interface IEditDeviceAction {
    type: DeviceActionTypes.EDIT_DEVICE;
    device: IDevice;
}

export interface IToggleEditDeviceAction{
    type: DeviceActionTypes.TOGGLE_EDIT_DEVICE_DIALOG;
}

export interface IGetDeviceTypesAction{
    type: DeviceActionTypes.GET_DEVICE_TYPE;
    deviceTypes: IDeviceType[];
}

export interface IGetDeviceDictionaryAction{
    type: DeviceActionTypes.GET_DEVICE_DICTIONARY;
    deviceDictionary: any;
}

/* 
Combine the action types with a union (we assume there are more)
example: export type CharacterActions = IGetAllAction | IGetOneAction ... 
*/
export type DeviceActions = IGetAllDeviceAction 
                                    | IAddDeviceAction 
                                    | IToggleAddDeviceDialogAction
                                    |IDeleteDeviceAction
                                    |IEditDeviceAction
                                    |IToggleEditDeviceAction
                                    |IGetDeviceTypesAction
                                    |IGetDeviceDictionaryAction;

/* Get All Action
<Promise<Return Type>, State Interface, Type of Param, Type of Action> */

export const getAllDevice: ActionCreator<
    ThunkAction<Promise<any>, IDeviceState, null, IGetAllDeviceAction>
> = () => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await axios.get(`${API_BASE_URL}device`);
            dispatch({
                devices: response.data.data,
                type: DeviceActionTypes.GET_ALL_DEVICE,
            });
        }catch(err){
            console.error(err);
        }
    }
}

export const addDevice: ActionCreator<
    ThunkAction<Promise<any>, IDeviceState, null, IAddDeviceAction>
> = (newDevice: any) => {
    return async (dispatch: Dispatch) => {
        try {
            await axios.post(`${API_BASE_URL}device/add`, newDevice);
            const response = await axios.get(`${API_BASE_URL}device`);
            dispatch({
                devices: response.data.data,
                type: DeviceActionTypes.GET_ALL_DEVICE,
            });
        }catch(err){
            console.error(err);
        }
    }
}

export const updateDeviceStatus: ActionCreator<
    ThunkAction<Promise<any>, IDeviceState, null, IGetAllDeviceAction>
> = (id: string, isActive: boolean) => {
    return async (dispatch: Dispatch) => {
        try {
            await axios.post(`${API_BASE_URL}device/setStatus`, {id, isActive});
            const response = await axios.get(`${API_BASE_URL}device`);
            dispatch({
                devices: response.data.data,
                type: DeviceActionTypes.GET_ALL_DEVICE,
            });
        }catch(err){
            console.error(err);
        }
    }
}

export const toggleAddDeviceDialog: ActionCreator<
    ThunkAction<Promise<any>, IDeviceState, null, IToggleAddDeviceDialogAction>
> = () => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({
                type: DeviceActionTypes.TOGGLE_ADD_DEVICE_DIALOG,
            });
        }catch(err){
            console.error(err);
        }
    }
}

export const deleteDevice: ActionCreator<
ThunkAction<Promise<any>, IDeviceState, null, IToggleAddDeviceDialogAction>
> = (id: string) => {
    return async (dispatch: Dispatch) => {
        try {
            const deleteResponse = await axios.post(`${API_BASE_URL}device/delete`, {id});
            if(deleteResponse.data.success){
                const response = await axios.get(`${API_BASE_URL}device`);
                dispatch({
                    devices: response.data.data,
                    type: DeviceActionTypes.GET_ALL_DEVICE,
                });
            }else{
                console.log(deleteResponse.data.message)
            }
        }catch(err){
            console.error(err);
        }
    }
}

export const editDevice: ActionCreator<
    ThunkAction<Promise<any>, IDeviceState, null, IEditDeviceAction>
> = (updatedSchedule: any) => {
    return async (dispatch: Dispatch) => {
        try {
            const udpateResult = await axios.post(`${API_BASE_URL}device/edit`, updatedSchedule);
            if(udpateResult.data.success){
                const response = await axios.get(`${API_BASE_URL}device`);
                dispatch({
                    devices: response.data.data,
                    type: DeviceActionTypes.GET_ALL_DEVICE,
                });
            }else{
                console.log("Update device fail", udpateResult.data.message);                
            }
           
        }catch(err){
            console.error(err);
        }
    }
}

export const toggleEditDeviceDialog: ActionCreator<
    ThunkAction<Promise<any>, IDeviceState, null, IToggleEditDeviceAction>
> = () => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({
                type: DeviceActionTypes.TOGGLE_EDIT_DEVICE_DIALOG,
            });
        }catch(err){
            console.error(err);
        }
    }
}

export const getDeviceTypes: ActionCreator<
    ThunkAction<Promise<any>, IDeviceState, null, IGetDeviceTypesAction>
> = () => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await axios.get(`${API_BASE_URL}device/types`);
            dispatch({
                deviceTypes: response.data.data,
                type: DeviceActionTypes.GET_DEVICE_TYPE,
            });
        }catch(err){
            console.error(err);
        }
    }
}

export const getDeviceDictionary: ActionCreator<
    ThunkAction<Promise<any>, IDeviceState, null, IGetAllDeviceAction>
> = () => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await axios.get(`${API_BASE_URL}device/dictionary`);
            dispatch({
                deviceDictionary: response.data.data,
                type: DeviceActionTypes.GET_DEVICE_DICTIONARY,
            });
        }catch(err){
            console.error(err);
        }
    }
}