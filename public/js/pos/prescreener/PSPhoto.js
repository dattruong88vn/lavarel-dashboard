function PSPhoto() {
	var _this = this;
	var apiList = {
		uploadPhoto: baseUploadApiPublic + 'upload',
	};

	_this.init = function () {
		initVAR();
		initDOM();
	};

	function initVAR() {
        $('#diyPhotos-wrapper').imagesPosLib({
            gallery : 'diy',
            disable : true,
            list: hasValue(Window.jsDetailData.diyInfo) ? Window.jsDetailData.diyInfo.photos : []
        })
		$('#photos-wrapper').imagesPosLib({
            urlUpload : apiList.uploadPhoto,
            source : 'props',
            gallery : 'photo',
            list: hasValue(Window.jsDetailData) && hasValue(Window.jsDetailData.photos) ? Window.jsDetailData.photos : []
        })
        $('#photos-360').Images360({
            urlUpload : apiList.uploadPhoto,
            source : 'props',
            gallery : 'photo',
            list: hasValue(Window.jsDetailData) && hasValue(Window.jsDetailData.virtualTour360s) ? Window.jsDetailData.virtualTour360s : []
        })
        $('#photoGcns-wrapper').imagesPosLib({
            urlUpload : apiList.uploadPhoto,
            source : 'props',
            gallery : 'photoGcn',
            list: hasValue(Window.jsDetailData) && hasValue(Window.jsDetailData.photoGcns) ? Window.jsDetailData.photoGcns : []
        })

        _this.getPhotoList  = function () {
            var list = $('#photos-wrapper').getListPhotos();
            Window.jsDetailData.photo = JSON.stringify(list);
            var listGcn = $('#photoGcns-wrapper').getListPhotos();
            Window.jsDetailData.photoGcn = JSON.stringify(listGcn);
            var list360 = $('#photos-360').getListPhotos();
            Window.jsDetailData.virtualTour360s = list360.map(function(item){
                return item.link;
            });
        }

	}

	function initDOM() {
		showHideDiyPhotos();
	}

	function showHideDiyPhotos() {
		if (!hasValue($('#diyPhotos-wrapper').getListPhotos())) {
			$('.diyInfo-group').hide();
		}
	}

}