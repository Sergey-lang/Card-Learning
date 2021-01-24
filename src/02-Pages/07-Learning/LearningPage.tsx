import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../../04-App/store';
import {CardType, getCards, sendGrade} from '../../00-Redux/cards-reducer';
import {Redirect, useParams} from 'react-router-dom';

import s from './LearningPage.module.css'
import {log} from 'util';
import {path} from '../../04-App/App';

const getCard = (cards: CardType[]) => {
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

const grades = ['не знал', 'забыл', 'долго думал', 'перепутал', 'знал'];

const LearningPage: React.FC = () => {
    //get Pack ID
    const {id} = useParams<{ id: string }>();

    function genID(serverNum: number) {
        return (serverNum + '' + (new Date).getTime());
    }

    const [first, setFirst] = useState<boolean>(true)
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [card, setCard] = useState<CardType>({
        _id: genID(2),
        type: 'Java',
        question: 'fake quessssstion',
        answer: `fake answerrrrr`,
        cardsPack_id: id,
        grade: 4.54654,
        rating: 0
    })


    //cards from redux
    const cards = useSelector<RootStateType, CardType[]>(state => state.cards.cards)

    const dispatch = useDispatch()

    //get cards use Pack ID
    useEffect(() => {

        console.log('Start UseEffect')

        if (first) {
            dispatch(getCards(id))
            setFirst(false)
        }

        console.log('cards in redux')

        if (cards.length > 0) {
            setCard(getCard(cards))

            return () => {
                console.log('learningPage clear effect ')
            }
        }
    }, [])

    const onNext = () => {
        setIsChecked(false);

        if (cards.length > 0) {
            setCard(getCard(cards));
        } else {

        }
    }

    const setGrade = (grade: number) => {
        const gradeObj = {
            grade: grade,
            card_id: card._id
        }
        dispatch(sendGrade(gradeObj))
    }

    const isAuth = useSelector<RootStateType, boolean>(state => state.login.isAuth)
    if (!isAuth) return <Redirect to={path.LOGIN}/>
    return (
        <div className={s.pageContainer}>
            <div key={card._id} className={s.wrapper}>
                <div>{card.question}</div>
                <div>{card._id}</div>
                <div>
                    <button onClick={() => setIsChecked(true)}>Проверить</button>
                </div>
                <div>
                    {
                        isChecked && (
                            <div>
                                <span>{card.answer}</span>
                                {
                                    grades.map((el, i) => (
                                        <button key={i} onClick={(e) => setGrade(i + 1)}>{el}</button>
                                    ))
                                }
                                <div>
                                    <button onClick={onNext}>Next</button>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default LearningPage