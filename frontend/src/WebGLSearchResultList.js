import {Spinner, ListGroup} from 'react-bootstrap';

function WebGLSearchResultList(props) {

    function selectItem(event, id) {
        console.log(id);
        console.log(event);
    }

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
            const dbID = item.shift();
            const text = item.join(' ');
            return (
                <ListGroup.Item as='button' eventKey={dbID} key={i} onClick={(ev, id) => selectItem(ev, id)}>
                    {text}
                </ListGroup.Item>
            );
        });
        console.log(list);
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