$(document).ready(function(){

	$(document).on('click', '.btn-com', function(){

	modalCom('I',0);

	$("#myModal").modal({ backdrop: 'static', keyboard: false });
	});
	  $(document).on('click', '.btn-save-in', function () {
			 var id = $(this).attr('id');
	if(id==0){
    manageCom('I',0);
	}
	else{
		
		manageCom('U',id);
	}
  });
	
	 $(document).on('click', '.ran', function () {
    getRandomNumber();
  });
					$(document).on('dblclick', 'tr.drf', function() {
						var id = $(this).attr('id');
						var oper ="U";

	       	var json_url = 'api/ap_in_email.php?id='+id;
					 
         $.getJSON(json_url, function (data) {
					 
         modalCom( oper,id, data);
				 
      $("#myModal").modal({ backdrop: 'static', keyboard: false });
    });
							 });
});




function modalCom(oper,id,data) {
	
 
   rn_id= getRandomNumber();
 
   
  var too = "";
  var cc = "";
  var bcc = "";
  var subject = "";
  var message = "";
  var rid = "";
  
	
  var cm_html = `<!-- Add Email -->`;
	
	if(oper=='U'){
	  $.each(data.records, function (key, val) {
    
		id=val.id;
    too = val.too;
    cc = val.cc;
    bcc = val.bcc;
    subject = val.subject;
    message =val.message;
    rid = val.rid;
  });
	}
  if(oper=='U'){
		rn_id=rid;	
	}  



  cm_html += `<!-- Modal -->
													<div aria-hidden="true" role="dialog" tabindex="-1" id="myModal" class="modal fade" style="display: none; ">
														<div class="modal-dialog">
															<div class="modal-content">
																<div class="modal-header">
															 <button aria-hidden="true" data-dismiss="modal" class="close ran draft" id="`+id+`" type="button">×</button>
																	<h4 class="modal-title" id="up">Compose</h4>
																</div>
																<div class="modal-body">
																	<form role="form" class="form-horizontal" action="" method="post" enctype="multipart/form-data">
																		<div class="form-group">
																			<label class="col-lg-2 control-label">To</label>
																			<div class="col-lg-10">
																				<input type="text" placeholder="" name="to" id="too" class="form-control userInput" value="`+too+`">
																			</div>
																		</div>
																		<div class="form-group">
																			<label class="col-lg-2 control-label">Cc</label>
																			<div class="col-lg-10">
																				<input type="text" placeholder="" id="cc" name="cc" class="form-control userInput" value="`+cc+`">
																			</div>
																		</div>
																		<div class="form-group">
																			<label class="col-lg-2 control-label">Bcc</label>
																			<div class="col-lg-10">
																				<input type="text" placeholder="" id="bcc"  name="bcc" class="form-control userInput" value="`+bcc+`">
																			</div>
																		</div>
																		<div class="form-group">
																			<label class="col-lg-2 control-label">Subject</label>
																			<div class="col-lg-10">
																				<input type="text" placeholder="" id="subject" name="subject" class="form-control userInput" value="`+subject+`">
																			</div>
																		</div>
																		<div class="form-group">
																			<label class="col-lg-2 control-label">Message</label>
																			<div class="col-lg-10">
																				<textarea  id="message" class="textarea_editor form-control userInput" rows="15" name="message" >`+message+`</textarea>
																			</div>
																		</div>
																		<input type="hidden" placeholder="" id="rid" name="rid" class="form-control userInput" value="`+rn_id+`">
																	</form>
																	<div class="form-group">`;
						cm_html +=			      `<div class="panel-wrapper collapse in">
																		<div class="panel-body m-20">
																		<form action="../api/ap_in_upload.php?id=`+id+`&rid=`+rn_id+`&oper=I" class="dropzone" id="my-dropzone" >
																		<div class="fallback">
																		<input name="file" type="file"  id="file" class="userInput" multiple required/>
																		</div>
																		</form>
																		</div>
																		</div>
																		`;
 
				if(oper=='U')		{												
						cm_html +=				 `<div id="docs-attached" class="row"></div>`;
						}
						
					
						cm_html +=	          `<div class="modal-footer">
						                      <button class="btn btn-success btn-save-in text-center" type="submit" oper="`+oper+`" id="`+id+`">Send</button>	
																	<button type="button" class="btn btn-default waves-effect" data-dismiss="modal">Cancel</button>
																	</div>
																	</div>			
																</div>
															</div>
															<!-- /.modal-content -->
														</div>
														<!-- /.modal-dialog -->
													</div>
													<!-- /.modal -->`;
  // Use setTimeout to ensure the HTML is fully rendered
  setTimeout(function() {
    if (oper == 'U') {
      $('#up').text('Update');
    }
  }, 0);
  // inject to 'page-content' of our app
  $("#myinModal").html(cm_html);
 dropZone("I", id);
  getAttachment(oper, id,rn_id);

}



function manageCom(oper,id) {

  var too = getFieldValue('to', 'myModal');
  var cc = getFieldValue('cc', 'myModal');
	var bcc = getFieldValue('bcc', 'myModal');
  var subject = getFieldValue('subject', 'myModal');
  var message = getFieldValue('message', 'myModal');
  var rid = getFieldValue('rid', 'myModal');

  var json_url='../api/ap_in_email.php?oper='+oper+'&id='+id+'&mailtyp=SNT';
if (isValid(too)&& isValid(subject)) {
  $.ajax({
    url: json_url,
    type: "POST",
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify({
        id: id
      , too: too
      , cc: cc
			, bcc: bcc
      , subject: subject
      , message: message
			, rid: rid
      , oper: oper
    }
    ),
    success: function (result) {
      $('#myModal').modal('hide');
      showSent();
    },
    error: function (xhr, status, error) {
    alert_msg('Error', 'Error Occured', 'E');
    }
  });

}
}

