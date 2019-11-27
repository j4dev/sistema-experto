<?php
    require_once('../base_conocimiento/coneccion.php');
    header('Access-Control-Allow-Origin: *');
    header("Content-type: application/json");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: POST');
    
    $json = file_get_contents('php://input');

    $objson =json_decode($json);

    $id_regla = $objson->id_regla;
    $id_antecedente = $objson->$id_antecedente;


    if($id_regla != null)
    {
        $J=[];
        $I=0;
 
        $regla_actual = $mysqli->query("SELECT MIN(ID_REGLA) AS id_min_regla, `CONCLUSION` FROM reglas");
        $antecedentet = $mysqli->query("SELECT * FROM reglas WHERE `ID_REGLA` = (SELECT MIN(`ID_REGLA`) FROM reglas WHERE `ID_REGLA` > 1)");
       
        $fila1 = $primera_regla->fetch_assoc();
        $id_regla = $fila1['id_min_regla'];
        $conclu_regla = $fila1['CONCLUSION'];

        
        $primer_antecedente=$mysqli->query(" SELECT MIN(`ID_ANTECEDENTES`) AS id_min_ant, `DESCRIP_ANT` FROM antecedentes WHERE `ID_REGLA`='$id_regla'");

        $fila2 = $primer_antecedente->fetch_assoc();
        $id_ant = $fila2['id_min_ant'];
        $descrip_ant= $fila2['DESCRIP_ANT'];


        
        if($primera_regla){
            
            $J[$I]=[
                "validacion"=>true,
                "id_regla"=>$id_regla,
                "conclu_regla"=>$conclu_regla,
                "id_ant"=>$id_ant,
                "descrip_ant"=>$descrip_ant
            ];
            echo json_encode($J);
        }
        else{
            $J[$I]=[
                "validacion"=>false
            ];

            echo json_encode($J);
        }
    }
    $mysqli->close();

?>
