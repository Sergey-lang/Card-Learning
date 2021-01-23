import style from './ErrorSnackBar.module.css'
import {useDispatch, useSelector} from "react-redux";

import {setAppErrorAC} from "../../00-Redux/app-reducer";
import {RootStateType} from '../../04-App/store';

type ErrorSnackBarPropsType = {
    errorMessage: string
}

const ErrorSnackBar = (props: ErrorSnackBarPropsType) => {
    const dispatch = useDispatch()
    const error = useSelector<RootStateType, string | null>(state => state.app.error)

    const onClickHandler = () => dispatch(setAppErrorAC(null))

    return <div className={error ? `${style.notification}` : `: ${style.closeNotification}`}>
        <div className={style.text}> {props.errorMessage} </div>
        <div className={`${style.close}`}>
            <div className={style.text} onClick={onClickHandler}>X</div>
        </div>
    </div>
};

export default ErrorSnackBar;