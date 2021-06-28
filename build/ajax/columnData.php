<?php
    header("Access-Control-Allow-Origin: *");
    include 'connection.php'; // Данные для поключения к БД
    // Подключение к БД
    $link = mysqli_connect($HOST, $USER, $PASSWORD, $DATABASE) or
    die ('Ошибка подключения к БД: ' . mysqli_error($link));

    $table = $_POST["table"];

    $data = [];
    $resultData = [];

    switch ($table) {
        case 'rooms':
            $query =
            "SELECT z.name 
            FROM zdaniya z";
            $result = mysqli_query($link, $query) or die("Ошибка выполнения SQL-запроса: " . mysqli_error($link));
            while ($row = mysqli_fetch_row($result)) $data[] = $row[0];
            $resultData[] = $data;
        break;
        case 'dvigateli': 
            $query =
            "SELECT s.oboznachenie 
            FROM shitki s";
            $result = mysqli_query($link, $query) or die("Ошибка выполнения SQL-запроса: " . mysqli_error($link));
            while ($row = mysqli_fetch_row($result)) $data[] = $row[0];
            $resultData[] = $data;
        break;
    } 
   
    // Сообщаем браузеру, что мы отправляем ему JSON-файл
    header('Content-Type: application/json');
    // Пакуем данные в JSON-файл и отсылаем клиенту
    echo json_encode($resultData);
    // Закрываем подключение к БД
    mysqli_close($link);
?>