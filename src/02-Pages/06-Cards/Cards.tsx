import React, {ChangeEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../../04-App/store';
import Button from '../../03-Components/SuperComponents/Button/Button';
import style from './Cards.module.css'
import {addCard, CardType, deleteCard, getCards, updateCard} from '../../00-Redux/cards-reducer';
import {useParams} from 'react-router-dom';
import CardElement from './CardElement/CardElement';
import ModalWindow from '../../03-Components/SuperComponents/Modal/Modal';

const Cards: React.FC = () => {

    const {id} = useParams<{ id: string }>();

    const cards = useSelector<RootStateType, CardType[]>(state => state.cards.cards)

    const dispatch = useDispatch()

    const [activeModalAdd, setActiveModalAdd] = useState<boolean>(false)
    const [newQuestionCard, setNewQuestionCard] = useState<string>('')
    const [newAnswerCard, setNewAnswerCard] = useState<string>('')

    //request on start, data from redux
    useEffect(() => {
        dispatch(getCards(id))
    }, [])

    const onSearch = () => {
        // dispatch(getCards({packName: inputValue, min: range[0], max: range[1]}))
    }

    function genID(serverNum: number) {
        return (serverNum + '' + (new Date).getTime());
    }

    //fake obj for creating
    const cardTestObj: CardType = {
        _id: genID(2),
        type: 'Java',
        question: newQuestionCard,
        answer: newAnswerCard,
        cardsPack_id: id,
        grade: 4.54654,
        rating: 0
    }

    const onAddCard = () => {
        setActiveModalAdd(true)
    }

    const changeCard = (card: CardType) => {
        dispatch(updateCard(card))
    }
    const addCardHandler = () => {
        dispatch(addCard(cardTestObj))
        setActiveModalAdd(false)
    }
    const addCardHandlerCancel = () => {
        setActiveModalAdd(false)
    }
    const removeCard = (id: string) => {
        dispatch(deleteCard(id))
    }
    const handlerForAddQuestionCard = (e: ChangeEvent<HTMLInputElement>) => {
        setNewQuestionCard(e.currentTarget.value)

    }
    const handlerForAddAnswerCard = (e: ChangeEvent<HTMLInputElement>) => {
        setNewAnswerCard(e.currentTarget.value)

    }

    const mappedCards = cards.map((card: CardType) => <CardElement key={card._id}
                                                                   card={card}
                                                                   updateCard={changeCard}
                                                                   removeCard={removeCard}/>)
    return <div>
        <div className={style.search}>
            <Button onClick={onSearch}>Search</Button>
            <Button onClick={onAddCard}>Add Card</Button>
            {
                mappedCards
            }
        </div>
        <ModalWindow active={activeModalAdd} setActive={setActiveModalAdd}>
            <p>Add new card</p>
            QUESTION<input type={'text'} onChange={handlerForAddQuestionCard}/>
            ANSWER <input type={'text'} onChange={handlerForAddAnswerCard}/>
            <button onClick={addCardHandler}>ADD</button>
            <button onClick={addCardHandlerCancel}>Cancel</button>
        </ModalWindow>
    </div>
}

export default Cards