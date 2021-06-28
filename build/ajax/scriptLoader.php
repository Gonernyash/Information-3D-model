<?php
    header("Access-Control-Allow-Origin: *");
    $file_name = $_POST["file"];

    header('Content-Type: text/javascript');
    echo file_get_contents("scripts/$file_name");  
?>