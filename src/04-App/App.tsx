import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from './store';
import ProgressBar from '../03-Components/SuperComponents/ProgressBar/ProgressBar';
import {getAuthUserData} from '../02-Features/01-Login/auth-reducer';
import Header from '../02-Features/00-Header/Header';
import Routes from './Routes/Routes';
import ErrorSnackBar from '../03-Components/ErrorSnackBar/ErrorSnackBar';

import './App.css';
import {appSelectors} from './00-index';

const App: React.FC = () => {

    const appStatus = useSelector<RootStateType, string>(appSelectors.selectorAppStatus)
    // const finalStyle = appStatus === 'loading' ? `${s.fullOverlay} ${s.activeFullOverlay}` : s.fullOverlay

    const error = useSelector<RootStateType, string | null>(appSelectors.selectorError)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAuthUserData())
    }, []);

    return <div className='App'>
        <Header/>
        {appStatus === 'loading' ? <ProgressBar/> : null}
        <Routes/>
        {error && <ErrorSnackBar errorMessage={error}/>}
    </div>
}

export default App;
