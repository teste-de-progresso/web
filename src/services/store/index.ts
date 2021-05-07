import { combineReducers, createStore } from "redux";

import { reducer as unsavedChanges } from "./unsavedChanges/reducer";
import { reducer as auth } from "./auth";

const rootReducer = combineReducers({
  unsavedChanges,
  auth,
});

export type RootState = ReturnType<typeof store.getState>;

export const store = createStore(rootReducer);
