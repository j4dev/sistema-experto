<?php
    require_once('../base_conocimiento/coneccion.php');
    header('Access-Control-Allow-Origin: *');
    header("Content-type: application/json");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: POST');
    $json = file_get_contents('php://input');

    $objson =json_decode($json);

    $user = $objson->usuario;
    $correo = $objson->correo;
    $tipo = $objson->tipo;
    $clave = $objson->pass;


    if($user != null)
    {
        $J=[];
        $I=0;

        $sql = "INSERT INTO `usuario`(`NOMBRE_US`, `CLAVE_US`, `CORREO_US`, `TIPO_US`) 
                VALUES ('$user', '$clave', '$correo', '$tipo')";
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
