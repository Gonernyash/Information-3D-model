return async function script(infoModel, Room, toVector, Model) {
    // Размеры комнаты
    const roomSizeX = 55.5;
    const roomSizeY = 59;
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
    myRoom.drawDoor(10.3, 20.6, 5, 3);
    // Окна
    // myRoom.drawWindow(47.5, 17, 4, 11, 1);
    // myRoom.drawWindow(47.5, 17, 63.5, 11, 1);
    // myRoom.drawWindow(47.5, 17, 123, 11, 1);

    // Загружаем модель
    const motor = await myRoom.drawModel( // B-32
        './ventilation.glb', // Имя файла
        toVector(14.5, 14.5, 14.5), // Размеры
        toVector(25, 0, 0), // Расположение
        1, // Коэфф. вращения
        { // Параметры
            flipX: true, // Отразить модель по X 
            events: {'click': infoModel.showModelInformation} // Событие
        },
        32 // ID модели в базе данных в таблице 'oborudovanie'
    );
    
    //Копирование загруженной модели 
    myRoom.drawModel(motor, toVector(9, 9, 9), toVector(0, 15, 0), 3, null, 33) // B-38
    myRoom.drawModel(motor, toVector(9, 9, 9), toVector(15, 45, 0), 2, null, 34) // B-39
    myRoom.drawModel(motor, toVector(9, 9, 9), toVector(30, 45, 0), 2, null, 35) // B-29

    const locker = await myRoom.drawModel( // 27 ШМК
        './locker.glb', 
        toVector(6.5, 6.5, 22), 
        toVector(49, 20, 0), 
        1, 
        {
            events: {'click': infoModel.showModelInformation}
        },
        30
    );

    myRoom.drawModel(locker, null, toVector(49, 27, 0), 0, null, 31); // 25 ШМК

    return myRoom;
}