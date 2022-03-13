import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {authReducer} from "./reducers/authReducer";
import {contactsReducer} from "./reducers/contactsReducer";


const rootReducers = combineReducers({
    auth: authReducer,
    contacts: contactsReducer
})

export type RootState = ReturnType<typeof rootReducers>

export const store = createStore(rootReducers, applyMiddleware(thunk))