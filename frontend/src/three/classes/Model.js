import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import InfoModel from './InfoModel';

class Model {

    _obj = null;
    _original = null;
    _isClone = false;
    _src = '';
    _parent = null;
    _size = null;
    _position = null;
    _rotationIndex = 0;
    _hightlight = null;
    _interactionCube = null;
    _options = null;
    _color = null;
    _events = null;
    _dbID = null;

    constructor(src, sizeVector, posVector, rotation, options, parent, dbID) {
        
        this._parent = parent;
        this._options = options ?? {};
        this._size = sizeVector;
        this._position = posVector;
        this._rotationIndex = rotation ?? 0;
        this._dbID = dbID ?? null;

        if (src instanceof Model) {
            this._original = src
            this._src = src.getSrc();
            this._isClone = true;
            const origOptions = this._original.getOptions();
            // Наследуем все параметры оригинала, но
            // если их значения отличаются от значений, переданных в аргументе options при инициализации,
            // то перезаписываем их в пользу options
            this._options = Object.assign(origOptions, this._options);
        } else {
            this._original = null;
            this._src = src;
            this._isClone = false;
        }

        this._color = this._options.color ?? 0x535254;
        this._events = this._options.events ?? {};
    }

    setObj(obj) {
        obj.prototype = this;
        this._obj = obj;
    }

    getObj() {
        return this._obj;
    }

    getSrc() {
        return this._src;
    }

    getOriginal() {
        return this._original;
    }

    getOptions() {
        return this._options;
    }

    getColor() {
        return this._color;
    }

    getEvents() {
        return this._events
    }

    getDBid() {
        return this._dbID;
    }

    getInteractionCube() {
        return this._interactionCube;
    }

    getHightlightCube() {
        return this._hightlight;
    }

    load() {
        if (this._src) {
            const loader = new GLTFLoader();
            return new Promise(resolve => {
                loader.load('http://backend/modelLoader.php?model=' + this._src, gltf => {
                    this.setObj(gltf.scene);
                    resolve();
                })
            });
        } else {
            console.error('Model loading error! src is undefined')
        }
    }

    clone(original) {
        const obj = original.getObj();
        const clone = obj.clone();
        this.setObj(clone);
    }

    init() {
        this._setTexture();
        this._setSize();
        this._setPosition();
        this._applyOptions();
        this._setHighlight();
        this._setInteraction();
        this._setEvents();
    }

    _setTexture() {
        const color = this.getColor();
        const texture = new THREE.MeshStandardMaterial({color: color});
        this._obj.traverse(child => {
            if (child instanceof THREE.Mesh) {
                child.material = texture;
            }
        });
    }

    _setSize() {
        if (!this._size) {
            const original = this.getOriginal();
            if (original) {
                this._size = original._size;
            } else {
                console.error('Null "size" argument value')
            }
        }

        const THREEsize = {
            x: this._size.y,
            y: this._size.z,
            z: this._size.x
        };

        // Установка размеров модели
        // Размеры в Three JS указываются в scale.
        // (scale - величина, определяющая во сколько раз изменится размер модели по сравнению с изначальным)
        // Выставляем scale = 1 (оригинальный размер модели)
        this._obj.scale.set(1, 1, 1);

        // Находим размер модели
        const origSizeBox = new THREE.Box3().setFromObject(this._obj)
        const origSize = new THREE.Vector3();
        origSizeBox.getSize(origSize);

        // Находим scale, в который нужно возвести модель для соответствия заданным размерам
        const scale = InfoModel.toVector(
            THREEsize.x / origSize.x,
            THREEsize.y / origSize.y,
            THREEsize.z / origSize.z
        );
        this._obj.scale.set(scale.x, scale.y, scale.z);
    }

    getSize() {
        return this._size;
    }

    _setPosition() {
        if (!this._position) {
            const original = this.getOriginal();
            if (original) {
                this._position = original._position;
            } else {
                console.error('Null "position" argument value')
            }
        }
        const rotation = this._rotationIndex;

        // Поворачиваем модель
        if (rotation) {
            this._rotationIndex = rotation;
            switch (rotation) {
                case 1: 
                    this._obj.rotateY(Math.PI * 0.5);
                break;
                case 2: 
                    this._obj.rotateY(Math.PI)
                break;
                case 3: 
                    this._obj.rotateY(Math.PI * 1.5);
                break;
                default: console.error('Wrong rotation value in setModelPosition function');
            }
        } 

        // !Центр, установленный автором модели, может на самом деле не являтся центром(lol)
        // Определение центра модели
        const box = new THREE.Box3().setFromObject(this._obj);
        const center = new THREE.Vector3();
        box.getCenter(center);

        // Установка центра модели в начало координат (0, 0, 0)
        this._obj.position.sub(center);

        const wallThick = this._parent.getWallThickness();
        const THREEpos = {
            x: this._position.y,
            y: this._position.z,
            z: this._position.x
        }
        const THREEsize = {
            x: this._size.y,
            y: this._size.z,
            z: this._size.x
        }

        // Устанавливаем позицию учитывая поворот модели
        switch (rotation) {
            case 1:
                this._obj.position.x += THREEpos.x + THREEsize.z / 2 + wallThick;
                this._obj.position.y += THREEpos.y + THREEsize.y / 2 + wallThick;
                this._obj.position.z += THREEpos.z + THREEsize.x / 2 + wallThick;
            break;
            case 2:
                this._obj.position.x += THREEpos.x + THREEsize.x / 2 + wallThick;
                this._obj.position.y += THREEpos.y + THREEsize.y / 2 + wallThick;
                this._obj.position.z += THREEpos.z + THREEsize.z / 2 + wallThick;
            break;
            case 3:
                this._obj.position.x += THREEpos.x + THREEsize.z / 2 + wallThick;
                this._obj.position.y += THREEpos.y + THREEsize.y / 2 + wallThick;
                this._obj.position.z += THREEpos.z + THREEsize.x / 2 + wallThick;
            break;
            default:
                this._obj.position.x += THREEpos.x + THREEsize.x / 2 + wallThick;
                this._obj.position.y += THREEpos.y + THREEsize.y / 2 + wallThick;
                this._obj.position.z += THREEpos.z + THREEsize.z / 2 + wallThick;
            break;
        }  
    }

    getPosition() {
        return this._position
    }

    _setHighlight() {
        const shell = 0.1;
        // Находим размер модели
        const obj = this.getObj();
        const sizeBox = new THREE.Box3().setFromObject(obj);
        const size = new THREE.Vector3();
        sizeBox.getSize(size);

        // Находим центр модели
        const center = new THREE.Vector3();
        sizeBox.getCenter(center);

        // Создание куба-подстветки модели
        const geometry = new THREE.BoxGeometry(size.x + shell, size.y + shell, size.z + shell);
        const material = new THREE.MeshBasicMaterial({color: 0x00ff00, transparent: true, opacity: 0.5});
        const cube = new THREE.Mesh(geometry, material);

        cube.position.set(center.x, center.y, center.z);

        cube.parentObj = this;
        this._hightlight = cube;

        this.hideHightlight();
    }

    showHightlight(newColor) {
        const material = new THREE.MeshBasicMaterial({
            color: newColor ? newColor : 0x00ff00, 
            transparent: true, 
            opacity: 0.5
        });

        this._hightlight.material = material;
        this._hightlight.visible = true;
    }

    hideHightlight() {
        this._hightlight.visible = false;
    }

    _setInteraction() {
        const shell = 0.1;
        // Находим размер модели
        const obj = this.getObj();
        const sizeBox = new THREE.Box3().setFromObject(obj);
        const size = new THREE.Vector3();
        sizeBox.getSize(size);

        // Находим центр модели
        const center = new THREE.Vector3();
        sizeBox.getCenter(center);

        // Создание куба вокруг модели для взаимодействия с событиями курсора мыши
        const geometry = new THREE.BoxGeometry(size.x + shell, size.y + shell, size.z + shell);
        const material = new THREE.MeshBasicMaterial({color: 0x025015, transparent: true, opacity: 0.5});
        material.visible = false;
        const cube = new THREE.Mesh(geometry, material);

        cube.position.set(center.x, center.y, center.z);

        cube.parentObj = this._obj;
        this._interactionCube = cube;
    }

    _applyOptions() {
        const options = this.getOptions();
        if (options.flipX) {
            this._obj.scale.x = - this._obj.scale.x;
        }

        if (options.flipY) {
            this._obj.scale.y = - this._obj.scale.y;
        }

        if (options.flipZ) {
            this._obj.scale.z = - this._obj.scale.z;
        }
    }

    _setEvents() {
        const events = this.getEvents();
        if (events) {
            for (let eventName in events) {
                let handler = events[eventName];
                if (handler) {
                    this._interactionCube.cursor = 'pointer';
                    this._interactionCube.on(eventName, (event) => handler(event));
                }
            }
        }
    }
}

export default Model;