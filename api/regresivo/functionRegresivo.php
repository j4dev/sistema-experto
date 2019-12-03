<?php

function antecedenteRegla($antecedente){
    include('../base_conocimiento/DB_Datos.php');
    include('../base_conocimiento/coneccion.php');
    
     //Buscar si antecedente es regla 
     $es_regla = $mysqli->query("SELECT `ID_REGLA`,`CONCLUSION` FROM `reglas` WHERE `CONCLUSION` = '$antecedente' ");
     $num_row = $es_regla->num_rows;

     $id_regla_ant = 0;

     if($num_row != 0){
       while($num_row > 0){
            $fila2 = $es_regla->fetch_assoc();
            $id_regla_ant = $fila2['ID_REGLA'];
            $num_row--;
         }
        
        return $id_regla_ant;
    }
    else
        return $id_regla_ant;
    
    $mysqli->close();

}

?>