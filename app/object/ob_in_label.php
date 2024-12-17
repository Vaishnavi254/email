<?php

include_once '../dist/utils/ut_gs_connect.php';  
  
class Label{
 
  //local variables 
  private $conn;

  //class property variables
	public $id =0;
  public $lbl_code='NAA';
	public $lbl_name='NA';
	public $oper='X';

  //public $sub_unit_id;

  //create PDO instance for a database connection 
  public function __construct($db){
      $this->conn = $db;
  }

  //database routine handler for query operation
  function write(){

    //calling database routine (stored procedure/function)
    $query = "CALL pr_in_label
                ( :pi_id
						   	, :pi_oper
                , :pi_lbl_code
                , :pi_lbl_name
                )";

    //prepare for exeuction of database routine
    $stmt = $this->conn->prepare( $query );

    //bind input/output parameters for database routine
    $stmt->bindParam(':pi_id', $this->id, PDO::PARAM_INT, 32); 
    $stmt->bindParam(':pi_oper', $this->oper, PDO::PARAM_STR, 1); 		
    $stmt->bindParam(':pi_lbl_code', $this->lbl_code, PDO::PARAM_STR, 3);
    $stmt->bindParam(':pi_lbl_name', $this->lbl_name, PDO::PARAM_STR, 64);
    
    //execute database routine
    $stmt->execute();

    //return execution status (true/false) to caller 
    return $stmt;
	  }
	
  
}
	


?>