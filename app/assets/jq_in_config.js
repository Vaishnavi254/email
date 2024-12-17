function showTitle(title){
  var ti_html = '<!--Page Title-->';
	
	ti_html +=`
	        <div class="row">
					  <div class="col-md-6">
	      	     <!-- Title -->
					  <div class="row heading-bg">
						 <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
						  <h5 class="txt-dark">`+title+`</h5>
						</div>
					</div>
					<!-- /Title -->
					</div>
					</div>
`;				
  return ti_html;
}
function getFieldValue(field_name, modal_id) {
  field_val = $.trim($('#'+modal_id+' [name='+field_name+']').val());
  if(field_val == '')
    field_val =  $.trim($('[name='+field_name+']').val());
  return field_val;
	
}
function panelTitle(page){
	  var title = '';
 
  if(page=='inb') {
    title = 'Inbox';
   
  }
	 else if(page=='snt') {
    title = 'Sent Message';
   
  }
		 else if(page=='imp') {
    title = 'Important Message';
   
  }
		 else if(page=='drf') {
    title = 'Draft';
   
  }
			 else if(page=='trs') {
    title = 'Recycle Bin';
   
  }

  var ti_html = '<!--Page Title-->';
	
	ti_html +=`
													<div class="panel-heading pt-20 pb-20 pl-15 pr-15">
														<div class="pull-left">
															<h6 class="panel-title txt-dark">`+title+`</h6>
														</div>
														<div class="clearfix"></div>
													</div>
`;				
  return ti_html;
}

	function getRandomNumber() {
			var min = 1000000;
			var max = 9999999;
			var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
			return randomNumber;
	}
	
	function firstName(inputString) {
		
    // Split the string at '@' and take the part before '@'
    return inputString.split('@')[0];
}

	function isValid(value) {
        return value !== null && value !== undefined && value.trim() !== '';
				
    }
		
function makeArray(inputString) {
    // Split the input string by commas to create an array
    return inputString.split(',').map(item => item.trim());
	
}

function getFileName(filePath) {
    // Split the path by '/' and get the last element
    const parts = filePath.split('/');
    return parts.pop(); // pop() removes and returns the last element
}
function printDetail() {
    // Use jQuery to get the HTML content of the #emailDetail section
    var $emailDetail = $('#emailDetail');
    var printContent = $emailDetail.html();
    
    // Save the original body content
    var originalContent = $('body').html();
    
    // Replace the body content with the email detail section
    $('body').html(printContent);
    
    // Trigger the print dialog
    window.print();
    
    // Restore the original body content after printing
    $('body').html(originalContent);
}


 
function Delete(){
								 
                var arid = [];
               
                // Collect IDs of selected rows
                $('.row-checkbox:checked').each(function() {
                    var row = $(this).closest('tr');
                    var id = row.data('id');
                    arid.push(id);
								
                });
                
                if (arid.length > 0) {
                    $.ajax({
                        url: 'api/ap_in_email.php?id='+arid+'&oper=D',
                        type: 'POST',
                        success: function(response) {
                            // Handle the response here
                            console.log(response);

                            // Remove deleted rows from the table
                            $('.row-checkbox:checked').each(function() {
                                $(this).closest('tr').remove();
                            });
                        },
                        error: function(xhr, status, error) {
                            console.error('AJAX Error: ' + status + error);
                        }
                    });
                } else {
                    
										alert_msg('Alert', 'Please select at least one row.', 'E');
                }
	
	
	
}
 function Perdelete(){
	 
	 							
                var arid = [];
               
                // Collect IDs of selected rows
                $('.row-checkbox:checked').each(function() {
                    var row = $(this).closest('tr');
                    var id = row.data('id');
                    arid.push(id);
									
                });
                
                if (arid.length > 0) {
                    $.ajax({
                        url: 'api/ap_in_email.php?id='+arid+'&oper=P',
                        type: 'POST',
                        success: function(response) {
                            // Handle the response here
                            console.log(response);

                            // Remove deleted rows from the table
                            $('.row-checkbox:checked').each(function() {
                                $(this).closest('tr').remove();
                            });
                        },
                        error: function(xhr, status, error) {
                            console.error('AJAX Error: ' + status + error);
                        }
                    });
                } else {
                    alert_msg('Alert', 'Please select at least one row.', 'E');
                }
	 
	 
	 
	 
 }
 
 
	function Sweetalert(main,secmain){
				swal({
				title: "Are you sure?",
				text: main,
				type: "warning",
				showCancelButton: true,
				confirmButtonColor: "#DD6B55",
				cancelButtonColor: 'yellow',
				confirmButtonText: "Yes!",
				cancelButtonText: "No!",
				closeOnConfirm: false,
				closeOnCancel: true
				},
				function(isConfirm){
				if (isConfirm) {
					swal("Deleted!", secmain, "success");
					if(main==="You want to move it to recycle bin!"){
						Delete();
					}
					else if(main==="You want to permanent delete!"){
						Perdelete();
					}
				} else {
					setTimeout(function() {
                swal("Cancelled", "Your file is safe :)", "error");
            }, 200);
				}
				});
	};
	
	
	function alert_msg(head, msg, type) {
  var bgColor = '';
  var hide = 3000;
  var position = 'top-center';                              
  
  if(type == 'S') 
    bgColor = '#2ecd99';
  else if(type == 'E') 
    bgColor = '#ed6f56';
  else {
    hide = false;
    bgColor = '#4e9de6';
  } 
  
  $.toast().reset('all');   
  $.toast({
    heading: head,
    text: msg,
    position: position,
    bgColor: bgColor,
    loaderBg: '#d9534f',    
    hideAfter: hide
  });
  
  return false;
}
           function timeAgo(dateString) {
                var now = new Date();
                var then = new Date(dateString);
                var differenceInSeconds = Math.floor((now - then) / 1000);

                var intervals = {
                    "year": 31536000,
                    "month": 2592000,
                    "day": 86400,
                    "hour": 3600,
                    "minute": 60,
                    "second": 1
                };

                for (var key in intervals) {
                    var interval = intervals[key];
                    var count = Math.floor(differenceInSeconds / interval);
                    if (count > 0) {
                        return count + " " + key + (count > 1 ? "s" : "") + " ago";
                    }
                }
                return "just now";
            }