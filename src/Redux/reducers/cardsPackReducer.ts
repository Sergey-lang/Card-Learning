import {Dispatch} from 'redux';
import {cardPacksAPI, UpdateCardsPackType} from '../../Api/api-cardsPack';
import {setAppStatusAC} from './appReducer';
import {ThunkDispatch} from 'redux-thunk';
import {RootStateType} from '../store';

type ActionsType =
    ReturnType<typeof setCardPacks> |
    ReturnType<typeof setFilter> |
    ReturnType<typeof setAppStatusAC> |
    ReturnType<typeof refreshCardPacks> |
    ReturnType<typeof removeCardPacks> |
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
        case 'CARDS/CARD-PACKS/SET-CARDS':
            return {...state, cardPacks: actions.cardPacks}
        case 'CARDS/CARD-PACKS/SET-FILTER':
            return {...state, filter: actions.payload.filter}
        case 'CARDS/CARD-PACKS/ADD-CARDS':
            return {...state, cardPacks: [actions.newPacks, ...state.cardPacks]}
        case 'CARDS/CARD-PACKS/UPDATE-CARDS':
            return {
                ...state,
                cardPacks: state.cardPacks
                    .map(card => card._id === actions.cardsPack._id ? {...card, name: actions.cardsPack.name} : card
                    )
            }
        case 'CARDS/CARD-PACKS/REMOVE-CARDS':
            const id = actions.id
            return {...state, cardPacks: state.cardPacks.filter(card => card._id !== id)}
        default:
            return state
    }
}

//Actions
export const setCardPacks = (cardPacks: CardPacksType[]) => ({type: 'CARDS/CARD-PACKS/SET-CARDS', cardPacks} as const)

export const createCardPacks = (newPacks: CardPacksType) => ({type: 'CARDS/CARD-PACKS/ADD-CARDS', newPacks} as const)

export const refreshCardPacks = (cardsPack: UpdateCardsPackType) => ({
    type: 'CARDS/CARD-PACKS/UPDATE-CARDS',
    cardsPack
} as const)

export const removeCardPacks = (id: string) => ({type: 'CARDS/CARD-PACKS/REMOVE-CARDS', id} as const)

export const setFilter = (filter: CardPacksFilterType) => ({
    type: 'CARDS/CARD-PACKS/SET-FILTER', payload: {
        filter
    }
} as const)

//Thunks
export const getCardPacks = (filter?: CardPacksFilterType, page?: number, pageCount?: number) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setFilter(filter!))
    cardPacksAPI.getCardPacks(filter!, page!, pageCount!)
        .then((res) => {
            dispatch(setCardPacks(res.data.cardPacks))
        })
}

export const addCardPacks = (cardPacks: CardPacksType) => (dispatch: Dispatch<ActionsType>) => {
    cardPacksAPI.createCardsPack(cardPacks)
        .then((res) => {
            dispatch(createCardPacks(cardPacks))
        })
}

export const updateCardPacks = (cardsPack: CardPacksType) => (dispatch: ThunkDispatch<RootStateType, unknown, ActionsType>) => {
    cardPacksAPI.updateCardsPack(cardsPack)
        .then(res => {
            dispatch(refreshCardPacks(cardsPack))
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console')
            console.log(error)
        })
}

export const deleteCardPacks = (id: string) => (dispatch: ThunkDispatch<RootStateType, unknown, ActionsType>) => {
    cardPacksAPI.deleteCardsPack(id)
        .then(res => {
            dispatch(removeCardPacks(id))
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console')
            console.log(error)
        })
}