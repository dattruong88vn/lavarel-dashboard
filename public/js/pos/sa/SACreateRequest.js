function SACreateRequest() {
	var _this = this;

	var params = {
		customerName: null,
		customerPhone: null,
		customerEmail: null
	};

	_this.init = function () {
		var getParams = location.href.split('?');
		if (hasValue(getParams)) {
			if (hasValue(getParams[1])) {
				getParams = decodeURIComponent(getParams[1]);
				getParams = getParams.split('&');
				for (var i = 0; i < getParams.length; i++) {
					var paramName = getParams[i].split('=');
					if (hasValue(paramName[0])) {
						params[paramName[0]] = hasValue(paramName[1]) ? paramName[1] : null;
					}
				}
			}
		}
		for (var param in params) {
			$('#' + param).val(params[param]);
		}
	}
}

$(document).ready(function () {
	(new SACreateRequest()).init();
});