import {applyMiddleware, combineReducers, createStore} from 'redux';
import {authReducer} from '../02-Features/01-Login/auth-reducer';
import {registrationReducer} from '../02-Features/02-Registration/registration-reducer';
import {appReducer} from './app-reducer';
import {cardsReducer} from '../02-Features/06-Cards/cards-reducer';
import thunk from 'redux-thunk';
import {cardPacksReducer} from '../02-Features/05-CardPacks/cardPacks-reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    registration: registrationReducer,
    app: appReducer,
    cardPacks: cardPacksReducer,
    cards: cardsReducer,
})

export type RootStateType = ReturnType<typeof rootReducer>

export let store = createStore(rootReducer, applyMiddleware(thunk))

//@ts-ignore
window.store = store
