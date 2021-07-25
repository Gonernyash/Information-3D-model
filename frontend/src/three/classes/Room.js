import InfoModel from './InfoModel';
import Structure from './Structure';
import Model from './Model';

class Room extends Structure {
    constructor(sizeVector, posVector, wallThick, color, opacity, params) {
        super(sizeVector, posVector, color, opacity, params);

        //Толщина стен
        this._wallThick = wallThick;

        this._wallsInit();

        // Сетка
		this._grid = [];

        this._outline = [this._walls, this._doors, this._windows];
    }

    _wallsInit() {

        const size = this.getSize();
        const wallThick = this.getWallThickness();
        const position = this.getPosition();
        const color = this.getColor();

        /*
                Walls ID:
                                        
                                      X
                        1             ^ 
              __|______________|__    |
                |              |      |
                |              |      |
            4   |              | 2    | 
                |              |      |
                |              |      |
              __|______________|__    |
                |              |      |
                        3             |
                                      |
        Y <---------------------------|-----
                                      |   
        */

        //Стены
        const walls = [
            // Основание
            this.drawBox(
                InfoModel.toVector(
                    size.x + wallThick * 2,
                    size.y + wallThick * 2,
                    wallThick
                ),
                position,
                color
            ),
    
            // Стена по X #1 
            this.drawBox(
                InfoModel.toVector(
                    wallThick,
                    size.y + wallThick * 2,
                    size.z
                ),
                InfoModel.toVector(
                    position.x,
                    position.y,
                    position.z + wallThick
                ),
                color
            ),
    
            // Стена по X #2
            this.drawBox(
                InfoModel.toVector(
                    wallThick,
                    size.y + wallThick * 2,
                    size.z
                ),
                InfoModel.toVector(
                    position.x + size.x + wallThick,
                    position.y,
                    position.z + wallThick
                ),
                color
            ),
    
            // Стена по Y #1 
            this.drawBox(
                InfoModel.toVector(
                    size.x,
                    wallThick,
                    size.z
                ),
                InfoModel.toVector(
                    position.x + wallThick,
                    position.y,
                    position.z + wallThick
                ),
                color
            ),
    
            // Стена по Y #2
            this.drawBox(
                InfoModel.toVector(
                    size.x,
                    wallThick,
                    size.z
                ),
                InfoModel.toVector(
                    position.x + wallThick,
                    position.y + size.y + wallThick,
                    position.z + wallThick
                ),
                color
                )
            ];
            this._walls.forEach(wall => wall.name = "main-wall");
            this._walls.push(...walls);
    }

	// drawLine(vector1, vector2) {
	// 	const material = new THREE.LineBasicMaterial({color: 0xff0000});
	// 	const points = [
	// 		{
	// 			x: vector1.y,
	// 			y: vector1.z,
	// 			z: vector1.x
	// 		}, 
	// 		{
	// 			x: vector2.y,
	// 			y: vector2.z,
	// 			z: vector2.x
	// 		}
	// 	];
	// 	const geometry = new THREE.BufferGeometry().setFromPoints(points);
	// 	const line = new THREE.Line( geometry, material );
    //     line.visible = false;
	// 	return line;
	// }

	// drawGrid(tileSize, gridSize, pos) {
    //     let nmb=0;
	// 	const xLineCount = Math.floor(gridSize.x / tileSize) + 1; 
	// 	const yLineCount = Math.floor(gridSize.y / tileSize) + 1;
	// 	const zLineCount = Math.floor(gridSize.z / tileSize) + 1;
	// 	for (let zee = 0; zee< zLineCount; zee++){
    //         for (let i = 0; i < xLineCount; i++) {
    //             nmb++;
    //             this._grid.push(this.drawLine(
    //                 InfoModel.toVector(
    //                     pos.x + i * tileSize,
    //                     pos.y,
    //                     pos.z+zee*tileSize	
    //                 ),
    //                 InfoModel.toVector(
    //                     pos.x + i * tileSize,
    //                     gridSize.y + pos.y,
    //                     pos.z+zee*tileSize	
    //                 )
    //             ));
    //         }
    //         for (let i = 0; i < yLineCount; i++) {
    //             nmb++;
    //             this._grid.push(this.drawLine(
    //                 InfoModel.toVector(
    //                     pos.x,
    //                     pos.y + i * tileSize,
    //                     pos.z+zee*tileSize	
    //                 ),
    //                 InfoModel.toVector(
    //                     gridSize.x + pos.x,
    //                     pos.y + i * tileSize,
    //                     pos.z+zee*tileSize	
    //                 )
    //             ));
    //         }
	//     }
    // for (let x = 0; x < xLineCount; x++) {
    //     for (let y = 0; y < yLineCount; y++) {
    //         nmb++;
    //         this._grid.push(this.drawLine(
	// 			InfoModel.toVector(
	// 				pos.x + x * tileSize,
	// 				pos.y + y * tileSize,
	// 				pos.z	
	// 			),
	// 			InfoModel.toVector(
	// 				pos.x + x * tileSize,
	// 				pos.y + y * tileSize,
	// 				pos.z+gridSize.z
	// 			)
	// 		));
    //     }
    // }
    // return nmb;
	// }

    // setMainGrid(wallWidth) {
    //     this.drawGrid(
    //         10, 
    //         InfoModel.toVector(this.size.x, this.size.y, 0), 
    //         InfoModel.toVector(wallWidth, wallWidth, wallWidth)
    //     );
    //     this.drawGrid(
    //         10, 
    //         InfoModel.toVector(0, this.size.y, this.size.z), 
    //         InfoModel.toVector(wallWidth, wallWidth, wallWidth)
    //     );
    //     this.drawGrid(
    //         10, 
    //         InfoModel.toVector(0, this.size.y, this.size.z), 
    //         InfoModel.toVector(wallWidth + this.size.x, wallWidth, wallWidth)
    //     );
    //     this.drawGrid(
    //         10, 
    //         InfoModel.toVector(this.size.x, 0, this.size.z), 
    //         InfoModel.toVector(wallWidth, wallWidth, wallWidth)
    //     );
    //     this.drawGrid(
    //         10, 
    //         InfoModel.toVector(this.size.x, 0, this.size.z), 
    //         InfoModel.toVector(wallWidth, wallWidth + this.size.y, wallWidth)
    //     );
    // }

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
}

export default Room;
