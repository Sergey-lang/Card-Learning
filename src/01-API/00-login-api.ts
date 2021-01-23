import {instance} from './api';
import {UserDataType} from '../00-Redux/login-reducer';

export const authAPI = {
    getAuth() {
        return instance.post(`auth/me`)
    },
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post<UserDataType>('auth/login', {email, password, rememberMe})
    },
    logout() {
        return instance.delete('auth/me')
    }
}

