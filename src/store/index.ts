import { applyMiddleware, combineReducers, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { reducer as authReducer } from "./ducks/auth";
import rootSaga from "./ducks/rootSaga";

import unsavedChangesReducer from "./ducks/unsavedChanges";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  auth: authReducer,
  unsavedChanges: unsavedChangesReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);
