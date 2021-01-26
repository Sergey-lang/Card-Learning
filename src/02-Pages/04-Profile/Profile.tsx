import React from 'react';
import style from './Profile.module.css';
import {useSelector} from 'react-redux';
import {RootStateType} from '../../04-App/store';
import { Redirect } from 'react-router-dom';
import {path} from '../../04-App/App';




type ProfilePropsType = {}

const Profile: React.FC<ProfilePropsType> = () => {
    //const profileData = useSelector<RootStateType>(state => state)
    const isAuth = useSelector<RootStateType, boolean>(state => state.login.isAuth)
    if (!isAuth) {
        return <Redirect to={path.LOGIN} />
    }

    return <div className={style.wrapper}>

             <div>
                <h1>Profile</h1>
                <p>user name</p>
               </div>
    </div>
};


export default Profile;