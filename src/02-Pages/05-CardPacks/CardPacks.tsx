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
import style from './CardPacks.module.css'
import ModalWindow from '../../03-Components/SuperComponents/Modal/Modal';


export type queryParamsType = {
    packName?: string,
    min?: number,
    max?: number,
}

const CardPacks: React.FC = () => {


    const cardPacks = useSelector<RootStateType, CardPacksType[]>(state => state.cardsPack.cardPacks)

    const filter = useSelector<RootStateType, CardPacksFilterType>(state => state.cardsPack.filter)

    const [inputValue, setInputValue] = useState<string>('')
    const [range, setRange] = useState([1, 15])

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCardPacks(filter))
    }, [])

    let queryObj: queryParamsType = {
        packName: inputValue,
        min: range[0],
        max: range[1],
    }

    const onSearch = () => {
        dispatch(getCardPacks(queryObj))
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

    const removeCardPacks = (_id:string) => {
       /* setActiveModal(true)*/
        dispatch(deleteCardPacks(_id))
    }


    const mappedPacks = cardPacks.map((p: CardPacksType) =>
        <div>
            <CardPacksElement key={p._id}
                              pack={p}
                              updateCardPacks={changeCardPacks}
                              removeCardPacks={removeCardPacks}/>

        </div>
    )

    return <div>
        <div className={style.search}>
            <DoubleRange range={range} setRange={setRange}/>
            <Input onChange={inputHandler}/>
            <Button onClick={onSearch}>Search</Button>
            <Button onClick={onAddCardPacks}>Add CardPacks</Button>
            {
                mappedPacks
            }

        </div>
    </div>
}

export default CardPacks