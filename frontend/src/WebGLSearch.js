import './WebGLSearch.css';
import React from 'react';
import WebGLSearchInput from './WebGLSearchInput';
import { infoModel } from './WebGLOutput';

function WebGLSearch() {
    return (
        <div className="webgl-search__container none" id="WebGL-Search">
            <button type='button' id="WebGL-Search__button" className="webgl-search__button webgl__button" onClick={() => infoModel.toggleSearchBar()}>
                <i className="bi bi-search webgl__icon" id="WebGL-Search__icon--opened" ></i>
                <i className="bi bi-x webgl__icon none" id="WebGL-Search__icon--closed" ></i>
            </button>
            <WebGLSearchInput />
        </div>
    );
}
    
export default WebGLSearch;