import React, {ButtonHTMLAttributes, DetailedHTMLProps} from "react";
import style from "./Button.module.css";


type DefaultInputPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

type ButtonPropsType = DefaultInputPropsType & {}

export const Button: React.FC<ButtonPropsType> = ({children,onClick, disabled}) => {

    return <div className={style.container}>
        <button className={style.button} disabled={disabled} onClick={onClick}>{children}</button>
    </div>
}

export default Button;
