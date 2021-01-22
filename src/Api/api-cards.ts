import {instance} from './api';
import {CardType} from '../Redux/reducers/cardsReducer';

export const cardsAPI = {
    getCards(cardsPack_id: string) {
        return instance.get(`cards/card/?id=${cardsPack_id}`)
    },

    createCard(card: CardType) {
        return instance.post('cards/card', {card});
    },
    // deleteCard(cardId: string) {
    //     return instance.delete(`cards/card/?id=${cardId}`);
    // },
    // updateCard(card: UpdateCardModel) {
    //     return instance.put('cards/card', {card});
    // },

}

