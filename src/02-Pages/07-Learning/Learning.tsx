import React, {ChangeEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {CardPacksFilterType, CardPacksType, getCardPacks} from '../../00-Redux/cardsPack-reducer';
import {RootStateType} from '../../04-App/store';
import Input from '../../03-Components/SuperComponents/Input/Input';
import Button from '../../03-Components/SuperComponents/Button/Button';
import DoubleRange from '../../03-Components/SuperComponents/DoubleRange/DoubleRange';

import style from './Learning.module.css'
import {getLearningPacks} from './learningPacks-reducer';
import CardPacksElement from '../05-CardPacks/CardPaksElement/CardPacksElement';
import {Paginator} from '../../03-Components/Paginator/Paginator';

export type queryParamsType = {
    packName?: string,
    min?: number,
    max?: number,
}

const Learning: React.FC = () => {

    const cardPacks = useSelector<RootStateType, CardPacksType[]>(state => state.learningPacks.cardPacks)

    const filter = useSelector<RootStateType, CardPacksFilterType>(state => state.learningPacks.filter)
    const currentPage = useSelector<RootStateType, number>(state => state.learningPacks.currentPage)
    const pageSize = useSelector<RootStateType, number>(state => state.learningPacks.pageSize)
    const packsTotalCount = useSelector<RootStateType, number>(state => state.learningPacks.packsTotalCount)

    const [inputValue, setInputValue] = useState<string>('')
    const [range, setRange] = useState([0, 15])

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getLearningPacks(currentPage, pageSize, filter))
    }, [])

    const onPageChanged = (currentPage: number) => {
        dispatch(getLearningPacks(currentPage, pageSize, filtered))
    }

    const onSearch = () => {
        dispatch(getLearningPacks(currentPage, pageSize, filtered))
    }

    let filtered: CardPacksFilterType = {
        packName: inputValue,
        min: range[0],
        max: range[1],
    }

    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.currentTarget.value)

    const mappedPacks = cardPacks.map((p: CardPacksType) => <CardPacksElement key={p._id}
                                                                              pack={p}
                                                                              showBtn={false}
                                                                              />)

    return <div>
        <div className={style.search}>
            <DoubleRange range={range} setRange={setRange}/>
            <Input onChange={inputHandler}/>
            <Button onClick={onSearch}>Search</Button>
            <Paginator currentPage={currentPage}
                       onPageChanged={onPageChanged}
                       pageSize={pageSize}
                       totalItemsCount={packsTotalCount}/>
            {
                mappedPacks
            }
        </div>
    </div>
}

export default Learning