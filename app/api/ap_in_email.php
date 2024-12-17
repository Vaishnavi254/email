<?php

//application initialization files inclusion
include_once "../dist/utils/ut_gs_init.php";
include_once '../object/ob_in_email.php';

//initialize class object
$email = new Email($db);

//read parameter value from url
$id = isset($_GET['id']) ? $_GET['id'] : 0;
$oper = isset($_GET['oper']) ? strtoupper($_GET['oper']) : 'X';
$mailtyp = isset($_GET['mailtyp']) ? strtoupper($_GET['mailtyp']) : 'NAA';
$lid = isset($_GET['lid']) ? $_GET['lid'] : 0;
//set public class variables 
$email->oper = $oper;
	// error_log(print_r($ids, true));

if($oper == 'I'||$oper=='M'||$oper=='U'){
	  //read json data posted by ajax call
  $data = json_decode(file_get_contents("php://input"));

	
  //set public class variables 
   $email->id = $id;
	 $email->too = $data->too;
	 $email->cc = $data->cc;
	 $email->bcc = $data->bcc;
	 $email->subject = $data->subject;
	 $email->message = $data->message;
	 $email->rid = $data->rid;
	 $email->mailtyp = $mailtyp;

	 	//call database routine
   $stmt = $email->db_oper();
	 message_write($stmt, $data->oper); 
	 


  
} 

else if($oper=='A'||$oper=='R'||$oper=='UN'){
	  //read json data posted by ajax call
  $data = json_decode(file_get_contents("php://input"));
  //set public class variables 
   $email->id = $id;
	 $email->oper = $oper;
	 
	 	//call database routine
   $stmt = $email->db_oper();
	 message_write($stmt, $oper); 
	 
  
}
elseif ($oper == 'D'||$oper == 'P'||$oper =='RL') {
    // Delete operation and parmanent delete
    $data = json_decode(file_get_contents("php://input"));
   $email->id = $id;
	 $email->oper = $oper; // Set operation type to delete

    // Perform the database operation
    $stmt = $email->db_oper();
    message_write($stmt, $oper);
}
elseif ($oper == 'AL') {
 // to add label
    $data = json_decode(file_get_contents("php://input"));
   $email->id = $id;
   $email->oper=$oper;
	  $email->lid=$lid;
 		 error_log($oper);
		 error_log($lid);
		
    // Perform the database operation
    $stmt = $email->db_oper();
   message_write($stmt, $oper);
}

else {

$email->id = $id;
	 //call database routine
$stmt = $email->db_oper();
//total number of records returing by query 
$num = $stmt->rowCount(); 

//if query has record set, read and store into php array to read by jquery.
if($num>0){
  $email_arr=array();
  $email_arr['records']=array();
  // retrieve our table contents
  // fetch() is faster than fetchAll()
  // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
  while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
    // extract row
    extract($row);
    $email_item=array(
		    'id'=> $id,
        'too' => $too,
        'cc' => $cc,
        'bcc' => $bcc,
        'subject' => $subject,
        'message' => $message,
				'is_starred' => $is_starred,
				'mailtyp' => $mailtyp,
				'created_on'=> $created_on,
				'upload_id'=> $upload_id,
				'filename' => $filename,
				'rid'=>$rid,
				'active'=>$active,
				'doc_type'=>$doc_type,
        'lbl_name'=>$lbl_name,				
				
				
      );
    array_push($email_arr['records'], $email_item);
  }
  //closing records fetching query  
  $stmt->closeCursor();
}

//Return status message to caller
message_read($num, $email_arr);

};	



