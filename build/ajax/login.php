<?php
    header("Access-Control-Allow-Origin: *");
    include 'connection.php'; // Данные для поключения к БД
    // Подключение к БД
    $link = mysqli_connect($HOST, $USER, $PASSWORD, $DATABASE) or
    die ('Ошибка подключения к БД: ' . mysqli_error($link));

    $username = $_POST["username"]; // Логин
    $password = $_POST["password"]; // Пароль
    
    // Проверяем логин и пароль
    $query = 
    "SELECT a.username AS name, r.name AS role
    FROM accounts a
    LEFT JOIN roli r ON (a.role = r.id)
    WHERE a.username = '$username' AND a.password = '$password'";

    $result = mysqli_query($link, $query) 
    or die("Ошибка выполнения SQL-запроса: " . mysqli_error($link));
    $data = mysqli_fetch_assoc($result);

    // Если запрос вернул результат, то true
    $data['isLogged'] = boolval($data); 

    // Если у вошедшего имеются права админа, то true
    $data['isAdmin'] = ($data['role'] === 'Admin'); 

    // Сообщаем браузеру, что мы отправляем ему JSON-файл
    header('Content-Type: application/json');
    // Пакуем данные в JSON-файл и отсылаем клиенту
    echo json_encode($data);
    // Закрываем подключение к БД
    mysqli_close($link);
?>

