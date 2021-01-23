import {Dispatch} from 'redux';
import {cardPacksAPI} from '../../01-API/03-cardsPack-api';
import {CardPacksFilterType, CardPacksType} from '../../00-Redux/cardsPack-reducer';

type ActionsType =
    ReturnType<typeof setCardPacks> |
    ReturnType<typeof setCurrentPage> |
    ReturnType<typeof setPacksTotalCount> |
    ReturnType<typeof setFilter>

const initialState = {
    cardPacks: [] as CardPacksType[],
    currentPage: 1 as number,
    pageSize: 10 as number,
    packsTotalCount: 5 as number,
    filter: {
        packName: '',
        min: 0,
        max: 15,
    } as CardPacksFilterType
} as const

export type LearningPackInitialStateType = typeof initialState

export const learningPacksReducer = (state = initialState, actions: ActionsType): LearningPackInitialStateType => {
    switch (actions.type) {
        case 'CARDS/LEARNING/SET-CURRENT-PAGE':
            return {...state, currentPage: actions.currentPage};
        case 'CARDS/LEARNING/SET-PACKS-TOTAL-COUNT':
            return {...state, packsTotalCount: actions.packsTotalCount};
        case 'CARDS/LEARNING/SET-FILTER':
            return {...state, filter: actions.payload.filter}


        case 'CARDS/LEARNING/SET-PACKS':
            return {...state, cardPacks: actions.cardPacks}
        default:
            return state
    }
}

//Actions
export const setCardPacks = (cardPacks: CardPacksType[]) => ({type: 'CARDS/LEARNING/SET-PACKS', cardPacks} as const)

export const setCurrentPage = (currentPage: number) => ({
    type: 'CARDS/LEARNING/SET-CURRENT-PAGE',
    currentPage
} as const)

export const setPacksTotalCount = (packsTotalCount: number) => ({
    type: 'CARDS/LEARNING/SET-PACKS-TOTAL-COUNT',
    packsTotalCount
} as const)

export const setFilter = (filter: CardPacksFilterType) => ({
    type: 'CARDS/LEARNING/SET-FILTER', payload: {
        filter
    }
} as const)


//Thunks
export const getLearningPacks = (requestPage: number, pageSize: number, filter: CardPacksFilterType) => (dispatch: Dispatch<ActionsType>) => {

    dispatch(setCurrentPage(requestPage))
    dispatch(setFilter(filter))

    cardPacksAPI.getCardPacks(requestPage, pageSize, filter.packName, filter.min, filter.max)
        .then((res) => {

            dispatch(setCardPacks(res.data.cardPacks))
            dispatch(setPacksTotalCount(res.data.cardPacksTotalCount))
        })
}