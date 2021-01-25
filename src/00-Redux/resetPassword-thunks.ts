import {Dispatch} from 'redux';
import {passwordAPI} from '../01-API/02-password-api';
import {setAppStatus} from './appState-reducer';

export const sendRecoveryEmail = (email: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading', error: null}))
    passwordAPI.recover(email)
        .then(res => {
            if (res.status === 200) {
                dispatch(setAppStatus({
                    status: 'succeeded',
                    error: `if account "${email}" exist, an email will be sent with further instruction`
                }))
            } else {
                dispatch(setAppStatus({status: 'failed', error: 'Something went wrong:('}))
            }
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            dispatch(setAppStatus({status: 'failed', error: error}))
        })
}

export const resetPassword = (password: string, token: string | undefined) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading', error: null}))
    passwordAPI.resetPassword(password, token)
        .then(res => {
            if (res.status === 200) {
                dispatch(setAppStatus({status: 'succeeded', error: 'The password change is successful'}))
            } else {
                dispatch(setAppStatus({status: 'failed', error: 'Something went wrong:('}))
            }
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            dispatch(setAppStatus({status: 'failed', error: error}))
        })
}