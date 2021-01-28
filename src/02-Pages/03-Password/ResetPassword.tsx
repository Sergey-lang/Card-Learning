import React, {useEffect} from 'react';
import {RootStateType} from '../../04-App/store';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import {SendingForm} from '../../03-Components/SuperComponents/SendingForm/SendingForm';
import {resetPassword} from '../../00-Redux/resetPassword-thunks';
import {setAppStatus} from '../../00-Redux/appState-reducer';
import {path} from '../../04-App/Routes/Routes';
import stylesContainer from '../../03-Components/container/container.module.css';

export const ResetPassword: React.FC = () => {

    const dispatch = useDispatch()
    const {token} = useParams<Record<string, string | undefined>>();
    const history = useHistory();

    const appStatus = useSelector<RootStateType, string>((state) => state.app.appState.status)


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
            dispatch(setAppStatus({status: 'idle', error: null}))
        }
    }, [])

    return (
        <div className={stylesContainer.container}>
            <SendingForm formName={'RESET PASSWORD'}
                         formDescription={`Create a new, strong password that you don't use for other websites`}
                         callback={resetOldPassword}
                         inputPlaceholder={'enter your new password'}
                         inputType={'password'}
                         buttonName={'Reset'}
                         btnDisabled={appStatus === 'loading'}
                         navLinkPath={path.LOGIN}
            />
        </div>
    )
}