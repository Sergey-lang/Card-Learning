import {instance} from './api';
import {UserDataType} from '../02-Features/01-Login/auth-reducer';

type UpdateUserResponse = {
    token: string
    updatedUser: UserDataType
}

export const authAPI = {

    getAuth() {
        return instance.post<UserDataType>(`auth/me`)
    },

    login(email: string, password: string, rememberMe: boolean) {
        return instance.post<UserDataType>('auth/login', {email, password, rememberMe})
    },

    logout() {
        return instance.delete('auth/me')
    },

    updateProfileData(name?: string, avatar?: string, token?: string) {
        return instance.put<UpdateUserResponse>('auth/me', {name, avatar, token})
    }
}



