import {Dispatch} from 'redux';
import {registrationAPI} from '../../01-API/01-regestration-api';
import {setAppStatus} from '../../04-App/app-reducer';

type ActionsType = ReturnType<typeof setRegistrationAC>
    | ReturnType<typeof setRedirectProfileAC>
    | ReturnType<typeof setAppStatus>

type InitialStateType = {
    password: string
    email: string
    isRedirect: boolean
}
export type RegistrationRequestType = {
    email: string
    password: string
}
export type RegistrationResponseType = {
    addedUser: {
        created: string
        email: string
        isAdmin: boolean
        name: string
        publicCardPacksCount: number
        rememberMe: boolean
        updated: string
        verified: boolean
        __v: number
        _id: string
    }
}
export type ErrorResponseType = {
    response: {
        data: {
            emailRegExp?: {}
            error: string
            email?: string
            in: string
            isEmailValid?: boolean
            isPassValid?: boolean
            passwordRegExp?: string
        }
    }
}

const initialState: InitialStateType = {
    password: '',
    email: '',
    isRedirect: false,
}

export const registrationReducer = (state = initialState, actions: ActionsType): InitialStateType => {
    switch (actions.type) {
        case 'SET-REGISTRATION':
            return {...state, ...actions.regData}
        case 'SET-REDIRECT-PROFILE':
            return {...state, isRedirect: actions.isRedirect}
        default:
            return state
    }
}

export const setRegistrationAC = (regData: RegistrationRequestType) => ({type: 'SET-REGISTRATION', regData} as const)

export const setRedirectProfileAC = (isRedirect: boolean) => ({type: 'SET-REDIRECT-PROFILE', isRedirect} as const)

export const registrationTC = (regData: RegistrationRequestType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatus({status: 'loading', error: null}))
    registrationAPI().registration({...regData})
        .then((res) => {
            dispatch(setAppStatus({status: 'succeeded', error: null}))
            const dataAboutUser = res.data.addedUser
            if (Object.keys(dataAboutUser).length === 10) {
                dispatch(setRegistrationAC({...regData}))
                dispatch(setRedirectProfileAC(true))
                dispatch(setAppStatus({status: 'succeeded', error: null}))
            }
        })
        .catch((error: ErrorResponseType) => {
            dispatch(setAppStatus({status: 'loading', error: null}))
            if (error.response.data.in === 'createUser') {
                dispatch(setAppStatus({
                    status: 'failed',
                    error: error.response.data.error
                }))
            }
            if (!error.response.data.isEmailValid) {
                dispatch(setAppStatus({
                    status: 'failed',
                    error: error.response.data.error
                }))
            }
            if (!error.response.data.isPassValid) {
                error.response.data.passwordRegExp && dispatch(setAppStatus({
                    status: 'failed',
                    error: error.response.data.passwordRegExp
                }))
            }
        })
}

