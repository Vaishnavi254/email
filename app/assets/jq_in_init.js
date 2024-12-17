$(document).ready(function(){

	showMain();

	$(document).on('click', '.menu', function(){
  var option = $(this).attr('opt');
  if(option == 'main')
     showMain();
		 
	});
	
	$(document).on('click', '.left', function(){
  var option = $(this).attr('option');
  if(option == 'inbox')
	{
	showInbox();
 
	}
	else if(option == 'sent')	
	{
    showSent();

	 
	}
		else if(option == 'imp')	
	{
    showImportant();

	 
	}
		else if(option == 'drf')	
	{
    showDraft();

	 
	}
			else if(option == 'trs')	
	{
    showTrash();

	 
	}
	});
		$(document).on('click', '.imp', function() {
			        
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
 					var id = $(this).attr('id');
					var oper = 'R';   // R for remove
					Important(id, oper);
			
       } else {
            $(this).addClass('active');
  	        var id = $(this).attr('id');
						 var oper = 'A';   // A for add
					  
            Important(id, oper);
      
    
    }
		});
		

					$(document).on('click', '.back', function() {
            var page = $(this).attr('page');
						
						if(page=="inb")
						{
							showInbox();
						}
						else if(page=="snt")
						{
							showSent();
						}
						else if(page=="imp")
						{
							showImportant();
						} else if(page=="drf")
						{
							showDraft();
						}
            else if(page=="trs")
						{
							showTrash();
						}
         });
				$(document).on('dblclick', 'tr.dbl', function() {
						var id = $(this).attr('id');
						var page = $(this).attr('page');
	
									detailEmail(id,page);
							 });
				$(document).on('dblclick', '.remove', function() {
						var id = $(this).attr('id');
					
	
									removeUpload(id);
							 });
			 
			 
				$(document).on('click', '.draft', function() {
              var id = $(this).attr('id');
						  
           if(id==0){	
          			 
            addDraft('I',id);
					 }
					 else{
						
						 addDraft('M',id);
					 }
         });
 
            $(document).on('change', '.selectAll', function() {
                var isChecked = $(this).is(':checked');
                $('.row-checkbox').prop('checked', isChecked);
            });
 
        $(document).on('click', '#deleteButton', function() {
	            var main = "You want to move it to recycle bin!";
							var secmain  = "Your file moved to recycle bin.";
							 Sweetalert(main,secmain); 

            }); 
						  $(document).on('click', '#delete', function() {
								
								var main = "You want to permanent delete!";
							  var secmain  = "Your file is deleted.";
								
							 Sweetalert(main,secmain); 

            }); 
 						  $(document).on('click', '#undo', function() {
							
                var arid = [];
               
                // Collect IDs of selected rows
                $('.row-checkbox:checked').each(function() {
                    var row = $(this).closest('tr');
                    var id = row.data('id');
                    arid.push(id);
									
                });
                
                if (arid.length > 0) {
                    $.ajax({
                        url: 'api/ap_in_email.php?id='+arid+'&oper=UN',
                        type: 'POST',
                        success: function(response) {
                            // Handle the response here
                            

                            // Remove deleted rows from the table
                            $('.row-checkbox:checked').each(function() {
															alert_msg('Alert', 'Mail Recovered', 'S');
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
            });
          // Handle the "Add to" button click
           $(document).on('click', '.dropdown-menu li a.lbl', function() {
						
      var lid = $(this).attr('lid');

         var arid = [];
				 var page = '';
				 
       $('.row-checkbox:checked').each(function() {
        var row = $(this).closest('tr');
        var itemId = row.data('id');
				page = $(this).attr('page');
		
        arid.push(itemId);
    });

    if (arid.length > 0 && lid) {
        $.ajax({
            url: 'api/ap_in_email.php?id='+arid+'&lid='+lid+'&oper=AL',
            type: 'POST',
            success: function(response) {
					    if(page=='inb'){
								showInbox();	
							}
							else if(page=='snt'){
								showSent();	
							}
							else if(page=='imp'){
								showImportant();	
							}							
             
							 alert_msg('Label','Label added successfully', 'S');
            },
            error: function() {
             
								alert_msg('Label','An error occurred.', 'E');
            }
        });
    } else {
        alert_msg('Alert', 'Please select at least one row.', 'E');
    }
});

//remove label

            $(document).on('click', '.dropdown-menu li a.remove-label', function() {
						
         var arid = [];
				 var page = '';
				 
       $('.row-checkbox:checked').each(function() {
        var row = $(this).closest('tr');
        var itemId = row.data('id');
				page = $(this).attr('page');
		;
        arid.push(itemId);
    });

    if (arid.length > 0 ) {
        $.ajax({
            url: 'api/ap_in_email.php?id='+arid+'&oper=RL',
            type: 'POST',
            success: function(response) {
					    if(page=='inb'){
								showInbox();	
							}
							else if(page=='snt'){
								showSent();	
							}
							else if(page=='imp'){
								showImportant();	
							}							
             
							 alert_msg('Label', 'Label remove successfully', 'S');
            },
            error: function() {
              
								 alert_msg('Label', 'An error occurred.', 'E');
            },
				
            
        });
    } else {
   
				 alert_msg('Label', 'No items selected or label not selected.', 'M');
    }
});



    });



