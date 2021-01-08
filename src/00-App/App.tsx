import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {Page404} from '../02-Pages/03-Page404/Page404'
import {Login} from '../02-Pages/00-Login/Login'
import {Registration} from '../02-Pages/01-Registration/Registration'
import {Profile} from '../02-Pages/02-Profile/Profile'
import {PasswordRecovery} from '../02-Pages/04-PasswordRecovery/PasswordRecovery'
import {CreateNewPassword} from '../02-Pages/05-CreateNewPassword/CreateNewPassword'
import {TestPage} from '../02-Pages/06-TestPage/TestPage'

import s from './App.module.css'
import {Header} from "./Header/Header";

type AppProps = {
    //todo: check this type!
}

export const PATH = {
    LOGIN: '/login',
    REGISTRATION: '/registration',
    PROFILE: '/profile',
    PASSWORD_RECOVERY: '/password-recovery',
    CREATE_NEW_PASSWORD: '/create-new-password',
    TEST_PAGE: '/test-page',
}

export const App: React.FC<AppProps> = ({}) => {
    return (
        <div className={s.app}>
            <Header/>
            <div className={s.content}>
                <Switch>
                    <Route exact path="/" render={() => <Redirect to={PATH.TEST_PAGE}/>}/>
                    <Route path={PATH.LOGIN} render={() => <Login/>}/>
                    <Route path={PATH.REGISTRATION} render={() => <Registration/>}/>
                    <Route path={PATH.PROFILE} render={() => <Profile/>}/>
                    <Route path={PATH.PASSWORD_RECOVERY} render={() => <PasswordRecovery/>}/>
                    <Route path={PATH.CREATE_NEW_PASSWORD} render={() => <CreateNewPassword/>}/>
                    <Route path={PATH.TEST_PAGE} render={() => <TestPage/>}/>
                    <Route render={() => <Page404/>}/>
                </Switch>
            </div>
        </div>
    )
}

