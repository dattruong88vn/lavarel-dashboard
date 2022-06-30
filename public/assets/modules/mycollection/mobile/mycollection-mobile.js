var startApp = function () {
    $(document).ready(function () {
        var modalAction = $("#popup-create-collection");
        var modalShowList = $("#popup-collection-listing");
        var dataCollection = [];
        $.each($('.folder .media'),function (key,item) {
            dataCollection.push($(item).data('item'));
        });
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
                            App.UI.ShowFormMessage('#popup-create-collection', response.message, App.UI.notiTypeError);
                    },true);
                }
            } else{
                App.UI.ShowFormMessage('#popup-create-collection', 'Có lỗi xảy ra, bạn vui lòng thao tác lại', App.UI.notiTypeError);
            }
        });
        $('.add-collect').click(function(){
            $("#popup-create-collection").modal();
        });
        $(".folder .btn-edit").click(function(){
            console.log("edit collection");
            modalAction.modal("show");
            $('#form-collection').removeData("bootstrapValidator");
            $('.form-collection .help-block').hide();
            modalAction.on('hidden.bs.modal',function () {
                modalAction.find(".h4-title").text("Tạo bộ sưu tập mới");
                modalAction.find("#add-collection").text("Tạo mới");
                modalAction.find("input[name='id']").val(0);
                modalAction.find("input[name='dealId']").val('');
                modalAction.find("input[name='leadId']").val('');
                modalAction.find("input[name='social_uid']").val('');
                modalAction.find("input[name='name']").val('');
                modalAction.find("input[name='description']").val('');
                modalAction.find("input[name='photo']").val('');
                $("#show-photo").removeAttr('src');
                if($(".text-img").hasClass('hidden'))
                    $(".text-img").removeClass('hidden');
            });
            modalAction.find(".h4-title").text("Chỉnh sửa bộ sưu tập");
            modalAction.find("#add-collection").text("Chỉnh sửa");
            var collection = $(this).parents(".media").first().data("item");
            modalAction.find("input[name='id']").val(collection.basketId);
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
        $(".folder .btn-recycle").click(function(){
            var collection = $(this).parents(".media").first().data("item");
            var dataSend = {
                "listId":[collection.basketId]
            };
            App.Feature.Post('/api/delete-collection',dataSend,function (response) {
                console.log(response);
                if(response.result){
                    location.reload();
                }else{
                    App.UI.Error(response.message);
                }
            },true);
        });


        $('.listings .btn-edit').on('click', function (event) {
            event.preventDefault();
            var listing = $(this).attr("listingid");
            Mycollection.addCollection(listing);
        });
        $(".listings .btn-delete-fav").click(function () {
            var listing = $(this).parents('.media').data('item');
            Cart.removeFavListing(parseInt(listing.rlistingId));
            location.reload();
        });


        var removeListing = function(selector, listingid){
            Cart.removeFavListing(listingid);
            $(selector).parents(".bl-listing-"+listingid).fadeOut(300, function () {
                $(document).trigger('scroll');
                $(this).remove();
                var cart = Cart.getCart();
                $(".favCount").text(cart['fav'].length);
                if (cart['fav'].length == 0) {
                    location.reload();
                }
            });
            var data_remove = $(selector).parents('.blocks').first().data('remarketing');
            if(data_remove) {
                dataLayer.push({
                    'event': 'removeFromCart',
                    'ecommerce': {
                        'remove': {
                            'products': [{
                                'name': data_remove.name,
                                'id': data_remove.id,
                                'price': data_remove.price,
                                'category': data_remove.category
                            }]
                        }
                    }
                });
            }        
        };

        
        $(".remove_wishlist").click(function (event) {
            event.preventDefault();
            var listingid = parseInt($(this).attr("listingid"));
            removeListing(this, listingid);
            return false;
        });

    });
};
