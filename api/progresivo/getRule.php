<?php
    require_once('../base_conocimiento/coneccion.php');
    header('Access-Control-Allow-Origin: *');
    header("Content-type: application/json");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: POST');
    
    $json = file_get_contents('php://input');

    $objson =json_decode($json);

    $id_regla = $objson->id_regla;
    $id_antecedente = $objson->id_antecedente;
    $respuesta = $objson->respuesta;


    if($id_regla != null)
    {
        $J=[];
        $I=0;
        $regla_actual = $mysqli->query("SELECT `CONCLUSION` FROM `reglas` WHERE `ID_REGLA`='$id_regla'");
        $fila1 = $regla_actual->fetch_assoc();
        $conclusion = $fila1['CONCLUSION'];

        $antecedente_actual = $mysqli->query("SELECT `DESCRIP_ANT` FROM `antecedentes` WHERE `ID_ANTECEDENTES`= '$id_antecedente'");
        $fila2 = $antecedente_actual->fetch_assoc();
        $antecedente = $fila2['DESCRIP_ANT'];

        
        $id_antecedente_sig = $mysqli->query("SELECT `ID_REGLA`,`ID_ANTECEDENTES` FROM antecedentes WHERE `ID_ANTECEDENTES` = (SELECT MIN(`ID_ANTECEDENTES`) FROM antecedentes WHERE `ID_ANTECEDENTES` > '$id_antecedente')");
        $fila4 = $id_antecedente_sig->fetch_assoc();
        $id_antec_sig = $fila4['ID_ANTECEDENTES'];
        $id_regla2 = $fila4['ID_REGLA'];

        if($id_regla2 != $id_regla || $respuesta == 'false'){ // if($id_regla2 != $id_regla || $respuesta == false){
            $id_regla_sig = $mysqli->query("SELECT `ID_REGLA` FROM reglas WHERE `ID_REGLA` = (SELECT MIN(`ID_REGLA`) FROM reglas WHERE `ID_REGLA` > '$id_regla')");
            $fila3 = $id_regla_sig->fetch_assoc();
            $id_regla_sig = $fila3['ID_REGLA'];
        }else
            $id_regla_sig = $id_regla;


        if($respuesta == 'false'){ //
            $antecedente_salto = $mysqli->query(" SELECT MIN(`ID_ANTECEDENTES`) AS id_min_ant, `DESCRIP_ANT` FROM antecedentes WHERE `ID_REGLA`='$id_regla_sig'");

            $fila5 = $antecedente_salto->fetch_assoc();
            $id_antec_sig = $fila5['id_min_ant'];
        }

        $final = false;

        $ultimo_antecedente = $mysqli->query("SELECT `ID_ANTECEDENTES` from antecedentes order by `ID_ANTECEDENTES` desc limit 1 ");
        $fila6 = $ultimo_antecedente->fetch_assoc();
        $fin_ant = $fila6['ID_ANTECEDENTES'];
        if($id_antecedente == $fin_ant)
            $final = true;

        if($regla_actual){
            
            $J[$I]=[
                "validacion"=>true,
                "id_regla"=>$id_regla,
                "conlusion"=>$conclusion,
                "id_antecedente"=>$id_antecedente,
                "antecedente"=>$antecedente,
                "id_regla_sig"=>$id_regla_sig,
                "id_antecedente_sig"=>$id_antec_sig,
                "final"=>$final
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
