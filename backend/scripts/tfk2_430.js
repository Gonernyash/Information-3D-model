return async function script(infoModel, Room, toVector, Model, showModelInformation) {
    // Размеры комнаты
    const roomSizeX = 53.8;
    const roomSizeY = 58.6;
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

    // Дверь
    myRoom.drawDoor(10.3, 20.6, 25, 3);
    // Окна
    // myRoom.drawWindow(47.5, 17, 4, 11, 1);
    // myRoom.drawWindow(47.5, 17, 63.5, 11, 1);
    // myRoom.drawWindow(47.5, 17, 123, 11, 1);

    // Загружаем модель
    const motor = await myRoom.drawModel( // B-9
        './ventilation.glb', // Имя файла
        toVector(9, 9, 9), // Размеры
        toVector(5, 40, 0), // Расположение
        3, // Коэфф. вращения
        { // Параметры
            flipX: true, // Отразить модель по X 
            events: {'click': showModelInformation} // Событие
        },
        49 // ID модели в базе данных в таблице 'oborudovanie'
    );
    
    //Копирование загруженной модели 
    myRoom.drawModel(motor, null, toVector(15, 40, 0), 0, null, 50) // B-8
    myRoom.drawModel(motor, null, toVector(25, 40, 0), 0, null, 48); // B-7
    myRoom.drawModel(motor, null, toVector(35, 40, 0), 0, null, 51); // B-5

    myRoom.drawModel(motor, null, toVector(20, 5, 0), 2, null, 46); // B-6
    myRoom.drawModel(motor, null, toVector(30, 5, 0), 2, null, 45); // B-16

    myRoom.drawModel(motor, null, toVector(10, 15, 0), 1, null, 47); // B-4

    const locker = await myRoom.drawModel( // 6 ШУВ
        './locker.glb', 
        toVector(6.5, 6.5, 22), 
        toVector(47, 10, 0), 
        1, 
        {
            events: {'click': showModelInformation}
        },
        42
    );

    myRoom.drawModel(locker, null, toVector(0, 30, 0), 2, null, 44); // 8 ШУВ
    myRoom.drawModel(locker, null, toVector(38, 51.5, 0), 2, null, 43); // 7 ШУВ

    return myRoom;
}

