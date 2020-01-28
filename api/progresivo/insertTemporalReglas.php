<?php
    require_once('../base_conocimiento/coneccion.php');
    header('Access-Control-Allow-Origin: *');
    header("Content-type: application/json");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: PUT');
    
    $json = file_get_contents('php://input');

    $objson =json_decode($json);


    $regla = $objson->regla;
    $respuesta = $objson->respuesta;
    $porcentaje = $objson->porcentaje;

    if($regla != null)
    {
        $sql = $mysqli->query("INSERT INTO temporalreglas (regla, respuesta,Temp_reg_porcentaje) VALUES ('$regla', '$respuesta', '$porcentaje')");
    }
    $mysqli->close();

?>
