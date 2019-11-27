<?php
    require_once('../base_conocimiento/coneccion.php');
    header('Access-Control-Allow-Origin: *');
    header("Content-type: application/json");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: POST');
    
    $json = file_get_contents('php://input');

        $delete_temporalreglas = mysqli->query("DELETE from temporalreglas");
        $delete_temporal = mysqli->query("DELETE from temporal");

    $mysqli->close();

?>
