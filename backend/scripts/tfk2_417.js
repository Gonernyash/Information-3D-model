return async function script(infoModel, Room, toVector, showModelInformation, Model) {
    // Размеры комнаты
    const roomSizeX = 27;
    const roomSizeY = 59.5;
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
    // Дверь
    myRoom.drawDoor(10.3, 20.6, 18, 1);
    // Окна
    // myRoom.drawWindow(47.5, 17, 4, 11, 1);
    // myRoom.drawWindow(47.5, 17, 63.5, 11, 1);
    // myRoom.drawWindow(47.5, 17, 123, 11, 1);

    // Загружаем модель
    const motor = await myRoom.drawModel( // П-13-2
        './ventilation.glb', // Имя файла
        toVector(9, 9, 9), // Размеры
        toVector(17, 3, 0), // Расположение
        2, // Коэфф. вращения
        { // Параметры
            flipX: true, // Отразить модель по X 
            events: {'click': showModelInformation} // Событие
        },
        39 // ID модели в базе данных в таблице 'oborudovanie'
    );
    
    //Копирование загруженной модели 
    myRoom.drawModel(motor, null, toVector(17, 18, 0), 0, null, 38) // П-13-1
    myRoom.drawModel(motor, null, toVector(17, 33, 0), 0, null, 40); // П-14-1
    myRoom.drawModel(motor, null, toVector(17, 48, 0), 0, null, 41); // П-14-2

    const locker = await myRoom.drawModel( // П-13
        './locker.glb', 
        toVector(6.5, 6.5, 22), 
        toVector(0, 40, 0), 
        3, 
        {
            events: {'click': showModelInformation}
        },
        36
    );

    myRoom.drawModel(locker, null, toVector(0, 50, 0), 0, null, 37); // П-14

    return myRoom;
}