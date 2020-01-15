<?php
    require_once('../base_conocimiento/coneccion.php');
    header('Access-Control-Allow-Origin: *');
    header("Content-type: application/json");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: POST');
    
    $json = file_get_contents('php://input');

    //$objson =json_decode($json);

    /*Datos de la regla*/
    //$id_rule = $objson->id_regla;
    $id_rule = 1;

    if($id_rule != null)
    {
        $J=[];
        $I=0;

        $result=$mysqli->query("SELECT ID_REGLA,CONCLUSION,Reg_porcentaje FROM reglas WHERE ID_REGLA='$id_rule'");
        $fila_ant = $result->fetch_assoc();
        $id_regla = $fila_ant["ID_REGLA"];
        $conclusion_regla = $fila_ant["CONCLUSION"];
        $reg_porcentaje = $fila_ant["Reg_porcentaje"];
        $p_h = (float)$reg_porcentaje;
       
       // echo $p_h;
        $antecedente=$mysqli->query("SELECT ID_ANTECEDENTES,DESCRIP_ANT,Ant_porcentaje  FROM antecedentes WHERE ID_REGLA='$id_rule'");
          $cont = $antecedente->num_rows;
          

          while($cont>0){ //para recorrer los antecedentes
            $fila_ant = $antecedente->fetch_assoc();
            $descripc_ant = $fila_ant["DESCRIP_ANT"];
            $id_ant = $fila_ant["ID_ANTECEDENTES"];
            $ant_porcentaje = $fila_ant["Ant_porcentaje"];
            $p_e_h = (float)$ant_porcentaje;
            $p_h_e = p_h_e($p_e_h,$p_h);
         
           //Teoría de confirmacion 1. Fórmulas
              $MC_h_e = MC_h_e($p_h_e,$p_h);
              $MI_h_e = MI_h_e($p_h,$p_h_e);
              $CF_h_e = $MC_h_e - $MI_h_e;

            $J[$I] = [
                "id_antec"=>$id_ant,
                "antecedente"=>$descripc_ant,
                "ant_porcentaje"=>$ant_porcentaje,
                "prob(h/e)"=>$p_h_e,
                "MC(h/e)"=>$MC_h_e,
                "MI(h/e)"=>$MI_h_e,
                "CF(h/e)" =>$CF_h_e,
            ];
            $I++;
            $cont--;
        }
        
          $H= [
            "validacion"=>true,
            "id_regla"=>$id_regla,
            "conclusion"=>$conclusion_regla,
            "reg_porcentaje"=>$reg_porcentaje,
            "reglas" => $J
          ];

        echo json_encode($H);
    }else{
        $J=["validacion"=>false];
        echo json_encode($J);
      }
    $mysqli->close();

    
    //formula bayes
    
    function p_h_e($p_e_h, $p_h){   
        $p__h = 1-$p_h;
        $p_e__h = 1-$p_e_h; //revisar formula
        $p_h_e = ($p_e_h*$p_h)/(($p_e_h*$p_h)+($p_e__h*$p__h));  // __significa ~
      
        return $p_h_e;
    }

    //Teoría de confirmacion 1. Fórmulas

    function MC_h_e($p_h_e,$p_h){
      if($p_h_e > $p_h)
        return (($p_h_e - $p_h)/(1 - $p_h));
      else
        return 0;
    }

    function MI_h_e($p_h, $p_h_e){
      if($p_h_e < $p_h)
        return (($p_h - $p_h_e)/($p_h));
      else
        return 0;
    }
?>
