import {path} from '../../04-App/App';
import React, {useEffect} from 'react';
import {RootStateType} from '../../04-App/store';
import {useDispatch, useSelector} from 'react-redux';
import ErrorSnackBar from '../../03-Components/ErrorSnackBar/ErrorSnackBar';
import ProgressBar from '../../03-Components/SuperComponents/ProgressBar/ProgressBar';
import {SendingForm} from '../../03-Components/SuperComponents/SendingForm/SendingForm';
import {sendRecoveryEmail} from '../../00-Redux/resetPassword-thunks';

import s from './Password.module.css'
import {setAppStatus} from '../../00-Redux/appState-reducer';

export const PasswordRecovery: React.FC = () => {

    const dispatch = useDispatch()

    const appStatus = useSelector<RootStateType, string>((state) => state.app.appState.status)
    const error = useSelector<RootStateType, string | null>((state) => state.app.appState.error)

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
        <div className={s.pageWrapper}>
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
            {
                error && <ErrorSnackBar errorMessage={error}/>
            }
        </div>
    )
}