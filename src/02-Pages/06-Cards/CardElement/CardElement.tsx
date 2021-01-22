import React from 'react';
import {CardType} from '../../../00-Redux/cards-reducer';

import s from './CardElement.module.css'

type CardPropsType = {
    card: CardType
    updateCard: (card: CardType) => void
    removeCard: (id: string) => void
}

const CardElement: React.FC<CardPropsType> = (
    {
        card, updateCard, removeCard
    }) => {

    const onUpdateHandler = () => {
        updateCard({
            cardsPack_id: card.cardsPack_id,
            _id: card._id,
            question: 'new cart Ozz-z-z',
        })
    }

    const onRemoveHandler = () => {
        removeCard(card._id)
    }

    return (
        <div className={s.wrapper}>
            <div>{card.user_id}</div>
            <div>{card.question ? card.question : 'empty'}</div>
            <div>{card.created}</div>
            <button onClick={onUpdateHandler}>Update</button>
            <button onClick={onRemoveHandler}>Delete</button>
        </div>
    )
}

export default CardElement