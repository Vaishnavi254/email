DELIMITER $$

DROP PROCEDURE IF EXISTS pr_in_email$$
 
CREATE PROCEDURE pr_in_email
     (  pi_id     VARCHAR(64)
		   ,pi_too      VARCHAR(64)
			 ,pi_cc   VARCHAR(64)
			 ,pi_bcc      VARCHAR(64)
			 ,pi_subject   VARCHAR(64) 
			 ,pi_message  VARCHAR(1024)
			 ,pi_rid      INT(32)
			 ,pi_mailtyp   CHAR	(3)		 
			 ,pi_is_starred CHAR(1)  
			 ,pi_oper       CHAR(2) 
			 ,pi_lid        INT(32)
     )
 

BEGIN

  IF pi_oper = 'I' THEN  
	
  	INSERT INTO in_email
		SET too = pi_too
			 , cc = pi_cc
       , bcc = pi_bcc
			 ,subject = pi_subject
			 ,message = pi_message
			 , rid=pi_rid
			 ,mailtyp =pi_mailtyp;
			 
	
		
  ELSEIF pi_oper = 'D' THEN  
        
        UPDATE in_email
        SET active = 'N'
				WHERE FIND_IN_SET(id, pi_id);
				
   ELSEIF pi_oper = 'P' THEN  
        
        DELETE FROM in_email   
				WHERE FIND_IN_SET(id, pi_id);
				
	 ELSEIF pi_oper = 'UN' THEN -- undo from trash
					
        UPDATE in_email
        SET active = 'Y'
				WHERE FIND_IN_SET(id, pi_id);
				
			ELSEIF pi_oper = 'AL' THEN 
					
        UPDATE in_email
        SET lid = pi_lid
				WHERE FIND_IN_SET(id, pi_id);
      				
				
			ELSEIF pi_oper = 'RL' THEN 
					
        UPDATE in_email
        SET lid = 0
				WHERE FIND_IN_SET(id, pi_id);	
				
    ELSEIF pi_oper = 'U' THEN  
	 
	   UPDATE in_email 
     SET mailtyp = 'SNT'
		    , too = pi_too
			 , cc = pi_cc
       , bcc = pi_bcc
			 , rid=pi_rid
			 ,subject = pi_subject
			  ,message = pi_message
				
    WHERE rid= pi_rid 
		AND id=pi_id
		AND active='Y';
			
		 ELSEIF pi_oper = 'M' THEN  -- For modifying draft
	 
	   UPDATE in_email 
     SET 
		     too = pi_too
			 , cc = pi_cc
       , bcc = pi_bcc
			 , rid=pi_rid
			 ,subject = pi_subject
			  ,message = pi_message
    WHERE id= pi_id 
		AND active='Y';
		
	 ELSEIF pi_oper = 'A' THEN  
	 
	 UPDATE in_email 
    SET is_starred = 'Y'
    WHERE FIND_IN_SET(id, pi_id)
		AND active='Y';
		
				
		
	ELSEIF pi_oper = 'R' THEN  
	 
	 UPDATE in_email 
    SET is_starred = 'N'
     WHERE FIND_IN_SET(id, pi_id)
		 	AND active='Y';
		 
  END IF;
  
  
     SELECT *
      FROM vw_in_email
		 WHERE id = IF(pi_id=0, id, pi_id);
		
     
			
 
END $$

DELIMITER ;