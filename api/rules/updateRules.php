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
    /* */

    /* Datos de los antecedentes*/
    $tipo = $objson->vec_antecedentes;
    /* */

    if($user != null)
    {
        $J=[];
        $I=0;

        $sql="Update reglas Set CONCLUSION='$conclusion' where ID_REGLA='$regla'";
        $result=$mysqli->query($sql);

        foreach ($tipo as $valor) {
            $sql="Update antecedentes Set DESCRIPT_ANT='$valor' where ID_REGLA='$regla'";
             $result=$mysqli->query($sql);
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