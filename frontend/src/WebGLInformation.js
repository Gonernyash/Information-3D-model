import {useRef} from 'react';
import "./WebGLInformation.css";
import WebGLGetData from "./WebGLGetData";
import {infoModel} from './WebGLOutput';

function WebGLInformation() {
    const info = useRef(null);
    const setScene = () => {
        closeInfo(info.current);
        infoModel.chooseScene(infoModel.target.src);
    }
    return(
        <div id="WebGL-info" className="webgl__info none" ref={info}>
            <button type="button" className="webgl__info__close" onClick={() => closeInfo(info.current)}></button>
            <WebGLGetData setScene={setScene}/>
        </div>
    );
}

function closeInfo(info) {
    info.classList.add('none'); 
    infoModel.hideModelsHightlights();
    infoModel.hideLinkPoints();
}

export default WebGLInformation;
export {closeInfo};
