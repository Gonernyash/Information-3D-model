import './InterfaceMenu.css';
import WebGLOutput from './WebGLOutput';
import AdminMenu from './AdminMenu';

function InterfaceMenu(props) {
    if (props.userInfo.default) {
        return(
            <WebGLOutput />
        );
    } else {
        return(
            <AdminMenu />
        );
    }
}

export default InterfaceMenu;