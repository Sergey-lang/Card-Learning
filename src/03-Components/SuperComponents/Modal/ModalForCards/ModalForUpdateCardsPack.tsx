import React, {ChangeEvent} from 'react';
import ModalWindow from '../Modal';
import UniversalInputText from '../../InputText/UniversalInputText';
import UniversalButton from '../../Button/FormButton/UniversalButton';


type ModalUpdatePropsType = {
    active: boolean,
    setActive: (active: boolean) => void,
    setTitleCard: (t: string) => void,
    updateModalHandler: () => void
}

const ModalForUpdateCardsPack: React.FC<ModalUpdatePropsType> = ({setActive, active, setTitleCard, updateModalHandler}) => {

    const handlerForUpdateTitleCard = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleCard(e.currentTarget.value)
    }
    const updateModalHandlerCancel = () => {
        setActive(false)
    }
    return <div>
        <ModalWindow active={active} setActive={setActive}>
            <h4>HERE YOU CAN CHANGE THIS PACK</h4>
            <UniversalInputText type={'text'} onChange={handlerForUpdateTitleCard} placeholder={'Write a new title for pack'}/>
            <UniversalButton onClick={updateModalHandler}>Update</UniversalButton>
            <UniversalButton onClick={updateModalHandlerCancel}>Cancel</UniversalButton>
        </ModalWindow>
    </div>
}

export default ModalForUpdateCardsPack;