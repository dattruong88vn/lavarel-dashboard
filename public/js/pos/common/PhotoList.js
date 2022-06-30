function PhotoList(container, url, disabledAddNewPhotos) {
	var _this = this;

	_this.init = function () {
		initVAR();
		initDOM();
		bindEvent();
	};

	function initVAR() {

		_this.id = 'photo-list-' + Math.random().toString().replace(/\./g, '');
		_this.imagePreviewContainerId = '#photo-list-preview-modal';

		if (!hasValue(disabledAddNewPhotos)) {
			disabledAddNewPhotos = false;
		} else {
			disabledAddNewPhotos = true;
		}
		_this.list = function () {

		};
		_this.imageTypes = ['image/png', 'image/jpg', 'image/jpeg'];
		_this.formData = new FormData;
		_this.container = container;
		_this.url = url;
		_this.deletePhoto = function (photo, isNewPhoto) {
			if (isNewPhoto) {
				var name = $(photo).closest('a').attr('title');
				var tmp = new FormData;

				$(photo).closest('.thumb-wrapper').remove();

				for (var i in _this.formData.getAll('files[]')) {
					if (_this.formData.getAll('files[]')[i].name == name) {
						continue;
					} else {
						tmp.append('files[]', _this.formData.getAll('files[]')[i]);
					}
				}

				delete _this.formData;
				_this.formData = tmp;

			} else {
				var name = $(photo).closest('.thumb-wrapper').find('img.thumb').attr('src');

				$(photo).closest('.thumb-wrapper').remove();
			}
		};

		_this.upload = function () {
			var files = _this.formData.getAll('files[]');
			var requestList = [];

			for (var i = 0; i < files.length; i++) {
				var fd = new FormData;
				fd.append('file', files[i]);
				fd.append('type', 'listing');

				requestList.push(FileHelper.ajaxSend(fd, _this.url));
			}

			return $.when.apply($, requestList).done(function () {
				var responseList = arguments;
				var newPhotoSrcList = [];
				if (hasValue(responseList[0]) && hasValue(responseList[0].result)) {
					newPhotoSrcList.push(responseList[0].data.file_name);
				} else {
					for (var i in responseList) {
						if (hasValue(responseList[i][0])) {
							if (responseList[i][0].result) {
								newPhotoSrcList.push(responseList[i][0].data.file_name);
							}
						}
					}
				}
				_this.updateNewPhotoSrc(newPhotoSrcList);
				_this.resetFormData();
			});
		};

		_this.resetFormData = function () {
			delete _this.formData;
			_this.formData = new FormData;
		};

		_this.addPhotos = function (photos) {
			for (var i in photos) {
				renderPhoto(photos[i], 'added-photo');
			}
		};

		_this.updateNewPhotoSrc = function (newPhotoSrcList) {
			var newPhotoSrcListIndex = 0;
			$(_this.container + ' .list img.new-photo:not([data-new-src])').each(function (i, img) {
				$(img).attr('data-new-src', newPhotoSrcList[newPhotoSrcListIndex++]);
			});
		};

		_this.srcList = function () {
			var srcList = [];
			$(_this.container + ' .list img.added-photo').each(function (i, img) {
				srcList.push($(img).attr('src').replace(Window.uploadUrl, ''));
			});
			$(_this.container + ' .list img.new-photo[data-new-src]').each(function (i, img) {
				srcList.push($(img).data('new-src'));
			});
			return srcList;
		}
	}

	function initDOM() {
		if (hasValue(disabledAddNewPhotos)) {
			var dom = '<span class="list"></span>';
		} else {
			var dom = '<span class="list"></span><a href="#" class="file-selector"><img class="thumb" src="/images/diy-slider/t01.png"></a><input type="file" class="files hidden" name="files[]" multiple/>';
		}
		$(_this.container).append(dom);
	}

	function bindEvent() {
		if (!hasValue(disabledAddNewPhotos)) {
			$('body').off('change', _this.container + ' .files').on('change', _this.container + ' .files', function (e) {
				handleFileSelect(e);
			});
			$('body').off('click', _this.container + ' .file-selector').on('click', _this.container + ' .file-selector', function (e) {
				e.preventDefault();
				$(_this.container + ' .files').trigger('click');
			});
			$('body').off('click', _this.container + ' .photo-action-wrapper.new-photo .delete-btn').on('click', _this.container + ' .photo-action-wrapper.new-photo .delete-btn', function (e) {
				e.preventDefault();
				_this.deletePhoto(this, true);
				return false;
			});
			$('body').off('click', _this.container + ' .photo-action-wrapper:not(.new-photo) .delete-btn').on('click', _this.container + ' .photo-action-wrapper:not(.new-photo) .delete-btn', function (e) {
				e.preventDefault();
				_this.deletePhoto(this);
				return false;
			});
		} else {
			// no this case
		}
		$('body').on('click', '.photo-action-wrapper', function (e) {
			e.preventDefault();
			$(_this.imagePreviewContainerId + ' img.photo-list-preview-image').attr('src', $(this).siblings('img.thumb').attr('src'));
			$(_this.imagePreviewContainerId).modal();
		});
	}

	function isExisted(name) {
		var fileExisted = null;
		$(_this.container + ' .list img.new-photo').each(function (i, img) {
			if ($(img).data('src') == name) {
				fileExisted = name;
				return false;
			}
		});
		return fileExisted;
	}

	function renderPhoto(photo) {
		if (hasValue(disabledAddNewPhotos)) {
			$(_this.container + ' .list').append('<span class="thumb-wrapper"><img class="thumb ' + (hasValue(photo.class) ? photo.class : null) + ' ' + ((hasValue(photo.isNewPhoto)) ? 'new-photo' : 'added-photo') + '" src="' + photo.src + '" data-src="' + photo.name + '"/><a href="javascript:void(0);" class="photo-action-wrapper" title="' + photo.name + '"></a></span>');
		} else {
			$(_this.container + ' .list').append('<span class="thumb-wrapper"><img class="thumb ' + (hasValue(photo.class) ? photo.class : null) + ' ' + ((hasValue(photo.isNewPhoto)) ? 'new-photo' : 'added-photo') + '" src="' + photo.src + '" data-src="' + photo.name + '"/><a href="javascript:void(0);" class="photo-action-wrapper' + ((photo.isNewPhoto == true) ? ' new-photo' : '') + '" title="' + photo.name + '"><i class="fa fa-times delete-btn"></i></a></span>');
		}
	}

	function handleFileSelect(evt) {
		var files = evt.target.files; // FileList object
		var duplicateFileList = [];
		var validImage = false;

		// Loop through the FileList and render image files as thumbnails.
		for (var i = 0, f; f = files[i]; i++) {

			// Only process image files.
			validImage = _this.imageTypes.find(function (data) {
				return data == f.type;
			});
			if (!validImage) {
				showPropzyAlert('Error: image type ' + f.type);
				continue;
			}
			if (hasValue(isExisted(f.name))) {
				duplicateFileList.push(isExisted(f.name));
				continue;
			}

			var reader = new FileReader();

			// Closure to capture the file information.
			reader.onload = (function (theFile) {
				return function (e) {
					// Render thumbnail.
					renderPhoto({src: e.target.result, name: theFile.name, isNewPhoto: true}, 'new-photo');
				};
			})(f);

			// Read in the image file as a data URL.
			reader.readAsDataURL(f);
			_this.formData.append('files[]', f);
		}
		$(_this.container + ' .files').val('');
		if (hasValue(duplicateFileList)) {
			showPropzyAlert(['Danh sách các hình trùng tên không được thêm vào', '<ul>', '<li>', duplicateFileList.join('</li><li>'), '</li>'].join(''), 'Thông báo');
		}
	}
}