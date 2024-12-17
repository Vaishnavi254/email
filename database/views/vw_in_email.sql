USE email;


CREATE OR REPLACE VIEW vw_in_email AS
SELECT em.id 
     , em.too
     , em.cc
     , em.bcc
     , em.subject
     , em.message
		 , em.is_starred 
		 , em.mailtyp
     , em.created_on
		 , up.upload_id
		 , em.rid
		 , em.active
		 , COALESCE(GROUP_CONCAT(DISTINCT up.filename ORDER BY up.filename SEPARATOR ', '),'NA') AS filename
		 , COALESCE(GROUP_CONCAT(DISTINCT up.doc_type ORDER BY up.doc_type SEPARATOR ', '),'NA') AS doc_type
FROM in_email em

LEFT JOIN in_upload up ON em.rid = up.rid
GROUP BY em.id;
  
	

CREATE OR REPLACE VIEW vw_in_email AS
SELECT em.id 
     , em.too
     , em.cc
     , em.bcc
     , em.subject
     , em.message
     , em.is_starred 
     , em.mailtyp
		 , em.lid
     , em.created_on
     , em.rid
     , em.active
		 , up.upload_id
		 , lb.lbl_name  
     , COALESCE(
         (SELECT GROUP_CONCAT(up.filename ORDER BY up.filename SEPARATOR ', ')
          FROM in_upload up
          WHERE em.rid = up.rid
          GROUP BY up.rid
         ), 'NA') AS filename
     , COALESCE(
         (SELECT GROUP_CONCAT(up.doc_type ORDER BY up.filename SEPARATOR ', ')
          FROM in_upload up
          WHERE em.rid = up.rid
          GROUP BY up.rid
         ), 'NA') AS doc_type
FROM in_email em

LEFT JOIN in_upload up ON em.rid = up.rid
LEFT JOIN in_label lb ON lb.lbl_id = em.lid 
GROUP BY em.id;



