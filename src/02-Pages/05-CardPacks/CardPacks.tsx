import React, {ChangeEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';
import style from './../../03-Components/container/dataForn.module.css'
import s from './CardPacks.module.css'
import {
    addCardPacks,
    CardPacksFilterType,
    CardPacksType,
    deleteCardPacks,
    getCardPacks,
    showMode,
    updateCardPacks
} from '../../00-Redux/card-packs-reducer';
import {RootStateType} from '../../04-App/store';
import CardPacksElement from './CardPaksElement/CardPacksElement';
import {Paginator} from '../../03-Components/Paginator/Paginator';
import DoubleRange from '../../03-Components/SuperComponents/DoubleRange/DoubleRange';
import {path} from '../../04-App/Routes/Routes';
import UniversalInputText from '../../03-Components/SuperComponents/InputText/UniversalInputText';
import UniversalCheckbox from '../../03-Components/SuperComponents/DoubleRange/Checkbox/UniversalCheckbox';
import UniversalButton from '../../03-Components/SuperComponents/Button/FormButton/UniversalButton';

const CardPacks: React.FC = () => {
    const isAuth = useSelector<RootStateType, boolean>(state => state.login.isAuth)
    const cardPacks = useSelector<RootStateType, CardPacksType[]>(state => state.cardsPack.cardPacks)

    //filter data
    const packsTotalCount = useSelector<RootStateType, number>(state => state.cardsPack.packsTotalCount)
    const filter = useSelector<RootStateType, CardPacksFilterType>(state => state.cardsPack.filter)
    const currentPage = useSelector<RootStateType, number>(state => state.cardsPack.currentPage)
    const pageSize = useSelector<RootStateType, number>(state => state.cardsPack.pageSize)
    const userId = useSelector<RootStateType, string>(state => state.login.user._id)
    const showEditMode = useSelector<RootStateType, boolean>(state => state.cardsPack.showAll)

    //filter state
    const [inputValue, setInputValue] = useState<string>('')
    const [range, setRange] = useState([0, 15])

    const dispatch = useDispatch()

    //get all packs
    useEffect(() => {
        dispatch(getCardPacks(currentPage, pageSize, filter))
    }, [])

    //pagination
    const onPageChanged = (currentPage: number) => {
        dispatch(getCardPacks(currentPage, pageSize, filtered))
    }

    //search request
    const onSearch = () => {
        dispatch(getCardPacks(currentPage, pageSize, filtered))
    }

    //checkbox showMode
    const showOwnPack = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(showMode(e.target.checked))
    }

    //set input field value
    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.currentTarget.value)

    //filter object
    let filtered: CardPacksFilterType = {
        packName: inputValue,
        min: range[0],
        max: range[1],
        userId: showEditMode ? userId : ''
    }

    //generate random id for adding pack
    function genID(serverNum: number) {
        return (serverNum + '' + (new Date).getTime());
    }

    //fake obj for adding pack
    const cardTestObj: CardPacksType = {
        '_id': genID(5),
        name: 'NEW PACK-007',
        type: 'Test card Packs 007'
    }

    //button action
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

    if (!isAuth) return <Redirect to={path.LOGIN}/>

    return (
        <div className={style.dataForm}>
            <div className={s.search}>
                <h4>FORM FOR SEARCH</h4>
                <DoubleRange range={range} setRange={setRange}/>
                <UniversalInputText onChange={inputHandler} placeholder={'search...'}/>
                <UniversalCheckbox
                    checked={showEditMode}
                    onChange={showOwnPack}>
                    Show only mine pack
                </UniversalCheckbox>
                <UniversalButton onClick={onSearch}>Search</UniversalButton>
                <UniversalButton onClick={onAddCardPacks}>Add new CardPack</UniversalButton>
            </div>
            <div className={s.cards}>
                <Paginator currentPage={currentPage}
                           onPageChanged={onPageChanged}
                           pageSize={pageSize}
                           totalItemsCount={packsTotalCount}/>
                <table className={s.table}>
                    <tbody> {
                        mappedPacks
                    }
                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default CardPacks