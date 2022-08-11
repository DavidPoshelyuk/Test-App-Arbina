import {combineReducers, createStore} from "redux";
import {filterReducer} from "./reducers/filter-Reducer"

const rootReducer = combineReducers({
	 filterReducer
})
export const store = createStore(rootReducer);
export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;
