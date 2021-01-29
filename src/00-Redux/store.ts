import {applyMiddleware, combineReducers, createStore} from 'redux';
import {loginReducer} from './login-reducer';
import {registrationReducer} from './registration-reducer';
import {profileReducer} from './profile-reducer';
import {appStateReducer} from './appState-reducer';
import {cardPacksReducer} from './card-packs-reducer';
import {cardsReducer} from './cards-reducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    login: loginReducer,
    registration: registrationReducer,
    profile: profileReducer,
    app: appStateReducer,
    cardsPack: cardPacksReducer,
    cards: cardsReducer,
})

export type RootStateType = ReturnType<typeof rootReducer>

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export let store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))