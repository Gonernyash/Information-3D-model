import './app.css';
import MainCaption from './MainCaption';
import InterfaceMenu from './InterfaceMenu';
import AuthContainer from './AuthContainer';
import {useState} from 'react';

function App() {
    const defaultUserInfo = {
        default: true,
        name: 'Гость',
        role: 'User'
    }

    const [isAuth, setAuth] = useState(false);
    const [userInfo, setUserInfo] = useState(defaultUserInfo);

    if (isAuth) {
        return (
            <div className="container">
                <MainCaption />
                <InterfaceMenu userInfo={userInfo}/>
            </div>
        );
    } else {
        return(
            <AuthContainer setAuth={setAuth} setUserInfo={setUserInfo}/>
        );
    }
}
  
  export default App;