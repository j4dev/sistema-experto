<?php
    require_once('../base_conocimiento/coneccion.php');
    require_once('functionRegresivo.php'); 
    header('Access-Control-Allow-Origin: *');
    header("Content-type: application/json");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: POST');
    
    $json = file_get_contents('php://input');

    $objson =json_decode($json);

    $id_regla = $objson->id_regla;


    if($id_regla != null)
    {
        $J=[];
        $I=0;

        $antecedentes = $mysqli->query("SELECT `ID_REGLA`,`DESCRIP_ANT`, `ID_ANTECEDENTES` FROM `antecedentes` WHERE `ID_REGLA` = '$id_regla'");
        $cont_ant = $antecedentes->num_rows;

        while($cont_ant>0){

            $fila = $antecedentes->fetch_assoc();
            $id_antecedente = $fila['ID_ANTECEDENTES'];
            $antecedente = $fila['DESCRIP_ANT'];

            $resp = antecedenteRegla($antecedente); //si regla  es antecedente

            if($resp != 0){
                $antecedentes2 = $mysqli->query("SELECT `ID_REGLA`,`DESCRIP_ANT`,`ID_ANTECEDENTES` FROM `antecedentes` WHERE `ID_REGLA` = '$resp'");
                $cont_ant2 = $antecedentes2->num_rows;
                while($cont_ant2>0){

                    $fila2 = $antecedentes2->fetch_assoc();
                    $id_antecedente2 = $fila2['ID_ANTECEDENTES'];
                    $antecedente2 = $fila2['DESCRIP_ANT'];
                    $J[$I]=[
                        "id_antecedente"=>$id_antecedente2,
                        "antecedente"=>$antecedente2
                    ];
                    $I++;
                    $cont_ant2--;
                }
            }else{
                $J[$I]=[
                    "id_antecedente"=>$id_antecedente,
                    "antecedente"=>$antecedente
                ];
            }
          
            $I++;
            $cont_ant--;
        }
        echo json_encode($J);
    }
    $mysqli->close();

?>