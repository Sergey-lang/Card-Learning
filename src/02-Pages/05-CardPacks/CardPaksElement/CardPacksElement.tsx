import React, {ChangeEvent, useState} from 'react';
import {path} from '../../../04-App/App';
import {NavLink} from 'react-router-dom';
import {CardPacksType} from '../../../00-Redux/cardsPack-reducer';

import s from './CardPacksElement.module.css'
import ModalWindow from '../../../03-Components/SuperComponents/Modal/Modal';

type CardPropsType = {
    pack: CardPacksType
    updateCardPacks?: (cardsPack: CardPacksType) => void
    removeCardPacks?: (id: string) => void
    showBtn?: boolean
}

const CardPacksElement: React.FC<CardPropsType> = (
    {
        pack,
        updateCardPacks,
        removeCardPacks,
        showBtn = true
    }) => {

    const onUpdateHandler = () => {
        setActiveModalUpdate(true)
        updateCardPacks && updateCardPacks({_id: pack._id, name: 'fake Sergey007', type: 'bla-type'})
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
        removeCardPacks && removeCardPacks(pack._id)
    }
    const deleteModalHandlerNo = () => {
        setActiveModalDelete(false)
    }
    //for update
    const updateModalHandler = () => {
        updateCardPacks({_id: pack._id, name: titleCard, type: 'bla-type'})
        setActiveModalUpdate(false)
        setTitleCard('')
    }
    const handlerForUpdateTitleCard = (e: ChangeEvent<HTMLInputElement>)=>{
        setTitleCard(e.currentTarget.value)

    }
    const updateModalHandlerCancel = () => {
        setActiveModalUpdate(false)
    }

    return (
        <div className={s.wrapper}>
            <div>{pack.name}</div>
            <div>{pack.cardsCount ? pack.cardsCount : `empty`}</div>
            <div>{pack.created}</div>
            <div>
                {showBtn ?
                    <>
                        <button onClick={onUpdateHandler}>Update</button>
                        <button onClick={onRemoveHandler}>Delete</button>
                    </>
                    : ''}
            </div>

            <NavLink to={path.CARDS + '/' + pack._id}>ссылка</NavLink>
            <button onClick={onUpdateHandler}>Update</button>
            <button onClick={onRemoveHandler}>Delete</button>
            <NavLink to={path.CARDS + '/' + pack._id}>ссылка</NavLink>

            <ModalWindow active={activeModalDelete} setActive={setActiveModalDelete}>
                <p>Are you sure?</p>
                <button onClick={deleteModalHandlerYes}>Yes</button>
                <button onClick={deleteModalHandlerNo}>No</button>
            </ModalWindow>


            <ModalWindow active={activeModalUpdate} setActive={setActiveModalUpdate}>
                <p>Here You can do some changes</p>
                <input type={'text'} onChange={handlerForUpdateTitleCard}/>
                <button onClick={updateModalHandler}>Update</button>
                <button onClick={updateModalHandlerCancel}>Cancel</button>
            </ModalWindow>
        </div>
    )
}

export default CardPacksElement