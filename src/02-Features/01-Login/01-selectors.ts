import {RootStateType} from '../../04-App/store';

export const selectorIsAuth = (state: RootStateType) => state.auth.isLoggedIn
export const selectorUserData = (state: RootStateType) => state.auth.user
export const selectorUserId = (state: RootStateType) => state.auth.user._id
