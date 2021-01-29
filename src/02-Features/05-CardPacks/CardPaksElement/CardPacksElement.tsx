import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import {CardPacksType} from '../../../00-Redux/card-packs-reducer';
import s from './CardPacksElement.module.css'
import ModalForDeleteCardsPack from '../../../03-Components/SuperComponents/Modal/ModalForCards/ModalForDelete';
import ModalForUpdateCardsPack
    from '../../../03-Components/SuperComponents/Modal/ModalForCards/ModalForUpdateCardsPack';
import {path} from '../../../04-App/Routes/Routes';
import Button from '../../../03-Components/SuperComponents/Button/Button';


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


    return (<>
            <tr>
                <td>{pack.name}</td>
                <td>{pack.cardsCount ? pack.cardsCount : `empty`}</td>
                <td><Button onClick={onUpdateHandler}>Update</Button></td>
                <td><Button onClick={onRemoveHandler}>Delete</Button></td>
                <td><NavLink className={s.inactive} activeClassName={s.active}
                             to={path.LEARNING + '/' + pack._id}>Learn</NavLink></td>
                <td><NavLink className={s.inactive} activeClassName={s.active}
                             to={path.CARDS + '/' + pack._id}>Cards</NavLink></td>
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