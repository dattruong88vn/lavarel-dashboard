var modalCollection ;
var modalAddCollection ;
var hasSave = false;
var Mycollection = {
    addItemToCollection:function(idCollection,listingId) {
            var dataSend = {'rlistingIds': [listingId]};
            App.Feature.Post('/api/add-listing-to-collection/'+idCollection,dataSend,function (repsonse) {
                if(repsonse.result && repsonse.code==200){
                    hasSave = true;
                    modalCollection.modal('hide');
                    App.UI.Done(messages.home_thembdsvaobst_addthanhcong,function () {
                        if(true || $('body').hasClass("mycollection") || $('body').hasClass("mycollectiondetail")){
                            location.reload();
                        }
                    });
                } else{
                    App.UI.ShowFormMessage('#popup-select-collection', messages.home_thembdsvaobst_addvaobstdatontai, App.UI.notiTypeError);
                }
            },true);
    },
    addCollection : function (listingId) {
        hasSave = false;
        Mycollection.showModal(listingId);
        modalCollection.find(".item").unbind( "click" ).click(function () {
            /* Reset count */
            modalCollection.find(".item").map(function (key,item) {
                let count = $(item).find('.count').data('count');
                $(item).find('.count').text(parseInt(count));
            });

            $(this).find("input").prop('checked',true);
            var count = parseInt($(this).find('.count').text().trim());
            $(this).find('.count').text(count+1);
        });
        modalCollection.find(".finish-collection").unbind( "click" ).click(function () {
            var check = modalCollection.find(".item").find('input:checked');
            if(check.length!=0){
                Mycollection.addItemToCollection(check.data("id"),listingId);
            }else{
                modalCollection.modal('hide');
            }
        });
        modalAddCollection.find(".add-to-collection").unbind( "click" ).click(function () {
            var valName = $('input[name="short-name-collection"]').val().trim();
            if(valName.length!=0){
                let dataSend = {
                    "basketName": valName,
                    "description": null,
                    "photo": null
                };
                App.Feature.Post('/api/add-collection',dataSend,function (response) {
                    if(response.result){
                        var insertNode = $("<div>").data('item',response.data.id).addClass('item');
                        insertNode.append('<img onerror="this.src=\'/assets/images/collection-no-img.jpg\'" class="img-responsive" src="">');
                        insertNode.append('<span class="name-basket">'+response.data.basketName+'</span>');
                        insertNode.append('(<b class="count" data-count="0">1</b>)');
                        insertNode.append('<div class="bl-inline pull-right bl-radio"><input type="radio" name="collection" class="pull-right collection" data-id="'+response.data.id+'" checked ><label for="listingType'+response.data.id+'"></label></div>');
                        insertNode.click(function () {
                            /* Reset count */
                            modalCollection.find(".item").map(function (key,item) {
                                let count = $(item).find('.count').data('count');
                                $(item).find('.count').text(parseInt(count));
                            });

                            $(this).find("input").prop('checked',true);
                            var count = parseInt($(this).find('.count').text().trim());
                            $(this).find('.count').text(count+1);
                        });
                        $("#popup-select-collection .bl-folder").prepend(insertNode);
                        $('input[name="short-name-collection"]').val("");                        
                        modalAddCollection.modal("hide");
                        modalCollection.modal();
                    }else{
                        App.UI.Error(messages.home_thembdsvaobst_addvaobstdatontai);
                    }
                },true);
            }else{
                App.UI.ShowFormMessage('#popup-add-collection', messages.home_thembdsvaobst_taobst_name_empty, App.UI.notiTypeError);
            }
        });
    },
    showModal: function (listingId) {
        modalCollection.modal("show").css({'zIndex':parseInt($(".modal.in").css("z-index")) ? parseInt($(".modal.in").css("z-index")) +1:1050});
        modalCollection.find(".item").map(function (key,item) {
            let count = $(item).find('.count').data('count');
            $(item).find('.count').text(parseInt(count));
            $(item).find("input").prop('checked',false);
        });
        $("input[name='value-add']").val(listingId);

        modalCollection.on("hidden.bs.modal",function () {
            if($(".save-listing-" + listingId).length > 0 && !hasSave){
                Cart.removeFavListing(listingId,$(".save-listing-" + listingId).get(0));
                $(".save-listing-" + listingId).addClass("active");
                addcart($(".save-listing-" + listingId).get(0), true);
                modalCollection.off('hidden.bs.modal');
            }
            $("input[name='value-add']").val("");
        });
        modalCollection.find(".btn-show-add-form").unbind("click").on("click", function(event){
            event.preventDefault();
            modalCollection.modal("hide");
            modalAddCollection.modal();
        });
    },
    init: function(){
        modalCollection = $("#popup-select-collection");
        modalAddCollection = $("#popup-add-collection");
    }
};