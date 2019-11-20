<?php
    require_once('../base_conocimiento/coneccion.php');
    header('Access-Control-Allow-Origin: *');
    header("Content-type: application/json");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: POST');
    
    $json = file_get_contents('php://input');

    $objson =json_decode($json);

    /*Datos del usuario*/
<<<<<<< HEAD
    $user = $objson->usuario;
   // $user = '1'; 
=======
   $user = $objson->usuario;

>>>>>>> efe5aca3f816d3d16e2b6dd73c4afb7dec0bcae0
   /* */

    if($user != null)
    {
        $J=[];
        $I=0;

        $result=$mysqli->query("SELECT ID_REGLA,CONCLUSION FROM reglas WHERE ID_USUARIO='$user'");
        $fila = $result->fetch_assoc();
        $id_regla = $fila["ID_REGLA"];
        $conclusion = $fila["CONCLUSION"];


        $antecedente=$mysqli->query("SELECT ID_ANTECEDENTES,DESCRIP_ANT  FROM antecedentes WHERE ID_REGLA='$id_regla'");
        $cont = $antecedente->num_rows;

        while($cont>0){ //para recorrer los antecedentes
            $fila_ant = $antecedente->fetch_assoc();
            $descripc_ant = $fila_ant["DESCRIP_ANT"];
            $id_ant = $fila_ant["ID_ANTECEDENTES"];
            
            $J[$I] = [
                "Id_descripcion"=>$id_ant,
                "Descripcion"=>$descripc_ant,
            ];
            $I++;
            $cont--;
        }
          $H= [
            "Validacion"=>true,
            "Id_regla" =>$id_regla,
            "Conclusion"=>$conclusion,
            "Antedentes" => $J
          ];

        echo json_encode($H);
    }else{
        $J=["Validacion"=>false];
        echo json_encode($J);
      }
    $mysqli->close();

?>