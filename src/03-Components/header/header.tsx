import React from 'react';
import s from './header.module.css'
import {NavLink} from 'react-router-dom';
import Logout from '../../02-Pages/01-Login/Logout';
import NavBar from '../NavBar/NavBar';
import {path} from '../../04-App/Routes/Routes';


function Header() {
    return (
        <div className={s.header}>
            <NavBar/>

            <div className={s.logo}>
                Study Point
                <span>.</span>
            </div>
                <nav className={s.nav}>
               <span className={s.item}>
                    <NavLink to={path.PROFILE} activeClassName={s.activeLink}>PROFILE</NavLink>
                </span>
                    <span className={s.item}>
                    <NavLink to={path.CARD_PACKS} activeClassName={s.activeLink}> CARDS PACK </NavLink>
                </span>
                    <span className={s.item}>
                    <NavLink to={path.LOGIN} activeClassName={s.activeLink}> SIGN IN </NavLink>
                </span>
                    <span className={s.item}>
                    <NavLink to={path.REG} activeClassName={s.activeLink}> SIGN UP </NavLink>
                </span>
                    <span className={s.item}>
                    <NavLink to={path.PASS_REC} activeClassName={s.activeLink}> RECOVERY PASSWORD </NavLink>
                </span>
                    <span className={s.item}>
                    <NavLink to={path.PASSWORD} activeClassName={s.activeLink}> CHANGE PASSWORD </NavLink>
                </span>
                    <span className={s.item}><Logout/></span>
                </nav>
        </div>
    );
}


export default Header;