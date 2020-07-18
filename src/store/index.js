import {applyMiddleware, combineReducers, createStore} from "redux";
import createSagaMiddleware from 'redux-saga';
import exampleReducer from "./ducks/example";
import rootSaga from "./ducks/rootSaga";

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
    example: exampleReducer
});

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga)
