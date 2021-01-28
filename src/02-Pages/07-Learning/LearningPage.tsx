import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../../04-App/store';
import {CardType, getCards, sendGrade} from '../../00-Redux/cards-reducer';
import {Redirect, useParams} from 'react-router-dom';
import Button from '../../03-Components/SuperComponents/Button/Button';
import ProgressBar from '../../03-Components/SuperComponents/ProgressBar/ProgressBar';
import ErrorSnackBar from '../../03-Components/ErrorSnackBar/ErrorSnackBar';

import s from './LearningPage.module.css'
import {path} from '../../04-App/Routes/Routes';

const grades = ['не знал', 'забыл', 'долго думал', 'перепутал', 'знал'];

const LearningPage: React.FC = () => {
    //cards from redux
    const dispatch = useDispatch()
    const cards = useSelector<RootStateType, CardType[]>(state => state.cards.cards)

    const getRandomCard = useCallback((cards: CardType[]) => {
        const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
        const rand = Math.random() * sum;
        const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
                const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
                return {sum: newSum, id: newSum < rand ? i : acc.id}
            }
            , {sum: 0, id: -1});
        console.log('test: ', sum, rand, res)

        return cards[res.id + 1];
    }, [cards])

    const isAuth = useSelector<RootStateType, boolean>(state => state.login.isAuth)

    const appStatus = useSelector<RootStateType, string>((state) => state.app.appState.status)
    const error = useSelector<RootStateType, string | null>((state) => state.app.appState.error)

    //get Pack ID
    const {id} = useParams<{ id: string }>();

    const [firstCard, setFirstCard] = useState<boolean>(true)
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [card, setCard] = useState<CardType>({} as CardType)

    //get cards use Pack ID
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
    }, [cards])

    const onNextCard = () => {
        setIsChecked(false);
        if (cards.length > 0) {
            setCard(getRandomCard(cards));
        } else {
            alert(`Something bad 'onNextCard'`)
        }
    }

    const setGrade = (grade: number) => {
        dispatch(sendGrade(grade, card._id))
    }

    if (!isAuth) return <Redirect to={path.LOGIN}/>
    return (
        <div className={s.pageContainer}>
            {
                appStatus === 'loading' && <ProgressBar/>
            }
            {
                cards.length > 0 && <div key={card._id} className={s.wrapper}>
                    <div>Вопрос: {card.question}</div>
                    <div>ID карты: {card._id}</div>
                    <div>
                        {
                            !isChecked && <button onClick={() => setIsChecked(true)}>Проверить</button>
                        }
                    </div>
                    <div>
                        {
                            isChecked && (
                                <div>
                                    <div>Ответ: {card.answer}</div>
                                    <div>Тип карточки: {card.type}</div>
                                    <div>Оценка: {card.grade}</div>
                                    {
                                        grades.map((el, i) => (
                                            <Button key={i}
                                                    onClick={(e) => setGrade(i + 1)}>{el}</Button>
                                        ))
                                    }
                                    <div>
                                        <button onClick={onNextCard}>Next</button>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            }
            {
                error && <ErrorSnackBar errorMessage={error}/>
            }
        </div>
    )
}

export default LearningPage