import {instance} from './api';

export type CardsType = {
    _id: string
    user_id: string
    name: string
    path: string // папка
    cardsCount: number
    grade: number // средняя оценка карточек
    shots: number // количество попыток
    rating: number // лайки
    type: string // ещё будет "folder" (папка)
    created: string
    updated: string
    __v: number
}

type CardsPackTypeShort = {
    name: string // если не отправить будет таким "no Name"
    private: boolean // если не отправить будет такой false
    type: string // если не отправить будет таким "pack"
}

type GetCartsResponseType = {
    carts: CardsType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string //id юзера создавшего данную колоду
}

export const APIсards = {
    getCards(cardsPackId: string, lang?: string, question?: string, min?: number, max?: number, sortCards?: string, page?: number, pageCount?: number) {
        return instance.get(`cards/card/?cardAnswer=${lang}&cardQuestion=${question}&cardsPack_id=${cardsPackId}&min=${min}&max=${max}&sortCards=${sortCards}&page=${page}&pageCount=${pageCount}`);
    },

    addCard(card: AddCardModel) {
        return instance.post('cards/card', {card});
    },
    deleteCard(cardId: string) {
        return instance.delete(`cards/card/?id=${cardId}`);
    },
    updateCard(card: UpdateCardModel) {
        return instance.put('cards/card', {card});
    },

}

type UpdateCardModel = { id: string, question?: string, comments?: string }
type AddCardModel = {
    cardsPack_id: string,
    question?: string,
    answer?: string,
    grade?: number,
    shots?: number,
    rating?: 0,
    answerImg?: string,
    questionImg?: string
    questionVideo?: string,
    answerVideo?: string,
    type?: string
}
