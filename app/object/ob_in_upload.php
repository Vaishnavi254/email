<?php

include_once '../dist/utils/ut_gs_connect.php';  

class Upload{
 
  //local variables 
  private $conn;

  //class property variables
  public $upload_id=0;
	public $rid=0;
  public $image='NA';
  public $upload_dir='';
  public $photo_dir='';
  public $oper='X'; 

  //create PDO instance for a database connection 
  public function __construct($db){
      $this->conn = $db;
  }

  //database routine handler for insert/update/delete operation
  function db_oper(){
 
    //set image upload url relative path into database
    $photo_url = $this->photo_dir.$this->image; 

    //calling database routine (stored procedure/function)
    $query = "CALL pr_in_upload
                ( :pi_upload_id
								, :pi_rid
                , :pi_filename
                , :pi_oper
                );";

    //prepare for exeuction of database routine
    $stmt = $this->conn->prepare( $query );

    //bind input/output parameters for database routine
    $stmt->bindParam(':pi_upload_id', $this->upload_id, PDO::PARAM_INT, 32);
		$stmt->bindParam(':pi_rid', $this->rid, PDO::PARAM_INT, 32);
    $stmt->bindParam(':pi_filename', $photo_url, PDO::PARAM_STR, 1024);
    $stmt->bindParam(':pi_oper', $this->oper, PDO::PARAM_STR, 1);

    //execute database routine
    $stmt->execute();

    //return execution status (true/false) to caller 
    return $stmt;

  }

  //image handler for resize and crop image by center
  function resize_crop_image
    ( $max_width
    , $max_height
    , $source_file
    , $dst_dir
    , $quality = 80
    ) {

    $imgsize = getimagesize($source_file);
    $width = $imgsize[0];
    $height = $imgsize[1];
    $mime = $imgsize['mime'];
 
    switch($mime){
      case 'image/gif':
          $image_create = "imagecreatefromgif";
          $image = "imagegif";
          break;

      case 'image/png':
          $image_create = "imagecreatefrompng";
          $image = "imagepng";
          $quality = 7;
          break;

      case 'image/jpeg':
          $image_create = "imagecreatefromjpeg";
          $image = "imagejpeg";
          $quality = 80;
          break;

      default:
          return false;
          break;
    }
     
    $dst_img = imagecreatetruecolor($max_width, $max_height);
    $src_img = $image_create($source_file);
     
    $width_new = $height * $max_width / $max_height;
    $height_new = $width * $max_height / $max_width;
  
  //if the new width is greater than the actual width of the image, then the height is 
  //too large and the rest cut off, or vice versa
    if($width_new > $width){
        //cut point by height
        $h_point = (($height - $height_new) / 2);
        //copy image
        imagecopyresampled($dst_img, $src_img, 0, 0, 0, $h_point, $max_width, $max_height, $width, $height_new);
    }else{
        //cut point by width
        $w_point = (($width - $width_new) / 2);
        imagecopyresampled($dst_img, $src_img, 0, 0, $w_point, 0, $max_width, $max_height, $width_new, $height);
    }
    
    //copy new image to destination directory    
    $image($dst_img, $dst_dir, $quality);
 
    //destroy temporary images created during process
    if($dst_img)imagedestroy($dst_img);
    if($src_img)imagedestroy($src_img);
  }

  //image handler for physically upload image to the server
  function uploadPhoto(){

    //now, if image is not empty, try to upload the image
    if($this->image){
 
        //sha1_file() function is used to make a unique file name
        $target_directory = $this->upload_dir;
        $target_file = $target_directory . $this->image;
        $file_type = pathinfo($target_file, PATHINFO_EXTENSION);
        $source_file = $_FILES['file']['tmp_name'];
        
        //corp and resize image as per profile photo requirements 
        //(width=height=128px) 
        //$this->resize_crop_image(128,128,$source_file,$source_file);
        
        
        //check: make sure the 'uploads' folder exists
        //if not, create it
        if(!is_dir($target_directory)){
            mkdir($target_directory, 0777, true);
        }   
        //Try to upload the file
        move_uploaded_file($source_file, $target_file);
    }
 
    //return success or error message to caller 
    return true;
  
  }
  
}
?>