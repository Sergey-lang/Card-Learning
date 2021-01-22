import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    CardPacksFilterType,
    CardPacksType,
    deleteCardPacks,
    getCardPacks,
    updateCardPacks
} from '../../Redux/reducers/cardsPackReducer';
import {RootStateType} from '../../Redux/store';
import Input from '../SuperComponents/Input/Input';
import Button from '../SuperComponents/Button/Button';
import DoubleRange from '../SuperComponents/DoubleRange/DoubleRange';

import style from './Cards.module.css'
import {addCard, CardType, getCards} from '../../Redux/reducers/cardsReducer';

type PropsType = {
    id: string
}

const Cards: React.FC<PropsType> = ({id}) => {

    console.log(id)

    const cards = useSelector<RootStateType, CardType[]>(state => state.cards.cards)

    const filter = useSelector<RootStateType, CardPacksFilterType>(state => state.cardsPack.filter)

    const [inputValue, setInputValue] = useState<string>('')
    const [range, setRange] = useState([0, 15])

    const dispatch = useDispatch()

    //request on start, data from redux
    useEffect(() => {
        dispatch(getCards(filter, id))
    }, [])

    const onSearch = () => {
        dispatch(getCardPacks({packName: inputValue, min: range[0], max: range[1]}))
    }

    function genID(serverNum: number) {
        return (serverNum + '' + (new Date).getTime());
    }

    //fake obj
    const cardTestObj: CardType = {
        question: 'How is it work??!!!',
        cardsPack_id: id,
        _id: genID(2),
    }

    const onAddCardPacks = () => {
        dispatch(addCard(cardTestObj))
    }

    const changeCardPacks = (cardsPack: CardPacksType) => {
        dispatch(updateCardPacks(cardsPack))
    }

    const removeCardPacks = (_id: string) => {
        dispatch(deleteCardPacks(_id))
    }

    return <div>
        <div className={style.search}>
            <DoubleRange range={range} setRange={setRange}/>
            <Input onChange={(e) => setInputValue(e.currentTarget.value)}/>
            <Button onClick={onSearch}>Search</Button>
            <Button onClick={onAddCardPacks}>Add CardPacks</Button>
            {
                cards.map((card: CardType) => <div key={card._id}>
                    <span>{card.question}</span>
                    <span>{card.created}</span>
                </div>)
            }
        </div>
    </div>
}

export default Cards