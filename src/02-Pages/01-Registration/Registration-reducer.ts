import {BaseThunkType, InferActionsTypes} from '../../03-Redux/store'

let initializeState = {

}

export type InitializeStateType = typeof initializeState
//type ActionsType = InferActionsTypes<typeof > //actions todo: add action object
//type ThunkType = BaseThunkType<ActionsType>//


export const registrationReducer = (state: InitializeStateType = initializeState, action: any): InitializeStateType => {
   switch (action.type) {

      default:
         return state
   }
}


