import React, {ChangeEvent, useCallback, useState} from 'react';
import {Redirect} from 'react-router-dom';
import {path} from '../../04-App/App';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../../04-App/store';
import {registrationTC} from '../../00-Redux/registration-reducer';
import {Input} from '../../03-Components/SuperComponents/Input/Input';
import Button from '../../03-Components/SuperComponents/Button/Button';
import ErrorSnackBar from '../../03-Components/ErrorSnackBar/ErrorSnackBar';

import s from './Registration.module.css';

const Registration: React.FC= () => {
    const dispatch = useDispatch()

    const [email, setEmail] = useState<string>('xranitelinadejd@gmail.com')
    const [password, setPassword] = useState<string>('KOSTYA1234END.')
    const isRedirectProfile = useSelector<RootStateType, boolean>(state => state.registration.isRedirect)

    const error = useSelector<RootStateType, string | null>((state) => state.app.appState.error)
    const appStatus = useSelector<RootStateType, string>((state) => state.app.appState.status)

    const onChangeHandlerEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => setEmail(e.currentTarget.value), [])

    const onChangeHandlerPassword = useCallback((e: ChangeEvent<HTMLInputElement>) => setPassword(e.currentTarget.value), [])

    const onClickHandler = () => (dispatch(registrationTC({email, password})))

    if (isRedirectProfile) {
        return <Redirect to={path.LOGIN}/>
    }

    return <div className={s.wrapper}>
        <h1>Registration</h1>
        {error && <ErrorSnackBar errorMessage={error}/>}
        <form className={s.registrationForm}>
            <Input type={'text'} value={email} onChange={onChangeHandlerEmail} placeholder={'Email'}/>
            <Input type={'password'} value={password} onChange={onChangeHandlerPassword} placeholder={'03-Password'}/>
            <Button onClick={onClickHandler} disabled={appStatus === 'loading'}> Registration </Button>
        </form>
    </div>
};

export default Registration;