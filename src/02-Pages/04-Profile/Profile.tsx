import React from 'react';
import {useSelector} from 'react-redux';
import {RootStateType} from '../../04-App/store';
import {Redirect} from 'react-router-dom';
import {UserDataType} from '../../00-Redux/login-reducer';
import {path} from '../../04-App/Routes/Routes';
import stylesContainer from '../../03-Components/container/container.module.css';


type ProfilePropsType = {}

const Profile: React.FC<ProfilePropsType> = () => {
    const profileData = useSelector<RootStateType, UserDataType>(state => state.login.user)

    const isAuth = useSelector<RootStateType, boolean>(state => state.login.isAuth)
    if (!isAuth) {
        return <Redirect to={path.LOGIN}/>
    }

    return <div className={stylesContainer.container}>

        <div>
            <h4>PROFILE</h4>

            <div className={stylesContainer.inner}>
            <p>user name:{profileData.name}</p>
                <hr/>
            <p>cards packs count{profileData.publicCardPacksCount}</p>
            </div>
        </div>
    </div>
};


export default Profile;