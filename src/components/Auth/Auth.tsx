import React, {useState} from 'react';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import './auth.css'
import {TextField, Button} from "@mui/material";
import {useActions} from "../hooks/useAction";
import {AuthState} from "../types/auth";

const Auth: React.FC = () => {
    const [fields, setFieldsValue] = useState<AuthState>({
        login: '',
        password: ''
    });
    const [mode, setMode] = useState<boolean>(false);
    const [localError, setLocalError] = useState<boolean>(false);

    const {error} = useTypedSelector(state => state.auth);
    const {fetchUsers, resetError, RegisterUser} = useActions();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (error) {
            resetError()
        }
        if (localError) {
            setLocalError(false)
        }

        setFieldsValue(prevState => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })
    }

    const changeMode = () => {
        setMode(!mode)
    }

    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!fields.login || !fields.password) {
            setLocalError(true)
            return
        }

        if (mode) {
            RegisterUser(fields)
        } else  {
            fetchUsers(fields)
        }
    }

    return (
        <div className='auth'>
            <h2 className='auth__name'>{mode ? 'Регистрация' : 'Вход'}</h2>
            <form className='auth__form' onSubmit={submitForm}>
                <TextField id="standard-basic"
                           label="Логин"
                           variant="standard"
                           value={fields.login}
                           name='login'
                           onChange={onChange}/>

                <TextField id="standard-basic"
                           label="Пароль"
                           variant="standard"
                           type='password'
                           name='password'
                           value={fields.password}
                           onChange={onChange}/>
                {error && <span className='auth__error'>Неправильное имя пользователя или пароль</span>}
                {localError && <span className='auth__error'>Заполните все поля</span>}
                <Button variant="contained" type='submit'>{mode ? 'Зарегистрироваться' : 'Войти'}</Button>
                <span className='auth__mode' onClick={changeMode}>{mode ? 'Уже есть аккаунт?' : 'Зарегистрироваться?'}</span>
            </form>
        </div>
    );
};

export default Auth;