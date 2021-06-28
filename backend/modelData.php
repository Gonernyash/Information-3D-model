<?php
    header("Access-Control-Allow-Origin: *");
    include 'connection.php'; // Данные для поключения к БД
    // Подключение к БД
    $link = mysqli_connect($HOST, $USER, $PASSWORD, $DATABASE) or
    die ('Ошибка подключения к БД: ' . mysqli_error($link));

    $id = $_POST["id"]; // ID оборудования, переданное в теле запроса
    // Извлекаем строку из таблицы 'oborudovanie' с переданным id
    $query = "SELECT * FROM oborudovanie WHERE id = '$id'"; 
    $result = mysqli_query($link, $query) or die("Ошибка выполнения SQL-запроса: " . mysqli_error($link));
    $data = mysqli_fetch_array($result);
    $table = $data["tablica"];
    $ob_id = $data["id_oborudovaniya"];
    // В зависимости от типа оборудования(таблицы) формируем запросы 
    // для получения подробной информации о каждой единице оборудовании
    switch ($table) {
        case "shitki": // Если тип оборудования - щит управления
            $query =
                "SELECT sh.oboznachenie, mp.name, a.name, rpol.name, rpro.name, 
                kl.name, l.name, kn.name, sh.predohranitel, 
                GROUP_CONCAT(d.oboznachenie SEPARATOR ', '), GROUP_CONCAT(ob.id SEPARATOR ', ')
                FROM shitki sh
                    LEFT JOIN puskateli mp ON sh.id_magn_puskatel = mp.id
                    LEFT JOIN avto_vikluchateli a ON sh.id_avtomat = a.id
                    LEFT JOIN rele rpol ON sh.id_rele_poloz = rpol.id
                    LEFT JOIN rele rpro ON sh.id_rele_promez = rpro.id
                    LEFT JOIN kluchi kl ON sh.id_kluch = kl.id
                    LEFT JOIN lampochki l ON sh.id_lampochka = l.id
                    LEFT JOIN knopki kn ON sh.id_knopki = kn.id
                    LEFT JOIN dvigateli d ON sh.id = d.id_shita
                	LEFT JOIN oborudovanie ob ON (ob.id_oborudovaniya = d.id) AND (ob.tablica = 'dvigateli')
                WHERE (sh.id = $ob_id)";
            break;
        case "dvigateli": // Если тип оборудования - двигатель
            $query = 
                "SELECT emt.tip, emt.moshnost, emt.ob_min, emt.KPD, emt.cos_u, emt.god_vipuska,
                d.oboznachenie, sh.oboznachenie, ob.id
                FROM dvigateli d 
                LEFT JOIN electric_motors_types emt ON (d.tip_id = emt.id)
                LEFT JOIN shitki sh ON (d.id_shita = sh.id)
                LEFT JOIN oborudovanie ob ON (ob.tablica = 'shitki') AND (ob.id_oborudovaniya = sh.id)
                WHERE (d.id = $ob_id)";
        break;
    }
    // Выполнение запроса
    $result = mysqli_query($link, $query) or die("Ошибка выполнения SQL-запроса: " . mysqli_error($link));
    $data = mysqli_fetch_row($result);

    // Формирование ассоциативного массива представления полученных данных в зависимости от типа оборудования
    $nullWord = 'Нет/Неизвестно';
    switch ($table) {
        case "shitki":
            $resultData = [
                "table" => "Щит управления:",
                "Обозначение: " => $data[0] ?? $nullWord,
                "Магнитный пускатель: " => $data[1] ?? $nullWord,
                "Автомат: " => $data[2] ?? $nullWord,
                "Реле положения: " => $data[3] ?? $nullWord,
                "Реле промежуточное: " => $data[4] ?? $nullWord,
                "Ключ: " => $data[5] ?? $nullWord,
                "Лампочка: " => $data[6] ?? $nullWord,
                "Кнопка: " => $data[7] ?? $nullWord,
                "Предохранитель: " => $data[8] ? $data[8] . 'A' : $nullWord,
                "Двигатели: " => $data[9] ?? $nullWord,
                "refs" => $data[10] ?? NULL
            ];
        break;
        case "dvigateli":
            $resultData = [
                "table" => "Электродвигатель:",
                "Тип/Марка: " => $data[0] ?? $nullWord,
                "Мощность: " => $data[1] ? $data[1] . "кВт" : $nullWord,
                "об/мин: " => $data[2] ?? $nullWord,
                "КПД: "=> $data[3] ?? $nullWord,
                "cos u: " => $data[4] ?? $nullWord,
                "Год выпуска: " => $data[5] ?? $nullWord,
                "Обозначение: " => $data[6] ?? $nullWord,
                "Щит: " => $data[7] ?? $nullWord,
                "refs" => $data[8] ?? NULL
            ];
        break;
    }
    // Сообщаем браузеру, что мы отправляем ему JSON-файл
    header('Content-Type: application/json');
    // Пакуем данные в JSON-файл и отсылаем клиенту
    echo json_encode($resultData);
    // Закрываем подключение к БД
    mysqli_close($link);
?>




