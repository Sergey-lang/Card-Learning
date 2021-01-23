import {path} from '../../04-App/App';
import React, {useEffect} from 'react';
import {RootStateType} from '../../04-App/store';
import {useDispatch, useSelector} from 'react-redux';
import ErrorSnackBar from '../../03-Components/ErrorSnackBar/ErrorSnackBar';
import {setAppErrorAC, setAppStatusAC} from '../../00-Redux/app-reducer';
import ProgressBar from '../../03-Components/SuperComponents/ProgressBar/ProgressBar';
import {SendingForm} from '../../03-Components/SuperComponents/SendingForm/SendingForm';
import {sendRecoveryEmail} from '../../00-Redux/resetPassword-thunks';

import s from './Password.module.css'

export const PasswordRecovery: React.FC = () => {

    const dispatch = useDispatch()

    const appStatus = useSelector<RootStateType, string>((state) => state.app.statusResponse)
    const error = useSelector<RootStateType, string | null>((state) => state.app.error)

    const sendEmail = (email: string) => {
        dispatch(sendRecoveryEmail(email))
    }

    //clear status
    useEffect(() => {

        return () => {
            dispatch(setAppStatusAC('idle'))
            dispatch(setAppErrorAC(null))
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