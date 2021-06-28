import './Auth.css';
import {useState, useRef} from 'react';
import {Spinner} from 'react-bootstrap'; 

function Auth(props) {
    const [isLoad, setIsLoad] = useState(true);

    const usernameInput = useRef(null);
    const passwordInput = useRef(null);
    const err = useRef(null);

    const login = () => {
        const username = usernameInput.current.value;
        const password = passwordInput.current.value;
        setIsLoad(false);

        fetch('http://server/login.php', {
        method: 'POST',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: `username=${username}&password=${password}`
        }).then(res => res.json())
        .then(res => {
            authHandle(res)
        });
    }

    const authHandle = (data) => {
        console.log(data);
        setIsLoad(true);
        if (data.isLogged) {
            const userInfo = {
                default: false,
                name: data.name,
                role: data.role
            };
            props.setUserInfo(userInfo);
            props.setAuth(true);
        } else {
            err.current.classList.add('auth__err--show');
            setTimeout(() => err.current.classList.remove('auth__err--show'), 2000)
        }
    }

    if (isLoad) {
        return(
            <>
                <div className="auth__row">
                    <h4>Логин</h4>
                    <input type="username" className="auth__input form-control" ref={usernameInput}></input>
                </div>
                <div className="auth__row">
                    <h4>Пароль</h4>
                    <input type="password" className="form-control auth__input" ref={passwordInput}></input>
                </div>
                <button type="button" className="auth__button" onClick={login}>
                    <h4>Войти</h4>
                </button>
                <h6 className="auth__link" onClick={() => props.setAuth(true)}>Войти как гость</h6>
                <h6 className="auth__err" ref={err}>Ошибка авторизации: Неверный логин или пароль</h6>
            </>
        );
    } else {
        return(
            <div className="webgl__spinner">
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
        );
    } 
}

export default Auth