import './AdminMenu.css';
import AdminContent from './AdminContent';
import {useState} from 'react';
import {Nav} from 'react-bootstrap';

function AdminMenu() {
    const [tab, setTab] = useState(0);

    return(
        <>
            <Nav variant="tabs" defaultActiveKey="link-1">
                <Nav.Item>
                    <Nav.Link eventKey="link-1" onSelect={() => setTab(0)}>3D-модель</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2" onSelect={() => setTab(1)}>Таблицы</Nav.Link>
                </Nav.Item>
            </Nav>
            <AdminContent tab={tab}/>
        </>
    );
}

export default AdminMenu;