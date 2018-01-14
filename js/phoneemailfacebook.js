$(function() {

    $('#Phone').click(function(e) {
		$('#Phone').removeClass('active');
		$('#Phone').click(checkInfo());
		$(this).addClass('active');
		e.preventDefault();
	});
	$('#Email').click(function(e) {
		$('#Email').removeClass('active');
		$('#Email').click(checkInfo());
		$(this).addClass('active');
		e.preventDefault();
	});
	$('#Facebook').click(function(e) {
		$('#Facebook').removeClass('active');
		$('#Facebook').click(checkInfo());
		$(this).addClass('active');
		e.preventDefault();
	});

});
