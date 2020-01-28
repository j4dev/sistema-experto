<?php
    require_once('../base_conocimiento/coneccion.php');
    header('Access-Control-Allow-Origin: *');
    header("Content-type: application/json");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: POST');
    
    $json = file_get_contents('php://input');

    $objson =json_decode($json);

    $id_usuario = $objson->id_usuario;
    $pregunta = $objson->pregunta;
    $conclusion = $objson->conclusion;
    $porcentaje = $objson->porcentaje;

    if($id_usuario != null)
    {

        $sql = $mysqli->query("INSERT INTO temporal (ID_USUARIO, PREGUNTA_TEMP, CONCLUSION_TEMP, Temp_porcentaje) VALUES ('$id_usuario', '$pregunta', '$conclusion', '$porcentaje')");
        

    }
    $mysqli->close();

?>
