import {RootStateType} from './store';

export const selectorError = (state: RootStateType) => state.app.appState.error
export const selectorAppStatus = (state: RootStateType) => state.app.appState.status
