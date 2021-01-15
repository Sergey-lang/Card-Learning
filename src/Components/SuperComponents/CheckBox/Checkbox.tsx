import React, {ChangeEvent} from 'react';
import style from './Checkbox.module.css';


type CheckboxPropsType = {
    title: string,
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
};

const Checkbox: React.FC<CheckboxPropsType> = ({title, onChange}) => {


    return <div className={style.container}>
        <label className={style.pureMaterialCheckbox}>
            <input type={'checkbox'} className={style.input} onChange={onChange}/>
            <span className={style.spanClassName}>  {title}  </span>
        </label>


    </div>
}

export default Checkbox;
