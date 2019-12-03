<?php
    require_once('../base_conocimiento/coneccion.php');
    header('Access-Control-Allow-Origin: *');
    header("Content-type: application/json");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: POST');

    $J=[];
    $I=0;

    $json = file_get_contents('php://input');
    $objson =json_decode($json);
    $id_antecedente = $objson->id_antecedente;
    $respuesta = $objson->respuesta;

    $descrip=$mysqli->query("SELECT `DESCRIP_ANT` FROM `antecedentes` WHERE `ID_ANTECEDENTES` = '$id_antecedente' ");
    $fila = $descrip->fetch_assoc();
    $descripcion = $fila['DESCRIP_ANT'];

    
    $sql = $mysqli->query("INSERT INTO temporal (PREGUNTA_TEMP, CONCLUSION_TEMP) VALUES ('$descripcion', '$respuesta')");
  
    
    $mysqli->close();

?>