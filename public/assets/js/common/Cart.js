var data_ecomerce;
var Cart = {
    updateCartNumber: function () {
        var cart = Cart.getCart();
       
        if (cart.fav.length > 9) {
            $('#footer .item-like i').addClass('icon-like1');
            $(".number-cart").text(9);
        } else {
            $('#footer .item-like i').removeClass('icon-like1');
            $(".number-cart").text(cart.fav.length);
            if (cart.fav.length == 0) {
                // $(".number-cart").hide();
            } else {
                $(".number-cart").show();
            }
        }
    },
    getCart: function () {
        var cart = App.Feature.getCookie("mycart");
        if (!cart || !App.Feature.checkValidJson(cart)) {
            cart = '{"fav":[], "scheduled":[]}';
        }
        cart = JSON.parse(cart);

        return cart;
    },
    getCinfo: function () {
        var cinfo = App.Feature.getCookie("cinfo");
        if (!cinfo || !App.Feature.checkValidJson(cinfo)) {
            cinfo = '{}';
        }
        cinfo = JSON.parse(cinfo);
        return cinfo;
    },
    removeScheduleListing: function (listingid, target) {
        var cart = Cart.getCart();
        index = 0;
        schedules = $.grep(cart.scheduled, function (e, idx) {
            if (parseInt(e.id) === parseInt(listingid)) {
                index = idx;
                return true;
            }

            return false;
        });

        if (schedules.length > 0) {
            cart.scheduled.splice(index, 1);
        }

        Cart.updateCart(cart);
    },
    removeFavListing: function (listingId, target) {
        var cart = Cart.getCart();
        index = 0;
        var fav = $.grep(cart.fav, function (e, idx) {
            if (parseInt(e.id) === parseInt(listingId)) {
                index = idx;
                return true;
            }
            return false;
        });

        if (fav.length > 0) {
            cart.fav.splice(index, 1);
            $(".save-listing-" + listingId).removeClass("active");
            
            if ($(".save-listing-" + listingId).is(".desktop")) {
                $(".save-listing-" + listingId).text("Lưu tin");
            } else {
                // sử dụng span cho css
                $(".page-desktop .save-listing-" + listingId).text().trim() == 'Lưu tin' ?
                $(".page-desktop .save-listing-" + listingId).html('Lưu tin <i class="icon-like"></i>') : '';
            }
            Cart.updateCart(cart);
            return true;
        }else{
            return false;
        }
    },
    updateCart: function (cart) {
        App.Feature.setCookie("mycart", JSON.stringify(cart));
        Cart.updateCartNumber();
    }
};

var infoSave;
var addcart = function (self,collection) {
    var cart = Cart.getCart();

    if(!collection){
        // Show popup require login
        if (cart.fav.length >= 3) {
            $('#btnRequireLogin').click();
            return false;
        } 
    }
    
    var cinfo = Cart.getCinfo();
    listingId = parseInt($(self).attr("listingid"));
    link = $(self).attr("link");
    cart.fav.push(JSON.parse($(self).attr("object")));

    $(".save-listing-" + listingId).addClass("active");
    $('body').addClass('showlike');
    setTimeout(function() { 
        $('body').removeClass('showlike');
    }, 5000);
    
    // sử dụng span cho css
    $(".page-desktop .save-listing-" + listingId).text().trim() == 'Lưu tin' ?
     $(".page-desktop .save-listing-" + listingId).html('Đã lưu <i class="icon-like"></i>') : '';

    Cart.updateCart(cart);
};
$(function () {
    App.UI.inputAllowNumber('#cinfo-phone',false);
    if ($(".save-listing").size() > 0 || $("body").hasClass("yeuthich")) {
        $(document).on('click','.save-listing',function (e) {
            e.preventDefault();
            var listingId = parseInt($(this).attr("listingid"));
            var removeCart = Cart.removeFavListing(listingId,this);
            if(!removeCart) {
                !isLogin ? addcart(this) : Mycollection.addCollection(listingId);
            }
        });

        $("#save-cinfo").click(function () {
            name = $("#cinfo-name").val();
            phone = $("#cinfo-phone").val();
            email = $("#cinfo-email").val();
            if (App.UI.checkValidForm($(this).closest('.form-horizontal'))) {
                var postData = {
                    "name": name,
                    "phone": phone,
                    "email": email,
                    "message": "",
                    "links": [location.protocol + "//" + location.host + $(this).attr("link")],
                    "rlistingIds": [parseInt($(this).attr("listingid"))],
                    "requestTypeIds": [3]
                };
                var pathname = location.pathname;
                if(pathname == '/'){
                    // home
                    if (App.UI.isMobile()) {
                        postData.form_type = 10;
                    } else {
                        postData.form_type = 9;
                    }
                } else {
                    var path = location.pathname.substring(1);
                    if (path === 'mua' || path === 'thue') {
                        // landing : mua/thue
                        if (App.UI.isMobile()) {
                            postData.form_type = 8;
                        } else {
                            postData.form_type = 4;
                        }
                    } else {
                        var lastUrl = path.split('/');
                        var parts = lastUrl[1].split('-');
                        var lastSegment = parts.pop();
                        var stringId = lastSegment.substr(0, 2);
                        if (stringId === 'id') {
                            // detail
                            if (App.UI.isMobile()) {
                                postData.form_type = 7;
                            } else {
                                postData.form_type = 3;
                            }
                        } else {
                            // search
                            if (App.UI.isMobile()) {
                                postData.form_type = 5;
                            } else {
                                postData.form_type = 1;
                            }
                        }
                    }
                }
                
                var ecommerce = $(this).data("tracking-ecommerce");
                App.Feature.Post("/api/dat-lich-xem", postData, function (response) {
                    if(response.code == 410 ) {
                        // là moi gioi can login
                        $("#popup-login").modal("show");
                    } else {
                        if (response.result) {
                            //Tracking Enhanced Ecommerce
                            data_ecomerce = {
                                "ecommerce": {
                                    "purchase": {
                                        "actionField": {
                                            "id": response.data.idCustomer,
                                            "affiliation": "Online Store",
                                            "revenue": response.data.total,
                                            "tax": "0",
                                            "shipping": "0"
                                        },
                                        "products": []
                                    }
                                }
                            };
                            data_ecomerce.ecommerce.purchase.products.push(ecommerce);
                            App.Feature.AddIframe("/yeu-thich-thanh-cong");
                            $("#cinfo-name").val("");
                            $("#cinfo-phone").val("");
                            $("#cinfo-email").val("");
                            App.Feature.setCookie("cinfo", '{"name":"' + name + '","phone":"' + phone + '","email":"' + email + '"}');
                            window.location.href = '/thank-you';
                            //App.UI.Done("Propzy sẽ liên hệ với bạn trong thời gian sớm nhất.");
                        } else {
                            App.UI.ShowFormMessage('#popup-cart-save', "Có lỗi xảy ra trong quá trình ghi nhận. Bạn vui lòng liên hệ với chúng tôi để được tư vấn thêm", App.UI.notiTypeError);
                        }
                    }
                });
            } else {
                //$("#popup-save").modal('hide');
                //App.UI.Error("Bạn cần cung cấp đầy đủ thông tin để Propzy có thể tư vấn tốt nhất cho bạn");
                $('#modal-error').on('hidden.bs.modal', function () {
                    $("#popup-save").modal('show');
                });
                return false;
            }
        });

        $("#saveCusInfoForm").bootstrapValidator({
            message: "Giá trị chưa đúng", excluded: [":hidden"], feedbackIcons: {
                valid: "glyphicon glyphicon-ok", invalid: "glyphicon glyphicon-remove", validating: "glyphicon glyphicon-refresh"
            }
            , fields: {
                name: {
                    validators: {
                        notEmpty: {
                            message: "Vui lòng nhập giá trị"
                        }
                    }
                },
                phone: {
                    validators: {
                        stringLength: {message: "Vui lòng nhập số điện thoại hợp lệ", min: 10, max: 10},
                        notEmpty: {
                            message: "Vui lòng nhập giá trị"
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
            }
        });
        App.UI.removeCheckSuccess("#saveCusInfoForm", ['email']);
    }
});

