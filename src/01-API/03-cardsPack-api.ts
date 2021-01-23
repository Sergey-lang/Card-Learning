import {instance} from './api';
import {CardPacksType} from '../00-Redux/cardsPack-reducer';

export const cardPacksAPI = {
    getCardPacks(page: number, pageCount: number, packName: string = '', min: number, max: number) {
        return instance.get<GetCardPacksResponseType>(`cards/pack?page=${page}&pageCount=${pageCount}&packName=${packName}&min=${min}&max=${max}`);
    },
    createCardsPack(cardsPack: CardPacksType) {
        return instance.post('cards/pack', {cardsPack});
    },
    updateCardsPack(cardsPack: CardPacksType) {
        return instance.put('cards/pack', {cardsPack});
    },
    deleteCardsPack(id: string) {
        return instance.delete(`cards/pack?id=${id}`);
    }
}

type GetCardPacksResponseType = {
    cardPacks: CardPacksType[],
    page: number,
    pageCount: number,
    cardPacksTotalCount: number,
    minCardsCount: number,
    maxCardsCount: number,
    token: string,
    tokenDeathTime: string
}

export type UpdateCardsPackType = {
    _id: string,
    name: string
}
