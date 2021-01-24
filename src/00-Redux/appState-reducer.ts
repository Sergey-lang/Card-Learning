//Types
type ActionsType = ReturnType<typeof setAppStatus>

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    appState: {
        status: 'idle',
        error: null as string | null
    }
}

type AppInitialStateType = typeof initialState

export const appStateReducer = (state: AppInitialStateType = initialState, actions: ActionsType): AppInitialStateType => {
    switch (actions.type) {
        case 'CARDS/APP/SET-APP-STATUS':
            return {...state, appState: actions.state}
        default:
            return state
    }
}

export type AppState = {
    status: RequestStatusType,
    error: null | string
}

export const setAppStatus = (state: AppState) => ({
    type: 'CARDS/APP/SET-APP-STATUS', state
} as const)
