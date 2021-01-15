import {Dispatch} from "redux";
import {registrationAPI} from "../../Api/api-regestration";
import {setAppErrorAC, setAppStatusAC} from './appReducer';


//Types
type ActionsType = ReturnType<typeof setRegistrationAC>
    | ReturnType<typeof setRedirectProfileAC>
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>
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

//InitialState
const initialState: InitialStateType = {
    password: '',
    email: '',
    isRedirect: false,
}

//Reducer
export const registrationReducer = (state = initialState, actions: ActionsType): InitialStateType => {
    switch (actions.type) {
        case 'SET-REGISTRATION':
            return {...state, ...actions.regData}
        case "SET-REDIRECT-PROFILE":
            return {...state, isRedirect: actions.isRedirect}
        default:
            return state
    }
}

//Actions
export const setRegistrationAC = (regData: RegistrationRequestType) => ({type: 'SET-REGISTRATION', regData} as const)

export const setRedirectProfileAC = (isRedirect: boolean) => ({type: 'SET-REDIRECT-PROFILE', isRedirect} as const)


//Thunk
export const registrationTC = (regData: RegistrationRequestType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    registrationAPI().registration({...regData})
        .then((res) => {
            dispatch(setAppStatusAC('succeeded'))
            const dataAboutUser = res.data.addedUser
            // Если не происходит редирект после того как зарегались проблема ниже . Этот код считает длинну объекта ,всего там 10 ключей. Смотрел
            if (Object.keys(dataAboutUser).length === 10) {
                // debugger
                dispatch(setRegistrationAC({...regData}))
                dispatch(setRedirectProfileAC(true))
                dispatch(setAppStatusAC('succeeded'))
            }
        })
        .catch((error: ErrorResponseType) => {
            dispatch(setAppStatusAC('loading'))
            if (error.response.data.in === 'createUser') {
                dispatch(setAppErrorAC(error.response.data.error))
                dispatch(setAppStatusAC('failed'))
            }
            if (!error.response.data.isEmailValid) {
                dispatch(setAppErrorAC(error.response.data.error))
                dispatch(setAppStatusAC('failed'))
            }
            if (!error.response.data.isPassValid) {
                error.response.data.passwordRegExp && dispatch(setAppErrorAC(error.response.data.passwordRegExp))
                dispatch(setAppStatusAC('failed'))
            }
        })
}

