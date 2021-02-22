import {Dispatch} from 'redux';
import {passwordAPI} from '../../01-API/02-password-api';
import {setAppStatus} from '../../04-App/app-reducer';

export const sendRecoveryEmail = (email: string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading', error: null}))
    try {
        const res = await passwordAPI.recover(email)
        if (res.status === 200) {
            dispatch(setAppStatus({
                status: 'succeeded',
                error: `if account "${email}" exist, an email will be sent with further instruction`
            }))
        } else {
            dispatch(setAppStatus({status: 'failed', error: 'Something went wrong:('}))
        }
    } catch (e) {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        dispatch(setAppStatus({status: 'failed', error: error}))
    }
}

export const resetPassword = (password: string, token: string | undefined) => async (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading', error: null}))
    try {
        const res = await passwordAPI.resetPassword(password, token)
        if (res.status === 200) {
            dispatch(setAppStatus({status: 'succeeded', error: 'The password change is successful'}))
        } else {
            dispatch(setAppStatus({status: 'failed', error: 'Something went wrong:('}))
        }
    } catch (e) {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        dispatch(setAppStatus({status: 'failed', error: error}))
    }
}
