<?php
    require_once('../base_conocimiento/coneccion.php');
    header('Access-Control-Allow-Origin: *');
    header("Content-type: application/json");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: GET');

        $J=[];
        $I=0;

        $reglas=$mysqli->query("SELECT l.* from reglas l inner join ( select `CONCLUSION`, max(`ID_REGLA`) as latest from reglas group by `CONCLUSION` ) r on l.`ID_REGLA` = r.latest and l.`CONCLUSION` = r.`CONCLUSION` order by `ID_REGLA` desc ");
        $cont_reglas = $reglas->num_rows;

    while($cont_reglas>0){

        $fila = $reglas->fetch_assoc();
        $id_regla = $fila['ID_REGLA'];
        $conclusion = $fila['CONCLUSION'];
            
            $J[$I]=[
                "id_regla"=>$id_regla,
                "conclusion"=>$conclusion,
            ];

        $I++;
        $cont_reglas--;
    }
    echo json_encode($J);
    
    $mysqli->close();

?>
