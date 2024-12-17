

CREATE OR REPLACE VIEW vw_in_upload AS
SELECT upload_id
     , rid
     , filename
     , created_by
     , created_on upload_date
FROM in_upload

WHERE active = 'Y';

