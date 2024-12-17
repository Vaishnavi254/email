<?php

include_once '../dist/utils/ut_gs_connect.php';  
  
class Email{
 
  //local variables 
  private $conn;

  //class property variables
	//public $ids=[];
  public $id=0;
	public $rid=0;
	public $too='NA';
	public $cc='NA';
	public $bcc='NA';
	public $subject='NA';
	public $message='NA';
	public $mailtyp='NAA';
	public $is_starred='X';
	public $oper='XA';
	public $doc_type='NAA';
	public $lid=0;
	
//  public $idList='NA';
  //create PDO instance for a database connection 
  public function __construct($db){
      $this->conn = $db;
  }
  

  //database routine handler for query operation
  function db_oper(){
  $ids= is_array($this->id)? implode(',', array_map('intval', $this->id)) :  $this->id;
	

    //calling database routine (stored procedure/function)
    $query = "CALL pr_in_email
		              ( :pi_id
									 ,:pi_too
									 ,:pi_cc
		               ,:pi_bcc
		               ,:pi_subject
									 ,:pi_message
									 ,:pi_rid
									 ,:pi_mailtyp
									 ,:pi_is_starred
		               ,:pi_oper
									 ,:pi_lid
		)";
  
    //prepare for exeuction of database routine
    $stmt = $this->conn->prepare( $query );

    //bind input/output parameters for database routine
    $stmt->bindParam(':pi_id', $ids, PDO::PARAM_STR, 64);
    $stmt->bindParam(':pi_too', $this->too, PDO::PARAM_STR, 64); 
		$stmt->bindParam(':pi_cc', $this->cc, PDO::PARAM_STR, 64);
    $stmt->bindParam(':pi_bcc', $this->bcc, PDO::PARAM_STR, 64); 
		$stmt->bindParam(':pi_subject', $this->subject, PDO::PARAM_STR, 64);
		$stmt->bindParam(':pi_message', $this->message, PDO::PARAM_STR, 1024);
		$stmt->bindParam(':pi_rid', $this->rid, PDO::PARAM_INT, 32);
		$stmt->bindParam(':pi_mailtyp', $this->mailtyp, PDO::PARAM_STR, 3);
		$stmt->bindParam(':pi_is_starred', $this->is_starred, PDO::PARAM_STR, 1);
    $stmt->bindParam(':pi_oper', $this->oper, PDO::PARAM_STR, 2);
     $stmt->bindParam(':pi_lid', $this->lid, PDO::PARAM_INT, 32);
		//execute database routine

   $stmt->execute();
    //return execution status (true/false) to caller 
    return $stmt;

  }

}
?>