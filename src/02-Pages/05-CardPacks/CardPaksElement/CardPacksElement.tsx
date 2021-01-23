import React from 'react';
import {path} from '../../../04-App/App';
import {NavLink} from 'react-router-dom';
import {CardPacksType} from '../../../00-Redux/cardsPack-reducer';

import s from './CardPacksElement.module.css'

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
        updateCardPacks && updateCardPacks({_id: pack._id, name: 'fake Sergey007', type: 'bla-type'})
    }

    const onRemoveHandler = () => {
        removeCardPacks && removeCardPacks(pack._id)
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
        </div>
    )
}

export default CardPacksElement