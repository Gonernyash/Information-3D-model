import Room from './Room';

class InfoModel {

    _container = null;
    _scene = null;
    _camera = null;
    _renderer = null;
    _controls = null;
    
    _structures = [];
    _objects = [];
    _models = [];
    _current = null;
    _target = null;
    
    constructor(scene, camera, renderer) {
        this._container = document.getElementById('WebGL-Output');
        this._scene = scene;
        this._camera = camera;
        this._renderer = renderer;
    }

    createRoom(sizeVector, posVector, wallThick, color, opacity, params) {
        const room = new Room(sizeVector, posVector, wallThick, color, opacity, params);
        this.rooms.push(room);
        return room;
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
        this._current.models.forEach(model => {
            model.hideHightlight();
        })
    }

    hideLinkPoints() {
        this._current.linkPoints.forEach(point => point.material.color.set(0x005000));
    }

    setCamera(x, y, z) {
        this._camera.position.set(x, y, z)
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
}

export default InfoModel;