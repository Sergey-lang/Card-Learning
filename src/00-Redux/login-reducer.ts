import {Dispatch} from 'redux';
import {authAPI} from '../01-API/00-login-api';
import {setAppStatus} from './appState-reducer';

type ActionsType = ReturnType<typeof isAuth>
    | ReturnType<typeof setAppStatus>
    | ReturnType<typeof setUserData>

export type UserDataType = {
    _id: string,
    email: string,
    name: string,
    avatar: string | null,
    publicCardPacksCount: number,
    created: Date,
    updated: Date,
    isAdmin: boolean,
    verified: boolean,
    rememberMe: boolean
}
const initialState = {
    user: {} as UserDataType,
    isAuth: false,
}

type LoginInitialStateType = typeof initialState

export const loginReducer = (state: LoginInitialStateType = initialState, action: ActionsType): LoginInitialStateType => {
    switch (action.type) {
        case 'CARDS/LOGIN/IS-AUTH':
            return {...state, isAuth: action.isAuth}
        case 'CARDS/LOGIN/SET_USER_DATA': {
            return {...state, user: action.data}
        }
        default:
            return state
    }
}

export const isAuth = (isAuth: boolean) => ({type: 'CARDS/LOGIN/IS-AUTH', isAuth}) as const
export const setUserData = (data: UserDataType) => ({type: 'CARDS/LOGIN/SET_USER_DATA', data}) as const

export const getAuthUserData = (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatus({status: 'loading', error: null}))
    authAPI.login(email, password, rememberMe)
        .then(res => {
                dispatch(setAppStatus({status: 'succeeded', error: null}))
                dispatch(isAuth(true))
                dispatch(setUserData(res.data))
            }
        ).catch((e) => {
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
        dispatch(setAppStatus({status: 'failed', error: error}))
    })
}


export const authUser = () => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading', error: null}))
    authAPI.getAuth()
        .then(res => {
                dispatch(setAppStatus({status: 'succeeded', error: null}))
                dispatch(isAuth(true))
                dispatch(setUserData(res.data))
            }
        ).catch((e) => {
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
        dispatch(setAppStatus({status: 'failed', error: error}))
    })
}


export const deleteAuthUserData = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatus({status: 'loading', error: null}))
    authAPI.logout()
        .then(res => {
                dispatch(isAuth(false))
                dispatch(setAppStatus({status: 'failed', error: res.data.info}))
            }
        ).catch((e) => {
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
        dispatch(setAppStatus({status: 'failed', error: error}))
    })
}