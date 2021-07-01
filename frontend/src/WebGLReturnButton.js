import './WebGLReturnButton.css';
import './index.css';
import {infoModel} from './WebGLOutput';
import {closeInfo} from './WebGLInformation';


function WebGLReturnButton() {
    function goBack() {
        const current = infoModel.getCurrent();
        if (current.prev) {
            const info = document.getElementById('WebGL-info');
            closeInfo(info);
            infoModel.chooseScene(current.prev.src);
        }
    }

    return(
        <button className="webgl__return-button none" id="returnButton" onClick={goBack}>
            <i className="bi bi-box-arrow-in-left webgl__return-icon"></i>
            <h5 className="webgl__return-caption">Вернуться</h5>
        </button>
    );
}

export default WebGLReturnButton;