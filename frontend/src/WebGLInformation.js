import "./WebGLInformation.css";
import WebGLGetData from "./WebGLGetData";
import {infoModel} from './WebGLOutput';

function WebGLInformation() {
    return(
        <div id="WebGL-Info" className="webgl__info none">
            <button type="button" className="webgl__info__close" onClick={() => infoModel.closeInfo()}></button>
            <WebGLGetData />
        </div>
    );
}

export default WebGLInformation;
