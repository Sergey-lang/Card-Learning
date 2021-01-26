import React, {ChangeEvent} from 'react';
import ModalWindow from '../Modal';


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
            <p>Add new card</p>
            QUESTION<input type={'text'} onChange={handlerForAddQuestionCard}/>
            ANSWER <input type={'text'} onChange={handlerForAddAnswerCard}/>
            type <input type={'text'} onChange={handlerForAddTypeCard}/>
            <button onClick={addCardHandler}>ADD</button>
            <button onClick={addCardHandlerCancel}>Cancel</button>
        </ModalWindow>
    </div>

}

export default ModalForAddCards;
