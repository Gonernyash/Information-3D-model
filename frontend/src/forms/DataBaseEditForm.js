import './DataBaseEditForm';
import {Dropdown} from 'react-bootstrap';
import ZdaniyaForm from './ZdaniyaForm';
import RoomsForm from './RoomsForm';
import MotorsForm from './MotorsForm';
import ShitkiForm from './ShitkiForm';
import PuskateliForm from './PuskateliForm';
import VikluchateliForm from './VikluchateliForm';
import ReleForm from './ReleForm';
import KluchiForm from './KluchiForm';
import LampiForm from './LampiForm';
import KnopkiForm from './KnopkiForm';
import { useState } from 'react';
import { Form } from 'react-bootstrap';

function DataBaseEditForm(props) {
    let result;
    switch (props.table) { // Выбираем нужные поля ввода взависимости от выбранной таблицы
        case 'Здания': result = <ZdaniyaForm action={props.action} />; break;
        case 'Комнаты': result = <RoomsForm action={props.action} />; break;
        case 'Электродвигатели': result = <MotorsForm action={props.action}/>; break;
        case 'Щиты': result = <ShitkiForm action={props.action}/>; break;
        case 'Пускатели': result = <PuskateliForm action={props.action}/>; break;
        case 'Автовыключатели': result = <VikluchateliForm action={props.action}/>; break;
        case 'Реле': result = <ReleForm action={props.action}/>; break;
        case 'Ключи': result = <KluchiForm action={props.action}/>; break;
        case 'Лампы': result = <LampiForm action={props.action}/>; break;
        case 'Кнопки': result = <KnopkiForm action={props.action}/>; break;
        default: console.error('Error: Wrong or missing table prop');
    }
    // Если выбрана вкладка "Добавить", то возвращаем поля ввода и кнопку для добавления данных
    if (props.action === 'Insert') { 
        return(
                <>
                    {result} {/*Поля ввода*/}
                    <button type="button" className="db-menu__button" onClick={insertData}> 
                        <h3>Добавить</h3>
                    </button>
                </>
        );
    }
    // Если выбрана вкладка "Изменить", то возвращаем поля ввода и кнопку для изменения данных
    if (props.action === 'Update') { 
        return(
                <>
                    {result} {/*Поля ввода*/}
                    <button type="button" className="db-menu__button" onClick={updateData}> 
                        <h3>Изменить</h3>
                    </button>
                </>
        );
    }
    // Если выбрана вкладка "Удалить", то возвращаем поля ввода и кнопку для удаления данных
    if (props.action === 'Delete') { 
        return(
                <>
                    {result} {/*Поля ввода*/}
                    <button type="button" className="db-menu__button" onClick={deleteData}> 
                        <h3>Удалить</h3>
                    </button>
                </>
        );
    }
}

function setRow(caption) {
    return (
        <div className="db-menu__row">
            <h5>{caption}</h5>
            <input type="text" className="db-menu__input form-control"></input>
        </div>
    );
}

function SetInput(props) {
    const items = props.data.map((item, i) => <Dropdown.Item key={i} eventKey={item} onSelect={(value) => setCaption(value)}>{item}</Dropdown.Item>);
    const [caption, setCaption] = useState(props.data[0]);

    return(
        <div className="db-menu__row">
            <h5>{props.caption}</h5>
            <Dropdown className="db-dropdown db-menu__input">
                <Dropdown.Toggle id="dropdown-basic">
                    {caption}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {items}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}

function SetTextarea(props) {
    return(
        <Form.Group className="mb-3 db-menu__input" controlId="ControlTextarea1">
            <Form.Label><h5>{props.caption}</h5></Form.Label>
            <Form.Control as="textarea" rows={3} />
        </Form.Group>
    );
}

function insertData() {

}

function updateData() {

}

function deleteData() {

}



export default DataBaseEditForm;
export {setRow, SetInput, SetTextarea}