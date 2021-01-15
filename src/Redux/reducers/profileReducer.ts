const initialState: InitialStateType = {}

export const profileReducer = (state = initialState, actions: ActionsType): InitialStateType => {
    switch (actions.type) {
        case '':
            return state
        default:
            return state
    }
}

//Actions
export const profileAC = () => ({type:''} as const )

//Types
type ActionsType = ReturnType<typeof profileAC>

type InitialStateType = {}
