import {vectorToArr} from './Room';
import init, {container, SCENE, CAMERA, RENDERER, CONTROLS} from './init';
import myRoom, {main} from './main';
import eventsInit from './events';

function createScene() {
    init();
    main()
    .then(() => {
        myRoom.addToScene(SCENE);
        eventsInit();
        container.appendChild(RENDERER.domElement);
        animate();
    })     
}

function render() {
    CAMERA.lookAt(...vectorToArr(myRoom.center));
    RENDERER.render(SCENE, CAMERA);
}
    
function animate() {
    requestAnimationFrame(animate);
    CONTROLS.update();
    render();
    
}

function enableOrbitControls() {
    CONTROLS.autoRotate = false;
    CONTROLS.enableRotate = true;
    CONTROLS.enableZoom = true;
}

function rendererResize() {
    const sceneWidth = container.offsetWidth ;
    const sceneHeight = window.innerHeight / (window.innerWidth / sceneWidth);
    RENDERER.setSize(sceneWidth, sceneHeight);
}

export default createScene;
export {enableOrbitControls, rendererResize};
