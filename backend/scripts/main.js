return async function script(infoModel, Building, toVector, toStructure, showFloorInformation) {
    // Размеры здания
    const sizeX = 70; 
    const sizeY = 250;
    const sizeZ = 15;

    const betwDist = 200; // Расстояние между двумя зданиями

    const Afloor1 = new Building( // 1 этаж 1 здания
        toVector(sizeX, sizeY, sizeZ), // Размеры
        toVector(betwDist, 0, 0), // Позиция
        0xcccccc, // Цвет
        1, // Коэффициент вращения
        { // Дополнительные параметры
            events: { // События
                'click': showFloorInformation // Вывод информации об этаже при клике
            },
            dbInfo: { // Информация для связи с БД
                buildingID: 1, // id здания в БД
                floor: 1 // Номер этажа
            },
            src: 'tfk1_floor1.js' // Ссылка на скрипт этажа
        }

    )

    Afloor1.drawDoor(7, 10, 60, 3); // Дверь

    const Afloor2 = new Building( // 2 этаж 1 здания
        toVector(sizeX, sizeY, sizeZ),
        toVector(betwDist, 0, sizeZ * 1),
        0xcccccc,
        1,
        {
            // Параметры окон
            windowWidth: 5,
            windowHeight: 7,
            windowsCount2: 3,
            windowsCount3: 10,
            windowsCount4: 3,
            events: {
                'click': showFloorInformation
            },
            dbInfo: {
                buildingID: 1,
                floor: 2
            },
            src: 'tfk1_floor2.js'
        }
    )

    // Окна
    Afloor2.drawWindow(70, 20, 170, -8, 1);
    Afloor2.drawWindow(70, 20, 9, -8, 1);
    Afloor2.drawWindow(70, 8, 90, -8, 1);
    Afloor2.drawWindow(70, 8, 90, 4, 1);

    const Afloor3 = new Building( // 3 этаж 1 здания
        toVector(sizeX, sizeY, sizeZ),
        toVector(betwDist, 0, sizeZ * 2),
        0xcccccc,
        1,
        {
            windowWidth: 5,
            windowHeight: 7,
            windowsCount1: 11,
            windowsCount2: 3,
            windowsCount3: 10,
            windowsCount4: 3,
            events: {
                'click': showFloorInformation
            },
            dbInfo: {
                buildingID: 1,
                floor: 3
            },
            src: 'tfk1_floor3.js'
        }
    )
    
    const Afloor4 = new Building(  // 4 этаж 1 здания
        toVector(sizeX, 100, sizeZ),
        toVector(betwDist, 0, sizeZ * 3),
        0xcccccc,
        1,
        {
            windowWidth: 5,
            windowHeight: 7,
            windowsCount1: 5,
            windowsCount3: 5,
            windowsCount4: 3,
            events: {
                'click': showFloorInformation
            },
            dbInfo: {
                buildingID: 1,
                floor: 4
            },
            src: 'tfk1_floor4.js'
        }
    )

    const Bfloor1 = new Building( // 1 этаж 2 здания
        toVector(sizeX, sizeY, sizeZ),
        toVector(0, 0, 0),
        0xcccccc,
        1,
        {
            windowWidth: 5,
            windowHeight: 7,
            windowsCount1: 26,
            windowsCount2: 3,
            windowsCount3: 26,
            windowsCount4: 3,
            windowsTop: 1,
            events: {
                'click': showFloorInformation
            },
            dbInfo: {
                buildingID: 2,
                floor: 1 
            },
            src: 'tfk2_floor1.js'
        }
    )

    const Bfloor2 = new Building( // 2 этаж 2 здания
        toVector(sizeX, sizeY, sizeZ),
        toVector(0, 0, sizeZ * 1),
        0xcccccc,
        1,
        {
            windowWidth: 5,
            windowHeight: 7,
            windowsCount1: 26,
            windowsCount2: 3,
            windowsCount3: 26,
            windowsCount4: 3,
            events: {
                'click': showFloorInformation
            },
            dbInfo: {
                buildingID: 2,
                floor: 2
            },
            src: 'tfk2_floor2.js'
        }
    )

    const Bfloor3 = new Building( // 3 этаж 2 здания
        toVector(sizeX, sizeY, sizeZ),
        toVector(0, 0, sizeZ * 2),
        0xcccccc,
        1,
        {
            windowWidth: 5,
            windowHeight: 7,
            windowsCount1: 26,
            windowsCount2: 3,
            windowsCount3: 26,
            windowsCount4: 3,
            events: {
                'click': showFloorInformation
            },
            dbInfo: {
                buildingID: 2,
                floor: 3
            },
            src: 'tfk2_floor3.js'
        }
    )

    const Bfloor4 = new Building( // 4 этаж 2 здания
        toVector(sizeX, sizeY, sizeZ),
        toVector(0, 0, sizeZ * 3),
        0xcccccc,
        1,
        {
            windowWidth: 5,
            windowHeight: 7,
            windowsCount1: 26,
            windowsCount2: 3,
            windowsCount3: 26,
            windowsCount4: 3,
            events: {
                'click': showFloorInformation
            },
            dbInfo: {
                buildingID: 2,
                floor: 4
            },
            src: 'tfk2_floor4.js'
        }
    )

    const connector = new Building( // Переход между зданиями
        toVector(betwDist - sizeX, 15, 15),
        toVector(sizeX, 120, 30),
        0xcccccc,
        1,
        {
            windowWidth: 5,
            windowHeight: 5,
            windowsCount2: 15,
        }
    )
    
    // Объединение всех созданных объектов в один целый для рендера
    return toStructure([Afloor1, Afloor2, Afloor3, Afloor4, Bfloor1, Bfloor2, Bfloor3, Bfloor4, connector]); 
}




