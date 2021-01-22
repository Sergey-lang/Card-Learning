import React from 'react';
import s from './CardPacksElement.module.css'
import {CardPacksType} from '../../../Redux/reducers/cardsPackReducer';
import {Link} from 'react-router-dom';
import {path} from '../../../App';

type CardPropsType = {
    cardPack: CardPacksType
    updateCardPacks: (cardsPack: CardPacksType) => void
    removeCardPacks: (id: string) => void
}
const CardPacksElement: React.FC<CardPropsType> = (props) => {
    const {_id, name, cardsCount, created} = props.cardPack

    const onUpdateHandler = () => {
        props.updateCardPacks({_id, name: 'fake Sergey007', type: 'bla-type'})
    }

    const onRemoveHandler = () => {
        props.removeCardPacks(_id)
    }

    return (
        <div className={s.wrapper}>
            <div>{name}</div>
            <div>{cardsCount ? cardsCount : `empty`}</div>
            <div>{created}</div>
            <button onClick={onUpdateHandler}>Update</button>
            <button onClick={onRemoveHandler}>Delete</button>
            {/*<Link to={path.CARDS} params={{myObj: obj}}>ссылка</Link>*/}
        </div>
    )
}

export default CardPacksElement