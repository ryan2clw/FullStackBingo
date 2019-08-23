import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { createLogger } from 'redux-logger';
import thunk from "redux-thunk";
import { messageReducer, IMessageState } from './messages';

export interface IApplicationState {
    message: IMessageState
}

const configureStore = () => {
    const reducers = {
        message: messageReducer,
    };
    const loggerMiddleware = createLogger();
    const middleware = [
        thunk,
        loggerMiddleware,
    ];
    const rootReducer = combineReducers({
        ...reducers,
    });
    return createStore(
        rootReducer,
        compose(applyMiddleware(...middleware)),
    );
 }
export default configureStore;
