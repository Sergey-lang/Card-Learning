import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../00-Redux/store';
import ProgressBar from '../03-Components/SuperComponents/ProgressBar/ProgressBar';
import {authUser} from '../00-Redux/login-reducer';
import Header from '../02-Features/00-Header/Header';
import Routes from './Routes/Routes';
import ErrorSnackBar from '../03-Components/ErrorSnackBar/ErrorSnackBar';

import './App.css';

const App: React.FC = () => {

    const error = useSelector<RootStateType, string | null>((state) => state.app.appState.error)
    const appStatus = useSelector<RootStateType, string>((state) => state.app.appState.status)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(authUser())
    }, []);

    return <div className='App'>
        <Header/>
        {appStatus === 'loading' ? <ProgressBar/> : null}
        <Routes/>
        {error && <ErrorSnackBar errorMessage={error}/>}
    </div>
}

export default App;
