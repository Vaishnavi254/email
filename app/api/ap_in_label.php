<?php

//application initialization files inclusion
include_once "../dist/utils/ut_gs_init.php";
include_once '../object/ob_in_label.php';

//initialize class object
$Label = new Label($db);

//read parameter value from url
$oper = isset($_GET['oper']) ? strtoupper($_GET['oper']) : 'X';
 $id = isset($_GET['id']) ? $_GET['id'] : 0;
// $role_code = isset($_GET['role_code']) ? strtoupper($_GET['role_code']) : 'NA';
// $role_name = isset($_GET['role_name']) ? strtoupper($_GET['role_name']) : 'NA';

if($oper=='S') {

  //set public class variables
 

//call database routine
$stmt = $Label->write();

//total number of records returing by query 
$num = $stmt->rowCount();  
	
//if query has record set, read and store into php array to read by jquery.
	if($num>0){
		$Label_arr=array();
		$Label_arr['records']=array();
		// retrieve our table contents
		// fetch() is faster than fetchAll()
		// http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
		while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
			// extract row
			extract($row);
			$Label_item=array(
					'lbl_id' => $lbl_id,
					'lbl_name' => $lbl_name,
					'lbl_code' => $lbl_code
				);
			array_push($Label_arr['records'], $Label_item);
		}
		//closing records fetching query  
		$stmt->closeCursor();
		//Return status message to caller
		message_read($num, $Label_arr); 
	}
 
}
else{  
  //read json data posted by ajax call
  $data = json_decode(file_get_contents("php://input"));

  //set public class variables 
	$Label->lbl_code = $data->lbl_code;
  $Label->lbl_name = $data->lbl_name;
	$Label->oper = $oper;
  $Label->id = $id;

  //call database routine
  $stmt = $Label->write();
	
  message_write($stmt, $oper); 
} 

//Return status message to caller
  
?>   



