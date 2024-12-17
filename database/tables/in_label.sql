DROP TABLE IF EXISTS in_label;

CREATE TABLE IF NOT EXISTS in_label 
  ( lbl_id       INT(32)         NOT NULL AUTO_INCREMENT
  , lbl_code     CHAR(3)  
  , lbl_name     VARCHAR(64)     
  , created_by    INT(32)         NOT NULL DEFAULT 1
  , created_on    TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP 
  , updated_by    INT(32)         NOT NULL DEFAULT 1
  , updated_on    TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP 
  , PRIMARY KEY (lbl_id)
  ) 
ENGINE=InnoDB;  

CREATE INDEX in_label_idx1 ON in_label(lbl_id);

INSERT INTO in_label(lbl_code, lbl_name) VALUES ('HOM','Home');
INSERT INTO in_label(lbl_code, lbl_name) VALUES ('OFF','Office');
