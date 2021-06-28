import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { toVector } from './Structure'

class Model {
    constructor(src, parent) {
        this.src = src;
        this.parent = parent;
    }

    load() {
        if (this.src) {
            const loader = new GLTFLoader();
            return new Promise(resolve => {
                loader.load('http://server/modelLoader.php?model=' + this.src, gltf => {
                    this.obj = gltf.scene;
                    resolve();
                })
            });
        } else {
            console.error('Model loading error! src is undefined')
        }
    }

    clone(original) {
        this.obj = original.obj.clone();
    }

    init(model, sizeVector, posVector, rotation, options, dbID) {
        this.obj.prototype = this;
        if (!model) {
            this.setOptions(options);
            this.setTexture(this.options.color);
            this.setSize(sizeVector);
            this.setPosition(posVector, rotation);
            this.dbID = dbID;
        } else {
            this.setOptions(options, model);
            this.setTexture(this.options.color);
            sizeVector ? this.setSize(sizeVector) : this.size = model.size;
            this.setPosition(posVector ?? model.position, rotation);
            this.dbID = dbID;
        }
        this.applyOptions();
        this.setHighlight();
        this.setInteraction();
        this.setEvents();
    }

    transform(options) {
        const orig = this.src;
        console.log(orig);
        const group = new THREE.Group();
        orig.objects.forEach(obj => group.add(obj));
        this.obj = group;

        this.setOptions(options)
        this.size = orig.size;
        this.position = orig.position;
        this.setHighlight();
        this.setInteraction();
        this.applyOptions();
    }

    setTexture(color) {
        const texture = new THREE.MeshStandardMaterial({color: color});
        this.obj.traverse(child => {
            if (child instanceof THREE.Mesh) {
                child.material = texture;
            }
        });
    }

    setSize(sizeVector) {
        this.size = sizeVector;
        this.size = {
            x: sizeVector.y,
            y: sizeVector.z,
            z: sizeVector.x
        };

        // Установка размеров модели
        // Размеры в Three JS указываются в scale.
        // (scale - величина, определяющая во сколько раз изменится размер модели по сравнению с изначальным)
        // Выставляем scale = 1 (оригинальный размер модели)
        this.obj.scale.set(1, 1, 1);

        // Находим размер модели
        const origSizeBox = new THREE.Box3().setFromObject(this.obj)
        const origSize = new THREE.Vector3();
        origSizeBox.getSize(origSize);

        // Находим scale, в который нужно возвести модель для соответствия заданным размерам
        const scale = toVector(
            this.size.x / origSize.x,
            this.size.y / origSize.y,
            this.size.z / origSize.z
        );
        this.obj.scale.set(scale.x, scale.y, scale.z);
    }

    setPosition(posVector, rotation) {
        this.position = posVector;
        // Поворачиваем модель
        if (rotation) switch (rotation) {
            case 1: 
                this.obj.rotateY(Math.PI * 0.5);
            break;
            case 2: 
                this.obj.rotateY(Math.PI)
            break;
            case 3: 
                this.obj.rotateY(Math.PI * 1.5);
            break;
            default: console.error('Wrong rotation value in setModelPosition function');
        }

        // !Центр, установленный автором модели, может на самом деле не являтся центром(lol)
        // Определение центра модели
        const box = new THREE.Box3().setFromObject(this.obj);
        const center = new THREE.Vector3();
        box.getCenter(center);

        // Установка центра модели в начало координат (0, 0, 0)
        this.obj.position.sub(center);

        // Устанавливаем позицию учитывая поворот модели
        switch (rotation) {
            case 1:
                this.obj.position.x += this.position.y + this.size.z / 2 + this.parent.wallThick;
                this.obj.position.y += this.position.z + this.size.y / 2 + this.parent.wallThick;
                this.obj.position.z += this.position.x + this.size.x / 2 + this.parent.wallThick;
            break;
            case 2:
                this.obj.position.x += this.position.y + this.size.x / 2 + this.parent.wallThick;
                this.obj.position.y += this.position.z + this.size.y / 2 + this.parent.wallThick;
                this.obj.position.z += this.position.x + this.size.z / 2 + this.parent.wallThick;
            break;
            case 3:
                this.obj.position.x += this.position.y + this.size.z / 2 + this.parent.wallThick;
                this.obj.position.y += this.position.z + this.size.y / 2 + this.parent.wallThick;
                this.obj.position.z += this.position.x + this.size.x / 2 + this.parent.wallThick;
            break;
            default:
                this.obj.position.x += this.position.y + this.size.x / 2 + this.parent.wallThick;
                this.obj.position.y += this.position.z + this.size.y / 2 + this.parent.wallThick;
                this.obj.position.z += this.position.x + this.size.z / 2 + this.parent.wallThick;
            break;
        }  
    }

    setHighlight() {
        const shell = 0.1;
        // Находим размер модели
        const sizeBox = new THREE.Box3().setFromObject(this.obj)
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
        this.hightlight = cube;

        this.hideHightlight();
    }

    showHightlight(newColor) {
        const material = new THREE.MeshBasicMaterial({
            color: newColor ? newColor : 0x00ff00, 
            transparent: true, 
            opacity: 0.5
        });

        this.hightlight.material = material;
        this.hightlight.visible = true;
    }

    hideHightlight() {
        this.hightlight.visible = false;
    }

    setInteraction() {
        const shell = 0.1;
        // Находим размер модели
        const sizeBox = new THREE.Box3().setFromObject(this.obj);
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

        cube.parentObj = this.obj;
        this.interactionCube = cube;
    }

    setOptions(options, model) {
        this.options = {};
        if (!model) {
            model = {};
            model.options = {};
        }
        if (!options) options = {};
        
        this.options.flipX = options.flipX ?? false;
        this.options.flipY = options.flipY ?? false;
        this.options.flipZ = options.flipZ ?? false;
        this.options.color = options.color ?? model.options.color ?? 0x535254;
        this.events = options.events ?? model.events ?? {};

    }

    applyOptions() {
        if (this.options.flipX) {
            this.obj.scale.x = - this.obj.scale.x;
        }

        if (this.options.flipY) {
            this.obj.scale.y = - this.obj.scale.y;
        }

        if (this.options.flipZ) {
            this.obj.scale.z = - this.obj.scale.z;
        }
    }

    setEvents() {
        if (this.events) {
            for (let eventName in this.events) {
                let handler = this.events[eventName];
                if (handler) {
                    this.interactionCube.cursor = 'pointer';
                    this.interactionCube.on(eventName, (event) => handler(event));
                }
            }
        }
    }
}

export default Model;