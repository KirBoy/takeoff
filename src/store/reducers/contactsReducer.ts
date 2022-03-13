import {AuthAction, AuthActionTypes, AuthInitialState} from "../../types/auth";

const initialState: AuthInitialState = {
    isAuth: false,
    error: false,
    id: null
}

export const userReducer = (state = initialState, action: AuthAction): AuthInitialState => {

    switch (action.type) {

        case AuthActionTypes.LOGIN:
            return {...state, isAuth: true, id: action.id}

        case AuthActionTypes.LOGIN_ERROR:
            return {...state, error: true}

        case AuthActionTypes.RESET_ERROR:
            return {...state, error: false}

        default:
            return state
    }
}