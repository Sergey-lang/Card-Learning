import {ThunkDispatch} from 'redux-thunk';
import {RootStateType} from './store';
import {getAuthUserData} from '../02-Features/01-Login/auth-reducer';

type ActionsType = ReturnType<typeof setAppStatus> | ReturnType<typeof initializedSuccess>

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    initializedSuccess: false,
    appState: {
        status: 'idle',
        error: null as string | null
    } as AppState
}

export type AppState = {
    status: RequestStatusType,
    error: null | string
}

type AppInitialStateType = typeof initialState

export const appReducer = (state: AppInitialStateType = initialState, actions: ActionsType): AppInitialStateType => {
    switch (actions.type) {
        case 'CARDS/APP/SET-APP-STATUS':
            return {...state, appState: actions.state}
        case 'CARDS/APP/INITIALIZED_SUCCESS': {
            return {...state, initializedSuccess: true}
        }
        default:
            return state
    }
}

export const setAppStatus = (state: AppState) => ({
    type: 'CARDS/APP/SET-APP-STATUS', state
} as const)

export const initializedSuccess = () => ({
    type: 'CARDS/APP/INITIALIZED_SUCCESS'
} as const)

export const initializeApp = () => async (dispatch: ThunkDispatch<RootStateType, unknown, ActionsType>) => {
    try {
        await dispatch(getAuthUserData())
        dispatch(initializedSuccess)
    } catch (e) {
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
        dispatch(setAppStatus({status: 'failed', error: error}))
    }
}
