<?php
    require_once('../base_conocimiento/coneccion.php');
    header('Access-Control-Allow-Origin: *');
    header("Content-type: application/json");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: POST');

    $json = file_get_contents('php://input');

    $objson =   json_decode($json);

    $user = $objson->usuario;
    $clave = $objson->pass;
    

    if($user != null)
    {
        $J=[];
        $I=0;
        
        $sql = "SELECT NOMBRE_US, TIPO_US, CORREO_US FROM USUARIO WHERE CORREO_US='$user' AND CLAVE_US='$clave'";

        $result=$mysqli->query($sql);

        if($result->num_rows > 0){
            $row = $result->fetch_assoc();
            $J[$I]=[
                "Validacion"=>true,
                "tipo"=>$row['TIPO_US']
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
