import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import ModalForDeleteCardsPack from '../../../03-Components/SuperComponents/Modal/ModalForCards/ModalForDelete';
import ModalForUpdateCardsPack
    from '../../../03-Components/SuperComponents/Modal/ModalForCards/ModalForUpdateCardsPack';
import {PATH} from '../../../04-App/Routes/Routes';
import Button from '../../../03-Components/SuperComponents/Button/Button';
import {useSelector} from 'react-redux';
import {RootStateType} from '../../../04-App/store';
import s from './CardPacksElement.module.css'
import {CardPacksType} from '../cardPacks-reducer';

type CardPropsType = {
    pack: CardPacksType
    updateCardPacks: (cardsPack: CardPacksType) => void
    removeCardPacks: (id: string) => void
}

const CardPacksElement: React.FC<CardPropsType> = (
    {
        pack,
        updateCardPacks,
        removeCardPacks,
    }) => {

    const onUpdateHandler = () => {
        setActiveModalUpdate(true)
    }
    const onRemoveHandler = () => {
        setActiveModalDelete(true)
    }

    //for modal
    const [activeModalDelete, setActiveModalDelete] = useState<boolean>(false)
    const [activeModalUpdate, setActiveModalUpdate] = useState<boolean>(false)
    const [titleCard, setTitleCard] = useState<string>('')
    //for delete
    const deleteModalHandlerYes = () => {
        removeCardPacks(pack._id)
    }

    //for update
    const updateModalHandler = () => {
        updateCardPacks && updateCardPacks({_id: pack._id, name: titleCard, type: 'bla-type'})
        setActiveModalUpdate(false)
        setTitleCard('')
    }
    //for disabled
    const userId = useSelector<RootStateType, string>(state => state.auth.user._id)

    return (<>
            <tr>
                <td>{pack.name}</td>
                <td>{pack.cardsCount ? pack.cardsCount : `empty`}</td>
                <td><Button onClick={onUpdateHandler} disabled={pack.user_id !== userId}>Update</Button></td>
                <td><Button onClick={onRemoveHandler} disabled={pack.user_id !== userId}>Delete</Button></td>
                <td><NavLink className={s.inactive} activeClassName={s.active}
                             to={PATH.LEARNING + '/' + pack._id}>Learn</NavLink></td>
                <td><NavLink className={s.inactive} activeClassName={s.active}
                             to={PATH.CARDS + '/' + pack._id}>Cards</NavLink></td>
            </tr>
            <ModalForDeleteCardsPack active={activeModalDelete} setActive={setActiveModalDelete}
                                     deleteModalHandlerYes={deleteModalHandlerYes}/>
            <ModalForUpdateCardsPack active={activeModalUpdate} setActive={setActiveModalUpdate}
                                     setTitleCard={setTitleCard}
                                     updateModalHandler={updateModalHandler}/>
        </>
    )
}

export default CardPacksElement
