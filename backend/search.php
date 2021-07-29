<?php
    header("Access-Control-Allow-Origin: *");
    include 'connection.php';

    // Подключение к бд
    $link = mysqli_connect($HOST, $USER, $PASSWORD, $DATABASE) or
    die ('Ошибка подключения к БД: ' . mysqli_error($link));

    // Параметры поиска из тела запроса
    $req = $_POST["req"];
    $table = $_POST["table"];

    switch ($table) {
        case 'dvigateli':
            $query = 
            "SELECT CONCAT(dt.tip, ' ',d.oboznachenie) AS result, r.file AS place, o.id 
            FROM dvigateli d
            LEFT JOIN oborudovanie o ON (o.tablica = 'dvigateli') AND (o.id_oborudovaniya = d.id)
            LEFT JOIN raspolozhenie ras ON (ras.id_oborudovaniya = o.id)
            LEFT JOIN rooms r ON (r.id = ras.id_komnati)
            LEFT JOIN electric_motors_types dt ON (d.tip_id = dt.id)
            WHERE (dt.tip LIKE '$req%') OR (d.oboznachenie LIKE '$req%')";
        break;
        case 'shitki': 
            $query=
            "SELECT s.oboznachenie AS result, r.file AS place, o.id
            FROM shitki s
            LEFT JOIN oborudovanie o ON (o.tablica = 'shitki' and o.id_oborudovaniya = s.id)
            LEFT JOIN raspolozhenie ras ON (ras.id_oborudovaniya = o.id)
            LEFT JOIN rooms r ON (r.id = ras.id_komnati)
            WHERE (oboznachenie LIKE '%$req%')";
        break;
        // case 'puskateli':
        //     $query=
        //     "SELECT p.name, sh.oboznachenie 
        //     FROM shitki sh, puskateli p
        //     WHERE (p.name LIKE '%$req%') AND (sh.id_magn_puskatel = p.id)";
        // break;
        // case 'rele':
        //     $query=
        //     "SELECT 'Реле положения:' AS rtype, r.name,  sh.oboznachenie 
        //     FROM shitki sh, rele r
        //     WHERE (r.name LIKE '%$req%') AND (sh.id_rele_poloz = r.id) 
        //     UNION
        //     SELECT 'Реле промежуточное:' AS rtype, r.name,  sh.oboznachenie 
        //     FROM shitki sh, rele r
        //     WHERE (r.name LIKE '%$req%') AND (sh.id_rele_promez = r.id)";
        // break;
    }

    $data = [];
    
    $result = mysqli_query($link, $query) or die("Ошибка выполнения SQL-запроса: " . mysqli_error($link));
    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
    }
    
    // Сообщаем браузеру, что мы отправляем ему JSON-файл
    header('Content-Type: application/json');
    // Пакуем данные в JSON-файл и отсылаем клиенту
    echo json_encode($data);
    // Закрываем подключение к БД

    mysqli_close($link);
?>


