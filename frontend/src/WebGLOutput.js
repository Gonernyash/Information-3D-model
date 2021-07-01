import {useEffect, useRef} from 'react';
import WebGLInformation from './WebGLInformation';
import WebGLSearch from './WebGLSearch';
import WebGLReturnButton from './WebGLReturnButton';
import './WebGLOutput.css'
import InfoModel from './three/classes/InfoModel';

let infoModel = null;

function WebGLOutput() { // Компонент с 3D-моделью
    // Эта функция вызовется после отрисовки компонента
    useEffect(() => {
        infoModel = new InfoModel();
        infoModel.chooseScene('main.js'); // Выбор комнаты
    });
    // Ссылки на HTML-элементы
    const container = useRef(null);
    const blackout = useRef(null);
    const iconOpen = useRef(null);
    const iconClose = useRef(null); 
    const search = useRef(null);
    // Функция запуска сцены
    const start = (event) => {
        blackout.current.classList.add('none'); // Скрытие затемнения
        event.target.classList.add('none'); // Скрытие кнопки "Пуск"
        search.current.classList.remove('none'); // Показ кнопки поиска
        infoModel.enableOrbitControls(); // Вкл. управления камерой с помощью мыши 
    }

    let isFullScreen = false; // Переменная, отвечающая за вкл/выкл полноэкранного режима
    // Функция вкл/выкл полноэкранного режима
    const toggleFullscreen = () => {
        if (!isFullScreen) { // Если полноэкранный режим выкл. то включит его
            container.current.classList.add('fullscreen'); // Изменяем масштаб контейнера со сценой
            iconOpen.current.classList.add('none'); // Меняем иконку на кнопке
            iconClose.current.classList.remove('none');
        } else {
            container.current.classList.remove('fullscreen'); // Изменяем масштаб контейнера со сценой
            iconOpen.current.classList.remove('none'); // Меняем иконку на кнопке
            iconClose.current.classList.add('none');
        }
        infoModel.rendererResize(); // Изменяем масштаб сцены
        isFullScreen = !isFullScreen; // Переключаем переменную
    }
    // Возвращаем HTML
    return(
        <div className="webgl__container" ref={container}> {/*Контейнер со сценой*/}
            <div id="WebGL-Output" className="webgl__output"> </div> {/*Сцена*/}
            <div id='GUI-Container' className="gui__container"></div> {/*Окно с настройкой*/}
            <div id='WebGL-Blackout' className='webgl__blackout' ref={blackout}></div> {/*Затемнение*/}
            <button type='button' className="webgl__start" onClick={event => start(event)}></button> {/*Кнопка "Пуск"*/}
            {/*Кнопка перехода(выхода) в полноэкранный режим*/}
            <button type='button' id="WebGL-fullscreen" className="webgl__button webgl__fullscreen" onClick={toggleFullscreen}> 
                <i id='WebGL-FSIcon--closed' className="bi bi-arrows-angle-expand webgl__icon" ref={iconOpen}></i> {/*Иконка "Открыть полноэкранный режим"*/}
                <i id='WebGL-FSIcon--opened' className="bi bi-arrows-angle-contract webgl__icon none" ref={iconClose}></i> {/*Иконка "Закрыть полноэкранный режим"*/}
            </button>
            <WebGLSearch ref={search}/> {/*Меню поиска*/}
            <WebGLReturnButton />
            <WebGLInformation /> {/* Карточка оборудования */}
        </div>
    );
}

export default WebGLOutput
export {infoModel}

