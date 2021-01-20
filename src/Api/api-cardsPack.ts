import {instance} from './api';
import {CardPacksFilterType, CardPacksType} from '../Redux/reducers/cardsPackReducer';

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

export type CreateCardsPackType = {
    name: string // если не отправить будет таким "no Name"
    private?: boolean // если не отправить будет такой false
    type: string // если не отправить будет таким "pack"
}

export type UpdateCardsPackType = {
    _id: string,
    name?: string
}

export const cardPacksAPI = {
    getCardPacks(filter: CardPacksFilterType,  page: number = 1, pageCount: number = 4) {
        let {packName, min, max} = filter
        return instance.get<GetCardPacksResponseType>(`cards/pack?packName=${packName}&min=${min}&max=${max}&page=${page}&pageCount=${pageCount}`);
    },
    createCardsPack(cardPacks: CardPacksType) {
        return instance.post('cards/pack', {cardPacks});
    },
    updateCardsPack(cardPacks: UpdateCardsPackType) {
        return instance.put('cards/pack', {cardPacks});
    },
    deleteCardsPack(id: string) {
        return instance.delete(`cards/pack?id=${id}`);
    }
}