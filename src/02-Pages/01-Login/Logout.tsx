import React from 'react';
import style from './Logout.module.css';
import {deleteAuthUserData} from '../../00-Redux/login-reducer';
import {useDispatch} from 'react-redux';


type LoginPropsType = {}

const Logout: React.FC<LoginPropsType> = () => {

    const dispatch = useDispatch()

    let onclickHandler = () => {
        dispatch(deleteAuthUserData())
    }
    return (
        <span className={style.logoutForm} onClick={onclickHandler}> LOGOUT</span>
    )
};

export default Logout;