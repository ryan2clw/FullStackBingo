import { actionTypes } from './actionTypes';
import { action as act } from 'typesafe-actions'
import { getCards } from '../webservices/bingoService';
import { Reducer, AnyAction } from 'redux'
import { Dispatch } from 'react';
import { danger, clear } from './messages';

/* Card Actions */

export interface ICardArray {
    readonly [key: number]: ICard,
    readonly cards: ICard[],
}
export interface IRow {
    readonly b_val: string,
    readonly i_val: string,
    readonly n_val: string,
    readonly g_val: string,
    readonly o_val: string,
}
export interface ICard {
    readonly id: number,
    readonly [key: number]: IRow,
    readonly rows: IRow[],
}

const fetchRequest = (cardCount: number) => act(actionTypes.CARD_REQUEST, cardCount)
const fetchSuccess = (data: ICardArray) => act(actionTypes.CARD_SUCCESS, data)
const fetchFailure = (error: string) => act(actionTypes.CARD_FAILURE, error)

export const requestNumbers = async (cardCount = 1, dispatch: Dispatch<AnyAction>) => {
    dispatch(fetchRequest(cardCount))
    getCards(cardCount)
        .then(
            (payload) => {
                return dispatch(fetchSuccess(payload));
            },
            (error) => {
                dispatch(fetchFailure(error.toString()));
                dispatch(danger(error.toString())); // sends error to the UI
                setTimeout(() => {
                    dispatch(clear());
                  }, 10000);
            },
        );
}

/* Reducers map actions to state, set the default here */

const initialState = {
    cards: [],
}

/* Message Reducer */
export const cardReducer: Reducer<ICardArray> = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CARD_REQUEST:
            return {
                ...state,
            };
        case actionTypes.CARD_SUCCESS:
            /* Successful API call so update dynamic data: state.whatever = action.whatever */
            return {
                ...state,
                cards: action.payload,
                error: "",
            };
        case actionTypes.CARD_FAILURE:
            return {
                cards: [],
                error: action.error,
            };
        default:
            return state;
    }
};