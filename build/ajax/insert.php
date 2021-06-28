<?php
    include 'connection.php'; // Данные для поключения к БД
    // Подключение к БД
    $link = mysqli_connect($HOST, $USER, $PASSWORD, $DATABASE) or
    die ('Ошибка подключения к БД: ' . mysqli_error($link));
    $table = $_POST["table"]; // Название таблице, переданное в теле запроса
    $insert_result = false; // Переменная с результатом выполнения всего скрипта
    
    switch ($table) { 
        case "dvigateli": // Если добавляется двигатель
            // Собираем данные из тела запроса
            $model = $_POST["model"];
            $moshnost = $_POST["moshnost"];
            $ob_min = $_POST["ob_min"];
            $KPD = $_POST["KPD"];
            $cos_u = $_POST["cos_u"];
            $god = $_POST["god"];
            $oboznachenie = $_POST["oboznachenie"];
            $id_shitka = $_POST["id_shitka"];

            // Проверяем, имеется ли в таблице "Типы двигателей" двигатель с введенными характеристиками 
            $query = 
            "SELECT id FROM electric_motors_types 
            WHERE (tip = '$model') AND (moshnost = '$moshnost') AND 
            (ob_min = '$ob_min') AND (KPD = '$KPD') AND 
            (cos_u = '$cos_u') AND (god_vipuska = '$god')";

            $result = mysqli_query($link, $query);
            if (!$result) { // Обработчик ошибки
                $insert_result = "Ошибка выполнения SQL-запроса: " . mysqli_error($link);
                break;
            }
            $data = mysqli_fetch_all($result); // Получаем результат выполнения запроса
        
            $id_tip = NULL; // Объявляем переменную с типом двигателя
            if (empty($data)) { // Если в предыдущем запросе тип двигателя не был найден, то создаем новый
                $query =
                "INSERT INTO electric_motors_types(tip, moshnost, ob_min, KPD, cos_u, god_vipuska) 
                VALUES('$model', '$moshnost', '$ob_min', '$KPD', '$cos_u', '$god')";
                $result = mysqli_query($link, $query);
                if (!$result) { // Обработчик ошибки
                    $insert_result = "Ошибка выполнения SQL-запроса: " . mysqli_error($link);
                    break;
                }
                $id_tip = mysqli_insert_id($link); // Получаем id новой записи
            } else { // Если же двигатель с такими же характеристиками найден, то берем его id
                $id_tip = $data["id"];
            }

            // Добавляем новую запись в таблицу 'Электродвигатели'
            $query = "INSERT INTO dvigateli(tip_id, oboznachenie, id_shita) 
            VALUES('$id_tip', '$oboznachenie', '$id_shitka')";
            $result = mysqli_query($link, $query);
            if (!$result) { // Обработчик ошибки
                $insert_result = "Ошибка выполнения SQL-запроса: " . mysqli_error($link);
                break;
            } else {
                // Если все прошло успешно результатом добавления будет значение "True"
                $insert_result = true; 
            }
        break;

        case "komnati": // Если добавляется комната
            // Собираем данные из тела запроса
            $room = $_POST["room"];
            $building_id = $_POST["building"];
            $description = $_POST["description"];

            // Выполняем запрос
            $query = "INSERT INTO rooms(name, id_zdaniya, opisanie) 
            VALUES('$room', '$building_id', '$description')";
            $result = mysqli_query($link, $query);
            if (!$result) { // Обработчик ошибки
                $insert_result = "Ошибка выполнения SQL-запроса: " . mysqli_error($link);
                break;
            } else {
                // Если все прошло успешно результатом добавления будет значение "True"
                $insert_result = true; 
            }
        break;




















































































































































































    }

    echo $insert_result; // Отправляем результат клиенту

    // Закрываем подключение к БД
    mysqli_close($link);
<?>

