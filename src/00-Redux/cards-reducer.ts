import {Dispatch} from 'redux';
import {cardsAPI} from '../01-API/04-cards-api';
import {ThunkDispatch} from 'redux-thunk';
import {RootStateType} from '../04-App/store';
import {setAppStatus} from './appState-reducer';

type ActionsType = ReturnType<typeof setCards>
    | ReturnType<typeof setFilter>
    | ReturnType<typeof setAppStatus>
    | ReturnType<typeof createCard>

export type CardType = {
    answer: string,
    question: string,
    cardsPack_id: string,
    grade: number,
    rating: number,
    shots?: number,
    type: string,
    user_id?: string,
    created?: string,
    updated?: string,
    __v?: 0,
    _id: string,
}

export type CardsFilterType = {
    packName: string
    min: number
    max: number
}

const initialState = {
    cards: [] as CardType[],
    page: 1,
    pageCount: 3,
    cardsTotalCount: 5,
    packUserId: '',
    filter: {
        packName: '',
        min: 0,
        max: 15,
    } as CardsFilterType
} as const

export type CardsInitialStateType = typeof initialState

export const cardsReducer = (state = initialState, actions: ActionsType): CardsInitialStateType => {
    switch (actions.type) {
        case 'CARDS/CARDS/SET-FILTER':
            return {...state, filter: actions.payload.filter}
        case 'CARDS/CARDS/SET-CARDS':
            return {...state, cards: actions.cards}
        case 'CARDS/CARDS/ADD-CARD':
            return {...state, cards: [actions.newCard, ...state.cards]}
        default:
            return state
    }
}

//Actions
export const setCards = (cards: CardType[]) => ({type: 'CARDS/CARDS/SET-CARDS', cards} as const)

export const createCard = (newCard: CardType) => ({type: 'CARDS/CARDS/ADD-CARD', newCard} as const)

export const setFilter = (filter: CardsFilterType) => ({
    type: 'CARDS/CARDS/SET-FILTER', payload: {
        filter
    }
} as const)

//Thunks
export const getCards = (cardsPackId: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatus({status: 'loading', error: null}))
    cardsAPI.getCards(cardsPackId)
        .then(res => {
            dispatch(setAppStatus({status: 'succeeded', error: null}))
            dispatch(setCards(res.data.cards))
        })
}

export const addCard = (card: CardType) => (dispatch: ThunkDispatch<RootStateType, unknown, ActionsType>) => {
    dispatch(setAppStatus({status: 'loading', error: null}))
    cardsAPI.createCard(card)
        .then(res => {
            dispatch(setAppStatus({status: 'succeeded', error: null}))
            dispatch(getCards(card.cardsPack_id))
            console.log(card)
        })
}

export const updateCard = (card: CardType) => (dispatch: ThunkDispatch<RootStateType, unknown, ActionsType>) => {
    dispatch(setAppStatus({status: 'loading', error: null}))
    cardsAPI.updateCard(card)
        .then(res => {
            dispatch(setAppStatus({status: 'succeeded', error: null}))
            const packId = res.data.updatedCard.cardsPack_id
            dispatch(getCards(packId))
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console')
            console.log(error)
        })
}

export const deleteCard = (id: string) => (dispatch: ThunkDispatch<RootStateType, unknown, ActionsType>) => {
    dispatch(setAppStatus({status: 'loading', error: null}))
    cardsAPI.deleteCard(id)
        .then(res => {
            dispatch(setAppStatus({status: 'succeeded', error: null}))
            const packId = res.data.deletedCard.cardsPack_id
            dispatch(getCards(packId))
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console')
            console.log(error)
        })
}

export const sendGrade = (grade: number, card_id: string) => (dispatch: ThunkDispatch<RootStateType, unknown, ActionsType>) => {
    dispatch(setAppStatus({status: 'loading', error: null}))
    cardsAPI.sendGrade(grade, card_id)
        .then(res => {
            dispatch(setAppStatus({status: 'succeeded', error: 'Отправлено'}))
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console')
            dispatch(setAppStatus({status: 'succeeded', error: error}))
        })
}