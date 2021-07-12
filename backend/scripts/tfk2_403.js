return async function script(infoModel, Room, toVector, Model) {
    // Размеры комнаты
    const roomSizeX = 88;
    const roomSizeY = 180;
    const roomSizeZ = 32;
    // Толщина стен
    const wallWidth = 4;
    // Создаем комнату
    const myRoom = new Room(
        {x: roomSizeX, y: roomSizeY, z: roomSizeZ}, // Размеры
        {x: 0, y: 0, z: 0}, // Расположение
        wallWidth, // Толщина стен
        0xcccccc, // Цвет
        0.7 // Непрозрачность стен
    )
    myRoom.setMainGrid(wallWidth);
    myRoom.drawWall(
        toVector(4, 64, 32),
        toVector(63, 59, myRoom.wallThick),
        0xcccccc
    );
    myRoom.drawWall(
        toVector(47, 20, 12),
        toVector(45, 137, myRoom.wallThick),
        0xcccccc
    );
    // Дверь
    myRoom.drawDoor(10.3, 20.6, 155, 3);
    // Окна
    myRoom.drawWindow(47.5, 17, 4, 11, 1);
    myRoom.drawWindow(47.5, 17, 63.5, 11, 1);
    myRoom.drawWindow(47.5, 17, 123, 11, 1);

    // Загружаем модель
    const motor = await myRoom.drawModel( // B-27-1
        './ventilation.glb', // Имя файла
        toVector(14.5, 14.5, 14.5), // Размеры
        toVector(10, 10, 0), // Расположение
        1, // Коэфф. вращения
        { // Параметры
            flipX: true, // Отразить модель по X 
            events: {'click': infoModel.showModelInformation} // Событие
        },
        18 // ID модели в базе данных в таблице 'oborudovanie'
    );
    
    //Копирование загруженной модели 
    myRoom.drawModel(motor, null, toVector(32, 10, 0), 0, null, 17) // B-27-2
    myRoom.drawModel(motor, null, toVector(53, 10, 0), 0, null, 16); // B-24-1
    myRoom.drawModel(motor, null, toVector(74, 10, 0), 0, null, 7); // B-24-2

    myRoom.drawModel(motor, toVector(9, 9, 9), toVector(45, 60, 0), 1, null, 21); // B-26-1
    myRoom.drawModel(motor, toVector(9, 9, 9), toVector(45, 75, 0), 1, null, 22); // B-26-2
    myRoom.drawModel(motor, toVector(7.5, 7.5, 7.5), toVector(45, 95, 0), 1, null, 23); // B-31
    myRoom.drawModel(motor, toVector(7.5, 7.5, 7.5), toVector(45, 110, 0), 1, null, 24); // B-36

    myRoom.drawModel(motor, toVector(9, 9, 9), toVector(5, 50, 0), 2, null, 27); // B-25-1
    myRoom.drawModel(motor, toVector(9, 9, 9), toVector(5, 75, 0), 0, {flipX: true}, 28); // B-25-2
    myRoom.drawModel(motor, toVector(4.7, 4.7, 4.7), toVector(5, 95, 0), 1, null, 25); // B-30

    myRoom.drawModel(motor, toVector(9, 9, 9), toVector(75, 60, 0), 1, null, 20); // B-28-1
    myRoom.drawModel(motor, toVector(9, 9, 9), toVector(75, 75, 0), 1, null, 19); // B-28-2
    myRoom.drawModel(motor, toVector(7.5, 7.5, 7.5), toVector(65, 105, 0), 0, null, 29); // B-34

    myRoom.drawModel(motor, toVector(11.5, 11.5, 11.5), toVector(30, 120, 0), 1, null, 26); // B-33

    const locker = await myRoom.drawModel( // 27 ШМК
        './locker.glb', 
        toVector(6.5, 6.5, 22), 
        toVector(81.5, 30, 0), 
        1, 
        {
            events: {'click': infoModel.showModelInformation}
        },
        13
    );

    myRoom.drawModel(locker, null, toVector(81.5, 37, 0), 0, null, 11); // 25 ШМК
    myRoom.drawModel(locker, null, toVector(81.5, 44, 0), 0, null, 10); // 24 ШМК

    myRoom.drawModel(locker, null, toVector(36, 173.5, 0), 1, null, 8); // 31 ШМК
    myRoom.drawModel(locker, null, toVector(43, 173.5, 0), 1, null, 6); // 30 ШМК
    myRoom.drawModel(locker, null, toVector(50, 173.5, 0), 1, null, 14); // 28 ШМК
    myRoom.drawModel(locker, null, toVector(57, 173.5, 0), 1, null, 12); // 26 ШМК
    myRoom.drawModel(locker, null, toVector(64, 173.5, 0), 1, null, 9); // 34 ШМК

    return myRoom;
}


