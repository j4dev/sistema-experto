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
   //$user = 1;

   /* */
    if($user != null)
    {
        $J=[];
        $I=0;
        $L=[];
        $P=0;

        $result=$mysqli->query("SELECT ID_REGLA,CONCLUSION,Reg_porcentaje FROM reglas WHERE ID_USUARIO='$user'");
        $cont_regla = $result->num_rows;

        while($cont_regla>0){
          $fila = $result->fetch_assoc();
          $id_regla = $fila["ID_REGLA"];
          $conclusion = $fila["CONCLUSION"];
          $reg_porcentaje = $fila["Reg_porcentaje"];
          

          $antecedente=$mysqli->query("SELECT ID_ANTECEDENTES,DESCRIP_ANT,Ant_porcentaje  FROM antecedentes WHERE ID_REGLA='$id_regla'");
          $cont = $antecedente->num_rows;
          
          $J=[];
          $I=0;
          while($cont>0){ //para recorrer los antecedentes
            $fila_ant = $antecedente->fetch_assoc();
            $descripc_ant = $fila_ant["DESCRIP_ANT"];
            $id_ant = $fila_ant["ID_ANTECEDENTES"];
            $ant_porcentaje = $fila_ant["Ant_porcentaje"];

            $J[$I] = [
                "id_antec"=>$id_ant,
                "antecedente"=>$descripc_ant,
                "ant_porcentaje"=>$ant_porcentaje,
            ];
            $I++;
            $cont--;
        }
          $L[$P]=[
          "id_regla"=>$id_regla,
          "conclusion"=>$conclusion,
          "reg_porcentaje"=>$reg_porcentaje,
          "antecedentes"=>$J
          ];
          $P++;
          $cont_regla--;
          
        }
        
          $H= [
            "validacion"=>true,
            "reglas" => $L
          ];

        echo json_encode($H);
    }else{
        $J=["validacion"=>false];
        echo json_encode($J);
      }
    $mysqli->close();

?>