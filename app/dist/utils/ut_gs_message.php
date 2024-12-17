<?php

//Generic message handler for database read
function message_read($num, $record_arr) {

  if($num>0){
    //set response code - 200 OK
    http_response_code(200);
    //show results in json format
    echo json_encode($record_arr);  
  }
  //if query is not returning any records, return message to api caller.
  else {
    // return response for no records found
    echo json_encode(
        array("message" => "No records found.")
    );
  }
}  

//Generic message handler for database write
function message_write($stmt, $oper) {
  //check: operation identifier exists in json input
  if(isset($oper)){
    //call database routine to create/update records
    if($stmt){
      // set response code - 201 created
      http_response_code(201);
      //return response for opeation successful 
      echo json_encode(array("message" => "Response created successfully."));
    }
    else{
      // set response code - 503 service unavailable
      http_response_code(503);      
      //return response for create/update record failure
      echo json_encode(array("message" => "Unable to create response."));      
      //log error message to php error log file  
      error_log('api error >> ap_om_catalog.php : create operation failed.');
    }
  }
  //if json data is insufficient to complete database routine
  else{
    // set response code - 400 bad request
    http_response_code(400);
    //if json data is insufficient to complete database routine
    echo json_encode(array("message" => "Unable to create response. Data is incomplete."));  
    //log error message to php error log file  
    error_log('api error >> ap_om_catalog.php : create operation failed due to insufficient data.');
  }     
}    