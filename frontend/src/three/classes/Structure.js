import * as THREE from 'three';
import SpriteText from 'three-spritetext';
import Model from './Model';
import * as linkPointURL from '../link-point.png';

function toVector(x, y, z) {
    return {
        x: x,
        y: y,
        z: z
    }
}

function vectorToArr(obj) {
    return [obj.x, obj.y, obj.z]
}

function toStructure(structArr) {
    const newStruct = new Structure();
    structArr.forEach(struct => {
        const objects = struct.getObjects();
        objects.forEach(obj => newStruct.objects.push(obj));
        struct.parentObj = newStruct;
        if (struct.events) newStruct.models.push(struct);
    });
    return newStruct
}

class Structure {
    constructor(sizeVector, posVector, color, opacity, options) {
        // Размеры постройки
        this.size = sizeVector ? toVector(sizeVector.x, sizeVector.y, sizeVector.z) : toVector(0, 0, 0);
        // Расположение постройки
        this.position = posVector ? toVector(posVector.x, posVector.y, posVector.z) : toVector(0, 0, 0);
        this.color = color; // Цвет
        this.opacity = opacity; // Непрозрачность
        this.wallThick = 0; // Толщина стен (по умолчнию)
        this.center = toVector(0, 0, 0); // Центр постройки (по умолчнию)
        this.walls = []; // Массив стен
        this.doors = []; // Массив дверей
        this.windows = []; // Массив окон
        this.linkPoints = []; // Массив точек-ссылок
        this.linkText = []; // Массив ссылочных текстов
        this.models = []; // Массив загружаемых моделей
        this.outline = []; // Массив контуров постройки

        // Этот массив будет содержать все вышеперечисленные объекты
        // И будет использоватьтся на этапе отрисовки
        this.objects = []; 

        // Опциональные параметры
        this.options = options ?? {}; // Обработка параметров
        this.events = this.options.events ?? null; // События
        this.dbInfo = this.options.dbInfo ?? null; // id для связи с БД
        this.src = this.options.src ?? null; // Ссылка на внешний файл
    }

    drawBox(sizeVector, posVector, color, opacity) {
        const boxGeometry = new THREE.BoxGeometry(sizeVector.y, sizeVector.z, sizeVector.x);
        const boxMaterial = new THREE.LineBasicMaterial({color: color, transparent: true, opacity: opacity ?? this.opacity});
        const box = new THREE.Mesh(boxGeometry, boxMaterial);
        box.position.set(
            posVector.y + sizeVector.y / 2,
            posVector.z + sizeVector.z / 2,
            posVector.x + sizeVector.x / 2
        ) 
        box.name = "box";
        this.objects.push(box);
        return box;
    }

    drawWall(sizeVector, posVector, color) {
        console.log(this.walls);
        const wall = this.drawBox(sizeVector, posVector, color);
        wall.name = "additional-wall";
		this.walls.push(wall);
        this.objects.push(wall);
	}

    drawDoor(width, height, pos, wallID) {
        // !wallID можно найти в объявлении this.walls в конструкторе
        const doorBulge = 0.4;
        let doorSize;
        let doorPos;
        switch (wallID) {
            case 1:
                doorSize = {
                    x: this.wallThick + doorBulge,
                    y: width,
                    z: height 
                }  
                doorPos = {
                    x: this.position.x - doorBulge / 2,
                    y: this.position.y + pos + this.wallThick,
                    z: this.wallThick
                }    
            break;
            case 2:
                doorSize = {
                    x: width,
                    y: this.wallThick + doorBulge,
                    z: height 
                }     
                doorPos = {
                    x: this.position.x + pos + this.wallThick,
                    y: this.position.y + this.size.y + this.wallThick - doorBulge / 2,
                    z: this.wallThick
                }  
            break;
            case 3:
                doorSize = {
                    x: this.wallThick + doorBulge,
                    y: width,
                    z: height 
                }     
                doorPos = {
                    x: this.position.x + this.size.x + this.wallThick - doorBulge / 2,
                    y: this.position.y + pos + this.wallThick,
                    z: this.wallThick
                } 
            break;
            case 4:  
                doorSize = {
                    x: width,
                    y: this.wallThick + doorBulge,
                    z: height 
                }
                doorPos = {
                    x: this.position.x + pos + this.wallThick,
                    y: this.position.y - doorBulge / 2,
                    z: this.wallThick
                }  
            break;
            default: console.error('Wrong wallID in drawDoor function');
        } 


        const door = this.drawBox(doorSize, doorPos, 0x4f3b03, 0.5);
        door.name = "door";
        this.doors.push(door);
        this.objects.push(door);
    }

	drawWindow(width, height, pos, top, wallID) {
		// !wallID можно найти в объявлении this.walls в конструкторе
        const windowBulge = 0.4;
        let windowSize;
        let windowPos;
        switch (wallID) {
            case 1:
                windowSize = {
                    x: this.wallThick + windowBulge,
                    y: width,
                    z: height 
                }  
				windowPos = {
					x: this.position.x - windowBulge / 2,
					y: this.position.y + pos + this.wallThick,
					z: this.position.z + this.wallThick + top
				}    
            break;
            case 2:
                windowSize = {
                    x: width,
                    y: this.wallThick + windowBulge,
                    z: height 
                }      
				windowPos = {
                    x: this.position.x + pos + this.wallThick,
                    y: this.position.y + this.size.y + this.wallThick - windowBulge / 2,
                    z: this.position.z + this.wallThick + top
                } 
            break;
            case 3:
                windowSize = {
                    x: this.wallThick + windowBulge,
                    y: width,
                    z: height 
                }    
				windowPos = {
                    x: this.position.x + this.size.x + this.wallThick - windowBulge / 2,
                    y: this.position.y + pos + this.wallThick,
                    z: this.position.z + this.wallThick + top
                } 
            break;
            case 4:  
				windowSize = {
                    x: width,
                    y: this.wallThick + windowBulge,
                    z: height 
                }
				windowPos = {
                    x: this.position.x + pos + this.wallThick,
                    y: this.position.y - windowBulge / 2,
                    z: this.position.z + this.wallThick + top
                }
            break;
            default: console.error('Wrong wallID in drawWindow function');
        } 

        const window = this.drawBox(windowSize, windowPos, 0x2afafa, 0.2);
        window.name = "window";
        this.windows.push(window);
        this.objects.push(window);
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
        sprite.name = "link-point";
        caption.name = "link-point-caption";
        this.linkPoints.push(sprite);
        this.objects.push(sprite);
        this.linkText.push(caption);
        this.objects.push(caption);
        console.log(sprite);
    }

    setHighlight() {
        const shell = 0.1;

        const group = new THREE.Group();
        this.objects.forEach(obj => group.add(obj));

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
        this.hightlight = cube;
        this.objects.push(this.hightlight);

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
        const shell = 1.5;

        const group = new THREE.Group();
        this.objects.forEach(obj => group.add(obj));

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
        this.interactionCube = cube;
        this.objects.push(this.interactionCube);
    }

    setOutlineArr() { // Метод для создания контура модели
        // Создаем новый масив с объектами, на которые необходимо добавить контур
        const objsArr = [].concat(...this.outline); 
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
    
    setCenter() { // Метод для нахождения центра постройки
        const group = new THREE.Group(); // Создаем группу объектов
        // Объединяем все объекты на сцене в группу
        this.objects.forEach(obj => group.add(obj)); 
        // Создаем невидимый прямоугольник, содержащий в себе все элементы группы
        const box = new THREE.Box3().setFromObject(group); 
        // Находим его центр
        const center = new THREE.Vector3();
        box.getCenter(center);
        center.y = 0; // Координату y(z в привычной нам декартовой системе) ставим в 0
        this.center = center; // Записываем полученные координаты в свойство класса
    }

    toModel(options) {
        const model = new Model(this);
        model.transform(options);
        return model
    }

    getObjects() { // Метод для отрисовки постройки
        this.setCenter(); // Находим центр модели
        this.setOutlineArr(); // Создаем контур
        return this.objects // Возвращаем все объекты
    }
}

export default Structure;
export {toVector, vectorToArr, toStructure};