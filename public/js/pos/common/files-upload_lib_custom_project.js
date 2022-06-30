class PropzyFileUploadLib {
    constructor(props) {
        this._WRAPPER = props.wrapper ? props.wrapper : null;
        this._LIST = props.list && Array.isArray(props.list) ? props.list : [];
        this._TYPE = props.type  ? props.type : 'valuation';
        this._SOURCE = props.source  ? props.source : 'props';
        this._IS_PRIVATE = props.isPrivate  ? props.isPrivate : false;
        this._FORMAT = props.format ? props.format : false;
        this._LIMIT = props.limit ? props.limit : null;
        this._URL_UPLOAD = props.url  ? props.url : '';
        this._TYPE_ACCEPT_DEFINDE = {
            'word' : {
                accept : '.doc, .docx',
                link  : '/images/propzy-upload-files/word.svg'
            },
            'image' : {
                accept : '.jpg,.jpeg,.png',
                link  : null
            },
            'pdf' : {
                accept : '.pdf',
                link  : '/images/propzy-upload-files/pdf.svg'
            }
        };
        this._TYPE_ACCEPT = props.typeAccept &&  Array.isArray(props.typeAccept) ?  props.typeAccept: ['word', 'image', 'pdf'];


        // validate
        if(!this._WRAPPER || typeof(this._WRAPPER) == 'undefined') {
            throw "wrapper is not defined! - wrapper không được định nghĩa";
        }
        if(!this._URL_UPLOAD || typeof(this._URL_UPLOAD) == 'undefined') {
            throw "upload api is not defined! - upload api không được định nghĩa";
        }

        // call functions
        this.events();
        this.render();
    }

    async uploadFile(data) {
        const that = this;
        const formData = new FormData();
        formData.append('file', data.file);
        formData.append('type', that._TYPE);
        formData.append('fileName', data.fileName);
        formData.append('source','dashboard');
        let response = null;
        showPropzyLoading();
        await axios({
            method: 'post',
            url: that._URL_UPLOAD,
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
            .then(xhr => {
                response = xhr.data;
            })
            .catch(function (response) {
                console.error('fail to upload file');
            });
        hidePropzyLoading();
        if(response && response.result) {
            that._LIST = that._LIST.concat([{
                title : data.title,
                isPrivate : false,
                link : response.data.link
            }]);
            that.render();
        } else {
            // upload fail
        }

    }
    getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }


    async render() {
        const that = this;
        let html = "";

        const items = that._LIST.map((file,index) => {
            // let fileName = $.trim(file.link) ? file.link.split('.')[0] : '';
            let fileName = file.title ? file.title : '';
            let splitName = file.link.split('.');
            let extenstion = $.trim(file.link) ? splitName[splitName.length - 1] : '';
            let isPrivate = file.isPrivate && file.isPrivate == true ? 'checked' : '';
            let fileNew = file.file ? '<button class="btn btn-sm btn-warning "><i class="fa fa-upload"></i></button>' : '<button class="btn btn-sm btn-success propzy-upload-file-item-download"><i class="fa fa-download"></i></button>';
            let link = null;
            $.each(that._TYPE_ACCEPT_DEFINDE, (i, it) => {
                if(it.accept.includes(extenstion)) {
                    link = it.link;
                }
            });
            if (that._TYPE_ACCEPT_DEFINDE.image.accept.includes(extenstion)) {
                //is image;
                if (file.link) {
                    link = file.link;
                }
                // upload
                if (file.file) {
                    link =  that.getBase64(file.file);
                }
            }
            //let source = that._SOURCE;
            let privateHtml = '';
            if (that._IS_PRIVATE) {
                privateHtml = '<label class="checkbox" style="margin-right: 25px"><input type="checkbox" class="propzy-upload-file-private" '+isPrivate+'><span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span>Riêng tư</label>';
            }

            let htmlItem = '<div class="propzy-upload-file-item" data-key="'+index+'">' +
                '<div class="propzy-upload-file-item-col" style="width: 15%;"><div class="propzy-upload-file-item-thumb"><img src="'+link+'"></div></div> ' +
                '<div class="propzy-upload-file-item-col" style="width: 85%"><div class="propzy-upload-file-item-content">' +
                '<p><input type="text" class="form-control propzy-upload-file-item-input-name" value="'+fileName+'"></p>' +
                '<p class="propzy-upload-file-info">' +
                privateHtml +
                '<label class=""> - Type : '+ extenstion +'</label> ' +
                '<label class="" style="float: right">'+fileNew+'<button class="btn btn-sm btn-danger propzy-upload-file-item-remove"><i class="fa fa-trash"></i></button></label> ' +
                '</p>' +
                '<div class="progress"><div class="progress-bar"></div></div>' +
                '</div></div>' +
                '</div>';
            return htmlItem;
        }).join("");

        let accepts = that._TYPE_ACCEPT.map(it => {
            try {
                return that._TYPE_ACCEPT_DEFINDE[it].accept;
            }catch (e) {
                
            }
            
        }).join(',');

        let createButton = that._LIMIT != null && that._LIST.length < that._LIMIT ? '<button class="btn btn-primary btn-sm propzy-upload-file-action-top" data-type="1">Thêm mới</button>' : '';

        html = '<div class="col-sm-12 col-md-12 col-xs-12 propzy-upload-file-wrapper">' +
            '<input type="file" class="propzy-upload-file-input-hidden" style="display: none" multiple accept="'+accepts+'">' +
            '<div class="row form-group">' +
            '<div class="col-sm-12 col-md-12 col-xs-12 text-right">' + createButton +
            '<button class="btn btn-danger btn-sm propzy-upload-file-action-top" data-type="2">Xóa hết</button>' +
            '</div>' +
            '</div>' +
            '<div class="row form-group">' +
            '<div class="col-sm-12 col-md-12 col-xs-12 propzy-upload-file-content">' +
            items +
            '</div>' +
            '</div>' +
            '<iframe id="propzy-upload-file-iframe" style="display:none;"></iframe>'
            '</div>';
        $(that._WRAPPER).html(html);
    }

    getList() {
        const that = this;
        if(!that._FORMAT){
            return this._LIST.map(it => {
                return {
                    link : it.link,
                    fileName : it.fileName,
                    isPrivate : it.isPrivate,
                    source : that._SOURCE
                };
            });
        }else{
            return this._LIST.map(it => {
                return {
                    link : it.link,
                    title : it.title
                };
            });
        }
    }

    events() {
        const that = this;
        $(that._WRAPPER).off('click', '.propzy-upload-file-action-top').on('click', '.propzy-upload-file-action-top', function (e) {
            e.preventDefault();
            const type = Number.parseInt($(this).data('type'));
            switch (type) {
                case 1 : {
                    console.log('propzy upload file click action add file');
                    $(that._WRAPPER).find('.propzy-upload-file-input-hidden').trigger('click');
                    break;
                }
                case 2 : {
                    console.log('propzy upload file click action remove file');
                    ModalConfirm.showModal({
                        message: "Bạn muốn xóa hết các tệp đính kèm ?",
                        onYes: function (modal) {
                            that._LIST.length = 0;
                            that.render();
                        }
                    });
                    break;
                }
                default : {
                    console.log('propzy upload file not action click');
                    break;
                }
            }
            return false;
        });
        $(that._WRAPPER).off('change', '.propzy-upload-file-input-hidden').on('change', '.propzy-upload-file-input-hidden', function(e) {
            e.preventDefault();
            const files = e.originalEvent.target.files;

            const fileNotAccept = [];
            if(files.length > 0) {
                $.each(files, async function (i, it) {
                    let extenstion = $.trim(it.name) ? it.name.split('.')[1] : '';
                    let isAccept = false;
                    $.each(that._TYPE_ACCEPT_DEFINDE, function (key, item) {
                       if(item.accept.includes(extenstion)) {{
                           isAccept = true;
                       }}
                    });
                    if(isAccept) {
                        that.uploadFile({
                            file : it,
                            fileName : it.name,
                        });
                    } else {
                        fileNotAccept.push(it.name);
                    }
                });

                if(fileNotAccept.length > 0) {
                    posNotifyAlert({type: "pos-notify-danger", message : 'Tệp không đúng định dạng. Xin vui lòng thử lại : <br>' + fileNotAccept.join('<br> - ')});
                }
            };
            $(this).val('');
        });
        $(that._WRAPPER).off('change', '.propzy-upload-file-private').on('change', '.propzy-upload-file-private', function(e) {
            e.preventDefault();
            const  isChecked = $(this).is(':checked');
            const key = $(this).parents('.propzy-upload-file-item').data('key');
            const list = that._LIST.map((it, index) => {
                if(index == key) {
                    it.isPrivate = isChecked;
                };
                return it;
            });

            that._LIST = list;


        });
        $(that._WRAPPER).off('keyup', '.propzy-upload-file-item-input-name').on('keyup', '.propzy-upload-file-item-input-name', function(e) {
            e.preventDefault();
            const  val = $(this).val();
            const key = $(this).parents('.propzy-upload-file-item').data('key');
            const list = that._LIST.map((it, index) => {
                if(index == key) {
                    let extenstion = $.trim(it.fileName) ? it.fileName.split('.')[1] : '';
                    it.fileName = val + '.' + extenstion;
                    it.title = val;
                };
                return it;
            });

            that._LIST = list;

        });
        $(that._WRAPPER).off('click', '.propzy-upload-file-item-remove').on('click', '.propzy-upload-file-item-remove', function(e) {
            e.preventDefault();
            const key = $(this).parents('.propzy-upload-file-item').data('key');
            const list = [];
            that._LIST.forEach((it, index) => {
                if(index != key) {
                    list.push(it);
                }
            });
            that._LIST = list;
            that.render();

        });
        $(that._WRAPPER).off('click', '.propzy-upload-file-item-download').on('click', '.propzy-upload-file-item-download', function(e) {
            e.preventDefault();
            const key = $(this).parents('.propzy-upload-file-item').data('key');
            const filter = that._LIST.filter((it, index) => index == key);

            if (filter) {

                const  url = filter[0].link;
                let extenstion = $.trim(filter[0].fileName) ? filter[0].fileName.split('.')[1] : '';
                let isImage = that._TYPE_ACCEPT_DEFINDE.image.accept.includes(extenstion);
                const link = document.createElement("a");
                link.download = 'download';
                link.target = '_blank';
                // if(isImage) {
                //     link.href = '/pos/Utilities/saveImage?url='+url;
                // } else {
                //     link.href = url;
                // }
                link.href = url;
                link.click();
            }

        });



    }
    
}



// define function Jquery

(function($) {

    $.fn.propzyFileUpload = function (params) {
        const id = $(this).attr('id');
        const options = {
            wrapper : '#' + id,
            list : [],
        };
        $.extend(options, params);
        options.wrapper =  '#' + id;

        // call Propzy File
        const uploadFile = new PropzyFileUploadLib(options);


        this.getList = function () {
            return uploadFile.getList();
        };



    };
}(jQuery));