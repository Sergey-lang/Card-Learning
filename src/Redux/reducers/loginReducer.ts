import {Dispatch} from 'redux';
import {authAPI} from '../../Api/api-login';
import {setAppErrorAC, setAppStatusAC} from './appReducer';

type InitialStateType = {
    user: UserDataType | {},
    isAuth: boolean
}
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
    user: {},
    isAuth: false,
}

export const loginReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET_USER_DATA':
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
}


    export const setAuthUserDataAC = (payload: InitialStateType) => ({type: 'SET_USER_DATA', payload}) as const


    export const getAuthUserData = (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch<ActionsType>) => {
        dispatch(setAppStatusAC('loading'))
        authAPI.login(email, password, rememberMe)
            .then(response => {
                    dispatch(setAppStatusAC('succeeded'))
                    dispatch(setAuthUserDataAC({user: response.data, isAuth: true}))
                }
            ).catch((e) => {
            const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
            dispatch(setAppErrorAC(error))
            dispatch(setAppStatusAC('failed'))
        })
    }
    export const deleteAuthUserData = () => (dispatch: Dispatch<ActionsType>) => {
        dispatch(setAppStatusAC('loading'))
        authAPI.logout()
            .then(response => {
                    dispatch(setAppStatusAC('succeeded'))
                    dispatch(setAuthUserDataAC({user: {}, isAuth: false}))
                    alert(response.data.info)
                }
            ).catch((e) => {
            const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
            dispatch(setAppStatusAC('failed'))
            alert(error)
        })
    }

    export type setAuthUserDataType = ReturnType<typeof setAuthUserDataAC>


    type ActionsType =
        | setAuthUserDataType
        | ReturnType<typeof setAppStatusAC>
        | ReturnType<typeof setAppErrorAC>

