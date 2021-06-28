import './AuthContainer.css';
import Auth from './Auth';

function AuthContainer(props) {
    return(
        <div className="auth__container">
            <h1 className="auth__caption">Авторизация</h1>
            <Auth setAuth={props.setAuth} setUserInfo={props.setUserInfo}/>
        </div>
    );
}

export default AuthContainer;