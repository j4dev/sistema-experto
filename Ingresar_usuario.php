<?php
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
        $sql = $mysqli->("INSERT INTO USUARIO (NOMBRE_US, CLAVE_US, CORREO_US,TIPO_US) VALUES ('$NAME', '$PASS', '$EMAIL','$TYPE')");
        $result=$conn->query($sql);
        if($result){
            $J[$I]=[
                "Validacion"=>true
            ];
            echo json_encode($J);
        }
        else{
            $J[0]=[
                "Validacion"=>false
            ];
            echo json_encode($J);
        }
    }
    else{
        $J[0]=[
            "Validacion"=>false
        ];
        echo json_encode($J);
    }
    $mysqli->close();

?>
