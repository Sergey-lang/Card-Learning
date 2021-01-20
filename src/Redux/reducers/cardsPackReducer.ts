import {Dispatch} from 'redux';
import {cardPacksAPI, CreateCardsPackType} from '../../Api/api-cardsPack';

type ActionsType = ReturnType<typeof setCardPacksAC> | ReturnType<typeof setFilter>

export type CardPacksType = {
    _id: string
    user_id: string
    user_name: string
    private: boolean
    name: string
    path: string
    grade: number
    shots: number
    cardsCount: number
    type: string
    rating: number
    created: string
    updated: string
    more_id: string
    __v: number
}

export type CardPacksFilterType = {
    packName: string
    min: number
    max: number
}

const initialState = {
    cardPacks: [] as CardPacksType[],
    page: 1,
    pageCount: 3,
    cardPacksTotalCount: 5,
    filter: {
        packName: '',
        min: 3,
        max: 5,
    } as CardPacksFilterType
    // token: '',
    // tokenDeathTime: ''
} as const

export type CardsPackInitialStateType = typeof initialState

export const cardsPackReducer = (state = initialState, actions: ActionsType): CardsPackInitialStateType => {
    switch (actions.type) {
        case 'SET-CARDS':
            return {...state, cardPacks: actions.cardPacks}
        case 'SET-FILTER':
            return {...state, filter: actions.payload.filter}
        default:
            return state
    }
}

//Actions
export const setCardPacksAC = (cardPacks: CardPacksType[]) => ({type: 'SET-CARDS', cardPacks} as const)
export const addCardPacksAC = (cardPacks: CardPacksType) => ({type: 'ADD-CARDS', cardPacks} as const)
export const setFilter = (filter: CardPacksFilterType) => ({
    type: 'SET-FILTER', payload: {
        filter
    }
} as const)

//Thunks
export const getCardPacks = (filter: CardPacksFilterType, page?: number, pageCount?: number) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setFilter(filter))
    cardPacksAPI.getCardPacks(filter, page, pageCount)
        .then((res) => {

            const cardsPackArray = res.data.cardPacks

            dispatch(setCardPacksAC(cardsPackArray))
            console.log(cardsPackArray)
        })
}

export const addCardPacks = (cardPacks: CreateCardsPackType) => (dispatch: Dispatch<ActionsType>) => {
    cardPacksAPI.createCardsPack(cardPacks)
        .then((res) => {
debugger
            const cardsPackArray = res.data.cardPacks

            dispatch(setCardPacksAC(cardsPackArray))
            console.log(cardsPackArray)
        })
}