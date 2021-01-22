import {Dispatch} from 'redux';
import {setAppStatusAC} from './appReducer';
import {cardsAPI} from '../../Api/api-cards';

type ActionsType =
    ReturnType<typeof setCards> |
    ReturnType<typeof setFilter> |
    ReturnType<typeof setAppStatusAC> |
    ReturnType<typeof createCard>

export type CardType = {
    answer?: string,
    question?: string,
    cardsPack_id: string,
    grade?: null,
    rating?: number,
    shots?: number,
    type?: string,
    user_id?: string,
    created?: string,
    updated?: string,
    __v?: 0,
    _id?: string,
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
        case 'CARDS/CARDS/SET-CARDS':
            return {...state, cards: actions.cards}
        case 'CARDS/CARDS/SET-FILTER':
            return {...state, filter: actions.payload.filter}
        case 'CARDS/CARDS/ADD-CARDS':
            return {...state, cards: [actions.newCard, ...state.cards]}
        default:
            return state
    }
}

//Actions
export const setCards = (cards: CardType[]) => ({type: 'CARDS/CARDS/SET-CARDS', cards} as const)

export const createCard = (newCard: CardType) => ({type: 'CARDS/CARDS/ADD-CARDS', newCard} as const)

export const setFilter = (filter: CardsFilterType) => ({
    type: 'CARDS/CARDS/SET-FILTER', payload: {
        filter
    }
} as const)

//Thunks
// @ts-ignore
export const getCards = (filter?: CardsFilterType, id: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setFilter(filter!))
    cardsAPI.getCards(id)
        .then((res) => {
            const cardsArray = res.data.cardPacks
            dispatch(setCards(cardsArray))
        })
}

export const addCard = (card: CardType) => (dispatch: Dispatch<ActionsType>) => {
    cardsAPI.createCard(card)
        .then((res) => {
            dispatch(createCard(card))
            console.log(card)
        })
}