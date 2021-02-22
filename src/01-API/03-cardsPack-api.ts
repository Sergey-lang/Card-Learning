import {instance} from './api';
import {CardPacksType} from '../02-Features/05-CardPacks/cardPacks-reducer';

export const cardPacksAPI = {
    getCardPacks(page: number, pageCount: number, packName: string = '', min: number, max: number, user_id: string) {
        return instance.get<GetCardPacksResponseType>(`cards/pack?page=${page}&pageCount=${pageCount}&packName=${packName}&min=${min}&max=${max}&user_id=${user_id}`);
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
