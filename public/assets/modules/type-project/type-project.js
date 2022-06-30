var startApp = function() {
	// sort
	$('.sort').change(function() {
		var value = parseInt($(this).val());
		if (value > 0) {
			window.location.search = $.query.set('sapxep', value);
		} else {
			$.query = $.query.remove('sapxep');
			if ($.query.toString().length == 0) {
				window.location = window.location.href.split('?')[0];
			} else {
				window.location.search = $.query.remove('sapxep');
			}
		}
	});
};
