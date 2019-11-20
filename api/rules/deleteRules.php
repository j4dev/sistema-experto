<?php
    require_once('../base_conocimiento/coneccion.php');
    header('Access-Control-Allow-Origin: *');
    header("Content-type: application/json");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: POST');
    
    $json = file_get_contents('php://input');

    $objson =json_decode($json);

    /*Datos de la regla*/
    $regla = $objson->regla;
    /* */

    if($regla != null)
    {
        $J=[];
        $I=0;

        $sql = "DELETE FROM antecedentes WHERE ID_REGLA='$regla'";
        
        $result=$mysqli->query($sql);

        $sql = "DELETE FROM reglas WHERE  ID_REGLA='$regla'";

        $result=$mysqli->query($sql);

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
