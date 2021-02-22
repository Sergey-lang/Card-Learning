import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';
import style from '../../assets/css/dataForm.module.css'
import s from './CardPacks.module.css'
import {
    addCardPacks,
    CardPacksFilterType,
    CardPacksType,
    deleteCardPacks,
    getCardPacks,
    showMode,
    updateCardPacks
} from '../05-CardPacks/cardPacks-reducer';
import {RootStateType} from '../../04-App/store';
import CardPacksElement from './CardPaksElement/CardPacksElement';
import {Paginator} from '../../03-Components/Paginator/Paginator';
import DoubleRange from '../../03-Components/SuperComponents/DoubleRange/DoubleRange';
import {PATH} from '../../04-App/Routes/Routes';
import UniversalInputText from '../../03-Components/SuperComponents/InputText/UniversalInputText';
import UniversalCheckbox from '../../03-Components/SuperComponents/DoubleRange/Checkbox/UniversalCheckbox';
import UniversalButton from '../../03-Components/SuperComponents/Button/FormButton/UniversalButton';
import ModalForAddPack from '../../03-Components/SuperComponents/Modal/ModalForPack/ModalForAddPack';
import {authSelectors} from '../01-Login/00-index';
import {
    selectorCardPacks,
    selectorCurrentPage, selectorEditMode,
    selectorFilter,
    selectorPacksTotalCount,
    selectorPageSize
} from './01-selectors';
import {UserDataType} from '../01-Login/auth-reducer';
import {selectorUserData} from '../01-Login/01-selectors';

const CardPacks: React.FC = () => {
    const isAuth = useSelector<RootStateType, boolean>(authSelectors.selectorIsAuth)
    const cardPacks = useSelector<RootStateType, CardPacksType[]>(selectorCardPacks)

    //filter data
    const packsTotalCount = useSelector<RootStateType, number>(selectorPacksTotalCount)
    const filter = useSelector<RootStateType, CardPacksFilterType>(selectorFilter)
    const currentPage = useSelector<RootStateType, number>(selectorCurrentPage)
    const pageSize = useSelector<RootStateType, number>(selectorPageSize)
    const editMode = useSelector<RootStateType, boolean>(selectorEditMode)

    const userData = useSelector<RootStateType, UserDataType | null>(selectorUserData)

    //filter state
    const [inputValue, setInputValue] = useState<string>('')
    const [range, setRange] = useState([0, 15])

    //for modal
    const [activeModalAdd, setActiveModalAdd] = useState<boolean>(false)
    const [namePack, setNamePack] = useState<string>('')
    const [typeNewPack, setTypeNewPack] = useState<string>('undefined')


    const dispatch = useDispatch()

    const onPageChanged = useCallback((currentPage: number) => {
        dispatch(getCardPacks(currentPage, pageSize, filtered))
    }, [currentPage])

    const onSearch = () => dispatch(getCardPacks(currentPage, pageSize, filtered))
    const showOwnPack = (e: ChangeEvent<HTMLInputElement>) => dispatch(showMode(e.target.checked))
    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.currentTarget.value)

    const filtered: CardPacksFilterType = {
        packName: inputValue,
        min: range[0],
        max: range[1],
        userId: editMode && userData ? userData._id : ''
    }

    function genID(serverNum: number) {
        return (serverNum + '' + (new Date).getTime());
    }

    const cardTestObj: CardPacksType = {
        _id: genID(5),
        name: namePack,
        type: typeNewPack
    }

    const onAddCardPacks = () => {
        setActiveModalAdd(true)
    }
    const addPackHandler = () => {
        dispatch(addCardPacks(cardTestObj))
        setActiveModalAdd(false)
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

    useEffect(() => {
        dispatch(getCardPacks(currentPage, pageSize, filter))
    }, [])

    if (!isAuth) {
        return <Redirect to={PATH.LOGIN}/>
    }

    return (<>
            <div className={style.dataForm}>
                <div className={s.search}>
                    <h4>FORM FOR SEARCH</h4>
                    <DoubleRange range={range} setRange={setRange}/>
                    <UniversalInputText onChange={inputHandler} placeholder={'search...'}/>
                    <UniversalCheckbox
                        checked={true}//!!!!!!
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
            <ModalForAddPack active={activeModalAdd} setActive={setActiveModalAdd} addPackHandler={addPackHandler}
                             setNamePack={setNamePack} setTypeNewPack={setTypeNewPack}/>
        </>
    )
}

export default CardPacks
