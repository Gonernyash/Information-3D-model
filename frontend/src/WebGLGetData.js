import {useState, useEffect} from 'react';
import {infoModel} from './WebGLOutput';
import {Spinner} from 'react-bootstrap';

let defaulStateCallback;
let modelDataCallback;
let floorDataCallback;
let roomDataCallback;

function WebGLGetData() {

    let [items, setItems] = useState([]);
    
    useEffect(() => {
        defaulStateCallback = () => {
            setItems([]);
        }

        modelDataCallback = result => {
            if (result["refs"]) {
                const refs = result["refs"].split(', ');
                infoModel._current.models.forEach(model => {
                    if (refs.indexOf(String(model.dbID)) > -1) {
                        model.showHightlight(0xff0000);
                    }
                })
            }
            
            delete result["refs"];

            const info = [<h4 key={'table'} className="webgl__property webgl__heading">{result["table"]}</h4>];
            delete result["table"];
            for (let prop in result) {
                info.push(<h6 key={info.length}><span className="webgl__property">{prop}</span>{result[prop]}</h6>);
            }
            setItems(info);
        };

        floorDataCallback = result => {
            const info = [<h4 key={'table'} className="webgl__property webgl__heading">{result.shift()[0]}</h4>];
            if (result.length === 0) {
                info.push(<h6 key={0}>Комнаты не найдены</h6>);
            } else {
                info.push(<h6 key={-1}>Комнаты:</h6>);
                const items = result.map((item, i) => <li key={i}><h6>{item[0]}</h6></li>);
                info.push(<ul className="webgl__items-list" key={items.length}>{items}</ul>);
            }
            info.push(
                <button className="webgl__infobtn" key={info.length} onClick={() => infoModel.chooseScene()}>
                    <h6 className="webgl__infobtn__caption">Подробнее</h6>
                </button>
            );
            setItems(info);
        }

        roomDataCallback = result => {
            const info = [
                <h4 key={0} className="webgl__property webgl__heading">Здание: {result[0]}</h4>,
                <h4 key={1} className="webgl__property webgl__heading">Комната: {result[1]}</h4>,
                <h5 key={2}>Описание:</h5>,
                <h6 key={3}>{result[2]}</h6>
            ];
            info.push(
                <button className="webgl__infobtn" key={info.length} onClick={() => infoModel.chooseScene()}>
                    <h6 className="webgl__infobtn__caption">Подробнее</h6>
                </button>
            );
            setItems(info);
        }
    });


    if (items.length === 0) {
        return(
            <div className="webgl__spinner">
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
        );
    } else {
        return(     
            <div className="webgl__info__mark">
                {items}
            </div>
        );
    }
    
}

function showModelInformation(event) {
    // Показываем пользователю значок загрузки
    defaulStateCallback(); 
    // Показываем пользователю окно с информацией
    infoModel.showInfo(); 
    // Модель по которой было совершено нажатие
    const target = event.target.parentObj.prototype; 
    // Скрытие подсветки всех моделей в комнате
    infoModel.hideModelsHightlights();
    // Подсветка той модели, по которой было совершено нажатие
    target.showHightlight();

    const id = target.dbID; // id модели в БД

    // Отправка запроса на сервер
    fetch('http://backend/modelData.php', {
        method: 'POST', // Для отправки используем метод POST
        headers: {
            // Помечаем отправные ланные как данные с формы
            'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: "id=" + id // Сами данные
    }).then(res => res.json()) // Ответ декодируем из JSON
    .then(res => {
        // После чего выводим информацию в окно с информацией
        modelDataCallback(res); 
    });
}

function showFloorInformation(event) {
    defaulStateCallback();

    // Показываем пользователю окно с информацией
    infoModel.showInfo(); 

    const target = event.target.parentObj;
    infoModel.setTarget(target);

    infoModel.hideModelsHightlights();
    target.showHightlight();

    const buildingID = target.dbInfo.buildingID;
    const floor = target.dbInfo.floor;
    fetch('http://backend/floorData.php', {
        method: 'POST',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: `building=${buildingID}&floor=${floor}` 
    }).then(res => res.json())
    .then(res => {
        floorDataCallback(res);
    });
}

function showRoomInformation(event) {
    defaulStateCallback();

    // Показываем пользователю окно с информацией
    infoModel.showInfo(); 

    const target = event.target;
    infoModel.setTarget(target);

    infoModel.hideLinkPoints();
    target.material.color.set(0xffffff);

    const roomID = target.dbID;
    fetch('http://backend/roomData.php', {
        method: 'POST',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: `room=${roomID}` 
    }).then(res => res.json())
    .then(res => {
        roomDataCallback(res);
    });
}

export default WebGLGetData;
export {showModelInformation, showFloorInformation, showRoomInformation};