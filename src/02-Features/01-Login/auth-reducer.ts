import {Dispatch} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {RootStateType} from '../../04-App/store';
import {authAPI} from '../../01-API/00-login-api';
import {setAppStatus} from '../../04-App/app-reducer';

type ActionsType = ReturnType<typeof setIsLoggedIn>
    | ReturnType<typeof setAppStatus>
    | ReturnType<typeof setUserData>
    | ReturnType<typeof updateUserProfile>

export type UserDataType = {
    avatar: string,
    created: number,
    email: string,
    isAdmin: boolean,
    name: string,
    publicCardPacksCount: number,
    rememberMe: boolean,
    token: string,
    updated: number,
    _id: string,
}

const initialState = {
    isLoggedIn: false,
    user: {
        avatar: '',
        created: 5,
        email: '',
        isAdmin: false,
        name: '',
        publicCardPacksCount: 0,
        rememberMe: false,
        token: '',
        updated: 5,
        _id: '',
    }
}

type AuthInitialStateType = typeof initialState

export const authReducer = (state: AuthInitialStateType = initialState, action: ActionsType): AuthInitialStateType => {
    switch (action.type) {
        case 'CARDS/LOGIN/SET_IS_AUTH':
            return {...state, isLoggedIn: action.payload.isLoggedIn}
        case 'CARDS/LOGIN/SET_USER_DATA':
            return {...state, user: action.payload.userData}
        case  'CARDS/LOGIN/UPDATE_PROFILE':
            return {
                ...state,
                user: {
                    ...state.user,
                    name: action.payload.user.name,
                    avatar: action.payload.user.avatar
                }
            }
        default:
            return state
    }
}

export const setIsLoggedIn = (isLoggedIn: boolean) => ({
    type: 'CARDS/LOGIN/SET_IS_AUTH', payload: {
        isLoggedIn
    }
}) as const

export const setUserData = (userData: UserDataType) => ({
    type: 'CARDS/LOGIN/SET_USER_DATA', payload: {
        userData
    }
}) as const

export const updateUserProfile = (user: UserDataType) => ({
    type: 'CARDS/LOGIN/UPDATE_PROFILE', payload: {
        user
    }
} as const)


export const login = (email: string, password: string, rememberMe: boolean) => async (dispatch: ThunkDispatch<RootStateType, unknown, ActionsType>) => {
    dispatch(setAppStatus({status: 'loading', error: null}))
    try {
        const res = await authAPI.login(email, password, rememberMe)
        dispatch(setUserData(res.data))
        dispatch(setIsLoggedIn(true))
        dispatch(setAppStatus({status: 'succeeded', error: null}))
    } catch (e) {
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
        dispatch(setAppStatus({status: 'failed', error: error}))
    }
}

export const getAuthUserData = () => async (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading', error: null}))
    try {
        const res = await authAPI.getAuth()
        dispatch(setUserData(res.data))
        dispatch(setIsLoggedIn(true))
        dispatch(setAppStatus({status: 'succeeded', error: null}))
    } catch (e) {
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
        dispatch(setAppStatus({status: 'failed', error: error}))
    }
}

export const logout = () => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatus({status: 'loading', error: null}))
    try {
        const res = await authAPI.logout()
        dispatch(setIsLoggedIn(false))
        dispatch(setAppStatus({status: 'succeeded', error: res.data.info}))
    } catch (e) {
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
        dispatch(setAppStatus({status: 'failed', error: error}))
    }
}

export const updateProfileData = (name?: string, avatar?: string, tokenName?: string) =>
    async (dispatch: ThunkDispatch<RootStateType, unknown, ActionsType>) => {
        dispatch(setAppStatus({status: 'loading', error: null}))
        try {
            const res = await authAPI.updateProfileData(name, avatar, tokenName)
            dispatch(updateUserProfile(res.data.updatedUser))
            dispatch(setAppStatus({status: 'succeeded', error: null}))
        } catch (e) {
            const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
            dispatch(setAppStatus({status: 'failed', error: error}))
        }
    }



