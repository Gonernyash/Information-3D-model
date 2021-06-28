<?php
    header("Access-Control-Allow-Origin: *");
    $model = $_GET["model"];

    header('Content-Type: model/gltf-binary; charset=UTF-8');
    echo file_get_contents("models/$model");  
?>