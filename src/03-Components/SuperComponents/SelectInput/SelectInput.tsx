import React from "react";
import style from "./SelectInput.module.css";


type SelectInputPropsType = {}

const SelectInput: React.FC<SelectInputPropsType> = (props) => {
    return <div className={style.select}>
        <select className={style.selectText} required>
            <option value="0" defaultValue={'Default Value'}> Default Value </option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
        </select>
        <span className={style.selectHighlight}/>
        <span className={style.selectBar}/>
        <label className={style.selectLabel}>Select</label>
    </div>
}

export default SelectInput