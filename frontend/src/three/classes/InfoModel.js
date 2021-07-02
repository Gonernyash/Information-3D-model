import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
import {Interaction} from 'three.interaction';
import {GUIInit} from '../GUI';
import scriptInit from '../scriptInit';

class InfoModel {
// Объявление свойств
    // Компоненты THREE JS 
    _scene = null;
    _camera = null;
    _renderer = null;
    _controls = null;
    // Элементы DOM
    _output = null;
    _container = null;
    _blackout = null;
    _fullScreenIcon = null;
    _returnButton = null;
    _info = null;
    _searchMenu = null;
    _startButton = null;
    // Параметры состояния сцены
    _structures = [];
    _objects = [];
    _models = [];
    _current = null;
    _target = null;
    _cameraZoom = 200; // 200 - значение по умолчанию
    _sceneWidth = 0;
    _sceneHeight = 0;
    _isFullScreen = false;
    
    constructor() {
        this._webglAnimate = this._webglAnimate.bind(this);

        this._webglInit();
        this._webglStart();
    }

    async chooseScene(src) {
        this.closeInfo();
        this.clearScene(); // Очищаем сцену
        this._initLights(); // Создаем источники света
        if (!src) src = this._target.src;
        // С сервера запрашивается скрипт той или иной модели
        const struct = await scriptInit(src);
        this.selectStructure(struct); // Исполняем скрипт
        // Если это скрипт комнаты или этажа, показываем кнопку возвращения
        const currentModel = this.getCurrent();
        currentModel.prev ? this._returnButton.classList.remove('none')
        : this._returnButton.classList.add('none');
        this.setCameraZoom(); // Устанавливаем камеру
        this.addToScene(); // Отрисовываем модель
    }

    _webglInit() {
        this._output = document.getElementById('WebGL-Output');
        this._container = document.getElementById('WebGL-Container');
        this._blackout = document.getElementById('WebGL-Blackout');
        this._fullScreenIcon = {
            opened: document.getElementById('WebGL-FSIcon--opened'),
            closed: document.getElementById('WebGL-FSIcon--closed')
        } 
        this._returnButton = document.getElementById('WebGL-ReturnButton');
        this._info = document.getElementById('WebGL-Info');
        this._searchMenu = document.getElementById('WebGL-Search');
        this._startButton = document.getElementById('WebGL-StartButton');

        this._sceneWidth = this._output.offsetWidth;
        this._sceneHeight = window.innerHeight / (window.innerWidth / this._sceneWidth);
        this._scene = new THREE.Scene();
        this._camera = new THREE.PerspectiveCamera(45, this._sceneWidth / this._sceneHeight , 0.1, 1000);
        this.setCameraZoom();
        this._renderer = new THREE.WebGLRenderer();
        this._renderer.setClearColor(0xEEEEEE, 1);
        this._renderer.setSize(this._sceneWidth, this._sceneHeight);
        new Interaction(this._renderer, this._scene, this._camera);
        this._setOrbitControls();
        GUIInit();
    }
    
    _webglStart() {
        this._output.appendChild(this._renderer.domElement);
        this._webglAnimate();
    }

    _webglRender() {
        if (this._current) {
            this._camera.lookAt(...this.vectorToArr(this._current.center));
        } else {
            this._camera.lookAt(0, 0, 0);
        }

        this._renderer.render(this._scene, this._camera);
    }

    _webglAnimate() {
        requestAnimationFrame(this._webglAnimate);
        this._controls.update();
        this._webglRender();
    }

    _setOrbitControls() {
        this._controls = new OrbitControls(this._camera, this._output);
        this._controls.update();
        this._controls.autoRotateSpeed = 1;
        this.disableOrbitControls();
    }

    modelStart() {
        this._blackout.classList.add('none'); // Скрытие затемнения
        this._startButton.classList.add('none'); // Скрытие кнопки "Пуск"
        this._searchMenu.classList.remove('none'); // Показ кнопки поиска
        this.enableOrbitControls(); // Вкл. управления камерой с помощью мыши
    }

    modelStop() {
        this._blackout.classList.remove('none'); 
        this._startButton.classList.remove('none'); 
        this._searchMenu.classList.add('none'); 
        this.disableOrbitControls(); 
    }

    openFullScreen() {
        this._container.classList.add('fullscreen'); // Изменяем масштаб контейнера со сценой
        this._fullScreenIcon.closed.classList.add('none'); // Меняем иконку на кнопке
        this._fullScreenIcon.opened.classList.remove('none');
        this.rendererAutoResize();
        this._isFullScreen = true;
    }

    closeFullScreen() {
        this._container.classList.remove('fullscreen'); // Изменяем масштаб контейнера со сценой
        this._fullScreenIcon.closed.classList.remove('none'); // Меняем иконку на кнопке
        this._fullScreenIcon.opened.classList.add('none');
        this.rendererAutoResize();
        this._isFullScreen = false;
    }

    toggleFullScreen() {
        this._isFullScreen ? this.closeFullScreen() : this.openFullScreen();
    }

    rendererAutoResize() {
        const sceneWidth = this._output.offsetWidth ;
        const sceneHeight = window.innerHeight / (window.innerWidth / sceneWidth);
        this._renderer.setSize(sceneWidth, sceneHeight);
    }

    enableOrbitControls() {
        this._controls.autoRotate = false;
        this._controls.enableRotate = true;
        this._controls.enableZoom = true;
    }

    disableOrbitControls() {
        this._controls.autoRotate = true;
        this._controls.enableRotate = false;
        this._controls.enableZoom = false;
    }

    showInfo() {
        this._info.classList.remove('none');
    }

    closeInfo() {
        this._info.classList.add('none');
        this.hideHightlight();
    }

    hideHightlight() {
        this.hideModelsHightlights();
        this.hideLinkPoints();
    }

    returnBack() {
        const current = this.getCurrent();
        if (current.prev) {
            this.closeInfo();
            this.chooseScene(current.prev.src);
        }
    }

    _setAxes() {
        const axes = new THREE.AxesHelper(200);
        this._scene.add(axes);
    }

    _initLights() {
        const ambient = new THREE.AmbientLight(0xffffff, 0.7);
        this._scene.add(ambient);

        const directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(0, 1, 1);
        this._scene.add(directionalLight);
    }

    setCameraZoom(zoom) {
        if (zoom) this._cameraZoom = zoom;
        this._camera.position.set(this._cameraZoom, this._cameraZoom, this._cameraZoom);
    }

    setTarget(target) {
        this._target = target;
    }

    getCurrent() {
        return this._current
    }

    addStructure(struct) {
        this._structures.push(struct);
    }


    findStructures(callback) {
        return this._structures.find(callback);
    }

    selectStructure(struct) {
        // Получаем объекты, сгенерированные скриптом
        this._objects.push(...struct.getObjects()); 
        // Если были загружены внешние модели, переносим их в отдельный массив
        if (struct._models) this._models.push(...struct._models);
        this._current = struct; // Указываем активную структуру
    }

    hideModelsHightlights() {
        if (this._current) this._current.models.forEach(model => {
            model.hideHightlight();
        })
    }

    hideLinkPoints() {
        if (this._current) this._current.linkPoints.forEach(point => point.material.color.set(0x005000));
    }

    addToScene() {
        this._objects.forEach(obj => {
            this._scene.add(obj);
        })
    }

    clearScene() {
        this._objects = [];
        this._scene.clear();
    }

    toVector(x, y, z) {
        return {
            x: x,
            y: y,
            z: z
        }
    }

    vectorToArr(obj) {
        return [obj.x, obj.y, obj.z]
    }
}

export default InfoModel;