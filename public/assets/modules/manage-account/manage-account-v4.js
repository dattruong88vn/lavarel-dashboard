var startApp = function() {
	$('.del-search').click(function(e) {
		var self = this;
		e.preventDefault();
		var id = $(this).data('id');
		App.Feature.Delete('/api/del-search/' + id, function(response) {
			if (response) {
				$(self)
					.closest('.item')
					.remove();
			}
		});
	});
};
