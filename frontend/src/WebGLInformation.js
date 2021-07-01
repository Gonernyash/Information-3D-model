import {useRef} from 'react';
import "./WebGLInformation.css";
import WebGLGetData from "./WebGLGetData";
import {infoModel} from './WebGLOutput';

function WebGLInformation() {
    const info = useRef(null);
    const setScene = () => {
        infoModel.closeInfo(info.current);
        infoModel.chooseScene(infoModel.target.src);
    }
    return(
        <div id="WebGL-Info" className="webgl__info none" ref={info}>
            <button type="button" className="webgl__info__close" onClick={() => infoModel.closeInfo(info.current)}></button>
            <WebGLGetData setScene={setScene}/>
        </div>
    );
}

export default WebGLInformation;
