import {Dispatch} from 'redux';
import {passwordAPI} from '../../Api/api-password';
import {setAppErrorAC, setAppStatusAC} from './appReducer';

//Thunk
export const sendRecoveryEmail = (email: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    passwordAPI.recover(email)
        .then(res => {
            if (res.status === 200) {
                dispatch(setAppStatusAC('succeeded'))
                dispatch(setAppErrorAC(`if account "${email}" exist, an email will be sent with further instruction`))
            } else {
                dispatch(setAppStatusAC('failed'))
                dispatch(setAppErrorAC('Something went wrong:('))
            }
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            dispatch(setAppStatusAC('failed'))
            dispatch(setAppErrorAC(error))
        })
}

export const resetPassword = (password: string, token: string | undefined) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    passwordAPI.resetPassword(password, token)
        .then(res => {
            if (res.status === 200) {
                dispatch(setAppStatusAC('succeeded'))
                dispatch(setAppErrorAC('The password change is successful'))
            } else {
                dispatch(setAppStatusAC('failed'))
                dispatch(setAppErrorAC('Something went wrong:('))
            }
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            dispatch(setAppStatusAC('failed'))
            dispatch(setAppErrorAC(error))
        })
}