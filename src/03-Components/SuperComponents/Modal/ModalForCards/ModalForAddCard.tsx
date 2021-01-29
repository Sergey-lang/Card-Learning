import React, {ChangeEvent} from 'react';
import ModalWindow from '../Modal';
import UniversalInputText from '../../InputText/UniversalInputText';
import UniversalButton from '../../Button/FormButton/UniversalButton';


type ModalAddPropsType = {
    active: boolean,
    setActive: (active: boolean) => void
    addCardHandler: () => void,
    setNewQuestionCard: (q: string) => void,
    setNewAnswerCard: (q: string) => void,
    setTypeNewCard: (t: string) => void
}

const ModalForAddCards: React.FC<ModalAddPropsType> = ({
                                                           active, setActive,
                                                           addCardHandler, setNewQuestionCard, setNewAnswerCard, setTypeNewCard
                                                       }) => {


    const handlerForAddQuestionCard = (e: ChangeEvent<HTMLInputElement>) => {
        setNewQuestionCard(e.currentTarget.value)

    }
    const handlerForAddAnswerCard = (e: ChangeEvent<HTMLInputElement>) => {
        setNewAnswerCard(e.currentTarget.value)

    }
    const handlerForAddTypeCard = (e: ChangeEvent<HTMLInputElement>) => {
        setTypeNewCard(e.currentTarget.value)

    }
    const addCardHandlerCancel = () => {
        setActive(false)
    }
    return <div>
        <ModalWindow active={active} setActive={setActive}>
            <h4>ADD NEW CARD</h4>
            <p>QUESTION</p><UniversalInputText type={'text'} onChange={handlerForAddQuestionCard} placeholder={'Write your question here'}/>
            <p>ANSWER</p> <UniversalInputText type={'text'} onChange={handlerForAddAnswerCard} placeholder={'Be sure to specify the answer'}/>
            <p>TYPE</p> <UniversalInputText type={'text'} onChange={handlerForAddTypeCard} placeholder={'Specify a type'}/>
            <UniversalButton onClick={addCardHandler}>ADD</UniversalButton>
            <UniversalButton onClick={addCardHandlerCancel}>Cancel</UniversalButton>
        </ModalWindow>
    </div>

}

export default ModalForAddCards;
