import { action as act } from 'typesafe-actions'
import actionTypes from './actionTypes';
import { Reducer } from 'redux'

/* Message Actions */

export const success = (message: string) => act(actionTypes.SUCCESS, message);
export const danger = (message: string) => act(actionTypes.ERROR, message)
export const clear = () => act(actionTypes.CLEAR);

export interface IMessageState {
    readonly type: string,
    readonly message: string
}
const initialState = {
    message: "",
    type: "alert-clear",
}

/* Message Reducer */
const messageReducer: Reducer<IMessageState> = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SUCCESS:
            return {
                message: action.payload,
                type: 'alert-success',
            };
        case actionTypes.ERROR:
            return {
                message: action.payload,
                type: 'alert-danger',
            };
        case actionTypes.CLEAR:
            return {
                message: action.payload,
                type: 'alert-clear',
            };

        default:
            return state
    }
}
export { messageReducer }
