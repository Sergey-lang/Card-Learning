import {applyMiddleware, combineReducers, createStore} from 'redux';
import {loginReducer} from '../00-Redux/login-reducer';
import {registrationReducer} from '../00-Redux/registration-reducer';
import {profileReducer} from '../00-Redux/profile-reducer';
import thunk from 'redux-thunk';
import {appReducer} from '../00-Redux/app-reducer';
import {cardsPackReducer} from '../00-Redux/cardsPack-reducer';
import {cardsReducer} from '../00-Redux/cards-reducer';

const rootReducer = combineReducers({
    login: loginReducer,
    registration: registrationReducer,
    profile: profileReducer,
    app: appReducer,
    cardsPack: cardsPackReducer,
    cards: cardsReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type RootStateType = ReturnType<typeof rootReducer>