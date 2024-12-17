DELIMITER $$

DROP PROCEDURE IF EXISTS pr_in_label$$
 
CREATE PROCEDURE pr_in_label(
     pi_id         INT(32)
    ,pi_oper        CHAR(1)
   , pi_lbl_code   CHAR(3)
    ,pi_lbl_name   VARCHAR(64)	
  
	)

BEGIN


    IF pi_oper = 'I' THEN 
			
    
			INSERT INTO in_label
			SET	lbl_name = pi_lbl_name
				, lbl_code = pi_lbl_code;
				
				
		ELSEIF pi_oper = 'D' THEN  
        
        DELETE FROM in_label
        WHERE lbl_id = pi_id;

				
		END IF;
		
    SELECT *
    FROM vw_in_label;
   
END$$

DELIMITER ;

DELIMITER $$

DROP PROCEDURE IF EXISTS pr_in_label$$

CREATE PROCEDURE pr_in_label(
    IN pi_id INT(32),
    IN pi_oper CHAR(1),
    IN pi_lbl_code CHAR(3),
    IN pi_lbl_name VARCHAR(64)
)
BEGIN
    -- Validate operation parameter
    IF pi_oper = 'I' THEN
        -- Insert new label
        INSERT INTO in_label (lbl_code, lbl_name)
        VALUES (pi_lbl_code, pi_lbl_name);
        
    ELSEIF pi_oper = 'D' THEN
        -- Delete label by id
        DELETE FROM in_label
        WHERE lbl_id = pi_id;
        
    
    END IF;
    
    -- Select data from view
    SELECT *
    FROM vw_in_label;
    
END$$

DELIMITER ;
