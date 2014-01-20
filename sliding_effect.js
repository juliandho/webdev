$(document).ready(function()
{

	$('#slider').anythingSlider({ 
  		 toggleControls : true, 
   		 autoPlay : true,
		 pauserOnHover : false,
		 buildArrows : false,
		 buildStartStop : false,
		 delay : '5500',
		 resumeDelay : '1',
		 allowRapidChange : true,
		 buildNavigation : false
  	});

	/* Caption */
	$('#slider').anythingSlider().anythingSliderFx({ 
		inFx: { 
    		'.caption-top'    : { top: 0, opacity: 0.8, duration: 400 }, 
    		'.caption-right'  : { right: 0, opacity: 0.8, duration: 400 }, 
    		'.caption-bottom' : { bottom: 0, opacity: 0.8, duration: 400 }, 
    		'.caption-left'   : { left: 0, opacity: 0.8, duration: 400 } 
   		}, 
   		outFx: { 
    		'.caption-top'    : { top: -50, opacity: 0, duration: 350 }, 
    		'.caption-right'  : { right: -150, opacity: 0, duration: 350 }, 
    		'.caption-bottom' : { bottom: -50, opacity: 0, duration: 350 }, 
    		'.caption-left'   : { left: -150, opacity: 0, duration: 350 } 
   		} 
	}); 


	/* Slides update the navigation bar */
	$('#slider').bind('slide_complete', function(event, slider){
		enable_slide_hover();
 		// console.debug( 'You are on page #' + slider.currentPage );
		var number_slides = 4;	//Julian, this is hard-coded!!
		var current_slide = "#sliding-navigation" + " li#slide" + slider.currentPage + " a";
		var previous_slide = "#sliding-navigation" + " li#slide" + ((slider.currentPage-1) ? (slider.currentPage-1) : number_slides) + " a";
//		console.debug( 'Current:' + slider.currentPage +  ' Previous:' +  ((slider.currentPage-1) ? (slider.currentPage-1) : number_slides) );

		// keep current nav as selected
		if(!($(previous_slide + ':hover').length != 0)) {
			$(previous_slide).animate({ paddingLeft: 15 }, 150);
		}
		
		$(current_slide).animate({ paddingLeft: 25 }, 150);
	});  


	/* Click on slide goes to content and select navigation */
	$('#slider a').click(function(event) {
		var api = $('#slider').data('AnythingSlider');

		var current_slide_num = api.currentPage; 
	// console.debug( 'You are on page #' + current_slide);
 	
		var current_slide = "#sliding-navigation" + " li#slide" + current_slide_num + " a";
		/* Select new item */
		item_selected(current_slide);

		var url=$(this).attr('href'),
			$currentContent = $('#current-content'),
			$fullPage = $('#full-page');
	
		/* Display new content */
		$('.anythingSlider').fadeOut(200, function() {
               		$(this).hide('fast', function() {
		// 		console.debug('slider hidden');
			});
			$currentContent.load(url +  " #content", function() {
            				$currentContent.fadeIn(400, function() {
                    				$currentContent.animate({
                              				width: $currentContent.width() + "px" },1200);
					
							/* Register to close content */
							$('#close_button').click(function() {
								/* Deselect navigation */
								$("#sliding-navigation a.selected").each(function(i)
								{
									$(this).removeClass('selected');
									$(this).css("color", "#999");
								});
	
								/* Hide content */
								var $currentContent = $('#current-content');
								$currentContent.fadeOut(200, function() {
									$('.anythingSlider').fadeIn(400);
        							});
								/* Restart sliding */
								var api = $('#slider').data('AnythingSlider');
								api.startStop(true);

								/* Navigation start */
	 					//		console.debug( 'You are on page #' + current_slide);
								if(!($("#slide" + api.currentPage).hasClass('selected'))) {
									$("#slide" + api.currentPage + " a").animate({ paddingLeft: 25 }, 0);
								}
								return false;
							});
                       			});
                 	});
               	});
		return false;
	});
 
	slide("#sliding-navigation", 25, 15, 150, .8);
	$("#slide1 a").animate({ paddingLeft: 25 }, 0);

	/* Click on nav tab goes to content */
	$('#sliding-navigation a').click(function() {
		var api = $('#slider').data('AnythingSlider');
		api.startStop(false);
		$('.anythingSlider').fadeOut(200, function() {
               		$(this).hide('fast', function() {
		 		//console.debug('slider hidden');
			});
		});

		var current_slide_num = api.currentPage; 
		var current_slide = "#sliding-navigation" + " li#slide" + current_slide_num + " a";
	
		var url=$(this).attr('href'),
			$currentContent = $('#current-content'),
			$fullPage = $('#full-page');
	
		if(!($(this).hasClass('selected'))){
			/* Deselect the current selection in nav*/	
			$("#sliding-navigation a.selected").each(function(i)
			{
				$(this).animate({ paddingLeft: 15 }, 150);
				$(this).removeClass('selected');
				$(this).css("color", "#999");
			});
	
			/* Select new item */
			item_selected($(this));

			/* Display new content */
			$currentContent.fadeOut(200, function() {
        	        		$currentContent.hide().load(url +  " #content", function() {
                				$currentContent.fadeIn(400, function() {
                        				$currentContent.animate({ width: $currentContent.width() + "px" },1200);
			
							/* Register to close content */
							$('#close_button').click(function() {
							/* Deselect navigation */
							$("#sliding-navigation a.selected").each(function(i)
							{
								$(this).removeClass('selected');
								$(this).css("color", "#999");
							});

	
							/* Hide content */
							var $currentContent = $('#current-content');
							$currentContent.fadeOut(200, function() {
								$('.anythingSlider').fadeIn(400);
        						});
							/* Restart sliding */
							var api = $('#slider').data('AnythingSlider');
							api.startStop(true);

						return false;
						});


                        		});
                    		});
                	});
			return false;
		}
		else {
			return false;
		} 
	});

	/* Hover over slide highlights the nav */
	enable_slide_hover();	
 	
return false;
});

function item_selected(selection_id)
{
	$(selection_id).addClass('selected');
	$(selection_id).css("color", "#fff");
}


function remove_padding()
{
	$("#sliding-navigation a").each(function(i)
	{
		$(this).animate({ paddingLeft: 15 }, 150);

	});
}

function enable_slide_hover()
{
	/* Hover over slide highlights in nav */
	$('.anythingSlider').mouseover(
  		function () {
			if($('#slider').is(":visible")) {
				var api = $('#slider').data('AnythingSlider');
				api.startStop(false);
				if(! $("#slide" + api.targetPage).hasClass('selected')){
					$("#slide" + api.targetPage + " a").css("color", "#ffff66");
				}
			}
  		});
 	$('.anythingSlider').mouseout(
  		function () {
			if($('#slider').is(":visible")) {
				var api = $('#slider').data('AnythingSlider');
				api.startStop(true);
				if(! $("#slide" + api.targetPage).hasClass('selected')){
					$("#slide" + api.targetPage + " a").css("color", "#999");
				}
			}
		}
  	);
}

function slide(navigation_id, pad_out, pad_in, time, multiplier)
{
	// creates the target paths
	var list_elements = navigation_id + " li.sliding-element";
	var link_elements = list_elements + " a";
	
	// initiates the timer used for the sliding animation
	var timer = 0;
	
	// creates the slide animation for all list elements 
	$(list_elements).each(function(i)
	{
		// margin left = - ([width of element] + [total vertical padding of element])
		// updates timer
		timer = (timer*multiplier + time);
		$(this).animate({ marginLeft: "0" }, timer);
		$(this).animate({ marginLeft: "15px" }, timer);
		$(this).animate({ marginLeft: "0" }, timer);
	});

	// creates the hover-slide effect for all link elements 		
	$(link_elements).each(function(i)
	{
		$(this).hover(
		function()
		{
			if(!($(this).hasClass('selected'))){
				$(this).animate({ paddingLeft: pad_out }, 150);
				$(this).css("color", "#ffff66");
			
				/* if a nav for content, then find slide to jump to on slider */
				if($('#slider').is(":visible")) {
					var classString = $(this).parent().attr('id');
					if(classString) {
						var slideRegex = /^(slide)(\d)$/;
						var resultRegex = classString.match(slideRegex);
						if(resultRegex) {
							var api = $('#slider').data('AnythingSlider');
	                				api.gotoPage(Number(resultRegex[2]), false);			//Julian, this is hard-coded!!
				//			api.startStop(false);
						}
					}
				}
			}	
		},		
		function()
		{
			if(!($(this).hasClass('selected'))){
				$(this).animate({ paddingLeft: pad_in }, 150);
				if($(this).attr('id') == "aboutme") { $(this).css("color", "white"); }
				else 	{
						$(this).css("color", "#999");
						if($('#slider').is(":visible")) {
							var api = $('#slider').data('AnythingSlider');
				//			api.gotoPage(api.currentPage, false);
							api.startStop(true);
	
						}
					}	
			}
		});
	});
}
