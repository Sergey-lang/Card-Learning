import React, {ChangeEvent, useState} from 'react';
import {NavLink} from 'react-router-dom';
import {Button} from '../Button/Button';
import {Input} from '../Input/Input';

import s from './SendingForm.module.css';

type PropsType = {
    formName: string
    formDescription?: string
    callback: (value1: string, value2?: string | undefined) => void
    status?: string
    inputPlaceholder?: string
    inputType: string

    buttonName: string
    btnDisabled: boolean

    navLinkPath?: string

    restProps?: any
}

export const SendingForm: React.FC<PropsType> = (
    {
        formName,
        formDescription,

        callback,
        status,
        inputPlaceholder,

        inputType,
        buttonName,
        btnDisabled,

        navLinkPath,

        ...restProps
    }
) => {

    const [value, setValue] = useState<string>('')

    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const buttonOnClick = () => {
        callback(value)
        //clear local state field
        setValue('')
    }

    return (
        <div className={s.formWrapper}>
            <h1 className={s.pageName}>{formName}</h1>
            <div className={s.inner}>
                <h3 className={s.title}>{formDescription}</h3>
                {
                    status && <span className={s.statusMessage}>{status}</span>
                }
                <div className={s.recoveryForm}>
                    <div className={s.fieldBlock}>
                        <Input type={inputType}
                               onEnter={buttonOnClick}
                               value={value}
                               placeholder={inputPlaceholder && inputPlaceholder}
                               className={s.input}
                               onChange={inputHandler}/>
                        <Button onClick={buttonOnClick}
                                disabled={btnDisabled}
                                className={s.btn}>{buttonName}
                        </Button>
                        <NavLink to={navLinkPath ? navLinkPath : ''} className={s.loginLink}>Login</NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
};