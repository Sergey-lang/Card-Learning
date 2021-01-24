import {Dispatch} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {RootStateType} from '../04-App/store';
import {cardPacksAPI} from '../01-API/03-cardsPack-api';
import {setAppStatus} from './appState-reducer';

type ActionsType = ReturnType<typeof setCardPacks>
    | ReturnType<typeof setFilter>
    | ReturnType<typeof setAppStatus>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setPacksTotalCount>
    | ReturnType<typeof createCardPacks>
    | ReturnType<typeof showMode>

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
    userId: string,
}

const initialState = {
    cardPacks: [] as CardPacksType[],
    currentPage: 1 as number,
    pageSize: 10 as number,
    packsTotalCount: 5 as number,
    showAll: false as boolean,
    filter: {
        packName: '',
        min: 0,
        max: 15,
        userId: '' ,
    } as CardPacksFilterType
} as const

export type CardsPackInitialStateType = typeof initialState

export const cardPacksReducer = (state = initialState, actions: ActionsType): CardsPackInitialStateType => {
    switch (actions.type) {
        case 'CARDS/CARD-PACKS/SET-CURRENT-PAGE':
            return {...state, currentPage: actions.currentPage};
        case 'CARDS/CARD-PACKS/SET-PACKS-TOTAL-COUNT':
            return {...state, packsTotalCount: actions.packsTotalCount};
        case 'CARDS/CARD-PACKS/SET-FILTER':
            return {...state, filter: actions.filter}
        case 'CARDS/CARD-PACKS/SET-SHOW-MODE':
            return {...state, showAll: actions.value}
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
export const setCurrentPage = (currentPage: number) => ({
    type: 'CARDS/CARD-PACKS/SET-CURRENT-PAGE',
    currentPage
} as const)
export const setPacksTotalCount = (packsTotalCount: number) => ({
    type: 'CARDS/CARD-PACKS/SET-PACKS-TOTAL-COUNT',
    packsTotalCount
} as const)
export const setFilter = (filter: CardPacksFilterType) => ({
    type: 'CARDS/CARD-PACKS/SET-FILTER', filter
} as const)
export const showMode = (value: boolean) => ({
    type: 'CARDS/CARD-PACKS/SET-SHOW-MODE', value
} as const)

//Thunks
export const getCardPacks = (requestPage: number, pageSize: number, filter: CardPacksFilterType) => (dispatch: Dispatch<ActionsType>) => {

    dispatch(setCurrentPage(requestPage))
    dispatch(setFilter(filter))
    dispatch(setAppStatus({status: 'loading', error: null}))

    cardPacksAPI.getCardPacks(requestPage, pageSize, filter.packName, filter.min, filter.max, filter.userId)
        .then((res) => {
            dispatch(setAppStatus({status: 'succeeded', error: null}))
            dispatch(setCardPacks(res.data.cardPacks))
            dispatch(setPacksTotalCount(res.data.cardPacksTotalCount))
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            dispatch(setAppStatus({status: 'failed', error: error}))
        })
}

export const addCardPacks = (cardPacks: CardPacksType) => (dispatch: ThunkDispatch<RootStateType, unknown, ActionsType>, getState: () => RootStateType) => {

    const requestPage = getState().cardsPack.currentPage
    const pageSize = getState().cardsPack.pageSize
    const filter = getState().cardsPack.filter
    dispatch(setAppStatus({status: 'loading', error: null}))

    cardPacksAPI.createCardsPack(cardPacks)
        .then((res) => {
            dispatch(setAppStatus({status: 'succeeded', error: null}))
            dispatch(getCardPacks(requestPage, pageSize, filter))
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            dispatch(setAppStatus({status: 'failed', error: error}))
        })
}

export const updateCardPacks = (cardsPack: CardPacksType) => (dispatch: ThunkDispatch<RootStateType, unknown, ActionsType>, getState: () => RootStateType) => {

    const requestPage = getState().cardsPack.currentPage
    const pageSize = getState().cardsPack.pageSize
    const filter = getState().cardsPack.filter
    dispatch(setAppStatus({status: 'loading', error: null}))

    cardPacksAPI.updateCardsPack(cardsPack)
        .then(res => {
            dispatch(setAppStatus({status: 'succeeded', error: null}))
            dispatch(getCardPacks(requestPage, pageSize, filter))
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            dispatch(setAppStatus({status: 'failed', error: error}))
        })
}

export const deleteCardPacks = (id: string) => (dispatch: ThunkDispatch<RootStateType, unknown, ActionsType>, getState: () => RootStateType) => {

    const requestPage = getState().cardsPack.currentPage
    const pageSize = getState().cardsPack.pageSize
    const filter = getState().cardsPack.filter
    dispatch(setAppStatus({status: 'loading', error: null}))

    cardPacksAPI.deleteCardsPack(id)
        .then(res => {
            dispatch(setAppStatus({status: 'succeeded', error: null}))
            dispatch(getCardPacks(requestPage, pageSize, filter))
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            dispatch(setAppStatus({status: 'failed', error: error}))
        })
}