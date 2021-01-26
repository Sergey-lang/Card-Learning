import React, {useState} from 'react';
import {path} from '../../../04-App/App';
import {NavLink} from 'react-router-dom';
import {CardPacksType} from '../../../00-Redux/card-packs-reducer';
import s from './CardPacksElement.module.css'
import ModalForDeleteCardsPack from '../../../03-Components/SuperComponents/Modal/ModalForCards/ModalForDelete';
import ModalForUpdateCardsPack from '../../../03-Components/SuperComponents/Modal/ModalForCards/ModalForUpdateCardsPack';

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


    return (
        <div className={s.wrapper}>
            <div>{pack.name}</div>
            <div>{pack.cardsCount ? pack.cardsCount : `empty`}</div>
            <div>{pack.created}</div>
            <div>
                <button onClick={onUpdateHandler}>Update</button>
                <button onClick={onRemoveHandler}>Delete</button>
            </div>
            <NavLink to={path.LEARNING + '/' + pack._id}>учить</NavLink>
            <NavLink to={path.CARDS + '/' + pack._id}>ссылка</NavLink>

            <ModalForDeleteCardsPack active={activeModalDelete} setActive={setActiveModalDelete}
                                deleteModalHandlerYes={deleteModalHandlerYes}/>
            <ModalForUpdateCardsPack active={activeModalUpdate} setActive={setActiveModalUpdate} setTitleCard={setTitleCard}
                                updateModalHandler={updateModalHandler}/>

        </div>
    )
}

export default CardPacksElement