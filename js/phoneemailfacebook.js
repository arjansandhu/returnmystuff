$(function() {

    $('#Phone').click(function(e) {
		$('#Phone').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});
	$('#Email').click(function(e) {
		$('#Email').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});
	$('#Facebook').click(function(e) {
		$('#Facebook').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});

});
