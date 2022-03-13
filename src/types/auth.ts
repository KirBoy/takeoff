export enum AuthActionTypes {
    LOGIN = 'LOGIN',
    LOGIN_ERROR = 'LOGIN_ERROR',
    RESET_ERROR = 'RESET_ERROR'
}

export type AuthAction = LoginSucceedAction | LoginErrorAction | ResetErrorAction;

export type AuthInitialState = {
    isAuth: boolean,
    error: boolean,
    id: string
}

export type LoginSucceedAction = {
    type: AuthActionTypes.LOGIN,
    id: string
}

export type LoginErrorAction = {
    type: AuthActionTypes.LOGIN_ERROR,
}

export type ResetErrorAction = {
    type: AuthActionTypes.RESET_ERROR,
}

export type AuthState = {
    login: string,
    password: string;
}

export type FetchUsers = {
    login: string,
    password: string;
    id: string
}

