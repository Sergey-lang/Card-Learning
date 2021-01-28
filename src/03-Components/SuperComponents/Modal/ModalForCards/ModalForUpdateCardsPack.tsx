import React, {ChangeEvent} from 'react';
import ModalWindow from '../Modal';


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
            <p>Here You can do some changes</p>
            <input type={'text'} onChange={handlerForUpdateTitleCard}/>
            <button onClick={updateModalHandler}>Update</button>
            <button onClick={updateModalHandlerCancel}>Cancel</button>
        </ModalWindow>
    </div>
}

export default ModalForUpdateCardsPack;