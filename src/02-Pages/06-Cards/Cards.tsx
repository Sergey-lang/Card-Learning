import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../../04-App/store';
import Input from '../../03-Components/SuperComponents/Input/Input';
import Button from '../../03-Components/SuperComponents/Button/Button';

import style from './Cards.module.css'
import {addCard, CardType, deleteCard, getCards, updateCard} from '../../00-Redux/cards-reducer';
import {useParams} from 'react-router-dom';
import CardElement from './CardElement/CardElement';

const Cards: React.FC = () => {

    const {id} = useParams<{ id: string }>();

    const cards = useSelector<RootStateType, CardType[]>(state => state.cards.cards)

    const dispatch = useDispatch()

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
        _id:genID(2),
        type: 'Java',
        question: 'fake quessssstion',
        answer: `fake answerrrrr`,
        cardsPack_id: id,
        grade: 4.54654,
        rating:0
    }

    const onAddCard = () => {
        dispatch(addCard(cardTestObj))
    }

    const changeCard = (card: CardType) => {
        dispatch(updateCard(card))
    }

    const removeCard = (id: string) => {
        dispatch(deleteCard(id))
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
    </div>
}

export default Cards