import * as THREE from 'three';
import Structure, {toVector} from './Structure';
import Model from './Model';

class Room extends Structure {
    constructor(sizeVector, posVector, wallThick, color, opacity, params) {
        super(sizeVector, posVector, color, opacity, params);

        //Толщина стен
        this.wallThick = wallThick;

/*
            Walls ID:
			                         
                                  X
                   1              ^ 
          __|______________|__    |
            |              |      |
            |              |      |
          4 |              | 2    | 
            |              |      |
            |              |      |
          __|______________|__    |
            |              |      |
                   3              |
                                  |
	  Y <-------------------------|-----
			                      |   
*/

        //Стены
        const walls = [
        // Основание
        this.drawBox(
            toVector(
                this.size.x + this.wallThick * 2,
                this.size.y + this.wallThick * 2,
                this.wallThick
            ),
            this.position,
            this.color
        ),

        // Стена по X #1 
        this.drawBox(
            toVector(
                this.wallThick,
                this.size.y + this.wallThick * 2,
                this.size.z
            ),
            toVector(
                this.position.x,
                this.position.y,
                this.position.z + this.wallThick
            ),
            this.color
        ),

        // Стена по X #2
        this.drawBox(
            toVector(
                this.wallThick,
                this.size.y + this.wallThick * 2,
                this.size.z
            ),
            toVector(
                this.position.x + this.size.x + this.wallThick,
                this.position.y,
                this.position.z + this.wallThick
            ),
            this.color
        ),

        // Стена по Y #1 
        this.drawBox(
            toVector(
                this.size.x,
                this.wallThick,
                this.size.z
            ),
            toVector(
                this.position.x + this.wallThick,
                this.position.y,
                this.position.z + this.wallThick
            ),
            this.color
        ),

        // Стена по Y #2
        this.drawBox(
            toVector(
                this.size.x,
                this.wallThick,
                this.size.z
            ),
            toVector(
                this.position.x + this.wallThick,
                this.position.y + this.size.y + this.wallThick,
                this.position.z + this.wallThick
            ),
            this.color
            )
        ];
        this.walls.forEach(wall => wall.name = "main-wall");
        this.walls.push(...walls);

        // Сетка
		this.grid = [];

        this.outline = [this.walls, this.doors, this.windows];
    }

	drawLine(vector1, vector2) {
		const material = new THREE.LineBasicMaterial({color: 0xff0000});
		const points = [
			{
				x: vector1.y,
				y: vector1.z,
				z: vector1.x
			}, 
			{
				x: vector2.y,
				y: vector2.z,
				z: vector2.x
			}
		];
		const geometry = new THREE.BufferGeometry().setFromPoints(points);
		const line = new THREE.Line( geometry, material );
        line.visible = false;
		return line;
	}

	drawGrid(tileSize, gridSize, pos) {
        let nmb=0;
		const xLineCount = Math.floor(gridSize.x / tileSize) + 1; 
		const yLineCount = Math.floor(gridSize.y / tileSize) + 1;
		const zLineCount = Math.floor(gridSize.z / tileSize) + 1;
		for (let zee = 0; zee< zLineCount; zee++){
            for (let i = 0; i < xLineCount; i++) {
                nmb++;
                this.grid.push(this.drawLine(
                    toVector(
                        pos.x + i * tileSize,
                        pos.y,
                        pos.z+zee*tileSize	
                    ),
                    toVector(
                        pos.x + i * tileSize,
                        gridSize.y + pos.y,
                        pos.z+zee*tileSize	
                    )
                ));
            }
            for (let i = 0; i < yLineCount; i++) {
                nmb++;
                this.grid.push(this.drawLine(
                    toVector(
                        pos.x,
                        pos.y + i * tileSize,
                        pos.z+zee*tileSize	
                    ),
                    toVector(
                        gridSize.x + pos.x,
                        pos.y + i * tileSize,
                        pos.z+zee*tileSize	
                    )
                ));
            }
	    }
    for (let x = 0; x < xLineCount; x++) {
        for (let y = 0; y < yLineCount; y++) {
            nmb++;
            this.grid.push(this.drawLine(
				toVector(
					pos.x + x * tileSize,
					pos.y + y * tileSize,
					pos.z	
				),
				toVector(
					pos.x + x * tileSize,
					pos.y + y * tileSize,
					pos.z+gridSize.z
				)
			));
        }
    }
    return nmb;
	}

    setMainGrid(wallWidth) {
        this.drawGrid(
            10, 
            toVector(this.size.x, this.size.y, 0), 
            toVector(wallWidth, wallWidth, wallWidth)
        );
        this.drawGrid(
            10, 
            toVector(0, this.size.y, this.size.z), 
            toVector(wallWidth, wallWidth, wallWidth)
        );
        this.drawGrid(
            10, 
            toVector(0, this.size.y, this.size.z), 
            toVector(wallWidth + this.size.x, wallWidth, wallWidth)
        );
        this.drawGrid(
            10, 
            toVector(this.size.x, 0, this.size.z), 
            toVector(wallWidth, wallWidth, wallWidth)
        );
        this.drawGrid(
            10, 
            toVector(this.size.x, 0, this.size.z), 
            toVector(wallWidth, wallWidth + this.size.y, wallWidth)
        );
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
                this.models.push(model); // Добавляем модель в массив "модели"
                // Добавляем все части модели, предназначенные для отрисовки, в массив "объекты"
                this.objects.push(model.obj); // Непосредственно объект
                // Куб для взаимодействия с моделью при помощи мыши
                this.objects.push(model.interactionCube); 
                this.objects.push(model.hightlight); // Подсветка модели
                return model; // Возвращаем модель
        } else {
            // Если же в качестве аргумента "src" указан путь к внешнему файлу, то
            // Возвращаем асинхронный объект конструкции Promise
            return new Promise(resolve => { 
                // Ждем, пока модель загрузится из внешнего файла, а затем
                model.load().then(() => { 
                    // Инициализация
                    model.init(null, sizeVector, posVector, rotation, options, dbID);
                    this.models.push(model); // Добавляем модель в массив "модели"
                    // Добавляем все части модели, предназначенные для отрисовки, в массив "объекты"
                    this.objects.push(model.obj); // Непосредственно объект
                    // Куб для взаимодействия с моделью при помощи мыши
                    this.objects.push(model.interactionCube);
                    this.objects.push(model.hightlight); // Подсветка модели
                    resolve(model); // Возвращаем модель
                })
            });
        }
    }
}

export default Room;
