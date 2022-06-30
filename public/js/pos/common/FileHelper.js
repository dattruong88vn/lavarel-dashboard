var FileHelper = {
	isJPGImage: function (fileType) {
		var valid = false;
		var validTypes = ['image/jpeg'];
		
		valid = validTypes.find(function (data) {
			return data == fileType;
		});
		
		return valid || false;
	},
	isPNGImage: function (fileType) {
		var valid = false;
		var validTypes = ['image/png'];
		
		valid = validTypes.find(function (data) {
			return data == fileType;
		});
		
		return valid || false;
	},
	isPdf: function (fileType) {
		var valid = false;
		var validTypes = ['application/pdf'];
		
		valid = validTypes.find(function (data) {
			return data == fileType;
		});
		
		return valid || false;
	},
	isDoc:function(file){
		if(file.type=='application/msword' || file.type=='application/vnd.openxmlformats-officedocument.wordprocessingml.document')
			return true;
		return false;
	},
	list: function (fileSelector) {
		return $(fileSelector)[0].files;
	},
	collectFileToFormData: function (fileSelector) {
		var files = $(fileSelector)[0].files;
		var formData = new FormData();
		
		$.each(files, function (i, file) {
			formData.append('file[]', file);
		});
		
		return formData;
	},
	collectFilesArrayToFormData : function(filesArray) {
		var formData = new FormData();
		
		$.each(filesArray, function (i, file) {
			//formData.append('files[]', file);
			formData.append('files[]', file);
		});
		return formData;
	},
	ajaxSend: function (formData, url, async) {
		if (async != true || async != false) {
			async = true;
		} else {
			async = false;
		}
		
		return $.ajax({
			async: async,
			type: "POST",
			url: url,
			data: formData,
			cache: false,
			processData: false,
			contentType: false
		});
	}
};