import { Reducer } from 'redux';
import { DeviceActions, DeviceActionTypes } from './actions';

// Define the Device type
export interface IDevice {
    id: string,
    name: string,
    description: string,
    isActive: boolean,
    createdDate: string,
    type: string;
    // owner: string;
}

// Define the Device Type type
export interface IDeviceType {
    id: string,
    name: string,
    description: string,
}

// Define Device State
export interface IDeviceState {
    devices: IDevice[];
    deviceTypes: IDeviceType[];
    isAddDeviceDialogOpen: boolean;
    isEditDeviceDialogOpen: boolean;
    deviceDictionary: any;
}

// Define the initial state
const initialDeviceState: IDeviceState = {
    devices : [],
    deviceTypes: [],
    isAddDeviceDialogOpen: false,
    isEditDeviceDialogOpen: false,
    deviceDictionary: {},
};

export const deviceReducer: Reducer<IDeviceState, DeviceActions> = (
    state = initialDeviceState,
    action
) => {
    switch (action.type) {
        case DeviceActionTypes.GET_ALL_DEVICE:{
            return {
                ...state,
                devices: action.devices
            }
        }
        case DeviceActionTypes.TOGGLE_ADD_DEVICE_DIALOG: {
            return {
                ...state,
                isAddDeviceDialogOpen:!state.isAddDeviceDialogOpen
            }
        }
        case DeviceActionTypes.TOGGLE_EDIT_DEVICE_DIALOG: {
            return {
                ...state,
                isEditDeviceDialogOpen:!state.isEditDeviceDialogOpen
            }
        }
        case DeviceActionTypes.GET_DEVICE_TYPE:{
            return {
                ...state,
                deviceTypes: action.deviceTypes
            }
        }
        case DeviceActionTypes.GET_DEVICE_DICTIONARY:{
            return {
                ...state,
                deviceDictionary: action.deviceDictionary
            }
        }
        default:
            return state;
    }
}