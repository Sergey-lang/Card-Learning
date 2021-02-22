import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../../04-App/store';

import s from './ErrorSnackBar.module.css'
import {setAppStatus} from '../../04-App/app-reducer';

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
