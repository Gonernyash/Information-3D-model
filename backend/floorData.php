<?php
    header("Access-Control-Allow-Origin: *");
    include 'connection.php'; // Данные для поключения к БД
    // Подключение к БД
    $link = mysqli_connect($HOST, $USER, $PASSWORD, $DATABASE) or
    die ('Ошибка подключения к БД: ' . mysqli_error($link));

    $building = $_POST["building"];
    $floor = $_POST["floor"];
   
    $query = 
    "SELECT concat(name, ': $floor этаж') 
    FROM zdaniya
    WHERE (id = $building)
    UNION
    SELECT name 
    FROM rooms
    WHERE (id_zdaniya = $building) AND (name LIKE " . "'$floor" . "_%')";

    $result = mysqli_query($link, $query) or die("Ошибка выполнения SQL-запроса: " . mysqli_error($link));
    $data = mysqli_fetch_all($result);

    // Сообщаем браузеру, что мы отправляем ему JSON-файл
    header('Content-Type: application/json');
    // Пакуем данные в JSON-файл и отсылаем клиенту
    echo json_encode($data);
    // Закрываем подключение к БД
    mysqli_close($link);
?>