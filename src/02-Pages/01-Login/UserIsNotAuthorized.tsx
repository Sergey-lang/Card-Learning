import style from './UserIsNotAuthorixed.module.css';
import {NavLink} from 'react-router-dom';
import {path} from '../../04-App/App';
import React from 'react';

const UserIsNotAuthorized = React.memo(() => {
    return <div className={style.wrapper}>
        <h1>Please, first </h1>
        <NavLink to={path.LOGIN}> LogIn </NavLink>
        <span> or </span>
        <NavLink to={path.REG}> Registration </NavLink>
    </div>
});
export default UserIsNotAuthorized