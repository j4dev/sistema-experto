<?php
    require_once('../base_conocimiento/coneccion.php');
    header('Access-Control-Allow-Origin: *');
    header("Content-type: application/json");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: POST');
    
    $json = file_get_contents('php://input');

    $objson =json_decode($json);

    /*id reglas*/

    $id = $objson->vec_id;

    $max_prob = 0;
    foreach ($id as $id_rule) {
        $min = 1;

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

              if($CF_h_e < $min)// para  el min CF
                $min = $CF_h_e;
            $cont--;
        }
        
        if($max_prob < $min){ //para la max probabilidad
          $max_prob = $min;
          $conclusion = $conclusion_regla ;
        } 
          
    
      $result2 = $mysqli->query("SELECT * FROM `antecedentes` WHERE `DESCRIP_ANT`='$conclusion_regla'"); 
      $num_row = $result2->num_rows;
      if($num_row != 0){
        $sql="UPDATE antecedentes SET Ant_porcentaje='$min' WHERE `DESCRIP_ANT`='$conclusion_regla'";
            $result3=$mysqli->query($sql);
      }

      $sql="UPDATE reglas SET Reg_porcentaje='$min' WHERE ID_REGLA='$id_rule'";
        $result=$mysqli->query($sql);
    } //fin foreach
    

    $H= [
      "conclusion"=>$conclusion,
      "valor_certidumbre"=>$max_prob
    ];

  echo json_encode($H);

    $mysqli->close();

    
    //formula 
    
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
