import {Dispatch} from 'redux';
import {cardPacksAPI} from '../01-API/03-cardsPack-api';
import {setAppStatusAC} from './app-reducer';
import {ThunkDispatch} from 'redux-thunk';
import {RootStateType} from '../04-App/store';
import {queryParamsType} from '../02-Pages/05-CardPacks/CardPacks';

type ActionsType =
    ReturnType<typeof setCardPacks> |
    ReturnType<typeof setFilter> |
    ReturnType<typeof setAppStatusAC> |
    ReturnType<typeof createCardPacks>

export type CardPacksType = {
    _id: string
    user_id?: string
    user_name?: string
    private?: boolean
    name: string
    path?: string
    grade?: number
    shots?: number
    cardsCount?: number | undefined
    type: string
    rating?: number
    created?: string | undefined
    updated?: string
    more_id?: string
    __v?: number
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
        min: 0,
        max: 15,
    } as CardPacksFilterType
} as const

export type CardsPackInitialStateType = typeof initialState

export const cardsPackReducer = (state = initialState, actions: ActionsType): CardsPackInitialStateType => {
    switch (actions.type) {
        case 'CARDS/CARD-PACKS/SET-FILTER':
            return {...state, filter: actions.payload.filter}
        case 'CARDS/CARD-PACKS/SET-CARDS':
            return {...state, cardPacks: actions.cardPacks}
        case 'CARDS/CARD-PACKS/ADD-CARDS':
            return {...state, cardPacks: [actions.newPacks, ...state.cardPacks]}
        default:
            return state
    }
}

//Actions
export const setCardPacks = (cardPacks: CardPacksType[]) => ({type: 'CARDS/CARD-PACKS/SET-CARDS', cardPacks} as const)

export const createCardPacks = (newPacks: CardPacksType) => ({type: 'CARDS/CARD-PACKS/ADD-CARDS', newPacks} as const)

export const setFilter = (filter: CardPacksFilterType) => ({
    type: 'CARDS/CARD-PACKS/SET-FILTER', payload: {
        filter
    }
} as const)

//Thunks
export const getCardPacks = (queryObj: queryParamsType) => (dispatch: Dispatch<ActionsType>) => {
    const {packName, min, max} = queryObj
    cardPacksAPI.getCardPacks(packName, min, max)
        .then((res) => {
            dispatch(setCardPacks(res.data.cardPacks))
        })
}

export const addCardPacks = (cardPacks: CardPacksType) => (dispatch: ThunkDispatch<RootStateType, unknown, ActionsType>, getState: () => RootStateType) => {

    const filter = getState().cardsPack.filter

    cardPacksAPI.createCardsPack(cardPacks)
        .then((res) => {
            dispatch(getCardPacks(filter))
        })
}

export const updateCardPacks = (cardsPack: CardPacksType) => (dispatch: ThunkDispatch<RootStateType, unknown, ActionsType>, getState: () => RootStateType) => {

    const filter = getState().cardsPack.filter

    cardPacksAPI.updateCardsPack(cardsPack)
        .then(res => {
            dispatch(getCardPacks(filter))
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console')
            console.log(error)
        })
}

export const deleteCardPacks = (id: string) => (dispatch: ThunkDispatch<RootStateType, unknown, ActionsType>, getState: () => RootStateType) => {

    const filter = getState().cardsPack.filter

    cardPacksAPI.deleteCardsPack(id)
        .then(res => {
            dispatch(getCardPacks(filter))
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console')
            console.log(error)
        })
}