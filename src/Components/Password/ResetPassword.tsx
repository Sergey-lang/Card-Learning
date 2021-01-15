import {path} from '../../App';
import React, {useEffect} from 'react';
import {RootStateType} from '../../Redux/store';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import ErrorSnackBar from '../ErrorSnackBar/ErrorSnackBar';
import {setAppErrorAC, setAppStatusAC} from '../../Redux/reducers/appReducer';
import {SendingForm} from '../SuperComponents/SendingForm/SendingForm';
import {resetPassword} from '../../Redux/reducers/resetPasswordThunks';
import ProgressBar from '../SuperComponents/ProgressBar/ProgressBar';

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