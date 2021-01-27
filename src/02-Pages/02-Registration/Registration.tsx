import React, {ChangeEvent, useCallback, useState} from 'react';
import {NavLink, Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../../04-App/store';
import {registrationTC} from '../../00-Redux/registration-reducer';
import {path} from '../../04-App/Routes/Routes';
import UniversalInputText from '../../03-Components/SuperComponents/InputText/UniversalInputText';
import UniversalButton from '../../03-Components/SuperComponents/Button/FornButton/UniversalButton';
import stylesContainer from './../../03-Components/container/container.module.css';
import UniversalCheckbox from '../../03-Components/SuperComponents/DoubleRange/Checkbox/UniversalCheckbox';

const Registration: React.FC = () => {
    const dispatch = useDispatch()

    const [email, setEmail] = useState<string>('xranitelinadejd@gmail.com')
    const [password, setPassword] = useState<string>('KOSTYA1234END.')
    const isRedirectProfile = useSelector<RootStateType, boolean>(state => state.registration.isRedirect)
    const appStatus = useSelector<RootStateType, string>((state) => state.app.appState.status)

    const onChangeHandlerEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => setEmail(e.currentTarget.value), [])

    const onChangeHandlerPassword = useCallback((e: ChangeEvent<HTMLInputElement>) => setPassword(e.currentTarget.value), [])

    const onClickHandler = () => (dispatch(registrationTC({email, password})))

    if (isRedirectProfile) {
        return <Redirect to={path.LOGIN}/>
    }

    return <div className={stylesContainer.container}>
        <h4>CREATE A NEW ACCOUNT</h4>
        <div className={stylesContainer.inner}>
            <UniversalInputText type={'text'} value={email} onChange={onChangeHandlerEmail} placeholder={'Email'}/>
            <UniversalInputText type={'password'} value={password} onChange={onChangeHandlerPassword}
                                placeholder={'Password'}/>
            <UniversalCheckbox>I agree to the Terms of Service and Privacy Policy</UniversalCheckbox>
            <UniversalButton onClick={onClickHandler}
                             disabled={appStatus === 'loading'}> SIGN UP </UniversalButton>
            <hr/>
            <p>Already registered? <NavLink to={path.LOGIN} activeClassName={stylesContainer.activeLink}><p
                className={stylesContainer.link}>Sign in to your account. </p></NavLink></p>
        </div>
    </div>
};

export default Registration;