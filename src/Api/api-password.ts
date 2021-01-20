import {APIResponseType, instance} from './api';

//Response types
export type PasswordRecoveryType = {
    answer: boolean
    html: boolean
    info: string
    success: boolean
}

export type SetNewPasswordType = {
    info: string
    error: string
}

export const passwordAPI = {
    recover(email: string) {
        return instance.post<APIResponseType<PasswordRecoveryType>>('auth/forgot', {
            email: email,
            from: 'test-front-admin <serega.kuharionok@yandex.ru>',
            message: `<div style="background-color: #00ff00; padding: 15px">
                            password recovery link: 
                     <a href='http://localhost:3000/FridayProject#/newPassword/$token$'>Click</a>
                     </div>`
        });
    },

    resetPassword(password: string, token: string | undefined) {
        return instance.post<APIResponseType<SetNewPasswordType>>('auth/set-new-password', {
            password,
            resetPasswordToken: token
        });
    }
}