import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import featureReducer from "./reducers/feature"

const rootReducer = combineReducers({
    feature: featureReducer,
})
export const setupStore = () =>  configureStore({
    reducer: rootReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore["dispatch"]