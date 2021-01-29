import React, {ChangeEvent} from 'react';
import ModalWindow from '../Modal';
import UniversalInputText from '../../InputText/UniversalInputText';
import UniversalButton from '../../Button/FormButton/UniversalButton';


type ModalAddPropsType = {
    active: boolean,
    setActive: (active: boolean) => void
    addPackHandler: () => void,
    setNamePack: (e: string) => void,
    setTypeNewPack: (e: string) => void
}

const ModalForAddPack: React.FC<ModalAddPropsType> = ({
                                                          active, setActive,
                                                          addPackHandler, setNamePack, setTypeNewPack
                                                      }) => {


    const handlerForAddNamePack = (e: ChangeEvent<HTMLInputElement>) => {
        setNamePack(e.currentTarget.value)

    }
    const handlerForAddTypeNewPack = (e: ChangeEvent<HTMLInputElement>) => {
        setTypeNewPack(e.currentTarget.value)

    }

    const addCardHandlerCancel = () => {
        setActive(false)
    }
    return <div>
        <ModalWindow active={active} setActive={setActive}>
            <h4>ADD NEW PACK</h4>
            <p>TITLE NEW PACK</p><UniversalInputText type={'text'} onChange={handlerForAddNamePack}
                                                     placeholder={'Write title here'}/>
            <p>TYPE NEW PACK</p> <UniversalInputText type={'text'} onChange={handlerForAddTypeNewPack}
                                                     placeholder={'Write type of card pack here'}/>
            <UniversalButton onClick={addPackHandler}>ADD</UniversalButton>
            <UniversalButton onClick={addCardHandlerCancel}>CANCEL</UniversalButton>
        </ModalWindow>
    </div>

}

export default ModalForAddPack;
