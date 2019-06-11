// import redux types
import {ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';

// Import Character Typing
import {ICustomer, ICustomerState } from './reducers';
import {API_BASE_URL} from '../../appConstants/global'

// Create Action Constants
export enum CustomerActionTypes {
    GET_ALL = 'GET_ALL',
}

// Interface for Get All Action Type
export interface ICustomerGetAllAction {
    type: CustomerActionTypes.GET_ALL;
    customers: ICustomer[];
}

/* 
Combine the action types with a union (we assume there are more)
example: export type CharacterActions = IGetAllAction | IGetOneAction ... 
*/
export type CustomerActions = ICustomerGetAllAction;

/* Get All Action
<Promise<Return Type>, State Interface, Type of Param, Type of Action> */

export const getAllCustomers: ActionCreator<
    ThunkAction<Promise<any>, ICustomerState, null, ICustomerGetAllAction>
> = () => {
    return async (dispatch: Dispatch) => {
        try {
            debugger
            const response = await axios.get(`${API_BASE_URL}customers`);
            debugger
            dispatch({
                customers: response.data.data,
                type: CustomerActionTypes.GET_ALL,
            });
        }catch(err){
            console.error(err);
        }
    }
}