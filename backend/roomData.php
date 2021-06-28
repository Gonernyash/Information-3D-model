<?php
    header("Access-Control-Allow-Origin: *");
    include 'connection.php'; // Данные для поключения к БД
    // Подключение к БД
    $link = mysqli_connect($HOST, $USER, $PASSWORD, $DATABASE) or
    die ('Ошибка подключения к БД: ' . mysqli_error($link));

    $room = $_POST["room"];
   
    $query = 
    "SELECT z.name, r.name, r.opisanie
    FROM rooms r
    LEFT JOIN zdaniya z ON (r.id_zdaniya = z.id)
    WHERE r.id = $room";

    $result = mysqli_query($link, $query) or die("Ошибка выполнения SQL-запроса: " . mysqli_error($link));
    $data = mysqli_fetch_row($result);

    // Сообщаем браузеру, что мы отправляем ему JSON-файл
    header('Content-Type: application/json');
    // Пакуем данные в JSON-файл и отсылаем клиенту
    echo json_encode($data);
    // Закрываем подключение к БД
    mysqli_close($link);
?>