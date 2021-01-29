import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import Profile from '../../02-Features/04-Profile/Profile';
import Login from '../../02-Features/01-Login/Login';
import Registration from '../../02-Features/02-Registration/Registration';
// import {ResetPassword} from '../../02-Features/03-PasswordRecovery/ResetPassword';
import {PasswordRecovery} from '../../02-Features/03-PasswordRecovery/PasswordRecovery';
import CardPacks from '../../02-Features/05-CardPacks/CardPacks';
import Cards from '../../02-Features/06-Cards/Cards';
import LearningPage from '../../02-Features/07-Learning/LearningPage';
import ErrorPage from '../../03-Components/NotFound/Error404';

import s from './Routes.module.css'

export const path = {
    LOGIN: '/login',
    REG: '/registration',
    PASSWORD_POST: '/newPassword/:token?',
    PASS_REC: '/passwordRecovery',
    PROFILE: '/profile',
    CARD_PACKS: '/card_packs',
    CARDS: '/cards',
    LEARNING: '/learning',
    ALL_COMPONENTS: '/allComponents',
}

function Routes() {
    return (
        <div className={s.routes}>
            <Switch>
                <Route path={'/'} exact render={() => <Profile/>}/>
                <Route path={path.LOGIN} exact render={() => <Login/>}/>
                <Route path={path.REG} exact render={() => <Registration/>}/>
                {/*<Route path={path.PASSWORD_POST} exact render={() => <ResetPassword/>}/>*/}
                <Route path={path.PASS_REC} exact render={() => <PasswordRecovery/>}/>
                <Route path={path.PROFILE} exact render={() => <Profile/>}/>
                <Route path={path.CARD_PACKS} exact render={() => <CardPacks/>}/>
                <Route path={path.CARDS + '/:id'} exact render={() => <Cards/>}/>
                <Route path={path.LEARNING + '/:id'} exact render={() => <LearningPage/>}/>
                <Route path={'/404'} render={() => <ErrorPage/>}/>
                <Redirect from={'*'} to={'/404'}/>
            </Switch>
        </div>
    );
}

export default Routes;