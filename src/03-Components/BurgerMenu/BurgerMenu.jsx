import React, {useState} from 'react'
import Menu from "./menu/menu";
import s from './Burger.module.scss'



function BurgerMenu({items}) {
    const [menuActive, setMenuActive] = useState(false)
    return (
        <div className={s.header}>
            <div className={s.burgerBtn} onClick={() => setMenuActive(!menuActive)}>
               X
            </div>
            <Menu items={items} header={'menu'} active={menuActive} setActive={setMenuActive}/>
        </div>
    );
}

export default BurgerMenu;