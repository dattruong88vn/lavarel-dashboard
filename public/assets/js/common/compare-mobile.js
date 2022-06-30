var maxCompare = 3;
var popupCompare;
var dev  = false;
var Compare = {
    init:function () {
        this.toogleCompare();
    },
    toogleCompare:function () {
        if(this.hasCompare()){
            if($("#inner-container-compare").css("display")=="none")
                $(".btn-show-compare").show();
            if($("#inner-container-compare").length==0)
                $(".btn-show-compare").show();
        }else{
            $(".btn-show-compare").hide();
        }
    },
    Add:function (self) {
        var compare = Compare.getCompare();
        if (Compare.getCompare().length < maxCompare) {
            var infoAdd = {};
            infoAdd.listingId = parseInt($(self).data("id"));
            infoAdd.title = encodeURIComponent($(self).data("title"));
            infoAdd.image = encodeURIComponent($(self).data("image"));
            var index = Compare.findItem(infoAdd.listingId);
            if (index) {
                App.UI.Error("Đã có tin trong danh sách so sánh.");
            }
            else {
                compare.push(infoAdd);
                $(self).addClass("active");
            }
            Compare.removeItemCompare(infoAdd.listingId);
            Compare.updateCompare(compare);
        }else{
            App.UI.Error("Chỉ được so sánh tối đa " + maxCompare + " BĐS.");
        }
    },
    loadPoupCompare : function(){
        if($("#popup-compare-new").length <= 0){
            loadCommonsModal(function(){
                Compare.loadPoupCompare();
            });
            return false;
        }
        popupCompare = $("#popup-compare-new");
        var compare = Compare.getCompare();
        if (compare.length >= 2) {
            var listId = [];
            $.each(compare, function (key, item) {
                listId.push(item.listingId);
            });
            var data_send = {
                listId : listId
            };
            App.Feature.Post("/api/detail-compare",data_send,function (data) {
                if (data == 'fail' || data == 'false') {
                    App.UI.Error("Đã có lỗi trong quá trình xử lý dữ liệu, bạn vui lòng thao tác lại");
                } else {
                    popupCompare.modal({
                        backdrop: 'static',
                        keyboard: false
                    });
                    popupCompare.on('hidden.bs.modal', function(){
                        $('.modal-backdrop').remove();
                    })
                    popupCompare.find(".modal-body .wrap-compare-poup").first().html(data);
                    if(App.UI.isMobile()){
                        $('#popup-compare-new .owl-carousel').owlCarousel({
                            loop: false,
                            margin: 0,
                            nav: true,
                            navText: ['<', '>'],
                            dots: false,
                            autoplay: false,
                            items: 1,
                        });
                    }
                }
            },true,'html');
        } else {
            this.devLog("Chọn ít nhất " + (maxCompare - 1) + " bất động sản để so sánh");
            App.UI.Error("Chọn ít nhất " + (maxCompare - 1) + " bất động sản để so sánh");
        }
    },
    getCompare: function () {
        var compare = App.Feature.getCookie("mycompare");
        if (!compare || !App.Feature.checkValidJson(compare)) {
            compare = '[]';
        }
        compare = JSON.parse(compare);
        return compare;
    },
    updateCompare: function (compare) {
        App.Feature.setCookie("mycompare", JSON.stringify(compare));
        this.toogleCompare();
        if(!App.UI.isMobile())
            Compare.updateCompareContainer();
        else
           Compare.updateMobileCompareContainer();
    },
    updateCompareContainer: function () {
        var compare = Compare.getCompare();
        $(".btn-compare.item-listing span").text(compare.length);
        if (compare.length <= 3) {
            $("#col-left-compare .wrap-item-compare").html(Compare.renderHtmlItem(compare));
        } else {
            App.UI.Error("Đã có lỗi xảy ra khi cập nhật");
        }
        if (compare.length == 0) {
            $("#inner-container-compare").hide();
        }
    },
    updateMobileCompareContainer: function () {
        var compare = Compare.getCompare();
        $(".btn-compare.item-listing span").text("("+compare.length+")");
        if (compare.length == 0) {
            $(".container-compare").hide();
        } else {
            $("body").addClass("has-compare-in-page");
            $(".container-compare").show();
        }
    },
    renderHtmlItem: function (listCompare) {
        var html = $("<div>");
        for (var i = 0; i < maxCompare; i++) {
            if (typeof listCompare[i] != "undefined") {
                var itemCompare =$('<div class="item-compare item-'+(i + 1)+' text-left">').addClass("col-sm-12 col-border");
                itemCompare.append('<div data-id="'+listCompare[i].listingId+'" class="delete-item-compare text-center">✕</div>');
                itemCompare.append('<div class="col-sm-4 title-image"><img onerror="this.src=\'/assets/images/listing-no-image.png\'" src="'+decodeURIComponent(listCompare[i].image)+'"></div>');
                itemCompare.append('<div class="col-sm-8 title-compare"><b>'+decodeURIComponent(listCompare[i].title)+'</b></div>');
                itemCompare.appendTo(html);
            }
        }
        return html;
    },
    removeItemCompare: function (listingid) {
        var compare = [];
        if (listingid) {
            compare = Compare.getCompare();
            var index = Compare.findItem(listingid);
            if (Number.isInteger(index)) {
                compare.splice(index, 1);
                Compare.updateCompare(compare);
                if (compare.length < 2)
                    $('#popup-compare').modal('hide');
                if (compare.length < 3 && !$("#container-add-listing").hasClass(".show-add-listing")) {
                    $("#container-add-listing").addClass("show-add-listing");
                }
            }
        } else {
            /* Delete all compare */
            Compare.updateCompare(compare);
        }
    },
    findItem: function (listingid) {
        var compare = Compare.getCompare();
        var index = false;
        removeListing = $.each(compare, function (key, item) {
            if (item.listingId === parseInt(listingid)) {
                index = key;
                return false;
            }
        });
        if (Number.isInteger(index))
            return index;
        return false;
    },
    removeActive : function (id) {
        var result = false;
        if ($(".bl-compare").size() > 0) {
            $.each($(".bl-compare"), function (key, item) {
                if ($(item).data("id") == id) {
                    $(item).removeClass("active");
                    result = true;
                }
            });
        }else{
            this.devLog("không tìm thấy item nào, xem lại lại element");
        }
        return result;
    },
    hasCompare : function () {
        return Compare.getCompare().length > 0 ? true : false;
    },
    devLog: function (message) {
            dev ? console.log(message): false;
    }
};
$(function () {
        /* Event for compare */
        if ($(".bl-compare").size() > 0) {
            $(document).on('click', '.bl-compare', function (e) {
                e.preventDefault();
                var  sefl = this;
                if ($(this).hasClass("active")){
                    if (Compare.getCompare().length >= 0) {
                        var idDelete = parseInt($(this).data("id"));
                        if(idDelete) {
                            Compare.removeItemCompare(idDelete);
                            $.each($(".bl-compare"), function (key, item) {
                                if($(item).data("id") == idDelete){
                                    if($(item).parents(".bl-container-compare").first().length!=0){
                                        $(sefl).parents(".col-sm-4").first().remove();
                                    }
                                    $(item).removeClass("active");
                                }

                            });
                        }
                    }
                }else{
                    e.preventDefault();
                    Compare.Add(this);
                }
                return false;
            });
        }
        $(".btn-show-compare, .hide-compare").click(function () {
            if(!App.UI.isMobile()){
                $(".btn-show-compare").toggleClass('active').toggle();
                $("#inner-container-compare").toggle().toggleClass('active');
            }
        });
        $(document).on('click touch', '#go-compare', function () {
            Compare.loadPoupCompare(true);
            return true;
        });
        $(document).on('click', '.delete-item-compare', function () {
            if (Compare.getCompare().length >= 0) {
                var idDelete = $(this).data('id');
                if(idDelete) {
                    Compare.removeItemCompare(idDelete);
                    $(this).parents(".item-compare").first().remove();
                    $.each($(".bl-compare"), function (key, item) {
                        if($(item).data("id") == idDelete){
                            $(item).removeClass("active");
                        }
                    });
                }else {
                    Compare.devLog("Không tìm thấy Id cần xóa");
                }
            }
        });
        $(document).on('click', '.delete-item-compare-content', function () {
            if (Compare.hasCompare()) {
                var idDelete = $(this).data('id');
                if(idDelete) {
                    Compare.removeItemCompare(idDelete);
                    if(App.UI.isMobile()){
                        if($(this).parents(".owl-item").first())
                            $(this).parents(".owl-item").first().remove();
                        else
                            $(this).parents(".col-xs-6").first().remove();
                        if (Compare.getCompare().length >= 2){
                            Compare.loadPoupCompare();
                        }else{
                            popupCompare.modal('hide');
                        }
                    }else{
                        $(this).parents(".col-sm-4").first().remove();
                        if (Compare.getCompare().length < 2)
                            popupCompare.modal('hide');
                    }
                    Compare.removeActive(idDelete);
                }
                if($("input[name='check-compare']:checked").length > 0){
                    $('#container-view-put').show();
                } else {
                    $('#container-view-put').hide();
                }
            }
        });
        $(document).on('click', "#delete-all-compare",function () {
            App.UI.Confirm("Bạn muốn hủy so sánh?", function () {
                if (Compare.hasCompare()) {
                    Compare.removeItemCompare(false);
                    $(this).parents("#col-left-compare").first().html("");
                    window.location.reload();
                }
            });
        });
        $(document).on('click', ".content-no-listing",function () {
            popupCompare.modal("hide");
        });
        App.UI.inputAllowNumber("#phone-put");
        $(document).on('click','.a-schedule', function (e) {
            var id_compare = $(this).data("id_compare");
            // init date time
            $("#request-date-compare").datepicker({
                locale: 'vi',
                format: 'dd/mm/yyyy',
                todayHighlight: true,
                autoclose: true,
                startDate: new Date(),
                endDate: new Date(new Date().getTime() + (13*86460*1000))
            }).on('hide', function(e) {
                e.stopPropagation();
            }).on('focus',function(){
                $(this).trigger('blur');
            });
            //
            if($("#request-time").attr('type') == 'text'){
                $("#request-time").timepicker({
                    minuteStep: 1,
                    showSeconds: false,
                    showMeridian: false,
                    showInputs : false,
                    defaultTime : 'current'
                }).on('focus',function(){
                    $(this).trigger('blur');
                });
            }
            //
            if(id_compare)
                $("input[name='id_compare']").val(id_compare);
            else
                Compare.devLog("Not id compare");
        });
        $(document).on('click', "#send-put",function () {
            var curForm = $("#container-view-put");
            var checkValid = App.UI.checkValidRules(curForm,{
                name: {
                    validators: {
                        notEmpty: {
                            message: "Vui lòng nhập Họ và Tên"
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
                }
            });
            $('#request-date-compare').on('dp.change', function(e){
                $("#container-view-put").bootstrapValidator('revalidateField', 'time');
            });
            if(checkValid) {
                App.UI.showLoadding();
                var postData = {
                    message: "Đặt lịch xem cho so sánh BĐS.",
                    links: [],
                    rlistingIds: [],
                    requestTypeIds: [3]
                };
                var date = $("#request-date-compare").val();
                var time = $("#request-time").val();
                postData.date = null;
                if(date !== '' && time !== ''){
                    postData.date = moment(date + " " + time, "DD/MM/YYYY HH:mm").unix() * 1000;
                } else {
                    postData.date = null;
                }
                
                if($('#compare-employee-id').length > 0 && $('#compare-employee-id').val().trim() !== ''){
                    postData.promoCode = $('#compare-employee-id').val().trim();
                }
                if($('#compare-customer-name').length > 0 && $('#compare-customer-name').val().trim() !== ''){
                    postData.customerName = $('#compare-customer-name').val().trim();
                }
                if($('#compare-customer-phone').length > 0 && $('#compare-customer-phone').val().trim() !== ''){
                    postData.customerPhone = $('#compare-customer-phone').val().trim();
                }
                if($('#compare-customer-email').length > 0 && $('#compare-customer-email').val().trim() !== ''){
                    postData.email = $('#compare-customer-email').val().trim();
                }
                var compare = Compare.getCompare();
                if (compare.length >= 0) {
                    postData.rlistingIds.push(parseInt(checkValid.id_compare));
                    postData.links.push(location.protocol + "//" + location.host + $(".bl-like.save-listing-" + checkValid.id_compare).attr("link"));
                    postData.form_type = 14;
                    if(postData.rlistingIds.length > 0){
                        App.Feature.Post("/api/dat-lich-xem", postData, function (data) {
                            App.UI.hideLoadding();
                            if (data.code == 410) {
                                // là moi gioi can login
                                App.UI.ShowFormMessage('#popup-login', 'Số điện thoại đã tồn tại trong hệ thống, bạn vui lòng đăng nhập', App.UI.notiTypeError);
                                $("#popup-login").modal("show");
                            } else {
                                if (data.result) {
                                    $('#popup-compare').modal('hide');
                                    window.location.href = '/thank-you';
                                    //App.UI.Done("Đặt lịch xem thành công ! Chúng tôi sẽ liên hệ với bạn sớm nhất");
                                }
                                else {
                                    $(".error-put").html(data.message);
                                }
                            }
                        });
                    } else {
                        App.UI.hideLoadding();
                        App.UI.ShowFormMessage('#popup-compare-new', 'Bạn vui lòng chọn ít nhất 1 BĐS để đặt lịch xem', App.UI.notiTypeError);
                    }
                } else {
                    App.UI.hideLoadding();
                    App.UI.Error("Không có BĐS nào được chọn để đặt lịch xem.");
                }
            }
        });
});

