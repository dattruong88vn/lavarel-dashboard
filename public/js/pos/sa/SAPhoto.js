function SAPhoto() {
    var _this = this;

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
            urlUpload : Window.sa.api.apiList.uploadPhoto,
            source : 'props',
            gallery : 'photo',
            list: Window.sa.data.photos()
        })
        $('#photos-360').Images360({
            urlUpload : Window.sa.api.apiList.uploadPhoto,
            source : 'props',
            gallery : 'photo',
            list: Window.sa.data.photo360()
        })
        $('#photoGcns-wrapper').imagesPosLib({
            urlUpload : Window.sa.api.apiList.uploadPhoto,
            source : 'props',
            gallery : 'photoGcn',
            list: Window.sa.data.photoGcns()
        })
        $('#photoSa-wrapper').imagesPosLib({
            urlUpload: baseUploadApiPublic + 'upload',
            source: 'props',
            gallery: 'photoSa',
            disablePrivateCheckbox: true,
            useImageDefault: false,
            list: Window.sa.data.photoSas()
        });
        $('#planing-photos-wrapper').imagesPosLib({
            urlUpload : Window.sa.api.apiList.uploadPhoto,
            source : 'props',
            gallery : 'photoGcn',
            list: Window.sa.data.planingPhotos(),
            useImageDefault : false,
        });


        _this.getPhotoList  = function () {
            var list = $('#photos-wrapper').getListPhotos();
            Window.jsDetailData.photo = JSON.stringify(list);
            var listGcn = $('#photoGcns-wrapper').getListPhotos();
            Window.jsDetailData.photoGcn = JSON.stringify(listGcn);
            var listSa = $('#photoSa-wrapper').getListPhotos();
            Window.jsDetailData.photoSa = JSON.stringify(listSa);
            var listPlan = $('#planing-photos-wrapper').getListPhotos();
            Window.jsDetailData.plan.photo = JSON.stringify(listPlan);
            var list360 = $('#photos-360').getListPhotos();
            Window.jsDetailData.virtualTour360s = list360.map(function(item){
                return item.link;
            });
        }

        _this.isPrivateContent = function () {
            const photo = $('#photos-wrapper').isPrivateContent();
            const photoGcn = $('#photoGcns-wrapper').isPrivateContent();

            let isPrivate = false;
            if(photo || photoGcn) {
                isPrivate = true;
            }
            return isPrivate;
        };
    }

    function initDOM() {
        showHideDiyPhotos();
    }

    function showHideDiyPhotos() {
        if (!hasValue($('#diyPhotos-wrapper').getListPhotos())) {
            $('.diyPhotos-group').hide();
        }
    }
}