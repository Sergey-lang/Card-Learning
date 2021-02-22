import React, {useEffect} from 'react';
import {RootStateType} from '../../04-App/store';
import {useDispatch, useSelector} from 'react-redux';
import {SendingForm} from '../../03-Components/SuperComponents/SendingForm/SendingForm';
import {sendRecoveryEmail} from './resetPassword-thunks';
import {PATH} from '../../04-App/Routes/Routes';
import stylesContainer from '../../assets/css/container.module.css';
import {setAppStatus} from '../../04-App/app-reducer';
import {appSelectors} from '../../04-App/00-index';

export const PasswordRecovery: React.FC = () => {

    const appStatus = useSelector<RootStateType, string>(appSelectors.selectorAppStatus)

    const sendEmail = (email: string) => {
        dispatch(sendRecoveryEmail(email))
    }

    const dispatch = useDispatch()
    useEffect(() => {
        return () => {
            dispatch(setAppStatus({status: 'idle', error: null}))
        }
    }, [])

    return (
        <div className={stylesContainer.container}>
            <SendingForm formName={'RECOVERY PASSWORD'}
                         formDescription={`Enter the email address you used to register and we'll send you the instruction`}
                         callback={sendEmail}
                         inputPlaceholder={'enter your email address'}
                         inputType={'email'}
                         buttonName={'Send'}
                         btnDisabled={appStatus === 'loading'}
                         navLinkPath={PATH.LOGIN}
            />
        </div>
    )
}
