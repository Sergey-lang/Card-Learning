import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../../04-App/store';
import {Redirect, useParams} from 'react-router-dom';
import {updateProfileData, UserDataType} from '../01-Login/auth-reducer';
import {PATH} from '../../04-App/Routes/Routes';
import stylesContainer from '../../assets/css/container.module.css';
import {authSelectors} from '../01-Login/00-index';
import Button from '../../03-Components/SuperComponents/Button/Button';
import {useForm} from 'react-hook-form';
import FileInput from './FileInput/FileInput';

type ProfilePropsType = {}

const Profile: React.FC<ProfilePropsType> = () => {

    const {register, handleSubmit, errors, setError, reset} = useForm();

    const [editMode, setEditMode] = useState<boolean>(false)

    const isAuth = useSelector<RootStateType, boolean>(authSelectors.selectorIsAuth)
    const profileData = useSelector<RootStateType, UserDataType | null>(authSelectors.selectorUserData)

    const {token} = useParams<Record<string, string | undefined>>();
    const tokenName = token ? token : ''

    const dispatch = useDispatch()
    const onSubmit = (data: { name: string }, e: any) => {
        dispatch(updateProfileData(data.name, '', tokenName))
        setEditMode(false)
    }

    if (!isAuth) {
        return <Redirect to={PATH.LOGIN}/>
    }

    return <div className={stylesContainer.container}>

        <div>
            <h4>PROFILE</h4>
            <div className={stylesContainer.inner}>
                <FileInput/>
                <div>
                    {
                        editMode
                            ? <form  onSubmit={handleSubmit(onSubmit)}>
                                <input name='name'
                                       type="text"
                                       placeholder={'Enter name'}
                                       autoFocus
                                       ref={register({
                                           required: true,
                                           validate: value => value.length >= 2
                                       })}
                                />
                                <Button>Save</Button>
                                <Button onClick={() => setEditMode(false)}>Cancel</Button>
                            </form>
                            : <div >
                                <span/>
                                <span>{profileData && profileData.name}</span>
                                <Button onClick={() => setEditMode(true)}
                                >Edit Name</Button>
                            </div>
                    }
                </div>
                <div>
                    <img src={profileData! && profileData.avatar} alt="" width={'50px'}/>
                </div>
                <div
                > {errors.name && 'Your last name is less than 2 characters'}
                </div>
                <div>
                    <div>
                        <p>{profileData && profileData.publicCardPacksCount}</p>
                        <p>PACKS</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
};

export default Profile;
