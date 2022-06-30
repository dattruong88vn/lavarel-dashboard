function MyForm(params) {
	var _params = $.extend(
		true,
		{
			ui: {},
			defaultFormEmptyValue: null,
			defaultDataEmptyValue: null,
			defaultTemplate: '#field#'
		},
		params
	);
	var hasDatepicker = false;
	var hasPrice = false;
	var afterList = [];
	var ajaxList = [];
	var render = {
		input: function (field) {
			var html = '<input';
			for (var attr in field.attrs) {
				html += ' ' + attr + '="' + field.attrs[attr] + '"';
			}
			html += '>';
			html = field.template.replace('#field#', html);
			$(field.wrapper).html(html);
			if (hasValue(field.after)) {
				var afterParams = {
					field: field,
					after: field.after
				};
				pushAfter(afterParams);
			}
		},
		textarea: function (field) {
			var html = '<textarea';
			for (var attr in field.attrs) {
				html += ' ' + attr + '="' + field.attrs[attr] + '"';
			}
			html += '>';
			html += '</textarea>';
			html = field.template.replace('#field#', html);
			$(field.wrapper).html(html);
			if (hasValue(field.after)) {
				var afterParams = {
					field: field,
					after: field.after
				};
				pushAfter(afterParams);
			}
		},
		select: function (field) {
			function buildOptions(data) {
				var html = '';
				for (var i = 0; i < data.length; i++) {
					html += '<option value="' + data[i].value + '">' + data[i].text + '</option>';
				}
				return html;
			}

			var html = '<select';
			for (var attr in field.attrs) {
				html += ' ' + attr + '="' + field.attrs[attr] + '"';
			}
			html += '>';
			html += '</select>';
			html = field.template.replace('#field#', html);
			$(field.wrapper).html(html);
			if (field.options.type == 'ajax') {
				var ajaxParams = {
					field: field,
					ajax: function (field) {
						field.options.data().done(function (response) {
							var html = null;
							html = buildOptions(field.options.callback(response));
							$(field.id).html(html);
                            $(field.id).trigger('change');
							if (hasValue(field.after)) {
								field.after(field);
							}
						});
					}
				};
				pushAjax(ajaxParams);
				if (hasValue(field.options.changeById)) {
					$('body').on('change', field.options.changeById, function (e) {
                        var fieldName = $(this).data('field-name');
                        Window.myForm[fieldName] = $(this).val();
                        ajaxParams.ajax(field);
                    });
				}
			} else {
				var html = null;
				html = buildOptions(field.options.data());
				$(field.id).html(html);
				if (hasValue(field.after)) {
					var afterParams = {
						field: field,
						after: field.after
					};
					pushAfter(afterParams);
				}
			}
		},
		select2: function (field) {
			this.select(field);
			$(field.id).select2({
				placeholder: field.attrs.placeholder
			});
		},
		multiSelect: function (field) {
			field.attrs.multiple = 'multiple';
			this.select(field);
		},
		multiSelect2: function (field) {
			field.attrs.multiple = 'multiple';
			this.select2(field);
		},
		datePicker: function (field) {
			this.input(field);
			field.attrs.class = field.attrs.class + ' myform-datepicker';
			field.attrs.readonly = 'readonly';
			hasDatepicker = true;
		},
		date: function (field) {
			field.attrs.class = field.attrs.class + ' myform-datepicker';
			field.attrs.readonly = 'readonly';
			this.input(field);
			hasDatepicker = true;
		},
		price: function (field) {
			field.attrs.class = field.attrs.class + ' myform-price';
			this.input(field);
			hasPrice = true;
		},
		hidden: function (field) {
			field.attrs.type = 'hidden';
			this.input(field);
		}
	};
	var _this = this;
	var data = {};
	_this.params = _params;
	_this.init = function () {
		initFields();
		initDatepicker();
		initPrice();
		_this.clear();
		updateData();
	};

	_this.clear = function () {
		var field = null;
		for (var item in _this.params.ui) {
			field = _this.params.ui[item];
			if(field.attrs.type != 'hidden'){
				$(field.id).val(_this.params.defaultFormEmptyValue);
				$(field.id).trigger('change');
			}
		}
		updateData();
	};

	_this.data = function () {
		updateData();
		return data;
	};

	function initDatepicker(){
		if(hasDatepicker){
			$('.myform-datepicker').datepicker({
				format: 'dd/mm/yyyy',
				todayHighlight: true,
				endDate: "0d"
			});
		}
	}

	function initPrice(){
		if(hasPrice){
			$('.myform-price').autoNumeric('init', {mDec: 2});
		}
	}

	function autoUpdateEvent(){
		if(!hasValue(Window.myForm)){
			Window.myForm = {};
		}
		$('body').on('change','.myform-auto-update',function(e){
			e.preventDefault();
			var fieldName = $(this).data('field-name');
			Window.myForm[fieldName] = $(this).val();
			// console.log(Window.myForm);
		});
		//$('.myform-auto-update').trigger('change');
	}

	function pushAfter(params) {
		afterList.push(params);
	}

	function pushAjax(params) {
		ajaxList.push(params.ajax(params.field));
	}

	function initFields() {
		for (var item in _this.params.ui) {
			var field = _this.params.ui[item];
			if (!hasValue(field.template)) {
				field.template = _this.params.defaultTemplate;
			}
			field.attrs.class = field.attrs.class + ' myform-auto-update';
			if(!hasValue(field.attrs['data-field-name'])){
				field.attrs['data-field-name'] = field.attrs.id;
			}
			render[field.type](field);
		}
		processAjaxList().done(function (response) {
			processAfterList();
		})
		autoUpdateEvent();
	}

	function processAfterList() {
		for (var i = 0; i < afterList.length; i++) {
			afterList[i].after(afterList[i].field);
		}
	}

	function processAjaxList() {
		// for (var i = 0; i < ajaxList.length; i++) {
		// 	ajaxList[i];
		// }
		return $.when.apply(undefined, ajaxList);
	}

	function updateData() {
		var field = null;
		for (var item in _this.params.ui) {
			field = _this.params.ui[item];
			data[field.attrs.id] = $(field.id).val();
			if (!isArray(data[field.attrs.id])) {
				data[field.attrs.id] = hasValue(data[field.attrs.id]) ? data[field.attrs.id].trim() : null;
			}else {
				// data[field.attrs.id] = hasValue(data[field.attrs.id]) ? data[field.attrs.id].join() : null;
			}
		}
	}
}