<?php

// config variables
$app_name = 'Email';
$home_url = 'https://email/';
$app_url = $home_url.'index.php';
$upload_dir='/dist';
function camelCase($text){
	return ucwords(strtolower($text));
	
}

function getDateFormat($date,$format){
	
	$dt=date_create($date);
	return date_format($dt,$format);
}


?>