DROP TABLE IF EXISTS in_email;

CREATE TABLE IF NOT EXISTS in_email 
  ( id        INT(32)         NOT NULL AUTO_INCREMENT
	, rid      INT(32)           NOT NULL DEFAULT 0
  , too         VARCHAR(64)
  , cc      VARCHAR(64)  
  , bcc         VARCHAR(64)
  , subject      VARCHAR(64)     
  , message     VARCHAR(1024)
	, mailtyp     CHAR(3)
  , lid       INT(32)       NOT  NULL DEFAULT 0	
	, is_starred   CHAR(1)          NOT NULL DEFAULT 'N'
  , active        CHAR(1)         NOT NULL DEFAULT 'Y'
  , created_on    TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP 
  , updated_by    INT(32)         NOT NULL DEFAULT 1
  , updated_on    TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP 
  , PRIMARY KEY (id)
  ) 
ENGINE=InnoDB;  

CREATE INDEX in_email_idx1 ON in_email(id);
 INSERT INTO in_email(rid,too, cc, bcc, subject, message, mailtyp) VALUES('7685463','abc@gmail.com', 'virat@gmail.com', 'rinu@gmail.com', 'Application for Leave', 'Hello','INB');
INSERT INTO in_email(rid,too, cc, bcc, subject, message, mailtyp) VALUES('8646455','abcd@gmail.com', 'vishu@gmail.com', 'rina@gmail.com', 'Application for Leave', 'Hi','INB');

