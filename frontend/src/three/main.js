import * as THREE from 'three';
import {vectorToArr} from './classes/Structure';
import init, {infoModel, container, SCENE, CAMERA, RENDERER, CONTROLS} from './init';
import scriptInit from './scriptInit';
 
function createScene() {
    init();
    container.appendChild(RENDERER.domElement);
    animate();    
}
 
async function chooseScene(sceneFileName) { // Функция для выбора структуры
    infoModel.clearScene(); // Очищаем сцену
    initLights(); // Создаем источники света
    // С сервера запрашивается скрипт той или иной модели
    const struct = await scriptInit(sceneFileName);  
    infoModel.selectStructure(struct); // Исполняем скрипт
    // Находим в DOM кнопку возвращения, скрытую по умолчанию
    const returnButton = document.getElementById('returnButton');
    // Если это скрипт комнаты или этажа, показываем кнопку возвращения
    const currentModel = infoModel.getCurrent();
    currentModel.prev ? returnButton.classList.remove('none')
    : returnButton.classList.add('none');
    infoModel.setCamera(250, 250, 250); // Устанавливаем камеру
    infoModel.addToScene(); // Отрисовываем модель
}

function initLights() {
    const ambient = new THREE.AmbientLight(0xffffff, 0.7);
    SCENE.add(ambient);

    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(0, 1, 1);
    SCENE.add(directionalLight);
}

//Создание осей
function axesInit() {
    const axes = new THREE.AxesHelper(200);
    SCENE.add(axes);
}

function render() {
    if (infoModel.current) {
        CAMERA.lookAt(...vectorToArr(infoModel.current.center));
    } else {
        CAMERA.lookAt(0, 0, 0);
    }
    
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

export default chooseScene;
export {createScene, enableOrbitControls, rendererResize};
