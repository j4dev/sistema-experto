<?php
    require_once('../base_conocimiento/coneccion.php');
    header('Access-Control-Allow-Origin: *');
    header("Content-type: application/json");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: POST');
    
    $json = file_get_contents('php://input');

    $objson =json_decode($json);

    /*Datos de la regla*/
    $id_rule = $objson->id_regla;
    //$id_rule = 1;

    if($id_rule != null)
    {
        $J=[];
        $I=0;

        $result=$mysqli->query("SELECT ID_REGLA,CONCLUSION FROM reglas WHERE ID_REGLA='$id_rule'");
        $fila_ant = $result->fetch_assoc();
        $id_regla = $fila_ant["ID_REGLA"];
        $conclusion_regla = $fila_ant["CONCLUSION"];
        
        $antecedente=$mysqli->query("SELECT ID_ANTECEDENTES,DESCRIP_ANT  FROM antecedentes WHERE ID_REGLA='$id_rule'");
          $cont = $antecedente->num_rows;

          while($cont>0){ //para recorrer los antecedentes
            $fila_ant = $antecedente->fetch_assoc();
            $descripc_ant = $fila_ant["DESCRIP_ANT"];
            $id_ant = $fila_ant["ID_ANTECEDENTES"];
            
            $J[$I] = [
                "id_antec"=>$id_ant,
                "antecedente"=>$descripc_ant,
            ];
            $I++;
            $cont--;
        }
        
          $H= [
            "validacion"=>true,
            "id_regla"=>$id_regla,
            "conclusion"=>$conclusion_regla,
            "reglas" => $J
          ];

        echo json_encode($H);
    }else{
        $J=["Validacion"=>false];
        echo json_encode($J);
      }
    $mysqli->close();

?>