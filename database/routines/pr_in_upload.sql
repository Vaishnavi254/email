
DELIMITER $$

DROP PROCEDURE IF EXISTS pr_in_upload$$
 
CREATE PROCEDURE pr_in_upload
  ( pi_upload_id       INT(32)
	, pi_rid         INT(32)
  , pi_filename        VARCHAR(1024)  
  , pi_oper            CHAR(1)
  )
  
BEGIN
   DECLARE pi_doc_type VARCHAR(32);
    
    
    IF pi_filename LIKE '%.jpg' OR pi_filename LIKE '%.jpeg' OR pi_filename LIKE '%.png' THEN
        SET pi_doc_type = 'img';
    ELSEIF pi_filename LIKE '%.pdf' THEN
        SET pi_doc_type = 'pdf';
		ELSEIF pi_filename LIKE '%.gif' THEN
        SET pi_doc_type = 'gif';
		ELSEIF pi_filename LIKE '%.zip' THEN
        SET pi_doc_type = 'zip';
		ELSEIF pi_filename LIKE '%.docx' THEN
        SET pi_doc_type = 'doc';
    ELSE
        SET pi_doc_type = 'unknown';
    END IF;
    

  IF pi_oper = 'S' THEN 
    
    SELECT *
    FROM in_upload 
    WHERE upload_id = pi_upload_id
		AND rid =pi_rid;


  ELSEIF pi_oper = 'I' THEN 

    INSERT INTO in_upload
    SET 
		   rid = pi_rid
      , filename = pi_filename
			, doc_type = pi_doc_type
      , created_on = NOW();




  ELSEIF pi_oper = 'D' THEN 
    
    UPDATE in_upload 
    SET active = 'N'
      , updated_on = NOW()
    WHERE upload_id = pi_upload_id; 

  END IF;
  
END$$

DELIMITER ;