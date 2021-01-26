import React, {ChangeEvent, useState} from 'react';
import {CardType} from '../../../00-Redux/cards-reducer';
import s from './CardElement.module.css'
import ModalWindow from '../../../03-Components/SuperComponents/Modal/Modal';

type CardPropsType = {
    card: CardType
    updateCard: (card: CardType) => void
    removeCard: (id: string) => void
}

const CardElement: React.FC<CardPropsType> = (
    {
        card, updateCard, removeCard
    }) => {

    //for modal
    const [activeModalDelete, setActiveModalDelete] = useState<boolean>(false)
    const [activeModalUpdate, setActiveModalUpdate] = useState<boolean>(false)
    const [questionCard, setQuestionCard] = useState<string>(card.question)
    const [answerCard, setAnswerCard] = useState<string>(card.answer)

    //for delete
    const deleteModalHandlerYes = () => {
        removeCard(card._id)
    }
    const deleteModalHandlerNo = () => {
        setActiveModalDelete(false)
    }
    //for update
    const updateModalHandler = () => {
        updateCard({
            _id: card._id,
            type: 'Java',
            question: questionCard,
            answer: answerCard,
            cardsPack_id: card.cardsPack_id,
            grade: 4.54654,
            rating:0
        })
        setActiveModalUpdate(false)
    }
    const handlerForUpdateQuestionCard = (e: ChangeEvent<HTMLInputElement>) => {
        setQuestionCard(e.currentTarget.value)

    }
    const handlerForUpdateAnswerCard = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswerCard(e.currentTarget.value)

    }
    const updateModalHandlerCancel = () => {
        setActiveModalUpdate(false)
    }

    const onUpdateHandler = () => {
        setActiveModalUpdate(true)
    }

    const onRemoveHandler = () => {
        setActiveModalDelete(true)
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

            <ModalWindow active={activeModalDelete} setActive={setActiveModalDelete}>
                <p>Are you sure?</p>
                <button onClick={deleteModalHandlerYes}>Yes</button>
                <button onClick={deleteModalHandlerNo}>No</button>
            </ModalWindow>

            <ModalWindow active={activeModalUpdate} setActive={setActiveModalUpdate}>
                <p>Here You can do some changes</p>
                <input type={'text'} onChange={handlerForUpdateQuestionCard}/>
                <input type={'text'} onChange={handlerForUpdateAnswerCard}/>
                <button onClick={updateModalHandler}>Update</button>
                <button onClick={updateModalHandlerCancel}>Cancel</button>
            </ModalWindow>

        </div>
    )
}

export default CardElement