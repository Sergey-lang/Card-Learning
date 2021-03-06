import React from 'react';
import {NavLink} from 'react-router-dom';
import Logout from '../01-Login/Logout';
import {PATH} from '../../04-App/Routes/Routes';
import s from './Header.module.css'
import BurgerMenu from '../../03-Components/BurgerMenu/BurgerMenu';

function Header() {
    let items = ['PROFILE', 'CARDS PACK', 'SIGN IN', 'SIGN UP', 'RECOVERY PASSWORD']
    return (
        <div className={s.header}>
            <div className={s.logo}>
                Study Point
                <span>.</span>
            </div>
            <div className={s.nav}>
               <span className={s.item}>
                    <NavLink to={PATH.PROFILE} activeClassName={s.activeLink}>PROFILE</NavLink>
                </span>
                <span className={s.item}>
                    <NavLink to={PATH.CARD_PACKS} activeClassName={s.activeLink}> CARDS PACK </NavLink>
                </span>
                <span className={s.item}>
                    <NavLink to={PATH.LOGIN} activeClassName={s.activeLink}> SIGN IN </NavLink>
                </span>
                <span className={s.item}>
                    <NavLink to={PATH.REG} activeClassName={s.activeLink}> SIGN UP </NavLink>
                </span>
                <span className={s.item}>
                    <NavLink to={PATH.PASS_REC} activeClassName={s.activeLink}> RECOVERY PASSWORD </NavLink>
                </span>
                <span className={s.item}><Logout/></span>
            </div>
            <BurgerMenu items={items}/>
        </div>
    );
}

export default Header;

{/*<span className={s.item}>*/
}
{/*    <NavLink to={path.PASSWORD_POST} activeClassName={s.activeLink}> CHANGE PASSWORD </NavLink>*/
}
// {/*</span>*/}todo:it's should be privat link(check token in url!)
