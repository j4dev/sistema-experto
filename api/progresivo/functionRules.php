<?php

function buscarReglasTemporal($regla){
    include('../base_conocimiento/DB_Datos.php');
    include('../base_conocimiento/coneccion.php');
    
    $result = $mysqli->query("SELECT * FROM `temporalreglas` WHERE `regla`='$regla'"); 
    $num_row = $result->num_rows;

    $id_regla = 0;

    if($num_row != 0){
        
        $result2 = $mysqli->query("SELECT `ID_REGLA` FROM `antecedentes` WHERE `DESCRIP_ANT` ='$regla'");
        $fila = $result2->fetch_assoc();
        $id_regla = $fila["ID_REGLA"];
        
        return $id_regla;
    }
    else
        return $id_regla;
    
    $mysqli->close();

}

?>