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
            _id: card._id,
            type: 'Java',
            question: 'fake quessssstion',
            answer: `fake answerrrrr`,
            cardsPack_id: card.cardsPack_id,
            grade: 4.54654,
            rating:0
        })
    }

    const onRemoveHandler = () => {
        removeCard(card._id)
    }

    return (
        <div className={s.wrapper}>
            <div>{card.user_id}</div>
            <div>{card.question ? card.question : 'empty question'}</div>
            <div>{card.answer ? card.answer : 'empty answer'}</div>
            <div>{card.type ? card.type : 'empty type'}</div>
            <div>{card.grade}</div>
            <div>{card.created}</div>
            <button onClick={onUpdateHandler}>Update</button>
            <button onClick={onRemoveHandler}>Delete</button>
        </div>
    )
}

export default CardElement