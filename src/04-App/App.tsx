import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from './store';
import ProgressBar from '../03-Components/SuperComponents/ProgressBar/ProgressBar';
import './App.css';
import {authUser} from '../00-Redux/login-reducer';
import Header from '../03-Components/header/header';
import Routes from './Routes/Routes';
import ErrorSnackBar from '../03-Components/ErrorSnackBar/ErrorSnackBar';


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
