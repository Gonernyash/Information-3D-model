import * as dat from 'dat.gui';
import myRoom from './scriptInit';

const GUIControls = {
    showGrid: false,
    showHightlight: false
}

function GUIInit() {
    const container = document.getElementById('GUI-Container');
    const gui = new dat.GUI({autoPlace: false, closeOnTop: true});
    gui.close();
    const controllerGrid = gui.add(GUIControls, 'showGrid', false);
    const controllerHightlight = gui.add(GUIControls, 'showHightlight', false);
    container.appendChild(gui.domElement);

    controllerGrid.onChange((state) => {
        myRoom.grid.forEach(line => line.visible = state);
    })

    controllerHightlight.onChange((state) => {
        myRoom.models.forEach(model => state ? model.showHightlight() : model.hideHightlight());
    })

}

export default GUIControls;
export {GUIInit}