import InfoModel from './InfoModel';
import Structure from './Structure';

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



    
}

export default Room;
