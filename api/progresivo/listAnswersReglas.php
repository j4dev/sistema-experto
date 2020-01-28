
<?php
    require_once('../base_conocimiento/coneccion.php');
    header('Access-Control-Allow-Origin: *');
    header("Content-type: application/json");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: GET');

        $J=[];
        $I=0;

        $reglas=$mysqli->query("SELECT `regla`, `respuesta`,`Temp_reg_porcentaje` FROM `temporalreglas`");
        $cont_regla = $reglas->num_rows;

        while($cont_regla>0){

        $fila = $reglas->fetch_assoc();
        $regla = $fila['regla'];
        $respuesta = $fila['respuesta'];
        $porcentaje = $fila['Temp_reg_porcentaje'];
            
            $J[$I]=[
                "regla"=>$regla,
                "respuesta"=>$respuesta,
                "porcentaje"=>$porcentaje,
            ];

        $I++;
        $cont_regla--;
    }
    echo json_encode($J);
    
    $mysqli->close();

?>
