import * as THREE from 'three';
import SpriteText from 'three-spritetext';
import InfoModel from './InfoModel';
import Model from './Model';
import * as linkPointURL from '../link-point.png';

class Structure {

    _size = {};
    _position = {};
    _color = '';
    _opacity = 0;
    _wallThick = 0; // Толщина стен (по умолчнию)
    _center = {}; // Центр постройки (по умолчнию)
    _walls = []; // Массив стен
    _doors = []; // Массив дверей
    _windows = []; // Массив окон
    _linkPoints = []; // Массив точек-ссылок
    _linkText = []; // Массив ссылочных текстов
    _models = []; // Массив загружаемых моделей
    _outline = []; // Массив контуров постройки
    _hightlight = null;
    _interactionCube = null;

    // Этот массив будет содержать все вышеперечисленные объекты
    // И будет использоватьтся на этапе отрисовки
    _objects = []; 

    constructor(sizeVector, posVector, color, opacity, options) {
        // Размеры постройки
        this._size = sizeVector ? InfoModel.toVector(sizeVector.x, sizeVector.y, sizeVector.z) : InfoModel.toVector(0, 0, 0);
        // Расположение постройки
        this._position = posVector ? InfoModel.toVector(posVector.x, posVector.y, posVector.z) : InfoModel.toVector(0, 0, 0);
        this._color = color; // Цвет
        this._opacity = opacity; // Непрозрачность
       
        // Опциональные параметры
        this._options = options ?? {}; // Обработка параметров
        this._events = this._options.events ?? null; // События
        this._dbInfo = this._options.dbInfo ?? null; // id для связи с БД
        this._src = this._options.src ?? null; // Ссылка на внешний файл
    }

    getObjectsArr() {
        return this._objects;
    }

    getModels() {
        return this._models;
    }

    getCenter() {
        return this._center;
    }

    getOpacity() {
        return this._opacity;
    }

    getPosition() {
        return this._position;
    }

    getSize() {
        return this._size;
    }

    getWallThickness() {
        return this._wallThick;
    }

    getHightlight() {
        return this._hightlight;
    }

    getOutlineObjects() {
        return this._outline;
    }

    getDBInfo() {
        return this._dbInfo;
    }

    getLinkPoints() {
        return this._linkPoints;
    }

    getColor() {
        return this._color;
    }

    getEvents() {
        return this._events;
    }

    getSrc() {
        return this._src;
    }

    addObject(obj) {
        this._objects.push(obj);
    }

    addModel(model) {
        this._models.push(model);
    }

    _addWall(wall) {
        wall.name = "wall";
        this._walls.push(wall);
        this.addObject(wall);
    }

    _addDoor(door) {
        door.name = "door";
        this._doors.push(door);
        this.addObject(door);
    }

    _addWindow(window) {
        window.name = "window";
        this._windows.push(window);
        this.addObject(window);
    }

    _addLinkPoint(point, caption) {
        point.name = "link-point";
        caption.name = "link-point-caption";
        this._linkPoints.push(point);
        this.addObject(point);
        this._linkText.push(caption);
        this.addObject(caption);
    }

    drawBox(sizeVector, posVector, color, opacity) {
        const boxGeometry = new THREE.BoxGeometry(sizeVector.y, sizeVector.z, sizeVector.x);
        const boxMaterial = new THREE.LineBasicMaterial({color: color, transparent: true, opacity: opacity ?? this.getOpacity()});
        const box = new THREE.Mesh(boxGeometry, boxMaterial);
        box.position.set(
            posVector.y + sizeVector.y / 2,
            posVector.z + sizeVector.z / 2,
            posVector.x + sizeVector.x / 2
        ) 
        box.name = "box";
        this.addObject(box);
        return box;
    }

    drawWall(sizeVector, posVector, color) {
        const wall = this.drawBox(sizeVector, posVector, color);
        this._addWall(wall);   
    }

    drawDoor(width, height, pos, wallID) {
        // !wallID можно найти в объявлении this._walls в конструкторе
        const structPos = this.getPosition();
        const structSize = this.getSize();
        const wallThick = this.getWallThickness();
        const doorBulge = 0.4;
        let doorSize;
        let doorPos;
        switch (wallID) {
            case 1:
                doorSize = {
                    x: wallThick + doorBulge,
                    y: width,
                    z: height 
                }  
                doorPos = {
                    x: structPos.x - doorBulge / 2,
                    y: structPos.y + pos + wallThick,
                    z: wallThick
                }    
            break;
            case 2:
                doorSize = {
                    x: width,
                    y: wallThick + doorBulge,
                    z: height 
                }     
                doorPos = {
                    x: structPos.x + pos + wallThick,
                    y: structPos.y + structSize.y + wallThick - doorBulge / 2,
                    z: wallThick
                }  
            break;
            case 3:
                doorSize = {
                    x: wallThick + doorBulge,
                    y: width,
                    z: height 
                }     
                doorPos = {
                    x: structPos.x + structSize.x + wallThick - doorBulge / 2,
                    y: structPos.y + pos + wallThick,
                    z: wallThick
                } 
            break;
            case 4:  
                doorSize = {
                    x: width,
                    y: wallThick + doorBulge,
                    z: height 
                }
                doorPos = {
                    x: structPos.x + pos + wallThick,
                    y: structPos.y - doorBulge / 2,
                    z: wallThick
                }  
            break;
            default: console.error('Wrong wallID value in drawDoor function');
        } 

        const door = this.drawBox(doorSize, doorPos, 0x4f3b03, 0.5);
        this._addDoor(door);
    }

	drawWindow(width, height, pos, top, wallID) {
		// !wallID можно найти в объявлении this._walls в конструкторе
        const structPos = this.getPosition();
        const structSize = this.getSize();
        const wallThick = this.getWallThickness();
        const windowBulge = 0.4;
        let windowSize;
        let windowPos;
        switch (wallID) {
            case 1:
                windowSize = {
                    x: wallThick + windowBulge,
                    y: width,
                    z: height 
                }  
				windowPos = {
					x: structPos.x - windowBulge / 2,
					y: structPos.y + pos + this._wallThick,
					z: structPos.z + wallThick + top
				}    
            break;
            case 2:
                windowSize = {
                    x: width,
                    y: wallThick + windowBulge,
                    z: height 
                }      
				windowPos = {
                    x: structPos.x + pos + wallThick,
                    y: structPos.y + structSize.y + wallThick - windowBulge / 2,
                    z: structPos.z + wallThick + top
                } 
            break;
            case 3:
                windowSize = {
                    x: wallThick + windowBulge,
                    y: width,
                    z: height 
                }    
				windowPos = {
                    x: structPos.x + structSize.x + wallThick - windowBulge / 2,
                    y: structPos.y + pos + wallThick,
                    z: structPos.z + wallThick + top
                } 
            break;
            case 4:  
				windowSize = {
                    x: width,
                    y: wallThick + windowBulge,
                    z: height 
                }
				windowPos = {
                    x: structPos.x + pos + wallThick,
                    y: structPos.y - windowBulge / 2,
                    z: structPos.z + wallThick + top
                }
            break;
            default: console.error('Wrong wallID value in drawWindow function');
        } 

        const window = this.drawBox(windowSize, windowPos, 0x2afafa, 0.2);
        this._addWindow(window);
	}

    drawLinkPoint(text, src, posVector, options) {
        const map = new THREE.TextureLoader().load(linkPointURL.default);
        const material = new THREE.SpriteMaterial({map: map, color: 0x005000});
        const sprite = new THREE.Sprite(material);
        sprite.scale.set(7, 7, 7);
        sprite.src = src;
        sprite.position.set(posVector.y, posVector.z, posVector.x);

        const caption = new SpriteText(text, 5);
        caption.position.set(posVector.y, posVector.z + 7, posVector.x);
        
        sprite.options = options ?? {}; 

        sprite.events = sprite.options.events;
        sprite.dbID = sprite.options.dbID;

        if (sprite.events) {
            for (let eventName in sprite.events) {
                let handler = sprite.events[eventName];
                if (handler) {
                    sprite.cursor = 'pointer';
                    sprite.on(eventName, (event) => handler(event));
                }
            }
        }

        sprite.parentObj = this;
        caption.parentObj = this;
        this._addLinkPoint(sprite, caption);
    }

    hideLinkPoints() {
        const linkpoints = this.getLinkPoints();
        linkpoints.forEach(linkpoint => linkpoint.material.color.set(0x005000));
    }

    // Загрузка внешней модели
    drawModel(src, sizeVector, posVector, rotation, options, dbID) {
        // Создаем новый экземпляр класса "Model", в качестве родителя указав комнату
       const model = new Model(src, this); 
       // Если в качестве аргумента "src" указан другой экземпляр "Model", то
       // Считается, что происходит копирование уже загруженной модели
       if (src instanceof Model) {
               model.clone(src); // Копируем его
               // И инициализируем с новыми параметрами
               model.init(src, sizeVector, posVector, rotation, options, dbID);
               console.log(model);
               this.addModel(model); // Добавляем модель в массив "модели"
               // Добавляем все части модели, предназначенные для отрисовки, в массив "объекты"
               this.addObject(model.obj); // Непосредственно объект
               // Куб для взаимодействия с моделью при помощи мыши
               this.addObject(model.interactionCube); 
               this.addObject(model.hightlight); // Подсветка модели
               return model; // Возвращаем модель
       } else {
           // Если же в качестве аргумента "src" указан путь к внешнему файлу, то
           // Возвращаем асинхронный объект конструкции Promise
           return new Promise(resolve => { 
               // Ждем, пока модель загрузится из внешнего файла, а затем
               model.load().then(() => { 
                   // Инициализация
                   model.init(null, sizeVector, posVector, rotation, options, dbID);
                   console.log(model);
                   this.addModel(model); // Добавляем модель в массив "модели"
                   // Добавляем все части модели, предназначенные для отрисовки, в массив "объекты"
                   this.addObject(model.obj); // Непосредственно объект
                   // Куб для взаимодействия с моделью при помощи мыши
                   this.addObject(model.interactionCube);
                   this.addObject(model.hightlight); // Подсветка модели
                   resolve(model); // Возвращаем модель
               })
           });
       }
   }

    _setHighlight() {
        const shell = 0.1;

        const group = new THREE.Group();
        const objects = this.getObjects();
        objects.forEach(obj => group.add(obj));

        // Находим размер модели
        const sizeBox = new THREE.Box3().setFromObject(group)
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

        cube.name = "hightlight";
        cube.parentObj = this;
        this._hightlight = cube;
        this.addObject(this._hightlight);

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

    hideModelsHightlights() {
        const modelsArr = this.getModels();
        modelsArr.forEach(model => {
            model.hideHightlight();
        });
    }

    _setInteraction() {
        const shell = 1.5;

        const group = new THREE.Group();
        this._objects.forEach(obj => group.add(obj));

        // Находим размер модели
        const sizeBox = new THREE.Box3().setFromObject(group);
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

        cube.name = "interaction";
        cube.parentObj = this;
        this._interactionCube = cube;
        this.addObject(this._interactionCube);
    }

    _setOutlineArr() { // Метод для создания контура модели
        const outlineObjects = this.getOutlineObjects();
        // Создаем новый масив с объектами, на которые необходимо добавить контур
        const objsArr = [].concat(...outlineObjects); 
        objsArr.forEach(obj => { // Проходимся в цикле по каждому элементу этого массива
            // Задаем тип фигуры (В конкретном случае - контур)
            const geometry = new THREE.EdgesGeometry(obj.geometry); 
            // Задаем материал (В конкретном случае - черная линия шириной 4)
            const material = new THREE.LineBasicMaterial({color: 0x000000, linewidth: 4});
            const border = new THREE.LineSegments(geometry, material); // Создаем контур
            // Указываем, что контур модели будет отрисован непосредственно после нее
            border.renderOrder = 1;  
            border.name = "border"; // Пометка для объекта
            obj.add(border); // Связываем созданный контур с моделью
        });
    }
    
    _setCenter() { // Метод для нахождения центра постройки
        const group = new THREE.Group(); // Создаем группу объектов
        const objects = this.getObjectsArr();
        // Объединяем все объекты на сцене в группу
        objects.forEach(obj => group.add(obj)); 
        // Создаем невидимый прямоугольник, содержащий в себе все элементы группы
        const box = new THREE.Box3().setFromObject(group); 
        // Находим его центр
        const center = new THREE.Vector3();
        box.getCenter(center);
        center.y = 0; // Координату y(z в привычной нам декартовой системе) ставим в 0
        this._center = center; // Записываем полученные координаты в свойство класса
    }

    getObjects() { // Метод для отрисовки постройки
        this._setCenter(); // Находим центр модели
        this._setOutlineArr(); // Создаем контур
        const objects = this.getObjectsArr();
        return objects // Возвращаем все объекты
    }
}

export default Structure;