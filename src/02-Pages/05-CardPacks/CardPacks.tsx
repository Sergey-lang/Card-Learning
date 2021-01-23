import React, {ChangeEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    addCardPacks,
    CardPacksFilterType,
    CardPacksType,
    deleteCardPacks,
    getCardPacks,
    updateCardPacks
} from '../../00-Redux/cardsPack-reducer';
import {RootStateType} from '../../04-App/store';
import Input from '../../03-Components/SuperComponents/Input/Input';
import Button from '../../03-Components/SuperComponents/Button/Button';
import DoubleRange from '../../03-Components/SuperComponents/DoubleRange/DoubleRange';
import CardPacksElement from './CardPaksElement/CardPacksElement';
import {Paginator} from '../../03-Components/Paginator/Paginator';

import style from './CardPacks.module.css'

export type queryParamsType = {
    packName?: string,
    min?: number,
    max?: number,
}

const CardPacks: React.FC = () => {

    const cardPacks = useSelector<RootStateType, CardPacksType[]>(state => state.cardsPack.cardPacks)

    const filter = useSelector<RootStateType, CardPacksFilterType>(state => state.cardsPack.filter)
    const currentPage = useSelector<RootStateType, number>(state => state.cardsPack.currentPage)
    const pageSize = useSelector<RootStateType, number>(state => state.cardsPack.pageSize)
    const packsTotalCount = useSelector<RootStateType, number>(state => state.cardsPack.packsTotalCount)

    const [inputValue, setInputValue] = useState<string>('')
    const [range, setRange] = useState([1, 15])

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCardPacks(currentPage, pageSize, filter))
    }, [])

    const onPageChanged = (currentPage: number) => {
        dispatch(getCardPacks(currentPage, pageSize, filtered))
    }

    const onSearch = () => {
        dispatch(getCardPacks(currentPage, pageSize, filtered))
    }

    let filtered: CardPacksFilterType = {
        packName: inputValue,
        min: range[0],
        max: range[1],
    }

    //generate random id
    function genID(serverNum: number) {
        return (serverNum + '' + (new Date).getTime());
    }

    //fake obj for creating
    const cardTestObj: CardPacksType = {
        '_id': genID(5),
        name: 'NEW PACK-007',
        type: 'Test card Packs 007'
    }

    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.currentTarget.value)

    const onAddCardPacks = () => {
        dispatch(addCardPacks(cardTestObj))
    }
    const changeCardPacks = (cardsPack: CardPacksType) => {
        dispatch(updateCardPacks(cardsPack))
    }
    const removeCardPacks = (_id: string) => {
        dispatch(deleteCardPacks(_id))
    }

    const mappedPacks = cardPacks.map((p: CardPacksType) =>
        <CardPacksElement key={p._id}
                          pack={p}
                          updateCardPacks={changeCardPacks}
                          removeCardPacks={removeCardPacks}/>)

    return (
        <div>
            <div className={style.search}>
                <DoubleRange range={range} setRange={setRange}/>
                <Input onChange={inputHandler}/>
                <Button onClick={onSearch}>Search</Button>
                <Button onClick={onAddCardPacks}>Add CardPacks</Button>
                <Paginator currentPage={currentPage}
                           onPageChanged={onPageChanged}
                           pageSize={pageSize}
                           totalItemsCount={packsTotalCount}/>
                {
                    mappedPacks
                }
            </div>
        </div>
    )
}

export default CardPacks