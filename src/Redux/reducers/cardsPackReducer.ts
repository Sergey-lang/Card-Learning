import {Dispatch} from 'redux';
import {cardPacksAPI} from '../../Api/api-cardsPack';
import {setAppErrorAC, setAppStatusAC} from './appReducer';

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
    cardsCount?: number
    type: string
    rating?: number
    created?: string
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
        min: 3,
        max: 5,
    } as CardPacksFilterType
} as const

export type CardsPackInitialStateType = typeof initialState

export const cardsPackReducer = (state = initialState, actions: ActionsType): CardsPackInitialStateType => {
    switch (actions.type) {
        case 'SET-CARDS':
            return {...state, cardPacks: actions.cardPacks}
        case 'SET-FILTER':
            return {...state, filter: actions.payload.filter}
        case 'ADD-CARDS':
            return {...state, cardPacks: [...state.cardPacks, actions.newPacks]}
        default:
            return state
    }
}

//Actions
export const setCardPacks = (cardPacks: CardPacksType[]) => ({type: 'SET-CARDS', cardPacks} as const)

export const createCardPacks = (newPacks: CardPacksType) => ({type: 'ADD-CARDS', newPacks} as const)

export const setFilter = (filter: CardPacksFilterType) => ({
    type: 'SET-FILTER', payload: {
        filter
    }
} as const)

//Thunks
export const getCardPacks = (filter: CardPacksFilterType, page?: number, pageCount?: number) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setFilter(filter))
    dispatch(setAppStatusAC('loading'))
    cardPacksAPI.getCardPacks(filter, page, pageCount)
        .then((res) => {
            const cardsPackArray = res.data.cardPacks
            dispatch(setCardPacks(cardsPackArray))
            dispatch(setAppStatusAC('succeeded'))
        })
}

export const addCardPacks = (cardPacks: CardPacksType) => (dispatch: Dispatch<ActionsType>) => {
    cardPacksAPI.createCardsPack(cardPacks)
        .then((res) => {
            dispatch(createCardPacks(cardPacks))
            console.log(cardPacks)
        })
}

export const updatePack = (id: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    cardPacksAPI.updateCardsPack({_id: id})
        .then(res => {
            const cardsPackArray = res.data
            console.log(cardsPackArray)
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            console.log(error)
            dispatch(setAppErrorAC(error))
            dispatch(setAppStatusAC('failed'))
        })
}

export const deletePack = (id: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    cardPacksAPI.deleteCardsPack(id)
        .then(res => {
            const cardsPackArray = res.data
            console.log(cardsPackArray)
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            dispatch(setAppErrorAC(error))
            dispatch(setAppStatusAC('failed'))
        })
}