import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    addCardPacks,
    CardPacksFilterType,
    CardPacksType,
    deletePack,
    getCardPacks,
    updatePack
} from '../../Redux/reducers/cardsPackReducer';
import {RootStateType} from '../../Redux/store';

import style from './CardPacks.module.css'
import Input from '../SuperComponents/Input/Input';
import Button from '../SuperComponents/Button/Button';
import {CreateCardsPackType} from '../../Api/api-cardsPack';
import DoubleRange from '../SuperComponents/DoubleRange/DoubleRange';
import {Redirect} from 'react-router-dom';
import {path} from '../../App';

type CardPropsType = {}

const CardPacks: React.FC<CardPropsType> = (props) => {
    const cards = useSelector<RootStateType, CardPacksType[]>(state => state.cardsPack.cardPacks)
    const pageCount = useSelector<RootStateType, number>(state => state.cardsPack.pageCount)
    const page = useSelector<RootStateType, number>(state => state.cardsPack.page)
    const isAuth = useSelector<RootStateType, boolean>(state => state.login.isAuth)
    const filter = useSelector<RootStateType, CardPacksFilterType>(state => state.cardsPack.filter)

    const [inputValue, setInputValue] = useState<string>('')
    const [range, setRange] = useState([3, 5])

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
        type: 'Тестовая карта 007'
    }

    const onAddCardPacks = () => {
        dispatch(addCardPacks(cardTestObj))
    }
    if (!isAuth) {
        return <Redirect to={path.LOGIN}/>
    }

    return <div>
        <div>
            <DoubleRange range={range} setRange={setRange}/>
        </div>
        <div>
            <Input onChange={(e) => setInputValue(e.currentTarget.value)}/>
        </div>
        <Button onClick={onSearch}>Search</Button>
        <Button onClick={onAddCardPacks}>Add CardPacks</Button>
        {cards && cards.map((cardsPack: CardPacksType) => {
            //need to move this piece to other component
            const updateCardPack = () => {
                console.log(cardsPack._id)
                dispatch(updatePack(cardsPack._id))
            }
            const deleteCardPack = () => {
                console.log(cardsPack._id)
                dispatch(deletePack(cardsPack._id))
            }

            return <div key={cardsPack._id} className={style.card}>
                <div className={style.heading} style={{backgroundColor: '#4285f4'}}>
                    <h1>Pack Name: {cardsPack.name}</h1>
                </div>
                <div className={style.content}>
                    <p>{cardsPack.created}</p>
                    <p>Cards Count: {cardsPack.cardsCount}</p>
                    <Button onClick={updateCardPack}>UPDATE</Button>
                    <Button onClick={deleteCardPack}>DELETE</Button>
                </div>
            </div>
        })
        }
    </div>

};

export default CardPacks