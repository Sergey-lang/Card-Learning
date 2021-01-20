import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addCardPacks, CardPacksFilterType, CardPacksType, getCardPacks} from '../../Redux/reducers/cardsPackReducer';
import {RootStateType} from '../../Redux/store';

import style from './CardPacks.module.css'
import SearchForm from '../SuperComponents/SearchForm/SearchForm';
import Input from '../SuperComponents/Input/Input';
import Button from '../SuperComponents/Button/Button';
import {CreateCardsPackType} from '../../Api/api-cardsPack';

type CardPropsType = {}

const CardPacks: React.FC<CardPropsType> = (props) => {
    const cards = useSelector<RootStateType, CardPacksType[]>(state => state.cardsPack.cardPacks)
    const pageCount = useSelector<RootStateType, number>(state => state.cardsPack.pageCount)
    const page = useSelector<RootStateType, number>(state => state.cardsPack.page)

    const filter = useSelector<RootStateType, CardPacksFilterType>(state => state.cardsPack.filter)
    const [inputValue, setInputValue] = useState<string>('')

    const [range, setRange] = useState([3, 5])
    console.log(inputValue)

    const dispatch = useDispatch()

    //request on start, data from redux
    useEffect(() => {
        dispatch(getCardPacks(filter, page, pageCount))

    }, [])

    const onSearch = () => {
        dispatch(getCardPacks({packName: inputValue, min: range[0], max: range[1]}))
    }

    const cardTestObj: CreateCardsPackType = {
        name: 'Новая карта',
        type:'Тестовая карта 007'
    }

    const onAddCardPacks = () => {
        dispatch(addCardPacks(cardTestObj))
    }

    return <div>
        <div>
            <Input onChange={(e) => setInputValue(e.currentTarget.value)}/>
        </div>
        <Button onClick={onSearch}>Search</Button>
        <Button onClick={onAddCardPacks}>Add CardPacks</Button>
        {
            cards && cards.map((cardsPack: CardPacksType) => {
                return <div key={cardsPack._id} className={style.card}>
                    <div className={style.heading} style={{backgroundColor: '#4285f4'}}>
                        <h1>{cardsPack.name}</h1>
                    </div>
                    <div className={style.content}>
                        <p>{cardsPack.name}</p>
                    </div>
                </div>
            })
        }
    </div>

};

export default CardPacks