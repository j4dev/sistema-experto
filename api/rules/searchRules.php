<?php
    require_once('../base_conocimiento/coneccion.php');
    header('Access-Control-Allow-Origin: *');
    header("Content-type: application/json");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: POST');
    
    $json = file_get_contents('php://input');

    $objson =json_decode($json);

    /*Datos del usuario*/
    $user = $objson->usuario;
    /* */

    if($user != null)
    {
        $J=[];
        $I=0;

        $result=$mysqli->query("SELECT ID_REGLA,CONCLUSION FROM reglas WHERE ID_USUARIO='$user'");
        $antecedente=$mysqli->query("SELECT ID_REGLA,CONCLUSION FROM reglas WHERE ID_USUARIO='$user'");
        while ($v1 = $result->fetch_array()) {
            while ($v2 = $result->fetch_array()) {
                
            }
        }

        $last_id = $mysqli->query("SELECT LAST_INSERT_ID() AS id_regla");
        $aux_id = $last_id->fetch_assoc();
        $id_regla = $aux_id['id_regla'];

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