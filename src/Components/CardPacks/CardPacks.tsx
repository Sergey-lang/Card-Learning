import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addCardPacks, CardPacksFilterType, CardPacksType, getCardPacks} from '../../Redux/reducers/cardsPackReducer';
import {RootStateType} from '../../Redux/store';
import Input from '../SuperComponents/Input/Input';
import Button from '../SuperComponents/Button/Button';
import DoubleRange from '../SuperComponents/DoubleRange/DoubleRange';
import {Redirect} from 'react-router-dom';
import {path} from '../../App';

import style from './CardPacks.module.css'
import Table from '../SuperComponents/Table/Table';

type CardPropsType = {}

const CardPacks: React.FC<CardPropsType> = (props) => {

    const cardsPacks = useSelector<RootStateType, CardPacksType[]>(state => state.cardsPack.cardPacks)
        //for table
    const dataForTable=cardsPacks.map(el=>{return{id:el._id,name:el.name, cards:el.cardsCount, rating:el.rating, type:el.type}})

    const pageCount = useSelector<RootStateType, number>(state => state.cardsPack.pageCount)
    const page = useSelector<RootStateType, number>(state => state.cardsPack.page)

    const isAuth = useSelector<RootStateType, boolean>(state => state.login.isAuth)
    const error = useSelector<RootStateType, string | null>(state => state.app.error)
    const statusResponse = useSelector<RootStateType, string>(state => state.app.statusResponse)

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

    //fake obj
    const cardTestObj: CardPacksType = {
        _id: '5168161-61165-51',
        name: 'New cart',
        type: 'Test cardPacks 007'
    }

    const onAddCardPacks = () => {
        dispatch(addCardPacks(cardTestObj))
    }

    if (!isAuth) {
        return <Redirect to={path.LOGIN}/>
    }

    return <div>
        <div className={style.search}>
            <DoubleRange range={range} setRange={setRange}/>
            <Input onChange={(e) => setInputValue(e.currentTarget.value)}/>
            <Button onClick={onSearch} disabled={statusResponse === 'loading'}>Search</Button>
            <Button onClick={onAddCardPacks} disabled={statusResponse === 'loading'}>Add CardPacks</Button>
        </div>
       <Table data={dataForTable}/>
       
    </div>
}

export default CardPacks
//  {error && <ErrorSnackBar errorMessage={error}/>}