<?php
    header("Access-Control-Allow-Origin: *");
    include 'connection.php'; // Данные для поключения к БД
    // Подключение к БД
    $link = mysqli_connect($HOST, $USER, $PASSWORD, $DATABASE) or
    die ('Ошибка подключения к БД: ' . mysqli_error($link));

    $table = $_POST["table"];

    switch ($table) {
        case 'Оборудование':
            $headings = ['id', 'Обозначение', 'Тип', 'Здание', 'Комната'];
            $query = 
            "SELECT o.id, 
            COALESCE(d.oboznachenie, sh.oboznachenie),
            CASE WHEN o.tablica = 'dvigateli' 
                THEN 'Электродвигатель'
                WHEN o.tablica = 'shitki'
                THEN 'Щит'
            END, 
            z.name, ro.name
            FROM oborudovanie o
            LEFT JOIN dvigateli d ON (o.tablica = 'dvigateli') AND (o.id_oborudovaniya = d.id)
            LEFT JOIN shitki sh ON (o.tablica = 'shitki') AND (o.id_oborudovaniya = sh.id)
            LEFT JOIN raspolozhenie r ON (r.id_oborudovaniya = o.id)
            LEFT JOIN rooms ro ON (r.id_komnati = ro.id)
            LEFT JOIN zdaniya z ON (z.id = ro.id_zdaniya)";
        break;
        case 'Здания':
            $headings = ['id', 'Здание'];
            $query =
            "SELECT * FROM zdaniya";
        break;
        case 'Комнаты':
            $headings = ['id', 'Комната', 'Здание'];
            $query =
            "SELECT r.id, r.name, z.name 
            FROM rooms r
            LEFT JOIN zdaniya z ON (r.id_zdaniya = z.id)";
        break;
        case 'Электродвигатели':
            $headings = ['id', 'Модель', 'Мощность', 'Об/мин', 'КПД', 'cos u', 'Год', 'Обозначение', 'Щит'];
            $query =
            "SELECT d.id, t.tip, t.moshnost, t.ob_min, t.KPD, t.cos_u, t.god_vipuska, d.oboznachenie, s.oboznachenie
            FROM dvigateli d
            LEFT JOIN electric_motors_types t ON (d.tip_id = t.id)
            LEFT JOIN shitki s ON (d.id_shita = s.id)";
        break;
        case 'Щиты':
            $headings = ['id', 'Имя', 'Пускатель', 'Автомат', 'Реле полож.', 'Реле пром.', 'Ключ', 'Лампа', 'Кнопка', 'Пред.'];
            $query =
            "SELECT sh.id, sh.oboznachenie, mp.name, a.name, rpo.name, rpr.name, k.name, l.name, kn.name, sh.predohranitel
            FROM shitki sh
            LEFT JOIN puskateli mp ON (sh.id_magn_puskatel = mp.id)
            LEFT JOIN avto_vikluchateli a ON (sh.id_avtomat = a.id)
            LEFT JOIN rele rpo ON (sh.id_rele_poloz = rpo.id)
            LEFT JOIN rele rpr ON (sh.id_rele_promez = rpr.id)
            LEFT JOIN kluchi k ON (sh.id_kluch = k.id)
            LEFT JOIN lampochki l ON (sh.id_lampochka = l.id)
            LEFT JOIN knopki kn ON (sh.id_knopki = kn.id)";
        break;
    } 
   
    $result = mysqli_query($link, $query) or die("Ошибка выполнения SQL-запроса: " . mysqli_error($link));
    $data = mysqli_fetch_all($result);

    if (empty($data)) {
        $resultData = [$headings];
    } else {
        $resultData = $data;
        array_unshift($resultData, $headings);
    }

    // Сообщаем браузеру, что мы отправляем ему JSON-файл
    header('Content-Type: application/json');
    // Пакуем данные в JSON-файл и отсылаем клиенту
    echo json_encode($resultData);
    // Закрываем подключение к БД
    mysqli_close($link);
?>