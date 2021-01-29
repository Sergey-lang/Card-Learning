import React, {useState} from 'react';
import {CardType} from '../../../00-Redux/cards-reducer';
import ModalForDelete from '../../../03-Components/SuperComponents/Modal/ModalForCards/ModalForDelete';
import ModalForUpdateCard from '../../../03-Components/SuperComponents/Modal/ModalForCards/ModalForUpdateCard';
import Button from '../../../03-Components/SuperComponents/Button/Button';
import {useSelector} from 'react-redux';

import s from './CardElement.module.css'
import {RootStateType} from '../../../00-Redux/store';

type CardPropsType = {
    card: CardType
    updateCard: (card: CardType) => void
    removeCard: (id: string) => void
}

const CardElement: React.FC<CardPropsType> = (
    {
        card,
        updateCard,
        removeCard
    }) => {

    //for modal
    const [activeModalDelete, setActiveModalDelete] = useState<boolean>(false)
    const [activeModalUpdate, setActiveModalUpdate] = useState<boolean>(false)
    const [questionCard, setQuestionCard] = useState<string>('')
    const [answerCard, setAnswerCard] = useState<string>('')

    //for disabled
    const userId = useSelector<RootStateType, string>(state => state.login.user._id)

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
        <div className={s.card}>
            <h5>{card.question ? card.question : 'empty question'}</h5>
            <p>{card.answer ? card.answer : 'empty answer'}</p>
            <p>type of card: {card.type ? card.type : 'empty type'} </p>
            <p>grade: </p>
            <p>{card.grade}</p>
            <Button onClick={onUpdateHandler} disabled={card.user_id !== userId}>Update</Button>
            <Button onClick={onRemoveHandler} disabled={card.user_id !== userId}>Delete</Button>

            <ModalForDelete active={activeModalDelete}
                            setActive={setActiveModalDelete}
                            deleteModalHandlerYes={deleteModalHandlerYes}/>

            <ModalForUpdateCard active={activeModalUpdate}
                                setActive={setActiveModalUpdate}
                                setQuestionCard={setQuestionCard}
                                setAnswerCard={setAnswerCard}
                                updateModalHandler={updateModalHandler}/>
        </div>
    )
}

export default CardElement