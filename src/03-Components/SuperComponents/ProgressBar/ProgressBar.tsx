import React from "react";
import s from "./ProgressBar.module.css";

type ProgressBarTextPropsType = {

};

export const ProgressBar: React.FC<ProgressBarTextPropsType> = () => {

    const loadingValue = {
        width: '100%'
    }

    return <div className={s.progress}>
        <span className={s.progressBar} style={loadingValue}/>
    </div>
}

export default ProgressBar;
