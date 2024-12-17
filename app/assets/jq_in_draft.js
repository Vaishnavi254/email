
	

function addDraft(oper,id) {
  var too = getFieldValue('to', 'myModal');
  var cc = getFieldValue('cc', 'myModal');
	var bcc = getFieldValue('bcc', 'myModal');
  var subject = getFieldValue('subject', 'myModal');
  var message = getFieldValue('message', 'myModal');
  var rid = getFieldValue('rid', 'myModal');
 alert(rid);
	 if (isValid(too)&& isValid(subject)) {
			 
  var json_url='../api/ap_in_email.php?id='+id+'&oper='+oper+'&mailtyp=DRF';

		$.ajax({
					url: json_url,
					type: "POST",
					contentType: 'application/json',
					dataType: 'json',
					data: JSON.stringify({
							
						 too: too
						, cc: cc
						, bcc: bcc
						, subject: subject
						, message: message
						, rid: rid
						, oper:oper
						
					}
					),
					success: function (result) {
						$('#myModal').modal('hide');
						showDraft();
					},
					error: function (xhr, status, error) {
           alert_msg('Alert', 'Error Occurred', 'E');
					}
				});

	 }
}

			
				 
	
function showDraft(){
 
   var page='drf';
	 var json_url = '../api/ap_in_email.php?mailtyp=DRF'; 
	
	 var df_html=`<!--Draft--->`;
	 
	 df_html+=`					<aside class="col-lg-9 col-md-8 pl-0">
	                    <div class="scroll-container">
	                      <div class="panel">
												<div class="panel panel-refresh pa-0"  >
													<div class="refresh-container">
														<div class="la-anim-1" ></div>
													</div>`;
    df_html+= panelTitle(page); 
		
		df_html+=              `<div class="panel-wrapper collapse in">
														<div class="panel-body inbox-body pa-0">
															<div class="mail-option pl-15 pr-15">
																<div class="chk-all">
																	<div class="checkbox checkbox-default inline-block">
																		<input type="checkbox" id="checkbox051" class="selectAll"/>
																		<label for="checkbox051"></label>
																	</div>
																	<div class="btn-group">
																		<a data-toggle="dropdown" href="#" class="btn  all" aria-expanded="false">
																		All
																		</a>
																	</div>
																	<div class="btn-group">
																		<a data-toggle="dropdown" href="#" class="btn  blue" aria-expanded="false">
																		More
																		<i class="fa fa-angle-down "></i>
																		</a>
																		<ul class="dropdown-menu">
																			<li><a class="delete-btn" id="deleteButton"><i class="fa fa-trash-o"></i> Delete</a></li>
																		</ul>
																	</div>
																</div>
															</div>
                             <div class="table-responsive mb-0">
																<table class="table table-inbox table-hover mb-0">
																	<tbody>`;
														
		$.getJSON(json_url, function(data){ 
		
		$.each(data.records, function(key, val) {
		
	var active="";		
if(val.is_starred=="Y")
{
  active="active";
}
else{
	active="";
}			
 if(val.mailtyp=='DRF' &val.active=='Y'){
	
		df_html+= 	                `<tr class="data-item drf" id="`+ val.id+`" page="inb" data-id="`+val.id+`">
																			<td class="inbox-small-cells">
																				<div class="checkbox checkbox-default inline-block">
																					<input type="checkbox" class="row-checkbox">
																					<label for="checkbox012"></label>
																				</div>
																				<i class="zmdi zmdi-star font-16 imp `+active+`" id="`+val.id+`"></i>
																			</td>
																			<td class="view-message  dont-show">`+firstName(val.too)+`<span class="label label-warning pull-right">new</span></td>
																			<td class="view-message ">`+val.subject+`</td>
																			<td class="view-message  text-right">`;
					if(val.upload_id!= null){																
											df_html+=	`<i class="zmdi zmdi-attachment inline-block mr-15 font-16" value="`+ val.filename+`"></i> `;
								}								
															df_html+=	`
																				<span  class="time-chat-history inline-block">`+timeAgo(val.created_on)+`</span>
																			</td>
																		</tr>`;	
    }
		});
		
			df_html+=         `  </tbody>
														</table>
													 </div>
			                    </div>
													</div>
												</div>
												</div>
												</div>
											</aside>`;
	
		 $('#main').html(df_html);
    		 
	 }); 

}	
 