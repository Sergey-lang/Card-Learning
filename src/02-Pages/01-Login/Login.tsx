import React, {ChangeEvent, useCallback, useState} from 'react';
import stylesContainer from './../../03-Components/container/container.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../../04-App/store';
import {NavLink, Redirect} from 'react-router-dom';
import {getAuthUserData} from '../../00-Redux/login-reducer';
import UniversalButton from '../../03-Components/SuperComponents/Button/FormButton/UniversalButton';
import UniversalInputText from '../../03-Components/SuperComponents/InputText/UniversalInputText';
import UniversalCheckbox from '../../03-Components/SuperComponents/DoubleRange/Checkbox/UniversalCheckbox';
import {path} from '../../04-App/Routes/Routes';
import s from '../01-Login/Login.module.css';

type LoginPropsType = {}

const Login: React.FC<LoginPropsType> = React.memo(() => {
    const dispatch = useDispatch()
    const isAuth = useSelector<RootStateType, boolean>(state => state.login.isAuth)
    const appStatus = useSelector<RootStateType, string>((state) => state.app.appState.status)


    let [email, setEmail] = useState<string>('')
    let [password, setPassword] = useState<string>('')
    let [rememberMe, setRememberMe] = useState<boolean>(false)

    let onclickEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => setEmail(e.currentTarget.value), [setEmail])
    let onclickPassword = useCallback((e: ChangeEvent<HTMLInputElement>) => setPassword(e.currentTarget.value), [setPassword])

    let onclickHandler = useCallback(() => {
        dispatch(getAuthUserData(email, password, rememberMe))
    }, [email, password, rememberMe, dispatch])
    if (isAuth) {
        return <Redirect to={'/'}/>
    }
    return <div className={stylesContainer.container}>
        <h4>SIGN IN</h4>
        <div className={stylesContainer.inner}>
            <UniversalInputText type={'email'}
                                placeholder={'Enter email'}
                                onChange={onclickEmail}/>
            <UniversalInputText type={'password'}
                                placeholder={'Password'}
                                onChange={onclickPassword}/>
            <UniversalCheckbox onChangeChecked={setRememberMe}>Remember me</UniversalCheckbox>
            <UniversalButton disabled={appStatus === 'loading'} onClick={onclickHandler}> SUBMIT </UniversalButton>
            <hr/>
            <p>Not registered? <NavLink to={path.REG} activeClassName={stylesContainer.activeLink} className={s.inactive}>Create an Account.</NavLink></p>
            <p>Forgot password? <NavLink to={path.PASS_REC} activeClassName={stylesContainer.activeLink}  className={s.inactive}>Click here to recover.</NavLink></p>
        </div>
    </div>

});

export default Login;