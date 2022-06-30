function SADetailNoteForCRMManager() {
	var _this = this;
	var api = Window.sa.api;

	var dataPostUpdate = {
		content: null,
		id : null
	}
	_this.init = function () {
		initVAR();
		bindEvent();
	};

	function initVAR() {
		_this.noteCRMListTable = null;
	}

	function bindEvent() {
		$('body').off('click', '#showNoteCRMList').on('click', '#showNoteCRMList', function (e) {
			e.preventDefault();
			loadNoteCRMList();
			$('#noteCRMList').modal({
				backdrop: 'static',
				keyboard: false
			});
		});

		$('body').off('click', '#noteCRMList #showAddNewNoteCRMModal').on('click', '#noteCRMList #showAddNewNoteCRMModal', function (e) {
			e.preventDefault();
            $('#add-update-note-crm #noteCRM').val('');
            showModelCMR(true);
		});

		$('body').off('click', '#add-new-note-crm').on('click', '#add-new-note-crm', function (e) {
			e.preventDefault();
			showPropzyLoading();
			addNoteCRM().done(function (response) {
				$('#add-update-note-crm').modal('hide');
				hidePropzyLoading();
				showPropzyAlert(response.message);
			});
		});

        $('body').off('click', '.btn-update-note-crm-item').on('click', '.btn-update-note-crm-item', function (e) {
            e.preventDefault();
            dataPostUpdate.id = $(this).data('id');
            $('#add-update-note-crm #noteCRM').val($(this).data('content'));
            showModelCMR(false);
        });
        $('body').off('click', '#update-note-crm').on('click', '#update-note-crm', function (e) {
            e.preventDefault();
            showPropzyLoading();
            dataPostUpdate.content = Window.sa.data.noteCRM();
            return api.updateNoteCRM(dataPostUpdate).done(function (response) {
                hidePropzyLoading();
                $('#add-update-note-crm').modal('hide');
                loadNoteCRMList();
                if (response.result) {
                    $('#noteCRMList').modal({
                        backdrop: 'static',
                        keyboard: false
                    });
				} else {
                    showPropzyAlert(response.message, 'Thông Báo', function () {
                        $('#noteCRMList').modal({
                            backdrop: 'static',
                            keyboard: false
                        });
                    });
				}
                
            });
        });
	}

	function loadNoteCRMList(callback) {
		showPropzyLoading();
		try {
			_this.noteCRMListTable.destroy();
		} catch (Ex) {
			// nothing
		}

		_this.noteCRMListTable = $('#noteCRMList #note-crm-list-table')
			.DataTable({
				processing: false,
				serverSide: true,
				ajax: {
					url: api.apiList.noteCRMList,
					type: 'POST',
					data: {
						rlistingId: Window.sa.data.rlistingId()
					}
				},
				autoWidth: true,
				deferRender: false,
				lengthChange: false,
				paging: true,
				searching: false,
				ordering: false,
				language: DatatableHelper.languages.vn,
				columns: [
                    {
                        data: 'createdDate',
                        render: function (data, type, object) {
                            return moment(object.createdDate).format("HH:mm:ss DD/MM/YYYY");
                        }
                    },
					{
						data: 'typeName',
						render: function (data, type, object) {
							return data ? data : 'N/A';
						}
					},
					{
						data: 'userName',
						render: function (data, type, object) {
                            return data ? data : 'N/A';
						}
					},
					{
						data: 'reason',
						render: function (data, type, object) {
                            return data ? data : '';
						}
					},
                    {
                        data: 'customerFeedback',
                        render: function (data, type, object) {
                            return data ? 'có' : 'không';
                        }
                    },
                    {
                        data: 'investigate',
                        render: function (data, type, object) {
                        	let content = '';
                        	if(data == null) {
                        		content = 'N/A';
							} else {
                        		if (data == true) {
                                    content = 'Thích';
								} else {
                                    content = 'Không thích';
								}
							}
                            return content;
                        }
                    },

				]
			})
			.off('processing.dt')
			.on('processing.dt', function (e, settings, processing) {
				if (processing) {
					showPropzyLoading();
				} else {
					hidePropzyLoading();
				}
			})
			.on('xhr.dt', function (e, settings, json, xhr) {
				hidePropzyLoading();
				if (hasValue(callback)) {
					callback();
				}
			});
	}

	function addNoteCRM() {
		var postData = {
			content: Window.sa.data.noteCRM(),
			rlistingId: Window.sa.data.rlistingId()
		};

		return api.addNoteCRM(postData);
	}

    function showModelCMR(isAdd = true) {
        $('#noteCRMList').modal('hide');
        if (isAdd) {
        	$('#add-update-note-crm #add-new-note-crm').show();
        	$('#add-update-note-crm #update-note-crm').hide();
		} else {
            $('#add-update-note-crm #add-new-note-crm').hide();
            $('#add-update-note-crm #update-note-crm').show();
        }
        $('#add-update-note-crm').modal({
            backdrop: 'static',
            keyboard: false
        });
    }
}