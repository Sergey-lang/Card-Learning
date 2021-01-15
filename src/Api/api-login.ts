import {instance} from "./api";


export const authAPI = {
    getAuth() {
        return instance.post(`auth/me`)
    },
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post('auth/login', {email, password, rememberMe})
        //.data
    },
    logout() {
        return instance.delete('auth/me')
    }
}

//types
export type nameType = {}

