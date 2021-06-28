import './AdminContent.css';
import WebGLOutput from './WebGLOutput';
import DataBaseMenu from './DataBaseMenu';

function AdminContent(props) {
    if (props.tab === 0) {
        return(
            <WebGLOutput />
        );
    } else if (props.tab === 1) {
        return(
            <DataBaseMenu />
        );
    }
}

export default AdminContent;