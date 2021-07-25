return async function script(Room, toVector, showRoomInformation) {
    // Размеры этажа
    const roomSizeX = 90;
    const roomSizeY = 440;
    const roomSizeZ = 15;
    // Толщина стен
    const wallWidth = 2;
    // Создаем этаж
    const myRoom = new Room(
        {x: roomSizeX, y: roomSizeY, z: roomSizeZ}, // Размеры
        {x: 0, y: 0, z: 0}, // Расположение
        wallWidth, // Толщина стен
        0xcccccc, // Цвет
        0.9 // Непрозрачность стен
    )

    // Создание двух параллельных стен посредине модели
    myRoom.drawWall(
        toVector(wallWidth, roomSizeY, roomSizeZ), // Размер
        toVector(35 + wallWidth, wallWidth, wallWidth), // Расположение
        0xcccccc // Цвет
    );

    myRoom.drawWall(
        toVector(wallWidth, roomSizeY, roomSizeZ),
        toVector(55, wallWidth, wallWidth),
        0xcccccc
    );

    // Создание стен комнат
    // 401 - 421

    myRoom.drawWall(
        toVector(35, wallWidth, roomSizeZ),
        toVector(wallWidth, 20, wallWidth),
        0xcccccc
    );

    myRoom.drawWall(
        toVector(35, wallWidth, roomSizeZ),
        toVector(wallWidth, 40, wallWidth),
        0xcccccc
    );

    myRoom.drawWall(
        toVector(35, wallWidth, roomSizeZ),
        toVector(wallWidth, 60, wallWidth),
        0xcccccc
    );

    myRoom.drawWall(
        toVector(35, wallWidth, roomSizeZ),
        toVector(wallWidth, 80, wallWidth),
        0xcccccc
    );

    myRoom.drawWall(
        toVector(35, wallWidth, roomSizeZ),
        toVector(wallWidth, 100, wallWidth),
        0xcccccc
    );

    myRoom.drawWall(
        toVector(35, wallWidth, roomSizeZ),
        toVector(wallWidth, 120, wallWidth),
        0xcccccc
    );

    myRoom.drawWall(
        toVector(35, wallWidth, roomSizeZ),
        toVector(wallWidth, 140, wallWidth),
        0xcccccc
    );

    myRoom.drawWall(
        toVector(35, wallWidth, roomSizeZ),
        toVector(wallWidth, 160, wallWidth),
        0xcccccc
    );

    myRoom.drawWall(
        toVector(35, wallWidth, roomSizeZ),
        toVector(wallWidth, 180, wallWidth),
        0xcccccc
    );

    myRoom.drawWall(
        toVector(35, wallWidth, roomSizeZ),
        toVector(wallWidth, 200, wallWidth),
        0xcccccc
    );

    myRoom.drawWall(
        toVector(35, wallWidth, roomSizeZ),
        toVector(wallWidth, 220, wallWidth),
        0xcccccc
    );

    myRoom.drawWall(
        toVector(35, wallWidth, roomSizeZ),
        toVector(wallWidth, 240, wallWidth),
        0xcccccc
    );

    myRoom.drawWall(
        toVector(35, wallWidth, roomSizeZ),
        toVector(wallWidth, 260, wallWidth),
        0xcccccc
    );

    myRoom.drawWall(
        toVector(35, wallWidth, roomSizeZ),
        toVector(wallWidth, 280, wallWidth),
        0xcccccc
    );

    myRoom.drawWall(
        toVector(35, wallWidth, roomSizeZ),
        toVector(wallWidth, 300, wallWidth),
        0xcccccc
    );

    myRoom.drawWall(
        toVector(35, wallWidth, roomSizeZ),
        toVector(wallWidth, 320, wallWidth),
        0xcccccc
    );

    myRoom.drawWall(
        toVector(35, wallWidth, roomSizeZ),
        toVector(wallWidth, 340, wallWidth),
        0xcccccc
    );

    myRoom.drawWall(
        toVector(35, wallWidth, roomSizeZ),
        toVector(wallWidth, 360, wallWidth),
        0xcccccc
    );

    myRoom.drawWall(
        toVector(35, wallWidth, roomSizeZ),
        toVector(wallWidth, 400, wallWidth),
        0xcccccc
    );

    myRoom.drawWall(
        toVector(35, wallWidth, roomSizeZ),
        toVector(wallWidth, 420, wallWidth),
        0xcccccc
    );

    // Создание стен комнат
    // 422 - 442

    myRoom.drawWall(
        toVector(35, wallWidth, roomSizeZ),
        toVector(55 + wallWidth, 20, wallWidth),
        0xcccccc
    );

    myRoom.drawWall(
        toVector(35, wallWidth, roomSizeZ),
        toVector(55 + wallWidth, 40, wallWidth),
        0xcccccc
    );

    myRoom.drawWall(
        toVector(35, wallWidth, roomSizeZ),
        toVector(55 + wallWidth, 60, wallWidth),
        0xcccccc
    );

    myRoom.drawWall(
        toVector(35, wallWidth, roomSizeZ),
        toVector(55 + wallWidth, 80, wallWidth),
        0xcccccc
    );

    myRoom.drawWall(
        toVector(35, wallWidth, roomSizeZ),
        toVector(55 + wallWidth, 100, wallWidth),
        0xcccccc
    );

    myRoom.drawWall(
        toVector(35, wallWidth, roomSizeZ),
        toVector(55 + wallWidth, 120, wallWidth),
        0xcccccc
    );

    myRoom.drawWall(
        toVector(35, wallWidth, roomSizeZ),
        toVector(55 + wallWidth, 160, wallWidth),
        0xcccccc
    );

    myRoom.drawWall(
        toVector(35, wallWidth, roomSizeZ),
        toVector(55 + wallWidth, 180, wallWidth),
        0xcccccc
    );

    myRoom.drawWall(
        toVector(35, wallWidth, roomSizeZ),
        toVector(55 + wallWidth, 200, wallWidth),
        0xcccccc
    );

    myRoom.drawWall(
        toVector(35, wallWidth, roomSizeZ),
        toVector(55 + wallWidth, 220, wallWidth),
        0xcccccc
    );

    myRoom.drawWall(
        toVector(35, wallWidth, roomSizeZ),
        toVector(55 + wallWidth, 240, wallWidth),
        0xcccccc
    );

    myRoom.drawWall(
        toVector(35, wallWidth, roomSizeZ),
        toVector(55 + wallWidth, 260, wallWidth),
        0xcccccc
    );

    myRoom.drawWall(
        toVector(35, wallWidth, roomSizeZ),
        toVector(55 + wallWidth, 280, wallWidth),
        0xcccccc
    );

    myRoom.drawWall(
        toVector(35, wallWidth, roomSizeZ),
        toVector(55 + wallWidth, 300, wallWidth),
        0xcccccc
    );


    myRoom.drawWall(
        toVector(35, wallWidth, roomSizeZ),
        toVector(55 + wallWidth, 320, wallWidth),
        0xcccccc
    );

    myRoom.drawWall(
        toVector(35, wallWidth, roomSizeZ),
        toVector(55 + wallWidth, 340, wallWidth),
        0xcccccc
    );

    myRoom.drawWall(
        toVector(35, wallWidth, roomSizeZ),
        toVector(55 + wallWidth, 360, wallWidth),
        0xcccccc
    );

    myRoom.drawWall(
        toVector(35, wallWidth, roomSizeZ),
        toVector(55 + wallWidth, 380, wallWidth),
        0xcccccc
    );

    myRoom.drawWall(
        toVector(35, wallWidth, roomSizeZ),
        toVector(55 + wallWidth, 400, wallWidth),
        0xcccccc
    );

    myRoom.drawWall(
        toVector(35, wallWidth, roomSizeZ),
        toVector(55 + wallWidth, 420, wallWidth),
        0xcccccc
    );

    myRoom.drawDoor(6, 12, 42, 4); // Дверь

    // Создание точек-ссылок на комнаты

    myRoom.drawLinkPoint(
        '403', // Надпись над кнопкой
        'tfk2_403.js', // Название файла с комнатой
        toVector(19, 380, roomSizeZ), // Расположение точки
        {
            events: { // События
                'click': showRoomInformation // Вывод информации о комнате при клике
            },
            dbID: 1 // id комнаты в БД
        }
    );

    myRoom.drawLinkPoint(
        '412',
        'tfk2_412.js',
        toVector(19, 190, roomSizeZ),
        {
            events: {
                'click': showRoomInformation
            },
            dbID: 2
        }
    );

    myRoom.drawLinkPoint(
        '417',
        'tfk2_417.js',
        toVector(19, 90, roomSizeZ),
        {
            events: {
                'click': showRoomInformation
            },
            dbID: 3
        }
    );

    myRoom.drawLinkPoint(
        '430',
        'tfk2_430.js',
        toVector(75, 270, roomSizeZ),
        {
            events: {
                'click': showRoomInformation
            },
            dbID: 4
        }
    );

    myRoom.drawLinkPoint(
        '436',
        'tfk2_436.js',
        toVector(75, 140, roomSizeZ),
        {
            events: {
                'click': showRoomInformation
            },
            dbID: 5
        }
    );

    myRoom.drawLinkPoint(
        '437',
        'tfk2_437.js',
        toVector(75, 110, roomSizeZ),
        {
            events: {
                'click': showRoomInformation
            },
            dbID: 6
        }
    );

    myRoom.drawLinkPoint(
        '439',
        'tfk2_439.js',
        toVector(75, 70, roomSizeZ),
        {
            events: {
                'click': showRoomInformation
            },
            dbID: 7
        }
    );

    myRoom.drawLinkPoint(
        '442',
        'tfk2_442.js',
        toVector(75, 10, roomSizeZ),
        {
            events: {
                'click': showRoomInformation
            },
            dbID: 8
        }
    );

    return myRoom;
}



