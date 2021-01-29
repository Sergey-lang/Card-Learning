import React from 'react';
import ModalWindow from '../Modal';
import UniversalButton from '../../Button/FormButton/UniversalButton';


type ModalDeletePropsType = {
    active: boolean,
    setActive: (active: boolean) => void,
    deleteModalHandlerYes: () => void
}

const ModalForDelete: React.FC<ModalDeletePropsType> = ({deleteModalHandlerYes, setActive, active}) => {
    const deleteModalHandlerNo = () => {
        setActive(false)
    }
    return <div>
        <ModalWindow active={active} setActive={setActive}>
            <h4>ARE YOU SURE?</h4>
            <UniversalButton onClick={deleteModalHandlerYes}>Yes</UniversalButton>
            <UniversalButton onClick={deleteModalHandlerNo}>No</UniversalButton>
        </ModalWindow>
    </div>

}

export default ModalForDelete;