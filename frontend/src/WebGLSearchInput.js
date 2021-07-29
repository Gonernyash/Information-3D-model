import React, {useState} from 'react';
import './WebGLSearchInput.css';
import {DropdownButton, Dropdown} from 'react-bootstrap';
import WebGLSearchResultList from './WebGLSearchResultList';
import { infoModel } from './WebGLOutput';

function WebGLSearchInput() {

    const [title, setTitle] = useState('Что ищем?');
    const [table, setTable] = useState(null);
    const [resultItems, setResultItems] = useState(null);

    const selectItem = (key, event) => {
        infoModel._searchMenu.input.value = '';
        infoModel._searchMenu.resultList.classList.add('none');
        setTitle(event.target.innerText);
        setTable(key);
    }

    const searchData = (table) => {
        console.log(table);
        setResultItems(null);
        const req = infoModel._searchMenu.input.value;
        if (req === '') {
            infoModel._searchMenu.resultList.classList.add('none');
        } else {
            infoModel._searchMenu.resultList.classList.remove('none');
            fetch('http://backend/search.php', {
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
        <div className="webgl-search__input-container" id="WebGl-Search__inputContainer">
            <DropdownButton
                drop={'up'}
                variant="secondary"
                title={title}
                className="webgl-search__dropdown"
            >
                <Dropdown.Item eventKey="dvigateli" onSelect={(k, e) => selectItem(k, e)}>Двигатели</Dropdown.Item>
                <Dropdown.Item eventKey="shitki" onSelect={(k, e) => selectItem(k, e)}>Щиты</Dropdown.Item>
                {/* <Dropdown.Item eventKey="puskateli" onSelect={(k, e) => selectItem(k, e)}>Пускатели</Dropdown.Item>
                <Dropdown.Item eventKey="rele" onSelect={(k, e) => selectItem(k, e)}>Реле</Dropdown.Item> */}
            </DropdownButton>
            <div className="webgl-search__input-inner">
                <div id="WebGL-Search__resultList" className="webgl-search__result-list none">
                    <WebGLSearchResultList>{resultItems}</WebGLSearchResultList>
                </div>
                <input type="text" id="WebGl-Search__input" className="h6 webgl-search__input" placeholder="Поиск..." onInput={() => searchData(table)}></input>
            </div>
        </div>
    );
};


export default WebGLSearchInput;