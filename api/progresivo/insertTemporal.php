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
    $id_ante = $objson->id_ante;

    if($id_usuario != null)
    {
        $sqlante = $mysqli->query("SELECT Ant_porcentaje AS porcentaje FROM `antecedentes` WHERE `ID_ANTECEDENTES`=$id_ante");
        echo "SELECT Ante_porcentaje AS porcentaje FROM `antecedentes` WHERE `ID_ANTECEDENTES`=$id_ante";
        $id = $sqlante->fetch_assoc();
        $porcentajeA = $id['porcentaje'];
        $sql = $mysqli->query("INSERT INTO temporal (ID_USUARIO, PREGUNTA_TEMP, CONCLUSION_TEMP, Temp_porcentaje) VALUES ('$id_usuario', '$pregunta', '$conclusion',$porcentajeA)");
        

    }
    $mysqli->close();

?>
