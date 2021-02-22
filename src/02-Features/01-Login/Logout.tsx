import React from 'react';
import s from './Logout.module.css';
import {logout} from './auth-reducer';
import {useDispatch} from 'react-redux';

type LoginPropsType = {}

const Logout: React.FC<LoginPropsType> = () => {

    const dispatch = useDispatch()

    let onclickHandler = () => {
        dispatch(logout())
    }
    return (
        <span className={s.logoutForm} onClick={onclickHandler}> LOGOUT</span>
    )
}

export default Logout;
