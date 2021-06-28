<?php
    include 'connection.php'; // Данные для поключения к БД
    // Подключение к БД
    $link = mysqli_connect($HOST, $USER, $PASSWORD, $DATABASE) or
    die ('Ошибка подключения к БД: ' . mysqli_error($link));
    $table = $_POST["table"]; // Название таблице, переданное в теле запроса
    $delete_result = false; // Переменная с результатом выполнения всего скрипта
    
    switch ($table) { 
        case dvigateli: // Если добавляется двигатель
            // Собираем данные из тела запроса
            $id = $_POST["id"];

            // Получаем id типа двигателя до удаления
            $query = "SELECT d.tip_id FROM dvigateli d WHERE d.id = '$id'";
            $result = mysqli_query($link, $query);
            if (!$result) { // Обработчик ошибки
                $delete_result = "Ошибка выполнения SQL-запроса: " . mysqli_error($link);
                break;
            }
            $type_id = mysqli_fetch_row($result)[0]; // id типа двигателя

            // Удаляем запись из таблицы 'Электродвигатели'
            $query = "DELETE FROM dvigateli 
            WHERE id = '$id'";
            $result = mysqli_query($link, $query);
            if (!$result) { // Обработчик ошибки
                $delete_result = "Ошибка выполнения SQL-запроса: " . mysqli_error($link);
                break;
            } else {
                // Если все прошло успешно результатом добавления будет значение "True"
                $delete_result = true; 
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

            // Выполняем запрос
            $query = "DELETE FROM rooms WHERE id='$id'";
            $result = mysqli_query($link, $query);
            if (!$result) { // Обработчик ошибки
                $delete_result = "Ошибка выполнения SQL-запроса: " . mysqli_error($link);
                break;
            } else {
                // Если все прошло успешно результатом добавления будет значение "True"
                $delete_result = true; 
            }
        break;































































































    }

    echo $delete_result; // Отправляем результат клиенту

    // Закрываем подключение к БД
    mysqli_close($link);
<?>


