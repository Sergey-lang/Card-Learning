import React from "react";
import style from "./RadioInput.module.css";


type RadioInputPropsType = {}

const RadioInput: React.FC<RadioInputPropsType> = (props) => {
    return <label className={style.radio}>
        <input type="radio" name="group"/>
        <span>Radio Button</span>
    </label>
}

export default RadioInput