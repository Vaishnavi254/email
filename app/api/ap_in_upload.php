<?php

//application initialization files inclusion
include_once '../dist/utils/ut_gs_init.php';
include_once '../object/ob_in_upload.php';

//initialize class object
$upload = new Upload($db);

//read parameter value from url
$id = isset($_GET['id']) ? $_GET['id'] : 0;
$rid = isset($_GET['rid']) ? $_GET['rid'] : 0;
$oper = isset($_GET['oper']) ? strtoupper($_GET['oper']) : 'X';
error_log($oper);
if($oper == 'S') { 
  $upload->oper = $oper;    
  $upload->rid = $rid;
  //call database routine
  $stmt = $upload->db_oper();
  //total number of records returing by query 
  $num = $stmt->rowCount();  

  //if query has record set, read and store into php array to read by jquery.
  $upload_arr=array();
  $upload_arr['records']=array();
  if($num>0){
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
      // extract row
      extract($row);
      $upload_items=array(
          'id' => $upload_id,
          'filename' => $filename,
					'created_on' => $created_on,
        );
      array_push($upload_arr['records'], $upload_items);
    }
    //closing records fetching query  
    $stmt->closeCursor();
  }

  //Return status message to caller
  message_read($num, $upload_arr);   
}
else {
  //direcory path stored in database to retrieve image using relative path
  $photo_dir = $upload_dir.'/docs/';
  //directory setup for upload image with absolute path
  $image_dir = $_SERVER['DOCUMENT_ROOT'].$photo_dir;

  //check: if user photo directory not exists then create one using system_id as 
  //directory name. 755 directory permission for only directory OS owner is 
  //allowed to write into directory 
  if (!is_dir($image_dir)) 
    mkdir($image_dir, 0755, true);

  //set custom image name with logged-in user identifier 
  $photo=!empty($_FILES["file"]["name"])
          ? date("ds")."_".basename($_FILES["file"]["name"]) 
          : "";

  //set public class variables
 
    $upload->upload_id = $id; 
		error_log($id);
$upload->rid = $rid; 
error_log($rid);		
  $upload->image = $photo;
  $upload->upload_dir = $image_dir;
  $upload->photo_dir = $photo_dir;    
  $upload->oper = strtoupper($oper);

  //check: if custom photo is available
  if(isset($photo)){
   //upload document 
    $message = $upload->uploadPhoto();
    //store custom profile photo details into database only when 
    //image uploaded successfully
    if(!empty($message)) {
      //call database routine to create/update records
      $stmt = $upload->db_oper();
      message_write($stmt, $oper);
    }  
  }
  if ( 0 < $_FILES['file']['error'] ) {
      echo 'Error: ' . $_FILES['file']['error'] . '<br>';
  }    
}  