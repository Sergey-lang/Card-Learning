import {RootStateType} from '../../04-App/store';

export const selectorCardPacks = (state: RootStateType) => state.cardPacks.cardPacks
export const selectorFilter = (state: RootStateType) => state.cardPacks.filter
export const selectorPacksTotalCount = (state: RootStateType) => state.cardPacks.packsTotalCount
export const selectorCurrentPage = (state: RootStateType) => state.cardPacks.currentPage
export const selectorPageSize = (state: RootStateType) => state.cardPacks.pageSize
export const selectorEditMode = (state: RootStateType) => state.cardPacks.showAll
