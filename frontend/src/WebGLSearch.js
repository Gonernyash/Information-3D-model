import './WebGLSearch.css';
import React, {useRef} from 'react';
import {closeInfo} from './WebGLInformation';
import WebGLSearchInput from './WebGLSearchInput';

let isOpen = false;

const WebGLSearch = React.forwardRef((props, ref) => {
    const button = useRef(null);
    const input = useRef(null);
    const searchIcon = useRef(null);
    const closeIcon = useRef(null);

    // document.addEventListener('click', (event) => {
    //     const target = event.target;
    //     console.log(target);
    //     if (!target.closest('#WebGL-search') && !target.closest('#WebGL-fullscreen')) closeSearch(ref.current);
    // }, false);

    const toggleSearch = () => {
        if (!isOpen) {
            searchIcon.current.classList.add('none');
            closeIcon.current.classList.remove('none');
            button.current.classList.add('webgl-search__button--opened');
            input.current.classList.add('webgl-search__input-container--opened');
            input.current.focus();
            const info = document.getElementById('WebGL-info');
            closeInfo(info);
            isOpen = true;
        } else {
            closeSearch(ref.current);
        }
    };

    return (
        <div ref={ref} className="webgl-search__container none" id="WebGL-search">
            <button type='button'  className="webgl-search__button webgl__button" ref={button} onClick={toggleSearch}>
                <i className="bi bi-search webgl__icon" ref={searchIcon}></i>
                <i className="bi bi-x webgl__icon none" ref={closeIcon}></i>
            </button>
            <WebGLSearchInput ref={input}/>
        </div>
    );
}) 

function closeSearch(searchBlock) {
    const button = searchBlock.getElementsByTagName('button');
    const inputContainer = document.getElementById('WebGl-inputContainer');
    const input = document.getElementById('WebGl-input');
    const resultList = document.getElementById('webgl-resultList');
    const searchIcon = searchBlock.getElementsByClassName('bi-search');
    const closeIcon = searchBlock.getElementsByClassName('bi-x');

    searchIcon[0].classList.remove('none');
    closeIcon[0].classList.add('none');

    button[0].classList.remove('webgl-search__button--opened');
    inputContainer.classList.remove('webgl-search__input-container--opened');

    resultList.classList.add('none');
    input.value = '';

    isOpen = false;
}
    
export default WebGLSearch;