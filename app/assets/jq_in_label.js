$(document).ready(function(){

	$(document).on('click', '.addlbl', function(){
		

	modaladdLabel(0,'I');

	$("#add-label").modal({backdrop:'static',keyboard:false});	 
	});
	
});

	  $(document).on('click', '.btn-save-label', function () {
			var page = $('.data-item').attr('page');
		
    manageLabel(0,'I',page);
  });
		  $(document).on('click', '.btn-del-label', function () {
				var page = $('.data-item').attr('page');
			
				
		var id = $(this).attr('id');	

    manageLabel(id,'D',page);
  });


function showLabel() {
  var json_url = 'api/ap_in_label.php?oper=S';
  var lbl_html = `<!-- Role Lable List -->`;
  
  
  $.getJSON(json_url, function(data){ 
    $.each(data.records, function(key, val) {
      
      lbl_html += `
            <li>
               <a> <i class="fa fa-tag" style="color: `+labelColor(val.lbl_name)+`;"></i> `+val.lbl_name+`<i class="zmdi zmdi-delete  txt-danger pull-right btn-del-label" id="`+val.lbl_id+`"></i></a>
							                                                                                                       
            </li>
						
            `;
      
    });
    $("#label").html(lbl_html);
  });    
}
  function labelColor(label){
		
switch (label) {
    case 'Design':
      return '#f0aaa8';      
   case 'Office':
        return '#a8abf0';     
   case 'Home':
        return '#c5f0a8';        
    case 'Friends':
        return '#ecf9a8';  
    case 'Work':
        return '#ecf0b8';	
    case 'Family':
        return '#ecf1a8';				
    default:
        return getRandomColor();
}
	}
	function getRandomColor() {
    //Generate random hex color code
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}



function modaladdLabel(oper,id) {
  

  var md_html = `<!-- Add Email -->`;

  md_html += `<!-- Modal -->
													<div aria-hidden="true" role="dialog" tabindex="-1" id="add-label" class="modal fade" style="display: none; ">
														<div class="modal-dialog">
															<div class="modal-content">
																<div class="modal-header">
															 <button aria-hidden="true" data-dismiss="modal" class="close ran" type="button">×</button>
																	<h4 class="modal-title">Add label</h4>
																</div>
																<div class="modal-body">
																	<form role="form" class="form-horizontal" action="" method="post" enctype="multipart/form-data">
																		<div class="form-group">
																			<label class="col-lg-2 control-label">New label</label>
																			<div class="col-lg-10">
																				<input type="text" placeholder="" name="addname" id="inputEmail1" class="form-control">
																			</div>
																		</div>
																	</div>	
                              <div class="modal-footer">
                                  <button class="btn btn-success btn-save-label" type="submit" oper="`+oper+`" id="`+id+`">Send</button>
                                  <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">Cancel</button>
                                   </div>																	
																</div>
															</div>
															<!-- /.modal-content -->
														</div>
														<!-- /.modal-dialog -->
													</div>
													<!-- /.modal -->`;


  $("#addlabel").html(md_html);

}
function manageLabel(id,oper,page) {

  var lbl_name = getFieldValue('addname', 'add-label');
  var lbl_code = lbl_name.substring(0, 3);

  $.ajax({
    url: '../api/ap_in_label.php?oper='+oper+'&id='+id,
    type: "POST",
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify({
       lbl_name: lbl_name
      , lbl_code: lbl_code

    }
    ),
    success: function (result) {
      $('#add-label').modal('hide');
			showMain();
		
			if(page=='inb'){
				showInbox();
			}
						else if(page=='imp'){
				showImportant();
			}
			else if (page=='snt'){
				
				showSent();
			}
		
    },
    error: function (xhr, status, error) {
      alert_msg('Error', 'Error Occured', 'E');
    }
  });


}
function dropdownLabel(){

	 var dl_html = `<!-- Show Label -->`;
   var json_url = 'api/ap_in_label.php?oper=S';

   $.getJSON(json_url, function(data){ 
        $.each(data.records, function(key, val) {
	   dl_html+=`
        	<li>&nbsp;&nbsp;<a  class="lbl"  lid="`+val.lbl_id+`" >`+val.lbl_name+`</a></li>
	         <li class="divider"></li>`;
	
	});
	  dl_html+=`<span class="label label-success ml-5 addlbl ">+</span>`;
	$("#dropLabel").html(dl_html);
	});
}

