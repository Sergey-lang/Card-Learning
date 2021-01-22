import {path} from '../../04-App/App';
import React, {useEffect} from 'react';
import {RootStateType} from '../../04-App/store';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import ErrorSnackBar from '../../03-Components/ErrorSnackBar/ErrorSnackBar';
import {setAppErrorAC, setAppStatusAC} from '../../00-Redux/app-reducer';
import {SendingForm} from '../../03-Components/SuperComponents/SendingForm/SendingForm';
import {resetPassword} from '../../00-Redux/resetPassword-thunks';
import ProgressBar from '../../03-Components/SuperComponents/ProgressBar/ProgressBar';

import s from './Password.module.css'

export const ResetPassword: React.FC = () => {

    const dispatch = useDispatch()
    const {token} = useParams<Record<string, string | undefined>>();
    const history = useHistory();

    const appStatus = useSelector<RootStateType, string>((state) => state.app.statusResponse)
    const error = useSelector<RootStateType, string | null>((state) => state.app.error)

    const tokenName = token ? token : ''

    const resetOldPassword = (password: string) => {
        dispatch(resetPassword(password, tokenName))

    }

    const redirect = () => {
        history.push(path.LOGIN);
    }

    //redirect
    if (appStatus === 'succeeded') {
        setTimeout(redirect, 3000)
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
            <SendingForm formName={'RESET PASSWORD'}
                         formDescription={`Create a new, strong password that you don't use for other websites`}
                         callback={resetOldPassword}
                         inputPlaceholder={'enter your new password'}
                         inputType={'password'}
                         buttonName={'Reset'}
                         btnDisabled={appStatus === 'loading'}
                         navLinkPath={path.LOGIN}
            />
            {
                error && <ErrorSnackBar errorMessage={error}/>
            }
        </div>
    )
}