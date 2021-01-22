import {instance} from './api';
import {CardType} from '../00-Redux/cards-reducer';

export const cardsAPI = {
    getCards(id: string) {
        return instance.get<GetCardsResponseType>(`cards/card?cardsPack_id=${id ? id : ''}`)
    },

    createCard(card: CardType) {
        return instance.post('cards/card', {card});
    },

    updateCard(card: CardType) {
        return instance.put<UpdatedCardResponseType>('cards/card', {card});
    },

    deleteCard(cardId: string) {
        return instance.delete<DeleteCardResponseType>(`cards/card/?id=${cardId}`);
    },
}

type GetCardsResponseType = {
    cards: CardType[],
    page: number,
    pageCount: number,
    cardsTotalCount: number,
    packUserId: string,
}

type DeleteCardResponseType = {
    deletedCard: {
        cardsPack_id: string
    }
}

type UpdatedCardResponseType = {
    updatedCard: {
        cardsPack_id: string
    }
}
