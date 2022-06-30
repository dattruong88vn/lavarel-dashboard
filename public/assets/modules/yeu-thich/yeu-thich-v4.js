
var startApp = function () {

    $('.close-app-diy').click(function () {
        $('#app-diy').hide();
        $('#bl-header-mobile').removeClass('bl-header');
        $('#bl-header-mobile').addClass('bl-header-remove');
    });

    $.fn.bootstrapValidator.validators.timeLate = {
        validate: function (validator, $field, options) {
            if (!$.trim($field.val())) {
                var dateTime = moment($field.val(), "DD/MM/YYYY HH:mm").unix();
                var timeNow = moment().unix();
                if (timeNow > dateTime) {
                    return false;
                }
            }
            return true;
        }
    };

    $('.group-select select.form-control').each(function (key, item) {
        $(item).select2({
            minimumResultsForSearch: Infinity,
            dropdownParent: $(item).parent(),
            language: {
                noResults: function () {
                    return "Không có dữ liệu";
                }
            }
        });
    });

    //search_bar();

    $(".form-love").bootstrapValidator({
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
                    timeLate: {
                        message: "Vui lòng nhập ngày giờ trong tương lai"
                    }
                }
            }
        }
    });
    //

    App.UI.inputAllowNumber("#phone");
    App.UI.removeCheckSuccess(".form-love", ['email']);

    $('.checkSelectAll').click(function () {
        $('.select').prop('checked', $(this).is(':checked'));
    });

    $(".block-schedule .removeScheduleListing").click(function () {
        Cart.removeScheduleListing(parseInt($(this).attr("listingid")));

        $(this).closest(".bl-listings").fadeOut(300, function () {
            endScroll = endScroll - ($(this).height() + 15);
            $(document).trigger('scroll');
            $(this).remove();
            var cart = Cart.getCart();
            $("#scheduledCount").text(cart['scheduled'].length);
            if (cart['scheduled'].length == 0) {
                location.reload();
            }
        });
        return false;
    });

    var removeListing = function (selector, listingid) {
        Cart.removeFavListing(listingid);
        $(selector).parents(".bl-listing-" + listingid).fadeOut(300, function () {
            $(this).remove();
            var cart = Cart.getCart();
            $("#favCount").text(cart['fav'].length);
            if (cart['fav'].length == 0) {
                location.reload();
            }
        });
    };

    $(".removeListing").click(function () {
        event.preventDefault();
        var listingid = parseInt($(this).attr("listingid"));
        removeListing(this, listingid);
        return false;
    });

    //
    var checkValidForm = function (form) {
        var bootstrapValidator = form.data('bootstrapValidator');
        bootstrapValidator.validate();
        return bootstrapValidator.isValid();
    };
    //
    $("#btnSchedule").click(function () {
        if ($(".checkboxListing:checked").size() == 0) {
            App.UI.Error("Vui lòng chọn ít nhất một BĐS để đặt lịch xem");
            return false;
        }
        //
        var curForm = $(this).closest(".form-love");
        if (!checkValidForm(curForm)) {
            return false;
        }
        App.UI.showLoadding();
        //
        var postData = {
            message: "Đặt lịch xem từ trang ưa thích",
            links: [],
            rlistingIds: [],
            requestTypeIds: [],
            date: null
        };

        if ($(".form-datlich").size() > 0) {
            postData.name = $("#name").val();
            postData.phone = $("#phone").val();
            postData.email = $("#email").val();
            App.Feature.setCookie("cinfo", '{"name":"' + postData.name + '","phone":"' + postData.phone + '","email":"' + postData.email + '"}');

        } else {
            var cinfo = App.Feature.getCookie("cinfo");
            if (!cinfo || !App.Feature.checkValidJson(cinfo)) {
                cinfo = '{}';
            }
            cinfo = JSON.parse(cinfo);
            postData.name = cinfo.name;
            postData.phone = cinfo.phone;
            postData.email = cinfo.email;
        }
        //postData.date = moment($("#request-date").val().trim(), "DD/MM/YYYY HH:mm").unix() * 1000;
        if ($("#request-date").val().trim()) {
            postData.date = moment($("#request-date").val().trim(), "DD/MM/YYYY HH:mm").unix() * 1000;
        }
        $(".checkboxListing:checked").each(function (idx, element) {
            postData.rlistingIds.push(parseInt($(element).attr("listingid")));
            postData.links.push(location.protocol + "//" + location.host + $(element).attr("link"));
        });

        if (App.UI.isMobile()) {
            postData.form_type = 6;
        } else {
            postData.form_type = 2;
        }
        let visitedList = TrackUserRoute.getVisitedList();
        if (visitedList) {
            postData.visitList = visitedList;
        }
        console.log(postData);
        App.Feature.Post("/api/dat-lich-xem", postData, function (data) {
            App.UI.hideLoadding();
            if (data.code == 410) {
                // là moi gioi can login
                $("#popup-login").modal("show");
            } else {
                if (data.result) {
                    TrackUserRoute.clearVisitedList();
                    App.Feature.AddIframe("/dat-lich-thanh-cong");
                    var cart = Cart.getCart();
                    for (var i = 0; i < cart.fav.length; i++) {
                        var element = cart.fav[i];
                        var elementToSchedule = Object.assign({}, element); 
    
                        // not found fav[i] in postData listingIds
                        if (postData.rlistingIds.indexOf(parseInt(cart.fav[i]["id"])) != -1) {
                            
                            // check is user select time 
                            if (postData.date == null) {
                                elementToSchedule.scheduleTime = new Date().getTime();
                            } else {
                                elementToSchedule.scheduleTime = postData.date;
                            }
                            
                            if (cart.scheduled.length >= 1) {
                                var isItemScheduled = cart.scheduled.find(item => {
                                    if (item.id === elementToSchedule.id) {
                                        item.scheduleTime = elementToSchedule.scheduleTime;
                                        return true;
                                    }
                                });
                                // 
                                if (!isItemScheduled) {
                                    cart.scheduled.unshift(elementToSchedule);
                                }
                            } else {
                                cart.scheduled.unshift(elementToSchedule);
                            }
                        }
                    }

                    Cart.updateCart(cart);
                    window.location.href = '/thank-you';
                } else {
                    App.UI.Error(data.message);
                }
            }
        });
    });

    if (App.UI.isMobile()) {
        $('.taggle_placeholder').text('');
    }
    
    $(function () {
        $('#request-date').datetimepicker({
            format: 'DD/MM/YYYY HH:mm',
            minDate: moment(),
            maxDate: moment() + (13 * 86460 * 1000),
        });
        $('#request-date').on('dp.change', function (e) {
            $(".form-love").bootstrapValidator('revalidateField', 'date');
        });
    });
    // share social
    $('.btn-share-social').click(function () {
        var arrayIds = [];
        $.each($('.btnlike'), function (key, val) {
            arrayIds.push($(val).attr('listingid'));
        });
        var dataPost = {
            "shareIds": arrayIds.toString(),
            "shareType": 1653
        };
        console.log(dataPost);
        App.Feature.Post("/api/share-social", dataPost, function (response) {
            if (response.result) {
                $('#link-share').val(location.origin + response.data.url);
            }
        });
    });
    //
    $('#share-fb').click(function(){
        var link = $('#link-share').val();
        window.open('http://www.facebook.com/sharer.php?u=' + link, '', 'width=450,height=450');
    });
    $("#share-messenger").click(function () {
        FB.ui(
            {
                method: 'send',
                link: $('#link-share').val()
            }, function (response) {});
    });
    //
    $('.copy-link').click(function () {
        var copyText = document.getElementById("link-share");
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        document.execCommand('copy');
    });
};

jQuery.fn.getSelectionStart = function () {
    if (this.lengh == 0)
        return -1;
    input = this[0];

    var pos = input.value.length;

    if (input.createTextRange) {
        var r = document.selection.createRange().duplicate();
        r.moveEnd('character', input.value.length);
        if (r.text == '')
            pos = input.value.length;
        pos = input.value.lastIndexOf(r.text);
    } else if (typeof (input.selectionStart) != "undefined")
        pos = input.selectionStart;

    return pos;
};

$("#name").keypress(function (e) {
    var arr = ["!", "`", "@", "#", "$", "%", "^", "&", "*", "(", ")", "+", "=", "-", "[", "]", "'", ";", ",", ".", "/", "{", "}", "|", ":", "<", ">", "?", "~", "_"
    ];
    var co = true;

    jQuery.each(arr, function (i, val) {
        if (String.fromCharCode(event.keyCode) == val || event.keyCode == 92 || event.keyCode == 34 || event.keyCode >= 48 && event.keyCode <= 57 && $("#name").getSelectionStart() == 0) {
            co = false;
        }
    });

    return co;
});