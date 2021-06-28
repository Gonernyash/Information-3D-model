<?php
    include 'connection.php'; // Данные для поключения к БД
    // Подключение к БД
    $link = mysqli_connect($HOST, $USER, $PASSWORD, $DATABASE) or
    die ('Ошибка подключения к БД: ' . mysqli_error($link));
    $table = $_POST["table"]; // Название таблице, переданное в теле запроса
    $update_result = false; // Переменная с результатом выполнения всего скрипта
    
    switch ($table) { 
        case dvigateli: // Если добавляется двигатель
            // Собираем данные из тела запроса
            $id = $_POST["id"];
            $model = $_POST["model"];
            $moshnost = $_POST["moshnost"];
            $ob_min = $_POST["ob_min"];
            $KPD = $_POST["KPD"];
            $cos_u = $_POST["cos_u"];
            $god = $_POST["god"];
            $oboznachenie = $_POST["oboznachenie"];
            $id_shitka = $_POST["id_shitka"];

            // Получаем id типа двигателя до обновления
            $query = "SELECT d.tip_id FROM dvigateli d WHERE d.id = '$id'";
            $result = mysqli_query($link, $query);
            if (!$result) { // Обработчик ошибки
                $update_result = "Ошибка выполнения SQL-запроса: " . mysqli_error($link);
                break;
            }
            $type_id = mysqli_fetch_row($result)[0]; // id типа двигателя

            // Проверяем, имеется ли в таблице "Типы двигателей" двигатель с введенными характеристиками 
            $query = 
            "SELECT id FROM electric_motors_types 
            WHERE (tip = '$model') AND (moshnost = '$moshnost') AND 
            (ob_min = '$ob_min') AND (KPD = '$KPD') AND 
            (cos_u = '$cos_u') AND (god_vipuska = '$god')";

            $result = mysqli_query($link, $query);
            if (!$result) { // Обработчик ошибки
                $update_result = "Ошибка выполнения SQL-запроса: " . mysqli_error($link);
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
                    $update_result = "Ошибка выполнения SQL-запроса: " . mysqli_error($link);
                    break;
                }
                $id_tip = mysqli_insert_id($link); // Получаем id новой записи
            } else { // Если же двигатель с такими же характеристиками найден, то берем его id
                $id_tip = $data["id"];
            }

            // Изменяем запись в таблице 'Электродвигатели'
            $query = "UPDATE dvigateli 
            SET tip_id = '$id_tip', oboznachenie = '$oboznachenie', id_shita = '$id_shitka')";
            $result = mysqli_query($link, $query);
            if (!$result) { // Обработчик ошибки
                $update_result = "Ошибка выполнения SQL-запроса: " . mysqli_error($link);
                break;
            } else {
                // Если все прошло успешно результатом добавления будет значение "True"
                $update_result = true; 
            }

            // Проверяем, используется ли начальный тип двигателя еще в каких либо записях
            $query = 
            "SELECT d.tip_id 
            FROM dvigateli d
            WHERE d.tip_id = '$type_id'";
            $result = mysqli_query($link, $query);
            $data = mysqli_fetch_all($result);
            // Если нет, то удаляем эту запись во избежания избыточности данных
            if (empty($data)) {
                $query = "DELETE FROM electric_motors_types WHERE id = '$type_id'";
                $result = mysqli_query($link, $query);
            }
        break;

        case "komnati": // Если добавляется комната
            // Собираем данные из тела запроса
            $id = $_POST["id"];
            $room = $_POST["room"];
            $building_id = $_POST["building"];
            $description = $_POST["description"];

            // Выполняем запрос
            $query = "UDATE rooms 
            SET id = 'id', name = '$room', id_zdaniya = '$building_id', opisanie = '$description'";
            $result = mysqli_query($link, $query);
            if (!$result) { // Обработчик ошибки
                $update_result = "Ошибка выполнения SQL-запроса: " . mysqli_error($link);
                break;
            } else {
                // Если все прошло успешно результатом добавления будет значение "True"
                $update_result = true; 
            }
        break;




















































































































































































    }

    echo $update_result; // Отправляем результат клиенту

    // Закрываем подключение к БД
    mysqli_close($link);
<?>

