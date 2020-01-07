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
    $re_porcentaje = $objson->re_porcentaje;
    /* */

    /* Datos de los antecedentes*/
    $tipo = $objson->vec_antecedentes;
    $ant_porcentaje = $objson->ant_porcentaje;
    /* */

    if($user != null)
    {
        $J=[];
        $I=0;

        $sql = "INSERT INTO `reglas`(`CONCLUSION`, `ID_USUARIO`, `Reg_porcentaje`) VALUES
                ('$conclusion','$user','$re_porcentaje')";
        $result=$mysqli->query($sql);

        $last_id = $mysqli->query("SELECT LAST_INSERT_ID() AS id_regla");
        $aux_id = $last_id->fetch_assoc();
        $id_regla = $aux_id['id_regla'];
<<<<<<< HEAD
        $i=0;
        foreach ($tipo as $valor) {
            $sql = "INSERT INTO `antecedentes`(`ID_REGLA`, `DESCRIP_ANT`,`Ant_porcentaje`) VALUES 
            ('$id_regla','$valor','$ant_porcentaje[$i]')";
=======

        
        foreach ($tipo as $valor) {
            $sql = "INSERT INTO `antecedentes`(`ID_REGLA`, `DESCRIP_ANT`,`Ant_porcentaje`) VALUES
            ('$id_regla','$valor','$ant_porcentaje')";
<<<<<<< HEAD
             $i++;

>>>>>>> 05e62ce1c6109410f9330bf56c32ac226a4aa13f
=======
>>>>>>> 99283307541b2e377fa519c988362e1cb780bb14
            $result=$mysqli->query($sql);
            $i++;
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
