var startApp = function () {
    $(document).ready(function () {
        var modalAction = $("#popup-create-collection");
        var modalShowList = $("#popup-select-collection");

        $(".div-upload").click(function(){
            $("input[name='file']").trigger('click');
        });
        $("input[name='file']").change(function (e) {

            $("#add-collection").prop("disabled", true);
            App.Feature.uploadImage($("input[name='file']"),e,function (response) {
                $(".text-img").addClass("hidden");
                $("#photo").val(response.link);
                $("#add-collection").prop("disabled", false);
            },'/api/upload?type=basket');
        });

        $(".a-upload").click(function(){
            modalAction.modal("show");
            modalAction.on('hidden.bs.modal',function () {
                modalAction.find(".h4-title").text("Tạo bộ sưu tập mới");
                modalAction.find("#add-collection").text("Tạo mới");
                modalAction.find("input[name='id']").val(0);
            });
            modalAction.find(".h4-title").text("Chỉnh sửa bộ sưu tập");
            modalAction.find("#add-collection").text("Chỉnh sửa");
            var collection = currentCollection;
            console.log(collection);
            modalAction.find("input[name='id']").val(collection.id);
            modalAction.find("input[name='dealId']").val(collection.dealId);
            modalAction.find("input[name='leadId']").val(collection.leadId);
            modalAction.find("input[name='social_uid']").val(collection.social_uid);
            modalAction.find("input[name='name']").val(collection.basketName);
            modalAction.find("input[name='description']").val(collection.description);
            modalAction.find("input[name='photo']").val(collection.photo);
            if(collection.photo){
                $("#show-photo").attr('src',collection.photo);
                if(!$(".text-img").hasClass('hidden'))
                    $(".text-img").addClass('hidden');
            }
        });
        $(".delete-collection").click(function(){
            var dataSend = {
                "listId":[currentIdCollection]
            };
            App.Feature.Post('/api/delete-collection',dataSend,function (response) {
                console.log(response);
                if(response.result){
                    location.href="/bo-suu-tap";
                }else{
                    App.UI.Error(response.message);
                }
            },true);
        });
        $(".listings .btn-edit").click(function (e) {
            e.preventDefault();
            var listingId = $(this).attr("listingid");
            modalShowList.find(".item").map(function (key,item) {
                if(parseInt(currentIdCollection) == parseInt($(item).data('id'))){
                    $(item).hide();
                }else{
                    $(item).show();
                }
            });
            Mycollection.addCollection(listingId);
        });
        $(".listings .btn-delete-fav").click(function () {
            var listingId = $(this).parents('.media').data('id');
            var dataSend = {
                "rlistingIds":[listingId]
            };
            App.Feature.Post('/api/delete-listing-in-collection/'+currentIdCollection,dataSend,function (repsonse) {
                if(repsonse.result && repsonse.code==200)
                    location.reload();
                else
                    App.UI.Error(repsonse.message);
            },true);
        });

        $(".listings .remove_collection_listing").click(function () {
            var rlistingId = $(this).attr("listingid");
            var dataSend = {
                "rlistingIds":[rlistingId]
            };
            App.Feature.Post('/api/delete-listing-in-collection/'+currentIdCollection,dataSend,function (repsonse) {
                if(repsonse.result && repsonse.code==200)
                    location.reload();
                else
                    App.UI.Error(repsonse.message);
            },true);
        });

        $("#add-collection").click(function(){
            var checkValidate = App.UI.checkValidRules($(this).closest("#form-collection"),{
                name: {
                    validators: {
                        notEmpty: {
                            message: 'Vui lòng nhập tên bộ sưu tập'
                        }
                    }
                }, photo: {
                    validators: {
                        notEmpty: {
                            message: 'Hình ảnh chưa được chọn'
                        },
                        uri: {
                            message: 'Đã có lỗi hình ảnh'
                        }
                    }
                }
            });
            if(checkValidate){
                if(parseInt(checkValidate.id)==0){
                    let dataSend = {
                        "basketName": checkValidate.name,
                        "description": checkValidate.description,
                        "photo": checkValidate.photo
                    };
                    App.Feature.Post('/api/add-collection',dataSend,function (response) {
                        location.reload();
                    },true);
                } else {
                    let dataSend = {
                        "id": checkValidate.id,
                        "dealId": checkValidate.dealId ? checkValidate.dealId:null,
                        "leadId": checkValidate.leadId ? checkValidate.leadId:null,
                        "social_uid": checkValidate.social_uid,
                        "basketName": checkValidate.name,
                        "description": checkValidate.description,
                        "photo": checkValidate.photo
                    };
                    App.Feature.Post('/api/update-collection',dataSend,function (response) {
                        console.log(response);
                        if(response.result && response.code==200)
                            location.reload();
                        else
                            App.UI.Error(response.message);
                    },true);
                }
            } else{
                console.log("Có lỗi sảy ra");
            }
        });
        
        $('.btn-schedule').click(function(){
            $('#popup-schedule-collection').modal();
        });
        App.UI.inputAllowNumber("#phone-collection");
        App.UI.removeCheckSuccess("#schedule-collection", ['email']);
        $(function () {
            $('#time-collection').datetimepicker({
                format: 'DD/MM/YYYY HH:mm',
                minDate: moment(),
                maxDate: moment()+ (13*86460*1000)
            });
        });
        $.fn.bootstrapValidator.validators.timeLate = {
            validate: function (validator, $field, options) {
                if(!$.trim($field.val())) {
                    var dateTime = moment($field.val(), "DD/MM/YYYY HH:mm").unix();
                    var timeNow = moment().unix();
                    if (timeNow > dateTime) {
                        return false;
                    }
                }
                return true;
            }
        };
        //
        $("#schedule-collection").bootstrapValidator({
            message: "Giá trị chưa đúng", excluded: [":hidden"], feedbackIcons: {
                valid: "glyphicon glyphicon-ok",
                invalid: "glyphicon glyphicon-remove",
                validating: "glyphicon glyphicon-refresh"
            }
            , fields: {
                name: {
                    validators: {
                        notEmpty: {
                            message: "Vui lòng nhập Họ và tên"
                        }
                    }
                },
                phone: {
                    validators: {
                        notEmpty: {
                            message: "Vui lòng nhập số điện thoại"
                        }
                        , stringLength: {
                            message: "Vui lòng nhập số điện thoại hợp lệ", min: 10, max: 10
                        }
                    }
                },
                email: {
                    validators: {
                        emailAddress: {
                            message: "Vui lòng nhập địa chỉ email hợp lệ"
                        }
                    }
                },
                date: {
                    validators: {
                        timeLate : {
                            message: "Vui lòng nhập ngày giờ trong tương lai"
                        }
                    }
                }
            }
        });
        var checkValidForm = function (form) {
            var bootstrapValidator = form.data('bootstrapValidator');
            bootstrapValidator.validate();
            return bootstrapValidator.isValid();
        };
        //
        $('#form-infos-customer').click(function(event){
            event.stopPropagation();
        });
        $('.close-form-infos').click(function(){
            $(this).parent().parent().removeClass('open');
        });
        $('.btn-form-infos').click(function(){
            $(this).parent().parent().parent().removeClass('open');
        });
        //
        $("#btn-schedule-collection").click(function () {
            var curForm = $(this).closest("#schedule-collection");
            if (!checkValidForm(curForm)) {
                return false;
            }
            App.UI.showLoadding();
            //
            var postData = {
                message: "Đặt lịch xem từ trang chi tiết bộ sưu tập",
                links: [],
                rlistingIds: [],
                requestTypeIds: [],
                date : null
            };
            
            if ($("#time-collection").val().trim()) {
                postData.date = moment($("#time-collection").val().trim(), "DD/MM/YYYY HH:mm").unix() * 1000;
            } else {
                postData.date = null;
            }
            //3(Đặt lịch xem)
            postData.requestTypeIds = [3];
            if (App.UI.isMobile()) {
                postData.form_type = 12;
            } else {
                postData.form_type = 11;
            }
            postData.sourceId = 2;
            $(".rlistingId").each(function (idx, element) {
                postData.rlistingIds.push(parseInt($(element).data("id")));
                postData.links.push(location.protocol + "//" + location.host + $(element).data("link"));
            });
            
            if($('#customer-name-collection').length > 0 && $('#customer-name-collection').val() !== ''){
                postData.customerName = $('#customer-name-collection').val().trim();
            }
            if($('#customer-phone-collection').length > 0 && $('#customer-phone-collection').val() !== ''){
                postData.customerPhone = $('#customer-phone-collection').val().trim();
            }
            if($('#customer-email-collection').length > 0 && $('#customer-email-collection').val() !== ''){
                postData.email = $('#customer-email-collection').val().trim();
            }
            let visitedList = TrackUserRoute.getVisitedList();
            if(visitedList){
                postData.visitList = visitedList;
            }
            console.log(postData);
            App.Feature.Post("/api/dat-lich-xem", postData, function (response) {
                App.UI.hideLoadding();
                if(response.code == 410 ) {
                    // là moi gioi can login
                    $('#popup-schedule-collection').modal('hide');
                    App.UI.ShowFormMessage('#popup-login', 'Số điện thoại đã tồn tại trong hệ thống, bạn vui lòng đăng nhập', App.UI.notiTypeError);
                    $("#popup-login").modal("show");
                } else {
                    if (response.result) {
                        TrackUserRoute.clearVisitedList();
                        window.location.href = '/thank-you';
                    } else {
                        App.UI.ShowFormMessage('#popup-schedule-collection', response.message, App.UI.notiTypeError);
                    }
                }
            });
        });
    });
};
