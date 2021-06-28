import React, {useState, useRef} from 'react';
import './WebGLSearchInput.css';
import {DropdownButton, Dropdown} from 'react-bootstrap';
import WebGLSearchResultList from './WebGLSearchResultList';

const WebGLSearchInput = React.forwardRef((props, ref) => {

    const [title, setTitle] = useState('Что ищем?');
    const [table, setTable] = useState(null);
    const [resultItems, setResultItems] = useState(null);

    const input = useRef(null);
    const resultList = useRef(null);

    const selectItem = (key, event) => {
        input.current.value = '';
        resultList.current.classList.add('none');
        setTitle(event.target.innerText);
        setTable(key);
    }

    const searchData = (event, table) => {
        setResultItems(null);
        const req = event.target.value;
        if (req === '') {
            resultList.current.classList.add('none');
        } else {
            resultList.current.classList.remove('none');
            fetch('http://server/search.php', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                body: `req=${req}&table=${table}` 
            }).then(res => {console.log(res); return res.json()})
            .then(res => {
                console.log(res);
                setResultItems(res);
            }); 
        }
    }

    return(
        <div className="webgl-search__input-container" ref={ref} id="WebGl-inputContainer">
            <DropdownButton
                drop={'up'}
                variant="secondary"
                title={title}
                className="webgl-search__dropdown"
            >
                <Dropdown.Item eventKey="dvigateli" onSelect={(k, e) => selectItem(k, e)}>Двигатели</Dropdown.Item>
                <Dropdown.Item eventKey="shitki" onSelect={(k, e) => selectItem(k, e)}>Щиты</Dropdown.Item>
                <Dropdown.Item eventKey="puskateli" onSelect={(k, e) => selectItem(k, e)}>Пускатели</Dropdown.Item>
                <Dropdown.Item eventKey="rele" onSelect={(k, e) => selectItem(k, e)}>Реле</Dropdown.Item>
            </DropdownButton>
            <div className="webgl-search__input-inner">
                <div id="webgl-resultList" className="webgl-search__result-list none" ref={resultList}>
                    <WebGLSearchResultList>{resultItems}</WebGLSearchResultList>
                </div>
                <input type="text" id="WebGl-input" className="h6 webgl-search__input" placeholder="Поиск..." ref={input} onInput={(event) => searchData(event, table)}></input>
            </div>
        </div>
    );
});


export default WebGLSearchInput;