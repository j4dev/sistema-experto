<?php
    // @Autor: Jesús Guanga
    require_once('coneccion.php');
    header('Access-Control-Allow-Origin: *');
    header("Content-type: application/json");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
    $json = file_get_contents('php://input');

    $objson =json_decode($json);

    $user = $objson->usuario;
    $clave = sha1($objson->pass);


    if($user != null)
    {
        $J=[];
        $I=0;
        $sql = $mysqli->("select USUARIO_US,CLAVE_US from USUARIO where NOMBRE_US=$name and CLAVE_US=$clave");
        $result=$conn->query($sql);
        if($result->num_rows > 0){
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
