import React from 'react';
import {NavLink} from 'react-router-dom';
import {path} from '../../04-App/Routes/Routes';

import s from './Error404.module.css'

function ErrorPage() {
    return (<div className={s.errorPage}>
            <h1>404</h1>
            <span className={s.firstP}>Page not found</span>
            <span className={s.secondP}>Sorry, but the page you were looking for doesn’t exist.</span>
            <span className={s.thirdP}>Go back to
                  <span className={s.item}>
                    <NavLink to={path.PROFILE} activeClassName={s.activeLink}>PROFILE</NavLink>
                </span>
            </span>
        </div>
    );
}

export default ErrorPage;
