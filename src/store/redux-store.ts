import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {userReducer} from "./reducers/authReducer";


const rootReducers = combineReducers({
    auth:userReducer
})

export type RootState = ReturnType<typeof rootReducers>

export const store = createStore(rootReducers, applyMiddleware(thunk))