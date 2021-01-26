import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../../04-App/store';
import Button from '../../03-Components/SuperComponents/Button/Button';
import style from './Cards.module.css'
import {addCard, CardType, deleteCard, getCards, updateCard} from '../../00-Redux/cards-reducer';
import {Redirect, useParams} from 'react-router-dom';
import CardElement from './CardElement/CardElement';
import ModalForAddCards from '../../03-Components/SuperComponents/Modal/ModalForCards/ModalForAddCard';
import {path} from '../../04-App/App';

const Cards: React.FC = () => {

    const {id} = useParams<{ id: string }>();

    const cards = useSelector<RootStateType, CardType[]>(state => state.cards.cards)

    const dispatch = useDispatch()
    //for modal
    const [activeModalAdd, setActiveModalAdd] = useState<boolean>(false)
    const [newQuestionCard, setNewQuestionCard] = useState<string>('')
    const [newAnswerCard, setNewAnswerCard] = useState<string>('')
    const [typeNewCard, setTypeNewCard] = useState<string>('undefined')

    const isAuth = useSelector<RootStateType, boolean>(state => state.login.isAuth)


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
        type: typeNewCard,
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

    const removeCard = (id: string) => {
        dispatch(deleteCard(id))
    }

    if (!isAuth) return <Redirect to={path.LOGIN}/>
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
        <ModalForAddCards active={activeModalAdd} setActive={setActiveModalAdd} addCardHandler={addCardHandler}
                          setNewQuestionCard={setNewQuestionCard} setNewAnswerCard={setNewAnswerCard}
                          setTypeNewCard={setTypeNewCard}/>
    </div>
}

export default Cards