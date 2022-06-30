/* Data layer ladding page */
'use strict'
function AppLayer() {
    this.init();
}

AppLayer.prototype = {
    init: function() {
        var that = this;
        that.initGTMDataLayer();
    },
    initGTMDataLayer:function () {
        /* Swicht page */
        if($("body").hasClass('landing')){
            this.dataLayerLadding();
        }
        if($("body").hasClass('search')){
            this.dataLayerSearch();
        }
        if($("body").hasClass('detail')){
            this.dataLayerdetail();
        }
        if($("body").hasClass('yeuthich')){
            this.dataLayerfav();
        }
    },
    dataLayerLadding: function () {
        if($("body").hasClass('page-ipad') || $("body").hasClass('page-mobile')){
            /* Data layer */
            var object = $('.bl-land-monopoly');
            var list_slide = object.find(".block-listing.listing-scrollable-block .owl-item").not( ".cloned" );
            if(list_slide.length>0) {
                var data_impressions = [];
                var count =1;
                $.each(list_slide, function (keys,items) {
                    $.each($(items).find('.bl-like.save-listing'),function (key,item) {
                        var item_data = $(item).data('ecommerce');
                        item_data.position = count;
                        item_data.list = object.find('.title-box').text();
                        data_impressions.push(item_data);
                        count ++;
                    });
                });
                if(data_impressions) {
                    dataLayer.push({
                        'ecommerce': {
                            'impressions': data_impressions
                        }
                    });
                }
            }
        }else {
            var object = $('.bl-land-monopoly');
            var list_slide = object.find(".block-listing.listing-scrollable-block .slide").not(".bx-clone");
            if (list_slide.length > 0) {
                var data_impressions = [];
                var count = 1;
                $.each(list_slide, function (keys, items) {
                    $.each($(items).find('.bl-like.save-listing'), function (key, item) {
                        var item_data = $(item).data('ecommerce');
                        item_data.position = count;
                        item_data.list = object.find('.block-title-h2').text();
                        data_impressions.push(item_data);
                        count++;
                    });
                });
                if (data_impressions) {
                    dataLayer.push({
                        'ecommerce': {
                            'impressions': data_impressions
                        }
                    });
                }
            }
        }
    },
    dataLayerSearch: function () {
        if($("body").hasClass('page-ipad') || $("body").hasClass('page-mobile')){
            /* Data layer */
            var object = $('.search-results');
            var list_slide = object.find(".bl-like.save-listing");
            if(list_slide.length>0) {
                var data_impressions = [];
                $.each(list_slide,function (key,item) {
                    var item_data = $(item).data('ecommerce');
                    item_data.position = key + 1;
                    item_data.list = 'Search result';
                    data_impressions.push(item_data);
                });
                if(data_impressions) {
                    dataLayer.push({
                        'ecommerce': {
                            'impressions': data_impressions
                        }
                    });
                }
            }
        }else{
            /* Data layer */
            var object = $('.bl-result-search .block-listing');
            var list_slide = object.find(".bl-like.save-listing");
            if(list_slide.length>0) {
                var data_impressions = [];
                $.each(list_slide,function (key,item) {
                    var item_data = $(item).data('ecommerce');
                    item_data.position = key + 1;
                    item_data.list = 'Search result';
                    data_impressions.push(item_data);
                });
                if(data_impressions) {
                    dataLayer.push({
                        'ecommerce': {
                            'impressions': data_impressions
                        }
                    });
                }
            }
        }

    },
    dataLayerdetail: function () {
        /* Data layer */
        if($("body").hasClass('page-ipad') || $("body").hasClass('page-mobile')){
            /* Data layer */
            var object = $('.bl-post-1,.bl-post-2');
            var list_slide = object.find(".block-listing.listing-scrollable-block .owl-item").not( ".cloned" );
            if(list_slide.length>0) {
                var data_impressions = [];
                var count =1;
                $.each(list_slide, function (keys,items) {
                    $.each($(items).find('.bl-like.save-listing'),function (key,item) {
                        var item_data = $(item).data('ecommerce');
                        item_data.position = count;
                        item_data.list = object.find('.block-title-h2').text();
                        data_impressions.push(item_data);
                        count ++;
                    });
                });
                if(data_impressions) {
                    dataLayer.push({
                        'ecommerce': {
                            'impressions': data_impressions
                        }
                    });
                }
            }
        }else{
            var object = $('.bl-posts, .bl-post-1');
            var list_slide = object.find(".block-listing.listing-scrollable-block .slide").not( ".bx-clone" );
            if(list_slide.length>0) {
                var data_impressions = [];
                var count =1;
                $.each(list_slide, function (keys,items) {
                    $.each($(items).find('.bl-like.save-listing'),function (key,item) {
                        var item_data = $(item).data('ecommerce');
                        item_data.position = count;
                        item_data.list = object.find('.block-title-h2').text();
                        data_impressions.push(item_data);
                        count ++;
                    });
                });
                if(data_impressions) {
                    dataLayer.push({
                        'ecommerce': {
                            'impressions': data_impressions
                        }
                    });
                }
            }
        }

    },
    dataLayerfav: function () {
        /* Data layer */
        var list_cart = $(".blocks-like .bl-cart .blocks");
        var data = [];
        $.each(list_cart, function (key, item) {
            var data_push = $(item).data('remarketing');
            data_push.position = key + 1;
            data.push(data_push)
        });
        if (data){
            dataLayer.push({
                "event": "checkout",
                "ecommerce": {
                    "checkout": {
                        "actionField": {
                            "step": 1
                        },
                        "products": data
                    },
                }
            });
        }
    }
}



