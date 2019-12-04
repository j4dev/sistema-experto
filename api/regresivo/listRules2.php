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
    $id_regla = $objson->id_regla;

    $conclusionsql=$mysqli->query("SELECT * FROM `reglas` WHERE `ID_REGLA`= '$id_regla'");
    $fila5 = $conclusionsql->fetch_assoc();
    $con = $fila5['CONCLUSION'];

    $reglas2=$mysqli->query("SELECT * FROM `reglas` WHERE `ID_REGLA`<$id_regla and `CONCLUSION`='$con' ORDER BY `ID_REGLA` DESC  ");
    $fila = $reglas2->fetch_assoc();
    $resp = $fila['ID_REGLA'];
    
    if($fila != null){
                $antecedentes2 = $mysqli->query("SELECT `ID_ANTECEDENTES`,`ID_REGLA`,`DESCRIP_ANT` FROM `antecedentes` WHERE `ID_REGLA` = '$resp'");
                $cont_ant2 = $antecedentes2->num_rows;
        
                while($cont_ant2>0){

                    $fila2 = $antecedentes2->fetch_assoc();
                    $id_ante2 = $fila2['ID_ANTECEDENTES'];
                    $id_regla2 = $fila2['ID_REGLA'];
                    $antecedente2 = $fila2['DESCRIP_ANT'];
                    $J[$I]=[
                        "validacion"=>true,
                        "id_regla"=>$id_regla2,
                        "antecedente"=>$antecedente2,
                        "id_antecedente"=>$id_ante2
                    ];
                    $I++;
                    $cont_ant2--;
                }
    }
    else{
        $J[$I]=[
            "validacion"=>false
        ];

    }


    echo json_encode($J);
    
    $mysqli->close();

?>