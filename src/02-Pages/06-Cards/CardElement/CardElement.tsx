import React, {useState} from 'react';
import {CardType} from '../../../00-Redux/cards-reducer';
import s from './CardElement.module.css'
import ModalForDelete from '../../../03-Components/SuperComponents/Modal/ModalForCards/ModalForDelete';
import ModalForUpdateCard from '../../../03-Components/SuperComponents/Modal/ModalForCards/ModalForUpdateCard';

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
    const [questionCard, setQuestionCard] = useState<string>('')
    const [answerCard, setAnswerCard] = useState<string>('')

    //for delete
    const deleteModalHandlerYes = () => {
        removeCard(card._id)
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
            rating: 0
        })
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

            <ModalForDelete active={activeModalDelete} setActive={setActiveModalDelete}
                            deleteModalHandlerYes={deleteModalHandlerYes}/>

            <ModalForUpdateCard active={activeModalUpdate} setActive={setActiveModalUpdate}
                                setQuestionCard={setQuestionCard} setAnswerCard={setAnswerCard}
                                updateModalHandler={updateModalHandler}/>
        </div>
    )
}

export default CardElement