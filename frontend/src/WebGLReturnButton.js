import './WebGLReturnButton.css';
import './index.css';
import {infoModel} from './WebGLOutput';


function WebGLReturnButton() {
    return(
        <button className="webgl__return-button none" id="WebGL-ReturnButton" onClick={() => infoModel.returnBack()}>
            <i className="bi bi-box-arrow-in-left webgl__return-icon"></i>
            <h5 className="webgl__return-caption">Вернуться</h5>
        </button>
    );
}

export default WebGLReturnButton;