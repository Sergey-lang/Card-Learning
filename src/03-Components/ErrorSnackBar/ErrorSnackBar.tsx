import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../../00-Redux/store';
import {setAppStatus} from '../../00-Redux/appState-reducer';

import s from './ErrorSnackBar.module.css'

type ErrorBarPropsType = {
    errorMessage: string
}

const ErrorSnackBar = (props: ErrorBarPropsType) => {

    const dispatch = useDispatch()
    const error = useSelector<RootStateType, string | null>(state => state.app.appState.error)

    const onClickHandler = () => dispatch(setAppStatus({status: 'idle', error: null}))

    return (
        <div className={error ? `${s.notification}` : `: ${s.closeNotification}`}>
            <div className={s.text}> {props.errorMessage} </div>
            <div className={`${s.close}`}>
                <div className={s.text} onClick={onClickHandler}>X</div>
            </div>
        </div>
    )
}

export default ErrorSnackBar;