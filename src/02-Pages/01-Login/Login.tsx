import React, {ChangeEvent, useCallback, useState} from 'react';
import style from './Login.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../../04-App/store';
import {NavLink, Redirect} from 'react-router-dom';
import {getAuthUserData} from '../../00-Redux/login-reducer';
import Input from '../../03-Components/SuperComponents/Input/Input';
import Checkbox from '../../03-Components/SuperComponents/CheckBox/Checkbox';
import Button from '../../03-Components/SuperComponents/Button/Button';
import {path} from '../../04-App/App';
import ErrorSnackBar from '../../03-Components/ErrorSnackBar/ErrorSnackBar';

type LoginPropsType = {}

const Login: React.FC<LoginPropsType> = React.memo(() => {
    const dispatch = useDispatch()
    const isAuth = useSelector<RootStateType, boolean>(state => state.login.isAuth)

    const appStatus = useSelector<RootStateType, string>((state) => state.app.appState.status)
    const error = useSelector<RootStateType, string | null>((state) => state.app.appState.error)

    let [email, setEmail] = useState<string>('')
    let [password, setPassword] = useState<string>('')
    let [rememberMe, setRememberMe] = useState<boolean>(false)

    let onclickEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => setEmail(e.currentTarget.value), [setEmail])
    let onclickPassword = useCallback((e: ChangeEvent<HTMLInputElement>) => setPassword(e.currentTarget.value), [setPassword])
    let onclickCheckbox = useCallback((e: ChangeEvent<HTMLInputElement>) => setRememberMe(e.currentTarget.checked), [setRememberMe])

    let onclickHandler = useCallback(() => {
        dispatch(getAuthUserData(email, password, rememberMe))
    }, [email, password, rememberMe, dispatch])
    if (isAuth) {
        return <Redirect to={path.PROFILE}/>
    }
    return <div className={style.wrapper}>
        <h1>Sign In</h1>
        {error && <ErrorSnackBar errorMessage={error}/>}
        <form className={style.loginForm}>
            <Input type={'email'}
                   placeholder={'Enter email'}
                   onChange={onclickEmail}/>
            <Input type={'password'}
                   placeholder={'03-Password'}
                   onChange={onclickPassword}/>
            <Checkbox title={'Remember me'}
                      onChange={onclickCheckbox}/>
            <Button disabled={appStatus === 'loading'} onClick={onclickHandler}> SIGN IN </Button>
        </form>
        <span>
            <NavLink to={path.PASS_REC}> Forget password</NavLink>
            <NavLink to={path.REG}> Registration </NavLink>
        </span>

    </div>
});

export default Login;