import React, { DetailedHTMLProps, InputHTMLAttributes, } from "react";
import style from "./Input.module.css";

export type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

type InputTextPropsType = DefaultInputPropsType & {
    onEnter?: () => void
};

export const Input: React.FC<InputTextPropsType> = ({placeholder,type,onChange,value, onKeyPress, onEnter}) => {

    const onKeyPressCallback = (e: React.KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e)

        e.key === 'Enter'
        && onEnter
        && onEnter()
    }

    return <div className={style.inputContainer}>
        <input className={style.input}
               onKeyPress={onKeyPressCallback}
               type={type}
               value={value}
               onChange={onChange}
               placeholder={placeholder}/>
        <span className={style.focusBorder}/>
    </div>
}

export default Input;
