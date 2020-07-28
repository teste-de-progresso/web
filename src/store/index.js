import {applyMiddleware, combineReducers, createStore} from "redux";
import createSagaMiddleware from 'redux-saga';
import exampleReducer from "./ducks/example";
import { reducer as authReducer } from "./ducks/auth";
import rootSaga from "./ducks/rootSaga";

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
    example: exampleReducer,
    auth: authReducer
});

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga)
