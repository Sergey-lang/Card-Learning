import s from "../App.module.css";
import {NavLink} from "react-router-dom";
import React from "react";
import {PATH} from "../App";

export const Header: React.FC = () => {

    return <header className={s.mainNav}>
        <nav className={s.navLink}>
            <ul className={s.ulItems}>
                <li className={s.item}>
                    <NavLink to={PATH.LOGIN} activeClassName={s.selected}>LOGIN</NavLink>
                </li>
                <li className={s.item}>
                    <NavLink to={PATH.REGISTRATION} activeClassName={s.selected}>REGISTRATION</NavLink>
                </li>
                <li className={s.item}>
                    <NavLink to={PATH.PROFILE} activeClassName={s.selected}>PROFILE</NavLink>
                </li>
                <li className={s.item}>
                    <NavLink to={PATH.PASSWORD_RECOVERY} activeClassName={s.selected}>PASSWORD RECOVERY</NavLink>
                </li>
                <li className={s.item}>
                    <NavLink to={PATH.CREATE_NEW_PASSWORD} activeClassName={s.selected}>CREATE NEW PASSWORD</NavLink>
                </li>
                <li className={s.item}>
                    <NavLink to={PATH.TEST_PAGE} activeClassName={s.selected}>TEST PAGE</NavLink>
                </li>
            </ul>
        </nav>
    </header>;
}