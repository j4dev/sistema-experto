<?php
    require_once('../base_conocimiento/coneccion.php');
    header('Access-Control-Allow-Origin: *');
    header("Content-type: application/json");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: GET');
    

        $J=[];
        $I=0;

        $primera_regla=$mysqli->query("SELECT MIN(ID_REGLA) AS id_min_regla, `CONCLUSION` FROM reglas");
    
        $fila1 = $primera_regla->fetch_assoc();
        $id_regla = $fila1['id_min_regla'];
        $conclu_regla = $fila1['CONCLUSION'];

        
        $primer_antecedente=$mysqli->query(" SELECT MIN(`ID_ANTECEDENTES`) AS id_min_ant, `DESCRIP_ANT` FROM antecedentes WHERE `ID_REGLA`='$id_regla'");

        $fila2 = $primer_antecedente->fetch_assoc();
        $id_ant = $fila2['id_min_ant'];
        $descrip_ant= $fila2['DESCRIP_ANT'];


        $id_antecedente_sig = $mysqli->query("SELECT `ID_REGLA`,`ID_ANTECEDENTES` FROM antecedentes WHERE `ID_ANTECEDENTES` = (SELECT MIN(`ID_ANTECEDENTES`) FROM antecedentes WHERE `ID_ANTECEDENTES` > '$id_ant')");
        $fila4 = $id_antecedente_sig->fetch_assoc();
        $id_antec_sig = $fila4['ID_ANTECEDENTES'];
        $id_regla2 = $fila4['ID_REGLA'];

        if($id_regla2 != $id_regla){
            $id_regla_sig = $mysqli->query("SELECT `ID_REGLA` FROM reglas WHERE `ID_REGLA` = (SELECT MIN(`ID_REGLA`) FROM reglas WHERE `ID_REGLA` > '$id_regla')");
            $fila3 = $id_regla_sig->fetch_assoc();
            $id_regla_sig = $fila3['ID_REGLA'];
        }else
            $id_regla_sig = $id_regla;

        
        if($primera_regla){
            
            $J[$I]=[

                "validacion"=>true,
                "id_regla"=>$id_regla,
                "conlusion"=>$conclu_regla,
                "id_antecedente"=>$id_ant,
                "antecedente"=>$descrip_ant,
                "id_regla_sig"=>$id_regla_sig,
                "id_antecedente_sig"=>$id_antec_sig
            ];
            echo json_encode($J);
        }
        else{
            $J[$I]=[
                "validacion"=>false
            ];

            echo json_encode($J);
        }
    
    $mysqli->close();

?>
