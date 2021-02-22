import {Dispatch} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {setAppStatus} from '../../04-App/app-reducer';
import {cardPacksAPI} from '../../01-API/03-cardsPack-api';
import {RootStateType} from '../../04-App/store';

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
    currentPage: 1,
    pageSize: 10,
    packsTotalCount: 5,
    showAll: false,
    filter: {
        packName: '',
        min: 0,
        max: 15,
        userId: '',
    } as CardPacksFilterType
}

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

export const getCardPacks = (requestPage: number, pageSize: number, filter: CardPacksFilterType) => async (dispatch: Dispatch<ActionsType>) => {

    dispatch(setCurrentPage(requestPage))
    dispatch(setFilter(filter))
    dispatch(setAppStatus({status: 'loading', error: null}))

    try {
        const res = await cardPacksAPI.getCardPacks(requestPage, pageSize, filter.packName, filter.min, filter.max, filter.userId)
        dispatch(setAppStatus({status: 'succeeded', error: null}))
        dispatch(setCardPacks(res.data.cardPacks))
        dispatch(setPacksTotalCount(res.data.cardPacksTotalCount))
    } catch (e) {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        dispatch(setAppStatus({status: 'failed', error: error}))
    }
}

export const addCardPacks = (cardPacks: CardPacksType) => async (dispatch: ThunkDispatch<RootStateType, unknown, ActionsType>, getState: () => RootStateType) => {

    const requestPage = getState().cardPacks.currentPage
    const pageSize = getState().cardPacks.pageSize
    const filter = getState().cardPacks.filter
    dispatch(setAppStatus({status: 'loading', error: null}))

    try {
        await cardPacksAPI.createCardsPack(cardPacks)
        dispatch(setAppStatus({status: 'succeeded', error: null}))
        dispatch(getCardPacks(requestPage, pageSize, filter))
    } catch (e) {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        dispatch(setAppStatus({status: 'failed', error: error}))
    }
}

export const updateCardPacks = (cardsPack: CardPacksType) => async (dispatch: ThunkDispatch<RootStateType, unknown, ActionsType>, getState: () => RootStateType) => {

    const requestPage = getState().cardPacks.currentPage
    const pageSize = getState().cardPacks.pageSize
    const filter = getState().cardPacks.filter
    dispatch(setAppStatus({status: 'loading', error: null}))

    try {
        await cardPacksAPI.updateCardsPack(cardsPack)
        dispatch(setAppStatus({status: 'succeeded', error: null}))
        dispatch(getCardPacks(requestPage, pageSize, filter))
    } catch (e) {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        dispatch(setAppStatus({status: 'failed', error: error}))
    }
}

export const deleteCardPacks = (id: string) => async (dispatch: ThunkDispatch<RootStateType, unknown, ActionsType>, getState: () => RootStateType) => {

    const requestPage = getState().cardPacks.currentPage
    const pageSize = getState().cardPacks.pageSize
    const filter = getState().cardPacks.filter
    dispatch(setAppStatus({status: 'loading', error: null}))

    const res = await cardPacksAPI.deleteCardsPack(id)
    try {
        dispatch(setAppStatus({status: 'succeeded', error: null}))
        dispatch(getCardPacks(requestPage, pageSize, filter))
    } catch (e) {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        dispatch(setAppStatus({status: 'failed', error: error}))
    }
}
