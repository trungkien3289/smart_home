import { Reducer } from 'redux';
import { SexEnum } from './constants';
import { ICustomerCategory } from '../customerCategory/reducers';
import { EntityStatus } from '../../appConstants/enum';
import { CustomerActions, CustomerActionTypes } from './actions';

// Define the Character type
export interface ICustomer {
    name: string,
    code: string,
    phoneNumber: string,
    email: string,
    sex: SexEnum,
    category: ICustomerCategory,
    dateOfBirth: Date,
    fax: string,
    taxCode: string,
    note: string,
    address: string,
    district: number,
    status: EntityStatus
}

// Define Customer State
export interface ICustomerState {
    customers: ICustomer[];
}

// Define the initial state
const initialCustomerState: ICustomerState = {
    customers: [],
};

export const customerReducer: Reducer<ICustomerState, CustomerActions> = (
    state = initialCustomerState,
    action
) => {
    switch (action.type) {
        case CustomerActionTypes.GET_ALL:{
            return {
                ...state,
                customers: action.customers
            }
        }
        default:
            return state;
    }
}