import React, {useEffect} from 'react';
import {RootStateType} from '../../04-App/store';
import {useDispatch, useSelector} from 'react-redux';
import ProgressBar from '../../03-Components/SuperComponents/ProgressBar/ProgressBar';
import {SendingForm} from '../../03-Components/SuperComponents/SendingForm/SendingForm';
import {sendRecoveryEmail} from '../../00-Redux/resetPassword-thunks';
import {setAppStatus} from '../../00-Redux/appState-reducer';
import {path} from '../../04-App/Routes/Routes';
import stylesContainer from '../../03-Components/container/container.module.css';

export const PasswordRecovery: React.FC = () => {

    const dispatch = useDispatch()
    const appStatus = useSelector<RootStateType, string>((state) => state.app.appState.status)
    const sendEmail = (email: string) => {
        dispatch(sendRecoveryEmail(email))
    }

    //clear status
    useEffect(() => {

        return () => {
            dispatch(setAppStatus({status: 'idle', error: null}))
        }
    }, [])

    return (
        <div className={stylesContainer.container}>
            {
                appStatus === 'loading' && <ProgressBar/>
            }
            <SendingForm formName={'RECOVERY PASSWORD'}
                         formDescription={`Enter the email address you used to register and we'll send you the instruction`}
                         callback={sendEmail}
                         inputPlaceholder={'enter your email address'}
                         inputType={'email'}
                         buttonName={'Send'}
                         btnDisabled={appStatus === 'loading'}
                         navLinkPath={path.LOGIN}
            />
        </div>
    )
}