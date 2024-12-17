

function getAttachment(oper, id,rn_id) {

  var json_url = 'api/ap_in_email.php?id='+id+'&rid='+rn_id+'&oper=S';  
  var img_html = `<!-- Documents Attached -->`;
  img_html += `<!-- Image -->`;
  $.getJSON(json_url, function(data){ 
    $.each(data.records, function(key, val) {
			
			filename=	makeArray(val.filename);	
			doc_type = makeArray(val.doc_type);
			
if(val.filename!='NA'){	
					filename.forEach((value, index) => {
					  var type = doc_type[index]; 
            var fileName = getFileName(value);
      img_html += `
                               
																	<div class="col-md-4">
																	
																		<a href="#" class="atch-thumb">
																	 
																		${type === 'img' ? 
                                    `<div class="file-preview ">
																		<img src="` + value + `" alt="` + fileName + `" style="width: 100px; height: 100px;">
																		<span class="file-name">${fileName}</span><button type="button" class="btn btn-danger" style="font-size: 0.75rem; padding: 0.25rem 0.5rem;"><i class="fa fa-trash-o"></i> Delete</button></div>` :
                                    `<div class="file-preview icon-preview">
																		<div class="icon-box">
																		<i class="zmdi `+getIconForType(type)+`" style="font-size: 32px; color: blue;"></i>
																		</div>
																		<span class="file-name">`+fileName+`</span>
																		<button type="button" class="btn btn-danger remove" style="font-size: 0.75rem; padding: 0.25rem 0.5rem;" id="`+val.upload+`"><i class="fa fa-trash-o"></i> Delete</button></div>`}
													
																		</a>
																	
																	</div>
															
      `;  
					});
				
							}   
    }); 
    $('#docs-attached').html(img_html);    
  });
}

function dropZone(oper, id) {
  /*Dropzone Init*/

  $(function(){
    var file_error = 'N';
    const dz = new Dropzone(".dropzone", {
      addRemoveLinks: true,
      dictResponseError: 'Server not configured',
      acceptedFiles: ".png,.jpg,.jpeg,.gif,.zip,.pdf,.docx",
      dictDefaultMessage: "Drop Attachments here...",
    });
    dz.on("success", function(file) {
      getAttachment(oper, id);
    });    
  });
}

function removeUpload(){
	
	
	
	
}