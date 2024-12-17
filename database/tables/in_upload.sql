
DROP TABLE IF EXISTS in_upload;

CREATE TABLE IF NOT EXISTS in_upload
  ( upload_id      INT(32)         NOT NULL AUTO_INCREMENT 
	, rid            INT(32)         NOT NULL DEFAULT 0
  , filename       VARCHAR(1024)    
  , doc_type       VARCHAR(32)	
  , active         CHAR(1)         NOT NULL DEFAULT 'Y'  
  , created_by     INT(32)         NOT NULL DEFAULT 1
  , created_on     TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP
  , updated_by     INT(32)         NOT NULL DEFAULT 1
  , updated_on     TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP 
  , PRIMARY KEY (upload_id)  
  )
ENGINE=innodb;

SET @@SESSION.sql_mode='NO_ZERO_DATE,NO_ZERO_IN_DATE';

CREATE INDEX in_upload_idx1 ON in_upload(upload_id);
 INSERT INTO in_upload(upload_id,rid,filename,doc_type) VALUES('1', '7685463', '/dist/docs/072820240855540A_in.jpg','img');
 INSERT INTO in_upload(upload_id,rid,filename,doc_type) VALUES('2', '8646455', '/dist/docs/072820240855540A_peacock.jpg','img');
