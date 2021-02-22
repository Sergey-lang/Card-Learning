import React from 'react';
import {CardType} from '../../06-Cards/cards-reducer';
import Button from '../../../03-Components/SuperComponents/Button/Button';
import UniversalButton from '../../../03-Components/SuperComponents/Button/FormButton/UniversalButton';

type LearnCardElementPropsType = {
    card: CardType,
    checked: boolean,
    setIsChecked: (value: boolean) => void
    onNextCard: (value: number) => void
    grades: string[]
}

export const LearnCardElement: React.FC<LearnCardElementPropsType> = (
    {
        card,
        checked,
        setIsChecked,
        onNextCard,
        grades
    }
) => {

    const nextCard = (value: number) => {
        onNextCard(value)
    }

    const mappedButton = grades.map((el, i) => (
        <Button key={i}
                onClick={(e) => nextCard(i + 1)}>{el}</Button>
    ))

    return (
        <div>
            <h5>QUESTION</h5>
            <h4>{card.question}</h4>
            <p>ID карты: {card._id}</p>
            <div>
                {
                    !checked && <UniversalButton onClick={(e) => setIsChecked(true)}>CHECK</UniversalButton>
                }
            </div>
            <div>
                {
                    checked && (
                        <div>
                            <hr/>
                            <h4>Answer: {card.answer}</h4>
                            <p>Type: {card.type}</p>
                            <p>Grade: {card.grade}</p>
                            <div>
                                {
                                    mappedButton
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
