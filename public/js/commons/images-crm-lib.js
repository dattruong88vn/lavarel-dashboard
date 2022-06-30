/**
    @name: images-pos-lib.js
    @v: 0.01v
    @date: 20/12/2017
    @update : 29/03/2019 (update for upload more file)
    @author : barry (extends by JSP)
    @require: jqueryUI, FileHelper, common-pos, lightbox
 */

/**
 * Define posImage LIB
 */

class PosImageLib {
    constructor(props) {
        this.__OPTIONS = {
            urlUpload : props.urlUpload,
            source : props.source,
            gallery : 'pos',//props.gallery,
            list : props.list,
            disable : props.disable,
            imageOnly : props.imageOnly,
            usePosEditor :  props.usePosEditor,
            useImageDefault : props.useImageDefault,
        };
        this.__WRAPPER = props.wrapper;
        this.__TypesAceept = ['image/png', 'image/jpg', 'image/jpeg'];
        //this.__PosEditorImgae = new PosEditorImage();
        this.__ImageDefault = "https://cdn.propzy.vn/listing/default_detail.jpg";
        this.__isPrivateContent = false;
        this.bindEvent();
    }

    bindEvent() {
        const that = this;
        that.__WRAPPER.off('change', '.add-images-files').on('change', '.add-images-files', function(e) {
            e.preventDefault();
            that.addNewImage(e);
            $(this).val('');
           // that.__WRAPPER.find('.images-file-zone').sortable();
           // that.__WRAPPER.find('.images-file-zone').disableSelection();
        });

        that.__WRAPPER.off('click', '.add-images').on('click', '.add-images', function(e) {
            e.preventDefault();
            that.__WRAPPER.find('.add-images-files').trigger('click');
        });

        that.__WRAPPER.off('click', '.clear-images').on('click', '.clear-images', function(e) {
            e.preventDefault();
            ModalConfirm.showModal({
                message : 'Bạn muốn xóa tất cả các hình ?',
                onYes : function(modal) {
                    modal.modal('hide');
                    that.__OPTIONS.list = [];
                    //that.__WRAPPER.html(that.render());
                    that.showListImage();
                },
            });
        });
        that.__WRAPPER.off('click', '.file-preview-del').on('click', '.file-preview-del', function(e) {
            e.preventDefault();
            //$(this).parents('.file-preview-item').remove();
            const img = $(this).parents('.file-preview-item').find('img').attr('src');
            // filter
            const newListImage = that.__OPTIONS.list.filter(it => {
                if(it.link != img) {
                    return it;
                }
            });
            if (!newListImage) newListImage = [];
            that.__OPTIONS.list = newListImage;
            that.showListImage();
        });

        that.__WRAPPER.off('change', '.pos-image-tool-image-default').on('change', '.pos-image-tool-image-default', function(e) {
            e.preventDefault();
            if ($(this).find("input").is(":checked")) {
                const image = {
                    link: that.__ImageDefault,
                    name: that.__ImageDefault,
                    isNew: true,
                    source: that.__OPTIONS.source,
                    gallery: that.__OPTIONS.gallery,
                };
                that.__OPTIONS.list = [];
                that.__OPTIONS.list.push(image);
                that.showListImage();
            }
        });




        $(document).off('click', '[data-fancybox-edit]').on('click', '[data-fancybox-edit]', function() {
            const f = $.fancybox.getInstance();
            if (f) {
                f['close']();
            }
            const ImageSrc = document.getElementById('imageEditorSrc').getAttribute('src');
            const lib = $('#imageEditorSrc').data('image-pos-lib');
            Window.posEditorImage.showEditor({imageSrc : ImageSrc, imagePos : lib});
        });


    }
    applyFancy() {
        const that = this;
        let buttons = [
            'fullScreen',
            'thumbs',
            'zoom',
            'close'
        ];
        if(that.__OPTIONS.usePosEditor) {
            buttons.unshift('edit');
            that.__WRAPPER.find('.file-preview-thumbnail').fancybox(
                {
                    loop : true,
                    transitionEffect : 'circular',
                    protect : true,
                    buttons : buttons,
                    clickOutside : false,
                    clickContent : 'zoom',
                    clickSlide : false,
                    beforeShow : function() {
                        $('img#imageEditorSrc').attr('src', this.src).data('image-pos-lib', that);
                    },
                });
            // define function edit image
            $.fancybox.defaults.btnTpl.edit = '<button data-fancybox-edit class="fancybox-button fancybox-button--edit" title="Chỉnh sửa hình ảnh"><i class="fa fa-edit"></i></button>';
        }

    }
    uploadImg(fd) {
        const that = this;

        return $.ajax({
            url : that.__OPTIONS.urlUpload,
            type : 'POST',
            data : fd,
            cache: false,
            contentType: false,
            processData: false,
        });
    }

    async uploadImages(files) {

        // push for async
        const that = this;

        let promiseUpload = [];
        $.each(files , function (i, f) {

            let fd = new FormData;
            fd.append('file', f);
            fd.append('type', 'document');
            promiseUpload.push(that.uploadImg(fd));
        });

        showPropzyLoading();
        try {
            Promise.all(promiseUpload).then(function(values) {
                let isErrUpload = false;
                values.forEach(it =>{
                    if (it.result) {
                        const image = {
                            link: it.data.link,
                            name: it.data.file_name,
                            isNew: true,
                            source: that.__OPTIONS.source,
                            gallery: that.__OPTIONS.gallery,
                        };
                        that.__OPTIONS.list.push(image);
                        that.showListImage();
                    } else {
                        isErrUpload = true;
                    }
                });

                hidePropzyLoading();
                if(isErrUpload) {
                    showPropzyAlert('Đã có lỗi trong khi upload hình. Xin vui lòng thử lại');
                }
            });
        } catch (e) {
            console.error(e);
        }

        that.applyFancy();
    }
    addNewImage(evt) {
        const that = this;
        const files = evt.originalEvent.target.files;

        if (isVal(that.__OPTIONS.urlUpload)) {
            let isvalid = false;
            let type = '';

            let isAccept = true;

            $.each(files, function (i, it) {
                const isCheck = that.__TypesAceept.find((x) => x === it.type);
                if(isCheck > -1) {
                    isAccept = false;
                    return true;
                }
            });
            if (isAccept) {
                that.uploadImages(files).then(response => {
                    console.log(response);
                }).catch(err => {
                    console.log(err);
                });
            } else {
                showPropzyAlert('Đã có lỗi xảy ra, Hệ thống không hỗ trợ định dạng của ảnh. Hỗ trợ các định dạng .jpg, jpeg, .png');
            }
        } else {
            showPropzyAlert('API upload không tồn tại. Xin vui lòng kiểm tra lại!');
        }


    }

    renderItem(optionImage) {
        const that = this;
        let source = {
            caption : '',
            isPrivate : false,
            link : null,
            source : '',
            alt : '',
            name : '',
            gallery : 'pos',
            isNew : false,
        };
        $.extend(source, optionImage);
        let newImage = '' ;
        if (source.isNew) {
            newImage = '<span class="label label-danger is-new">Mới</span>';
        } else {
            newImage = '<a class="label label-success is-save" style="display: block" href="/pos/Utilities/saveImage?url='+ source.link +'" target="_blank" download="true">' +
                '<i class="glyphicon glyphicon-save"></i> Lưu' +
                '<img src="'+ source.link +'" style="display: none">' +
                '</a>';
        }
        const valueCaption = isVal(source.caption) ? 'value="'+ source.caption +'"' : '';
        const checked = source.isPrivate ? 'checked="true"' : '';


        let footer = '';
        if (!that.__OPTIONS.imageOnly) {
            footer =
                '<div class="file-preview-item-footer">' +
                    '<div class="checkbox">' +
                        '<label>' +
                            '<input type="checkbox" class="image-private-input" '+ checked +'>' +
                            '<span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span>Riêng tư' +
                        '</label>' +
                    newImage +
                    '</div>' +
                    '<div class="image-caption-item">' +
                        '<input type="text" placeholder="Nhập caption" class="form-control image-caption-input" '+ valueCaption +'>' +
                    '</div>' +
                '</div>';
        }

        const html =
            '<div class="file-preview-item" data-source="'+ source.source+'">' +
            '<div class="file-preview-del"><i class="fa fa-times delete-images-btn"></i></div>' +
            '<a class="file-preview-thumbnail" style="background-image: url('+ source.link +')" ' +
            'href="'+ source.link +'"' +
            'data-file-name="'+ source.name+ '"' +
            'data-fancybox="'+ that.__OPTIONS.gallery +'"' +
            'data-gallery="'+ that.__OPTIONS.gallery +'">' +
            '<img src="' + source.link + '" style="display:none">' +
            '</a>'+
            footer +
            '</div>' +
            '';
        return html;
    }

    render() {

        const {list} = this.__OPTIONS;
        const that = this;
        let listImgs = [];
        let showImageDefaultCheck = 'block';
        if(list &&Array.isArray(list)) {
            listImgs = list;
        }
        if(listImgs.length > 0) {
            showImageDefaultCheck = 'none';
        }
        that.__isPrivateContent = false;
        const htmlItems = listImgs.map((it) => {
            it.name = it.link;
            if(it.link == that.__ImageDefault) {
                that.__isPrivateContent = true;
            }
            return that.renderItem(it);
        }).join("");

        let defaultImage = '';
        if (that.__OPTIONS.useImageDefault) {
            defaultImage = '<label class="checkbox control-label pos-image-tool-image-default" style="float: left; margin-right: 10px; display: '+ showImageDefaultCheck +'">' +
                '<input type="checkbox" value=""><span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span> Hình mặc định' +
                '</label>';
        }

        const html =
            '<div class="col-md-12 images-group">' +
                '<div class="form-group images-preview">' +
                    '<div class="row images-file-actions" style="margin: 0">' +
                        '<p style="float: right; margin: 0">' + defaultImage +
                            '<button type="button" class="btn btn-primary btn-sm add-images" style="margin-right: 10px;">Thêm</button>' +
                            '<button type="button" class="btn btn-default btn-sm clear-images">Xóa</button>' +
                        '</p>' +
                        '<input type="file" class="add-images-files hidden" name="files[]" multiple="">' +
                    '</div>' +
                    '<div class="row images-file-zone">' +
                    htmlItems +
                    '</div>' +
                '</div>' +
            '</div>';
        return(html);

    }

    showListImage() {
        const that = this;
        that.__WRAPPER.html(that.render()).data({"private_content": that.__isPrivateContent});
        that.__WRAPPER.find('.images-file-zone').sortable();
        that.__WRAPPER.find('.images-file-zone').disableSelection();
    }
}

//* optimal image-lib
(function($) {
    Window.imageEditorZoom = 1;


    $.fn.imagesPosLib = function(options) {

        const that = this;
        let setOpt = {
            urlUpload : '',
            source : 'props',
            gallery : 'pos',
            list : [],
            disable : false,
            imageOnly : false,
            usePosEditor : true,
            useImageDefault : true
        };
        $.extend(setOpt, options);
        $.extend(setOpt, {wrapper : that});
        const posImageLib = new PosImageLib(setOpt);
        that.html('');
        posImageLib.showListImage();
        /*that.append(posImageLib.render());
        that.find('.images-file-zone').sortable();
        that.find('.images-file-zone').disableSelection();*/
        // bind event
        posImageLib.applyFancy();

        if (setOpt.disable) {
            that.find('.file-preview-del').remove();
            that.find('.images-file-actions').remove();
            that.find('input').attr('disabled', true);
        }


        // functions
        function applyFancy() {
            
        }
    };
    $.fn.getListPhotos = function() {
        const blcImg = this;
        const imgaes = blcImg.find('.file-preview-item');
        let list = [];
        $.each(imgaes, function(i, img) {
            try {
               let arrayName = $(img).find('.file-preview-thumbnail').data('file-name').split("/");
               let fileName = arrayName[arrayName.length-1];
                const obj = {
                    fileName : fileName,
                    link : $(img).find('.file-preview-thumbnail').data('file-name'),
                    caption : isVal($(img).find('.image-caption-input').val()) ? $(img).find('.image-caption-input').val() : null,
                    isPrivate : $(img).find('.image-private-input').is(':checked') ? true : false,
                    source : 'props',// $(img).data('source')
                };
                list.push(obj);
            } catch (err) {
            }
        });
        return list;
    };

    $.fn.isPrivateContent = function () {
        const blcImg = this;
        return $(blcImg).data("private_content");
    };

    // Create template for Edit button

}(jQuery));


