import './DataBaseEdit.css';
import DataBaseEditForm from './forms/DataBaseEditForm';
import {Nav} from 'react-bootstrap';
import {useState} from 'react';

function DataBaseEdit(props) {
    const [action, setAction] = useState("Insert");

    if (props.table !== 'Оборудование') {
        return(
            <div className="db-menu__edit">
                <Nav variant="tabs" defaultActiveKey="Insert">
                    <Nav.Item>
                        <Nav.Link eventKey="Insert" onSelect={(val) => setAction(val)}>Добавить</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="Update" onSelect={(val) => setAction(val)}>Изменить</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="Delete" onSelect={(val) => setAction(val)}>Удалить</Nav.Link>
                    </Nav.Item>
                </Nav>
                <DataBaseEditForm table={props.table} action={action}/>
            </div>
        );
    } else {
        return(
            <div className="db-menu__edit">
                <h4>Таблица только для чтения!</h4>
            </div>
        );
    }
    
}

export default DataBaseEdit