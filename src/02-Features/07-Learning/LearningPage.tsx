import React, {useCallback, useEffect, useState} from 'react';

import s from './LearningPage.module.css'
import {CardType, getCards, sendGrade} from '../06-Cards/cards-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../../04-App/store';
import {Redirect, useParams} from 'react-router-dom';
import {PATH} from '../../04-App/Routes/Routes';
import ErrorSnackBar from '../../03-Components/ErrorSnackBar/ErrorSnackBar';
import {LearnCardElement} from './LearnCardElement/LearnCardElement';
import {authSelectors} from '../01-Login/00-index';
import {appSelectors} from '../../04-App/00-index';

const grades = ['no idea', 'forgot', 'think long', 'mix up', 'knew'];

const getRandomCard = (cards: CardType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});
    console.log('test: ', sum, rand, res)

    return cards[res.id + 1];
}

export const LearningPage: React.FC = React.memo(() => {
    const cards = useSelector<RootStateType, CardType[]>(state => state.cards.cards)
    const isAuth = useSelector<RootStateType, boolean>(authSelectors.selectorIsAuth)
    const error = useSelector<RootStateType, string | null>(appSelectors.selectorError)

    const {id} = useParams<{ id: string }>();

    const [firstCard, setFirstCard] = useState<boolean>(true)
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [card, setCard] = useState<CardType>({
        _id: ''
    } as CardType)

    const dispatch = useDispatch()
    useEffect(() => {
        if (firstCard) {
            dispatch(getCards(id))
            setFirstCard(false)
        }
        if (cards.length > 0) {
            setCard(getRandomCard(cards))
            return () => {
                console.log('Learning Page clear effect ')
            }
        } else {

        }
    }, [cards, dispatch])

    const onNextCard = useCallback((grade: number) => {
        setIsChecked(false);
        if (cards.length > 0) {
            if(!card._id) {
                console.log('error in useCallback')
            }
            dispatch(sendGrade(grade, card._id))
            setCard(getRandomCard(cards))
        } else {
            alert(`Something bad 'onNextCard'`)
        }
    }, [cards, card])

    if (!isAuth) {
        return <Redirect to={PATH.LOGIN}/>
    }

    return (
        <div className={s.pageContainer}>
            {cards.length > 0 && <LearnCardElement card={card}
                                                   grades={grades}
                                                   checked={isChecked}
                                                   setIsChecked={setIsChecked}
                                                   onNextCard={onNextCard}/>
            }
            {error && <ErrorSnackBar errorMessage={error}/>}
        </div>
    )
})
