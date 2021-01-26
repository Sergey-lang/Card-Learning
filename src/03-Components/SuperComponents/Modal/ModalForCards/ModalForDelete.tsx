import React from 'react';
import ModalWindow from '../Modal';


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
            <p>Are you sure?</p>
            <button onClick={deleteModalHandlerYes}>Yes</button>
            <button onClick={deleteModalHandlerNo}>No</button>
        </ModalWindow>
    </div>

}

export default ModalForDelete;