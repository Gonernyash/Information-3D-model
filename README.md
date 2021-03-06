# Информационная веб 3D-модель предприятия
## Стек

- React
- Three JS
- PHP

## Описание
Информационная 3D модель для учета оборудования и проведения ремонтных работ на предприятии, позволяющая в максимально удобном и наглядном виде получить информацию о расположении и характеристиках электрооборудования.

## Демонстрация работы
### Модель в неактивном состоянии:
![](https://i.imgur.com/LECd2nX.gif)
### Информация об этаже:
![](https://i.imgur.com/MqAeJ9E.gif)
### Информация о комнате:
![](https://i.imgur.com/CsYrrbA.gif)
### Информация об оборудовании:
![](https://i.imgur.com/qUq4dSn.gif)
### Поиск оборудования:
![](https://i.imgur.com/M9bh2B5.gif)ъ
## Установка:
### Разработка
Разработка была поделена на 2 части (frontend и backend), каждая из которых проходила на собственном сервере.
Frontend-сервер запускается при помощи node js через консоль:
!!! Перед запуском необходимо установить все зависимости (npm i)
```sh
cd frontend
npm i
npm start
```
Backend-сервер запускается на любой среде для запуска локального сервера (Open Server, MAMP и т.д.)
### Продакшн
Обе части проекта был объединены и помещены в папку build.
Файлы из этой папки можно спокойно выгружать на хостинг и проверить их работу на все том же локальном сервере
## Описание состава проекта
### Frontend
/frontend/src - интерфейс на React.
/frontend/forms - формы для взаимодействия с базой данных(В разработке) 
/frontend/src/three - сама 3D-модель.
/frontend/src/three/classes - классы, описывающие модель и все объекты на ней
### Backend
/backend - тут находятся php-скрипты, обрабатывающие запросы со стороны клиента(по средствам AJAX) и взаимодействующие с базой данных.
/backend/models - тут хранятся готовые модели в формате .glb(модель двигателя, щитка и т.д.).
/backend/scripts - тут хранятся js-скрипты для процедурной генерации различных объектов(Зданий, этажей, комнат).
## ССылки
- [Пояснительная записка к дипломному проекту, в котором представлялась данная работа](https://drive.google.com/file/d/1lkgmiQJBrD88NEGSunU_W8tAA3XIHcFV/view)
## Важные и не очень заметки
- Модель здания расположена в файле /backend/scripts/main.js
- Авторизация: Логин: SYSDBA, Пароль: masterkey
- 
