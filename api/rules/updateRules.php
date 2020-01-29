<?php
    require_once('../base_conocimiento/coneccion.php');
    header('Access-Control-Allow-Origin: *');
    header("Content-type: application/json");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: POST');
    
    $json = file_get_contents('php://input');

    $objson =json_decode($json);

    /*Datos de la regla*/
    $regla = $objson->id_regla_mod;
    $conclusion = $objson->hipotesis;
    $re_porcentaje = $objson->re_porcentaje;
    /* */

    /* Datos de los antecedentes*/
    $tipo = $objson->vec_antecedentes;
    $ant_porcentaje = $objson->ant_porcentaje;
    $identificador = $objson->identifiers;
    /* */

    if($regla != null)
    {
        $J=[];
        $I=0;
        $h = 0;
        $sql="UPDATE reglas SET CONCLUSION='$conclusion', Reg_porcentaje='$re_porcentaje' WHERE ID_REGLA='$regla'";
        echo $sql;
        $result=$mysqli->query($sql);

        foreach ($tipo as $valor) {
            $sql="UPDATE antecedentes SET DESCRIP_ANT='$valor',Ant_porcentaje='$ant_porcentaje[$h]' WHERE ID_REGLA='$regla' AND ID_ANTECEDENTES=$identificador[$h]";
            $result=$mysqli->query($sql);
            $h++;
        }
        
        if($result){
            
            $J[$I]=[
                "Validacion"=>true
            ];
            echo json_encode($J);
        }
        else{
            $J[$I]=[
                "Validacion"=>false
            ];

            echo json_encode($J);
        }
    }
    $mysqli->close();

?>