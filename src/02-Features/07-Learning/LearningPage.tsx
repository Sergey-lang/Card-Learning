import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../../00-Redux/store';
import {CardType, getCards, sendGrade} from '../../00-Redux/cards-reducer';
import {Redirect, useParams} from 'react-router-dom';
import Button from '../../03-Components/SuperComponents/Button/Button';
import ErrorSnackBar from '../../03-Components/ErrorSnackBar/ErrorSnackBar';

import s from './LearningPage.module.css'
import {path} from '../../04-App/Routes/Routes';
import UniversalButton from '../../03-Components/SuperComponents/Button/FormButton/UniversalButton';

const grades = ['no idea', 'forgot', 'think long', 'mix up', 'knew'];

const LearningPage: React.FC = () => {

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

    const error = useSelector<RootStateType, string | null>((state) => state.app.appState.error)

    const {id} = useParams<{ id: string }>();

    const [firstCard, setFirstCard] = useState<boolean>(true)
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [card, setCard] = useState<CardType>({} as CardType)

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
                cards.length > 0 && <div key={card._id}>
                    <h5>QUESTION</h5>
                    <h4>{card.question}</h4>
                    <p>ID карты: {card._id}</p>
                    <div>
                        {
                            !isChecked && <UniversalButton onClick={() => setIsChecked(true)}>CHECK</UniversalButton>
                        }
                    </div>
                    <div>
                        {
                            isChecked && (
                                <div>
                                    <hr/>
                                    <h4>Answer: {card.answer}</h4>
                                    <p>Type: {card.type}</p>
                                    <p>Grade: {card.grade}</p>
                                    <div>
                                        {
                                            grades.map((el, i) => (
                                                <Button key={i}
                                                        onClick={(e) => setGrade(i + 1)}>{el}</Button>
                                            ))
                                        }
                                    </div>
                                    <div>
                                        <UniversalButton onClick={onNextCard}>Next</UniversalButton>
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