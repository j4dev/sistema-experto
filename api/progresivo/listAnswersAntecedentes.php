
<?php
    require_once('../base_conocimiento/coneccion.php');
    header('Access-Control-Allow-Origin: *');
    header("Content-type: application/json");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: GET');

        $J=[];
        $I=0;

        $antecedentes=$mysqli->query("SELECT `PREGUNTA_TEMP`, `CONCLUSION_TEMP` FROM `temporal` ");
        $cont_ant = $antecedentes->num_rows;

        while($cont_ant>0){

        $fila = $antecedentes->fetch_assoc();
        $antecedente = $fila['PREGUNTA_TEMP'];
        $respuesta = $fila['CONCLUSION_TEMP'];
            
            $J[$I]=[
                "antecedente"=>$antecedente,
                "respuesta"=>$respuesta,
            ];

        $I++;
        $cont_ant--;
    }
    echo json_encode($J);
    
    $mysqli->close();

?>
