<?php
    require_once('../base_conocimiento/coneccion.php');
    header('Access-Control-Allow-Origin: *');
    header("Content-type: application/json");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: POST');
    
    $json = file_get_contents('php://input');

    $objson =json_decode($json);

    /*Datos de la regla*/
    $user = $objson->usuario;
    $conclusion = $objson->hipotesis;
    /* */

    /* Datos de los antecedentes*/
    $tipo = $objson->vec_antecedentes;
    /* */

    if($user != null)
    {
        $J=[];
        $I=0;

        $sql = "INSERT INTO `reglas`(`CONCLUSION`, `ID_USUARIO`) VALUES
                ('$conclusion','$user')";
        $result=$mysqli->query($sql);
        while()

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
