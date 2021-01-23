import {applyMiddleware, combineReducers, createStore} from 'redux';
import {loginReducer} from '../00-Redux/login-reducer';
import {registrationReducer} from '../00-Redux/registration-reducer';
import {profileReducer} from '../00-Redux/profile-reducer';
import {appReducer} from '../00-Redux/app-reducer';
import {cardsPackReducer} from '../00-Redux/cardsPack-reducer';
import {cardsReducer} from '../00-Redux/cards-reducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    login: loginReducer,
    registration: registrationReducer,
    profile: profileReducer,
    app: appReducer,
    cardsPack: cardsPackReducer,
    cards: cardsReducer,
})

export type RootStateType = ReturnType<typeof rootReducer>

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export let store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))