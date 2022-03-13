import {Dispatch} from "redux";
import axios from "axios";
import {AuthAction, AuthActionTypes, AuthState, FetchUsers} from "../../types/auth";


export const resetError = () => {
    return {
        type: AuthActionTypes.RESET_ERROR
    }
}


export const fetchUsers = (data: AuthState) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            const response = await axios.get<FetchUsers[]>('http://localhost:5656/profiles')
            const findUser = response.data.filter(el => el.login === data.login)

            if (findUser.length && findUser[0].password === data.password) {
                dispatch({type: AuthActionTypes.LOGIN, id: findUser[0].id})
            } else {
                throw new Error()
            }
        } catch (e) {

            dispatch({
                type: AuthActionTypes.LOGIN_ERROR,
            })
        }
    }
}

export const RegisterUser = (data: AuthState) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            const response = await axios.get<FetchUsers[]>('http://localhost:5656/profiles')

            if (response.data.every(el => el.login !== data.login)) {
                const resp =  await axios.post<FetchUsers>('http://localhost:5656/profiles', {...data})
                dispatch({type: AuthActionTypes.LOGIN, id: resp.data.id})
            } else {
                throw new Error()
            }
        } catch (e) {

            dispatch({
                type: AuthActionTypes.LOGIN_ERROR,
            })
        }
    }
}