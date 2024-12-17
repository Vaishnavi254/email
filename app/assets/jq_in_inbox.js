function showMain(){
  var in_html = '<!--Inbox-->';
	
  in_html += showTitle('Inbox');	
	
	in_html +=`
				
				<!-- Row -->
				<div class="row">
					<div class="col-lg-12">
						<div class="panel panel-default card-view pa-0">
							<div class="panel-wrapper collapse in">
								<div class="panel-body pa-0">
									<div class="mail-box">
										<div class="row">
											<aside class="col-lg-3 col-md-4 pr-0">
												<div class="mt-20 mb-20 ml-15 mr-15">
													<a data-toggle="modal"  title="Compose" class="btn btn-success btn-block btn-com">
													Compose
													</a>
												</div>`;
												
												
		in_html +=  getPanel();	
		
		in_html +=  `</aside>`;
		
		in_html += `<div id="main"></div>`;

  in_html+=`	
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- /Row -->`;
   $('#page-content').html(in_html);
	 showInbox();


}


function getPanel(){
	 var pan_html=`<!--Panel--->`;
	 
	 pan_html+=`						<ul class="inbox-nav mb-30">
													<li>
														<a href="javascript:void(0);"class="left" option="inbox"><i class="zmdi zmdi-inbox txt-success"></i> Inbox <span class="label label-success ml-10" ></span></a>
													</li>
													<li>
														<a href="javascript:void(0);" class="left" option="sent" ><i class="zmdi zmdi-email-open txt-primary"></i> Sent Mail<span class="label label-primary ml-10" ></span></a>
													</li>
													<li>
														<a href="javascript:void(0);" class="left" option="imp"><i class="zmdi zmdi-star font-16 txt-danger"></i> Important<span class="label label-warning ml-10" ></span></a>
													</li>
													<li>
														<a href="javascript:void(0);" class="left" option="drf"><i class="zmdi zmdi-folder-outline txt-warning"></i> Drafts <span class="label label-info ml-10" ></span></a>
													</li>
													<li>
														<a href="javascript:void(0);" class="left" option="trs"><i class="zmdi zmdi-delete txt-info"></i> Recycle bin<span class="label label-info ml-10" ></span></a>
													</li>
												</ul>
												<h6 class="pl-15 mb-20">Labels <span class="label label-success ml-5 addlbl">+</span></h6>
												<ul class="inbox-nav mb-30">
                         <div id="label"></div>
												</ul>`;
		showLabel();										
	 return pan_html;
	
}



function showInbox(){

   var page='inb';
	 var json_url = '../api/ap_in_email.php'; 
	
	 var in_html=`<!--Panel--->`;
	 
	 in_html+=`					
	                      <aside class="col-lg-9 col-md-8 pl-0">
												<div class="scroll-container">
	                      <div class="panel">
												<div class="panel panel-refresh pa-0"  >
`;
    in_html+= panelTitle(page); 
		
		in_html+=              `<div class="panel-wrapper collapse in">
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
																		<a data-toggle="dropdown" href="#" class="btn  blue">
																		Add to
																		&nbsp;<i class="fa fa-tag txt-warning" aria-hidden="true"></i>
																		<i class="fa fa-angle-down "></i>
																		</a>
																		<ul class="dropdown-menu">
																		<div id="dropLabel"></div>
																		</ul>
																	</div>
																	<div class="btn-group">
																		<a data-toggle="dropdown" href="#" class="btn  blue" aria-expanded="false">
																		More
																		<i class="fa fa-angle-down "></i>
																		</a>
																		<ul class="dropdown-menu">
																			<li><a class="remove-label" ><i class="fa fa-ban"></i> Remove Label</a></li>
																			<li class="divider"></li>
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
 if(val.mailtyp=='INB'&val.active=='Y'){

		in_html+= 	                `<tr class="data-item dbl" id="`+ val.id+`" page="inb" data-id="`+val.id+`">
																			<td class="inbox-small-cells">
																				<div class="checkbox checkbox-default inline-block">
																					<input type="checkbox" class="row-checkbox" page="inb">
																					<label for="checkbox012"></label>
																				</div>
																				<i class="zmdi zmdi-star font-16 imp `+active+`" id="`+val.id+`"></i>
																			</td>
																			<td class="view-message  dont-show">`+firstName(val.too)+``;
				if(val.lid != 0 && val.lbl_name != null){										
	                      in_html+=`																		
														<span class="label ml-10" style="background-color: `+labelColor(val.lbl_name)+`; ">`+val.lbl_name+`</span>`;
				}
																		
													in_html+=						`</td>
																			<td class="view-message ">`+val.subject+`</td>
																			<td class="view-message  text-right">`;
			if(val.upload_id!= null){																
																in_html+=	`<i class="zmdi zmdi-attachment inline-block mr-15 font-16" value="`+ val.filename+`"></i>`;
			}				
																				
															in_html+=	`<span  class="time-chat-history inline-block">`+timeAgo(val.created_on)+`</span>
																			</td>
																		</tr>`;	
    }
		});
		
			in_html+=         `  </tbody>
														</table>
													 </div>
			                    </div>
													</div>
												</div>
												</div>
												</div>
											</aside>
											
											`;
	
		 $('#main').html(in_html);
		 dropdownLabel();
    		 
	 }); 

}	 



function showSent(){
    
   var page='snt';
	 var json_url = '../api/ap_in_email.php'; 
	
	 var st_html=`<!--Sent--->`;
	 
	 st_html+=`					<aside class="col-lg-9 col-md-8 pl-0">
	                    <div class="scroll-container">
	                      <div class="panel">
												<div class="panel panel-refresh pa-0"  >
													<div class="refresh-container">
														<div class="la-anim-1"></div>
													</div>`;
    st_html+= panelTitle(page); 
		
		st_html+=              `<div class="panel-wrapper collapse in">
														<div class="panel-body inbox-body pa-0">
															<div class="mail-option pl-15 pr-15">
																<div class="chk-all">
																	<div class="checkbox checkbox-default inline-block">
																		<input type="checkbox" class="selectAll"/>
																		<label for="select-all"></label>
																	</div>
																	<div class="btn-group">
																		<a data-toggle="dropdown" href="#" class="btn  all" aria-expanded="false">
																		All	
																		</a>
																	</div>
																	<div class="btn-group">
																		<a data-toggle="dropdown" href="#" class="btn  blue">
																		Add to
																		&nbsp;<i class="fa fa-tag txt-warning" aria-hidden="true"></i>
																		<i class="fa fa-angle-down "></i>
																		</a>
																		<ul class="dropdown-menu">
																		<div id="dropLabel"></div>
																		</ul>
																	</div>
																	<div class="btn-group">
																		<a data-toggle="dropdown" href="#" class="btn  blue" aria-expanded="false">
																		More
																		<i class="fa fa-angle-down "></i>
																		</a>
																		<ul class="dropdown-menu">
																			<li><a class="remove-label" ><i class="fa fa-ban"></i> Remove Label</a></li>
																			<li class="divider"></li>
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
 
   if(val.mailtyp=='SNT'&val.active=='Y'){
	
		st_html+= 	                `<tr class="data-item dbl" id="`+val.id+`" page="snt" data-id="`+val.id+`">
																			<td class="inbox-small-cells">
																				<div class="checkbox checkbox-default inline-block">
																					<input type="checkbox" class="row-checkbox" page="snt">
																					<label for="checkbox012"></label>
																				</div>
																				<i class="zmdi zmdi-star font-16 imp `+active+`" id="`+ val.id+`"></i>
																			</td>
																			<td class="view-message  dont-show">`+firstName(val.too)+``;
				if(val.lid != 0 && val.lbl_name != null){										
	                      st_html+=`																		
															<span class="label ml-10" style="background-color: `+labelColor(val.lbl_name)+`; ">`+val.lbl_name+`</span>`;
				}
																		
													st_html+=						`</td>
																		<td class="view-message ">`+val.subject+`</td>
																			<td class="view-message  text-right">`;
						if(val.upload_id!= null){																
																st_html+=	`<i class="zmdi zmdi-attachment inline-block mr-15 font-16" value="`+ val.filename+`"></i>`;
			}								
																	st_html+=			`
																				<span  class="time-chat-history inline-block">`+timeAgo(val.created_on)+`</span>
																			</td>
																		</tr>`;	
	 }
		});
		
			st_html+=         `
			                    </tbody>
														</table>
													 </div>
			                    </div>
													</div>
												</div>
												</div>
												</div>
											</aside>`;
											
										
									
		 $('#main').html(st_html);  
		  dropdownLabel();
	 });
                        
}


function showImportant(id) {

  var imp_html = `<!-- Important -->`;
var json_url = 'api/ap_in_email.php?id='+id+'mailtyp=IMP';
 var page='imp';
	 
	 imp_html+=`				<aside class="col-lg-9 col-md-8 pl-0">
	                       <div class="scroll-container">
	                      <div class="panel">
												<div class="panel panel-refresh pa-0"  >
													<div class="refresh-container">
														<div class="la-anim-1"></div>
													</div>`;
    imp_html+= panelTitle(page); 
		
		imp_html+=           `<div class="panel-wrapper collapse in">
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
																		<a data-toggle="dropdown" href="#" class="btn  blue">
																		Add to
																		&nbsp;<i class="fa fa-tag txt-warning" aria-hidden="true"></i>
																		<i class="fa fa-angle-down "></i>
																		</a>
																		<ul class="dropdown-menu">
                                     <div id="dropLabel"></div> 
																		</ul>
																	</div>
																	<div class="btn-group">
																		<a data-toggle="dropdown" href="#" class="btn  blue" aria-expanded="false">
																		More
																		<i class="fa fa-angle-down "></i>
																		</a>
																		<ul class="dropdown-menu">
																			<li><a class="remove-label" ><i class="fa fa-ban"></i> Remove Label</a></li>
																			<li class="divider"></li>
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
   if(val.is_starred=='Y' &val.active=='Y'){
	
		imp_html+= 	                `<tr class="data-item dbl" id="`+ val.id+`" page="imp" data-id="`+val.id+`">
																			<td class="inbox-small-cells">
																				<div class="checkbox checkbox-default inline-block">
																					<input type="checkbox" class="row-checkbox" page="imp">
																					<label for="checkbox012"></label>
																				</div>
																				<i class="zmdi zmdi-star font-16 imp `+active+`" id="`+ val.id+`"></i>
																			</td>
																			<td class="view-message  dont-show">`+firstName(val.too)+``;
				if(val.lid != 0 && val.lbl_name != null){										
	                      imp_html+=`																		
																			<span class="label ml-10" style="background-color: `+labelColor(val.lbl_name)+`; ">`+val.lbl_name+`</span>`;															
				}                                		
																		
													imp_html+=						`</td>
																			<td class="view-message ">`+val.subject+`</td>
																			<td class="view-message  text-right">`;
									if(val.upload_id!= null){																
													imp_html+=	`<i class="zmdi zmdi-attachment inline-block mr-15 font-16" value="`+ val.filename+`"></i>`;
			}	
																				
															imp_html+=					`<span  class="time-chat-history inline-block">`+timeAgo(val.created_on)+`</span>
																			</td>
																		</tr>`;	
	 }
		});
									
										imp_html+=`</tbody>
														</table>
													 </div>
			                    </div>
													</div>
											</div>
											</div>
												</div>
										</aside>`;
	
  $("#main").html(imp_html);
	dropdownLabel();
		});

}

  function Important(id,oper){
		
	  $.ajax({
    url: 'api/ap_in_email.php?id='+id+'&oper='+oper,
    type: "POST",
    contentType: 'application/json',
    dataType: 'json',
    success: function (result) {
			alert_msg('Alert', 'Changes made to Important', 'S');
		
    },
    error: function (xhr, status, error) {
    alert_msg('Error', 'Error Occured', 'S');
    }
  });
	}
	
function detailEmail(id,page){
	 var dt_html=`<!-- Detail View  -->`;
	 
	var json_url='api/ap_in_email.php?id='+id;
	 
	
	dt_html+=				`<aside class="col-lg-9 col-md-8 pl-0">
												<div class="panel panel-refresh pa-0" >
													<div class="refresh-container">
														<div class="la-anim-1"></div>
													</div>`;
													
		dt_html+=	panelTitle(page);
		
						dt_html+=`	<div class="panel-wrapper collapse in">
														<div class="panel-body inbox-body pa-0">
															<div class="heading-inbox">
																<div class="container-fluid">
																	<div class="pull-left">
																		<div class="compose-btn">
																			<a class="btn btn-sm mr-10" href="#" data-toggle="modal" title="Compose"><i class="zmdi zmdi-chevron-left back" page=`+page+`></i></a>
																		</div>
																	</div>
																	<div class="pull-right text-right">
																		<button class="btn btn-sm mr-10"  onclick="printDetail()"  type="button"  ><i class="zmdi zmdi-print"></i> </button>
																	</div>
																</div>
																</div>
																<hr class="light-grey-hr mt-10 mb-15"/>`;
					$.getJSON(json_url, function(data){ 
		$.each(data.records, function(key, val) {
      filename=	makeArray(val.filename);	
			doc_type = makeArray(val.doc_type);
			 var count =filename.length;
			 if(val.filename=='NA'){
			 count=0;
			 }
			 else{
			 count =filename.length;
			 }
						dt_html+=				`
						                   <div id="emailDetail">
						                     <div class="container-fluid mb-20">	
																	<h4 class="weight-500">`+val.subject+`</h4>
						                     </div>	
															
															<div class="sender-info">
																<div class="container-fluid">
																	<div class="sender-details   pull-left">
																		<span class="capitalize-font pr-5 txt-dark block font-15 weight-500 head-font">`+firstName(val.too)+``;
						if(val.lid != 0 && val.lbl_name != null){										
	                      dt_html+=`																		
																			<span class="label ml-10" style="background-color: `+labelColor(val.lbl_name)+`; ">`+val.lbl_name+`</span>`;															
				}
					
												dt_html+=`	</span><span class="block">
																			to
																		<span>me</span>
																		</span>	
																	</div>	
																	<div class="pull-right">
																		<div class="inline-block mr-5">
																			<span class="inbox-detail-time-1 font-12">`+timeAgo(val.created_on)+`</span>
																		</div>
																	</div>
																	<div class="clearfix"></div>
																</div>
															</div>
															<div class="container-fluid view-mail mt-20">
															<p>`+val.message+`</p>
															</div>
															<hr class="light-grey-hr mt-20 mb-20"/>
															
												   <div class="container-fluid attachment-mail mt-40 mb-40">
																<div class="download-blocks mb-20">
																	<span class="pr-15"><i class="zmdi zmdi-attachment-alt pr-10"></i><span>`+count+`</span>&nbsp;attachments</span>
																</div>`;
	if(val.filename!='NA'){	
					filename.forEach((value, index) => {
					  var type = doc_type[index]; 
            var fileName = getFileName(value); 
						dt_html+=`						<div class="col-md-4">
																	
																		<a href="#" class="atch-thumb">
																	 
																		${type === 'img' ? 
                                    `<div class="file-preview ">
																		<img src="` + value + `" alt="` + fileName + `" style="width: 100px; height: 100px;">
																		<span class="file-name">${fileName}</span></div>` :
                                    `<div class="file-preview icon-preview">
																		<div class="icon-box">
																		<i class="zmdi `+getIconForType(type)+`" style="font-size: 32px; color: blue;"></i>
																		</div>
																		<span class="file-name">`+fileName+`</span></div>`}
													
																		</a>
																	
																	</div>`;
																});
														}	
													
								dt_html+=	`   </div>
								             </div>
														</div>
													</div>
												</div>
											</aside>`;
									
					});						
										
	 $("#main").html(dt_html);
 
});	 
	
}	

function getIconForType(type) {
    switch(type) {
        case 'doc':
            return 'zmdi-file-text'; 
        case 'pdf':
            return ' zmdi-collection-pdf'; 
        case 'gif':
            return ' zmdi-gif'; 
        case 'zip':
            return 'zmdi-folder-star'; 
        default:
            return 'zmdi-file-plus'; 
    }
}


function showTrash() {
alert(111);
  var tr_html = `<!-- Important -->`;
var json_url = 'api/ap_in_email.php';
 var page='trs';
	 
	 tr_html+=`				<aside class="col-lg-9 col-md-8 pl-0">
	                   <div class="scroll-container">
	                      <div class="panel">
												<div class="panel panel-refresh pa-0"  >
													<div class="refresh-container">
														<div class="la-anim-1"></div>
													</div>`;
    tr_html+= panelTitle(page); 
		
		tr_html+=           `<div class="panel-wrapper collapse in">
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
																		<i class="fa fa-angle-down "></i>
																		</a>
																	</div>
																	<div class="btn-group">
																		<a data-toggle="dropdown" href="#" class="btn  blue" aria-expanded="false">
																		More
																		<i class="fa fa-angle-down "></i>
																		</a>
																		<ul class="dropdown-menu">
																			<li><a id="undo"><i class="fa fa-undo"></i> Undo</a></li>
																			<li class="divider"></li>
																			<li><a id="delete" ><i class="fa fa-trash-o"></i> Delete</a></li>
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
   if(val.active=='N'){
		 
		tr_html+= 	                `<tr class="data-item dbl" id="`+ val.id+`" page="imp" data-id="`+val.id+`" >
																			<td class="inbox-small-cells">
																				<div class="checkbox checkbox-default inline-block">
																					<input type="checkbox" class="row-checkbox" >
																					<label for="checkbox012"></label>
																				</div>
																				<i class="zmdi zmdi-star font-16 imp `+active+`" id="`+ val.id+`"></i>
																			</td>
																			<td class="view-message  dont-show">`+firstName(val.too)+`<span class="label label-warning pull-right">new</span></td>
																			<td class="view-message ">`+val.subject+`</td>
																			<td class="view-message  text-right">`;
																			
								if(val.upload_id!= null){																
											tr_html+=	`<i class="zmdi zmdi-attachment inline-block mr-15 font-16" value="`+ val.filename+`"></i> `;
								}											
															tr_html+=	`<span  class="time-chat-history inline-block">`+timeAgo(val.created_on)+`</span>
																			</td>
																		</tr>`;	
	 }
		});
									
										tr_html+=`</tbody>
														</table>
													 </div>
			                    </div>
													</div>
											</div>
											</div>
												</div>
										</aside>`;
	
  $("#main").html(tr_html);
		});

}
