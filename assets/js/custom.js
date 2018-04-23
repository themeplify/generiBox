(function($) {
	
	// step navigation
	var target = $('.step-indicator-wrap ul li');
	target.first().addClass('active');
	$('.step-form-container .steps-holder:nth-of-type(1)').fadeIn();
	target.click(function() {
		$(this).addClass('active').siblings('li.active').addClass('complete');
		var getStep = $(this).data('target');
		$('.steps-holder.' + getStep).fadeIn().siblings('.steps-holder').fadeOut();
		// $("html, body").animate({ scrollTop: 0 }, "200");
	});

})(jQuery);