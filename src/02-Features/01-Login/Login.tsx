import React, {ChangeEvent, useCallback, useState} from 'react';
import stylesContainer from '../../assets/css/container.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../../04-App/store';
import {NavLink, Redirect} from 'react-router-dom';
import {getAuthUserData, login} from './auth-reducer';
import UniversalButton from '../../03-Components/SuperComponents/Button/FormButton/UniversalButton';
import UniversalInputText from '../../03-Components/SuperComponents/InputText/UniversalInputText';
import UniversalCheckbox from '../../03-Components/SuperComponents/DoubleRange/Checkbox/UniversalCheckbox';
import {PATH} from '../../04-App/Routes/Routes';

import s from '../01-Login/Login.module.css';
import {selectorIsAuth} from './01-selectors';
import {appSelectors} from '../../04-App/00-index';

type LoginPropsType = {}

const Login: React.FC<LoginPropsType> = React.memo(() => {

    const isAuth = useSelector<RootStateType, boolean>(selectorIsAuth)
    const appStatus = useSelector<RootStateType, string>(appSelectors.selectorAppStatus)

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [rememberMe, setRememberMe] = useState<boolean>(false)

    const onclickEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => setEmail(e.currentTarget.value), [setEmail])
    const onclickPassword = useCallback((e: ChangeEvent<HTMLInputElement>) => setPassword(e.currentTarget.value), [setPassword])

    const dispatch = useDispatch()
    const onclickHandler = useCallback(() => {
        dispatch(login(email, password, rememberMe))
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
            <UniversalButton disabled={appStatus === 'loading'}
                             onClick={onclickHandler}> SUBMIT </UniversalButton>
            <hr/>
            <p>Not registered? <NavLink to={PATH.REG}
                                        activeClassName={stylesContainer.activeLink}
                                        className={s.inactive}>Create an Account.</NavLink></p>
            <p>Forgot password? <NavLink to={PATH.PASS_REC}
                                         activeClassName={stylesContainer.activeLink}
                                         className={s.inactive}>Click here to recover.</NavLink></p>
        </div>
    </div>
});

export default Login;
