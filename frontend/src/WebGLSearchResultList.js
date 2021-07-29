import {Spinner, ListGroup} from 'react-bootstrap';
import { infoModel } from './WebGLOutput';

function WebGLSearchResultList(props) {
    if (props.children === null) {
        return(
            <ListGroup.Item>
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </ListGroup.Item>
        );
    } else {
        const list = props.children.map((item, i) => {
            return (
                <ListGroup.Item as='button' key={i} onClick={() => infoModel.goToModel(item)}>
                    {item.result}
                </ListGroup.Item>
            );
        });

        if (list.length === 0) {
            return(
                <ListGroup>
                    <ListGroup.Item>Ничего не найдено</ListGroup.Item>
                </ListGroup>
            );
        } else {
            return(
                <ListGroup>
                    {list}
                </ListGroup>
            );
        }
    }  
}

export default WebGLSearchResultList;