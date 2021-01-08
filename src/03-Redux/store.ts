import {Action, applyMiddleware, combineReducers, compose, createStore} from 'redux'
import thunkMiddleware, {ThunkAction} from 'redux-thunk'
import {loginReducer} from "../02-Pages/00-Login/Login-reducer";
import {registrationReducer} from "../02-Pages/01-Registration/Registration-reducer";
import {profileReducer} from "../02-Pages/02-Profile/Profile-reducer";
import {passwordRecoveryReducer} from "../02-Pages/04-PasswordRecovery/PasswordRecovery-reducer";
import {createNewPasswordReducer} from "../02-Pages/05-CreateNewPassword/CreateNewPassword-reduer";

const rootReducer = combineReducers({
    login: loginReducer,
    register: registrationReducer,
    profile: profileReducer,
    passwordRecovery: passwordRecoveryReducer,
    createPassword: createNewPasswordReducer,
})

export type AppStateType = ReturnType<typeof rootReducer>

//Action Creator type
type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never
export type InferActionsTypes<T extends { [key: string]: (...args: any) => any }> = ReturnType<PropertiesTypes<T>>

//Thunk Type
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

//@ts-ignore tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export let store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

