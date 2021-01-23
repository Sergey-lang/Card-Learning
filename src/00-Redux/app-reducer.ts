//Types
type ActionsType = ReturnType<typeof setAppStatusAC> | ReturnType<typeof setAppErrorAC>
type InitialStateType = {
    statusResponse: RequestStatusType
    error: string | null
}
export type RequestStatusType =  'idle' | 'loading' | 'succeeded' | 'failed'

//InitialState
const initialState: InitialStateType = {
    statusResponse: 'idle',
    error: null
}

export const appReducer = (state = initialState, actions: ActionsType): InitialStateType => {
    switch (actions.type) {
        case 'SET-APP-STATUS':
            return {...state, statusResponse: actions.status}
        case "SET-APP-ERROR":
            return {...state, error: actions.error}
        default:
            return state
    }
}

//Actions
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'SET-APP-STATUS', status} as const)

export const setAppErrorAC = (error: string | null) => ({type: 'SET-APP-ERROR', error} as const)

//test comit