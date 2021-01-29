import React, {useState} from 'react';
import Button from '../Button/Button';
import UniversalInputText from '../InputText/UniversalInputText';


type PropsType = {
    formName: string
    callback: (value1: string) => void
    placeholder?: string
    inputType?: string
    buttonName: string
    btnDisabled: boolean
    restProps?: any
}

export const SearchForm: React.FC<PropsType> = ({formName, placeholder, btnDisabled, inputType = 'text', callback}) => {

    const [value, setValue] = useState<string>('')

    const changeState = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    //this will be thunk callback, this is test request
    const onSendRequest = () => {
        callback(value)
    }

    return (
        <div>
            <span>{formName}</span>
            <UniversalInputText type={inputType} placeholder={placeholder} value={value} onChange={changeState}/>
            <Button onClick={onSendRequest} disabled={btnDisabled}>Search</Button>
        </div>
    )
}

export default SearchForm;
