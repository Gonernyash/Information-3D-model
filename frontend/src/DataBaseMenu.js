import './DataBaseMenu.css';
import DataBaseTable from './DataBaseTable';
import DataBaseEdit from './DataBaseEdit';
import {Dropdown} from 'react-bootstrap';
import {useState, useEffect} from 'react';

function DataBaseMenu() {
    const [table, setTable] = useState('Оборудование');
    const [data, setData] = useState([[]]);

    const getData = (val) => {
        fetch('http://server/tableData.php', {
        method: 'POST',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: `table=${val}`
        }).then(res => res.json())
        .then(res => {
            console.log(res);
            setTable(val);
            setData(res);
        });
    }

    useEffect(()=>{
        getData('Оборудование');
    }, []);

    return (
        <div className='db-menu'>
<Dropdown className="db-dropdown"> {/*Выпадающий список*/}
    <Dropdown.Toggle id="dropdown-basic"> {/*В закрытом состоянии*/}
        {table} {/*Тут выводится название текущей таблицы*/}
    </Dropdown.Toggle>

    <Dropdown.Menu> {/*В открытом состоянии*/}
        {/*Список элементов для выбора*/}
        {/*Функция-обработчик getData отправляет запрос на сервер, val - имя таблицы*/}
        <Dropdown.Item eventKey={'Оборудование'} onSelect={(val) => getData(val)}>
            Оборудование</Dropdown.Item>
        <Dropdown.Item eventKey={'Здания'} onSelect={(val) => getData(val)}>
            Здания</Dropdown.Item>
        <Dropdown.Item eventKey={'Комнаты'} onSelect={(val) => getData(val)}>
            Комнаты</Dropdown.Item>
        <Dropdown.Item eventKey={'Электродвигатели'} onSelect={(val) => getData(val)}>
            Электродвигатели</Dropdown.Item>
        <Dropdown.Item eventKey={'Щиты'} onSelect={(val) => getData(val)}>
            Щиты</Dropdown.Item>
        <Dropdown.Item eventKey={'Пускатели'} onSelect={(val) => getData(val)}>
            Пускатели</Dropdown.Item>
        <Dropdown.Item eventKey={'Автовыключатели'} onSelect={(val) => getData(val)}>
            Автовыключатели</Dropdown.Item>
        <Dropdown.Item eventKey={'Реле'} onSelect={(val) => getData(val)}>
            Реле</Dropdown.Item>
        <Dropdown.Item eventKey={'Ключи'} onSelect={(val) => getData(val)}>
            Ключи</Dropdown.Item>
        <Dropdown.Item eventKey={'Лампы'} onSelect={(val) => getData(val)}>
            Лампы</Dropdown.Item>
        <Dropdown.Item eventKey={'Кнопки'} onSelect={(val) => getData(val)}>
            Кнопки</Dropdown.Item>
    </Dropdown.Menu>
</Dropdown>
            
            <div className='db-menu__inner'>
                <DataBaseTable data={data}/>
                <DataBaseEdit table={table}/>
            </div>
        </div>
    );
}

export default DataBaseMenu;