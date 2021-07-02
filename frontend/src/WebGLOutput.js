import {useEffect} from 'react';
import WebGLInformation from './WebGLInformation';
import WebGLSearch from './WebGLSearch';
import WebGLReturnButton from './WebGLReturnButton';
import './WebGLOutput.css'
import InfoModel from './three/classes/InfoModel';

let infoModel = null;

function WebGLOutput() { // Компонент с 3D-моделью
    // Эта функция вызовется после отрисовки компонента
    useEffect(() => {
        infoModel = new InfoModel(); // Инициализация WebGL сцены
        infoModel.chooseScene('main.js'); // Выбор комнаты
    });

    return(
        <div className="webgl__container" id='WebGL-Container'> {/*Контейнер со сценой*/}
            <div id="WebGL-Output" className="webgl__output"> </div> {/*Сцена*/}
            <div id='GUI-Container' className="gui__container"></div> {/*Окно с настройкой*/}
            <div id='WebGL-Blackout' className='webgl__blackout'></div> {/*Затемнение*/}
            <button type='button' id='WebGL-StartButton' className="webgl__start" onClick={() => infoModel.modelStart()}></button> {/*Кнопка "Пуск"*/}
            {/*Кнопка перехода(выхода) в полноэкранный режим*/}
            <button type='button' id="WebGL-fullscreen" className="webgl__button webgl__fullscreen" onClick={() => infoModel.toggleFullScreen()}> 
                <i id='WebGL-FSIcon--closed' className="bi bi-arrows-angle-expand webgl__icon"></i> {/*Иконка "Открыть полноэкранный режим"*/}
                <i id='WebGL-FSIcon--opened' className="bi bi-arrows-angle-contract webgl__icon none"></i> {/*Иконка "Закрыть полноэкранный режим"*/}
            </button>
            <WebGLSearch /> {/*Меню поиска*/}
            <WebGLReturnButton />
            <WebGLInformation /> {/* Карточка оборудования */}
        </div>
    );
}

export default WebGLOutput
export {infoModel}

