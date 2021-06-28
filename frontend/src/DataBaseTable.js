import './DataBaseTable.css';
import {Table} from 'react-bootstrap';

function DataBaseTable(props) {
    // Извлекаем наименования столбцов, содержащиеся в 0-ом элементе массива data
    // и оборачиваем их в тег <th> 
    const thread = props.data[0].map((heading, i) =><th key={i}>{heading}</th>);
    const tbody = [];
    // Проходимся по остальным элементам массива data 
    for (let i = 1; i < props.data.length; i++) {
        // Каждое отдельное значение оборачиваем в тег <td>
        const tr = props.data[i].map((item, i) =><td key={i}>{item}</td>);
        // А группу этих значений в тег <tr>
        tbody.push(<tr key={tbody.length}>{tr}</tr>);
    }
    console.log(thread);
    return(
        <div className="db-menu__table">
            <Table striped bordered hover className="db-table">
                <thead>
                    <tr>
                        {thread} {/*Наименования столбцов*/}
                    </tr>
                </thead>
                <tbody>
                    {tbody} {/*Непосредственно содержимое таблицы*/}
                </tbody>
            </Table>
        </div>
    );
}

export default DataBaseTable;