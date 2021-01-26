import React, {ChangeEvent} from 'react';
import ModalWindow from '../Modal';


type ModalUpdatePropsType = {
    active: boolean,
    setActive: (active: boolean) => void,
    setQuestionCard: (q: string) => void,
    setAnswerCard: (a: string) => void,
    updateModalHandler: () => void
}

const ModalForUpdateCard: React.FC<ModalUpdatePropsType> = ({setActive, active, setQuestionCard, setAnswerCard, updateModalHandler}) => {
    const handlerForUpdateQuestionCard = (e: ChangeEvent<HTMLInputElement>) => {
        setQuestionCard(e.currentTarget.value)
    }
    const handlerForUpdateAnswerCard = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswerCard(e.currentTarget.value)
    }
    const updateModalHandlerCancel = () => {
        setActive(false)
    }

    return <div>
        <ModalWindow active={active} setActive={setActive}>
            <p>Here You can do some changes</p>
            <input type={'text'} onChange={handlerForUpdateQuestionCard}/>
            <input type={'text'} onChange={handlerForUpdateAnswerCard}/>
            <button onClick={updateModalHandler}>Update</button>
            <button onClick={updateModalHandlerCancel}>Cancel</button>
        </ModalWindow>
    </div>
}

export default ModalForUpdateCard;