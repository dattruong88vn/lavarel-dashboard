var ListingByLocationLoader = {
    loadBuy: {
        forBuyContentUrl : "/content-listing-by-location-buy",
        forBuyContainer: null,
        platform: 'desktop',
        setPlatform: function(platform){
            this.platform = platform;
            return this;
        },
        hiddenPosition: {
            display: 'none'
        },
        shownPosition: {
            display: 'block'
        },
        hideOldContent: function(){
            if(this.platform == "desktop") {
                $("#bl-for-buy-content").css(this.hiddenPosition);
                $('#bds-for-rent-by-location').css(this.hiddenPosition);
                $('#bds-for-project-by-location').css(this.hiddenPosition);
            } else {
                $("#bl-for-buy-content").css(this.hiddenPosition);
                $('#bds-for-rent-by-location').css(this.hiddenPosition);
                $('#bds-for-project-by-location').css(this.hiddenPosition);
            }
        },
        showContent: function(){
            $(this.forBuyContainer).css(this.shownPosition);
        },
        loadContent : function(container, dataPost){
            this.forBuyContainer = container;
            if($(container).find(".for-sale-content").length > 0){
                this.hideOldContent();
                this.showContent();
                App.UI.hideLoadding();
                return false;
            }
            App.UI.showLoadding();
            $.ajax({
                url: this.forBuyContentUrl,
                type: "post",
                data: JSON.stringify(dataPost)
            }).done(function(response){
                App.UI.hideLoadding();
                this.hideOldContent();
                try{
                    $(container).html(response);
                }catch(ex){
                }
                ResOwlSlider();
                this.showContent();
                if(this.platform=="desktop"){
                    ListingByLocationLoader.initCarousel($(container + ' .owl-carousel'));
                }
            }.bind(this)).always(function(){
                App.UI.hideLoadding();
            });
        }
    },
    loadRent: {
        forRentContentUrl : "/content-listing-by-location-rent",
        forRentContainer: null,
        platform: 'desktop',
        setPlatform: function(platform){
            this.platform = platform;
            return this;
        },
        hiddenPosition: {
            display: 'none'
        },
        shownPosition: {
            display: 'block'
        },
        hideOldContent: function(){
            if(this.platform == "desktop") {
                $("#bl-for-rent-content").css(this.hiddenPosition);
                $('#bds-for-buy-by-location').css(this.hiddenPosition);
                $('#bds-for-project-by-location').css(this.hiddenPosition);
            } else {
                $("#bl-for-rent-content").css(this.hiddenPosition);
                $('#bds-for-buy-by-location').css(this.hiddenPosition);
                $('#bds-for-project-by-location').css(this.hiddenPosition);
            }
        },
        showContent: function(){
            $(this.forRentContainer).css(this.shownPosition);
        },
        loadContent : function(container, dataPost){
            this.forRentContainer = container;
            if($(container).find(".for-rent-content").length > 0){
                this.hideOldContent();
                this.showContent();
                App.UI.hideLoadding();
                return false;
            }
            App.UI.showLoadding();
            $.ajax({
                url: this.forRentContentUrl,
                type: "post",
                data: JSON.stringify(dataPost)
            }).done(function(response){
                App.UI.hideLoadding();
                this.hideOldContent();
                try{
                    $(container).html(response);
                }catch(ex){
                }
                ResOwlSlider();
                this.showContent();
                if(this.platform == "desktop"){
                    ListingByLocationLoader.initCarousel($(container + ' .owl-carousel'));
                }
            }.bind(this)).always(function(){
                App.UI.hideLoadding();
            });
        }
    },
    loadProject: {
        forProjectContentUrl : "/content-listing-by-location-project",
        forProjectContainer: null,
        platform: 'desktop',
        setPlatform: function(platform){
            this.platform = platform;
            return this;
        },
        hiddenPosition: {
            display: 'none'
        },
        shownPosition: {
            display: 'block'
        },
        hideOldContent: function(){
            if(this.platform == "desktop") {
                $("#bl-for-project-content").css(this.hiddenPosition);
                $('#bds-for-buy-by-location').css(this.hiddenPosition);
                $('#bds-for-rent-by-location').css(this.hiddenPosition);
            } else {
                $("#bl-for-project-content").css(this.hiddenPosition);
                $('#bds-for-buy-by-location').css(this.hiddenPosition);
                $('#bds-for-rent-by-location').css(this.hiddenPosition);
            }
        },
        showContent: function(){
            $(this.forProjectContainer).css(this.shownPosition);
        },
        loadContent : function(container, dataPost){
            this.forProjectContainer = container;
            if($(container).find(".for-project-content").length > 0){
                this.hideOldContent();
                this.showContent();
                App.UI.hideLoadding();
                return false;
            }
            App.UI.showLoadding();
            $.ajax({
                url: this.forProjectContentUrl,
                type: "post",
                data: JSON.stringify(dataPost)
            }).done(function(response){
                App.UI.hideLoadding();
                this.hideOldContent();
                try{
                    $(container).html(response);
                }catch(ex){
                }
                ResOwlSlider();
                this.showContent();
                if(this.platform == "desktop"){
                    ListingByLocationLoader.initCarousel($(container + ' .owl-carousel'));
                }
            }.bind(this)).always(function(){
                App.UI.hideLoadding();
            });
        }
    },
    loadBlockSamePrice: {
        forSamePriceContentUrl : "/block-same-price",
        forSamePriceContainer: null,
        platform: 'desktop',
        setPlatform: function(platform){
            this.platform = platform;
            return this;
        },
        hiddenPosition: {
            display: 'none'
        },
        shownPosition: {
            display: 'block'
        },
        hideOldContent: function(){
            if(this.platform == "desktop") {
                $("#bl-same-price").css(this.hiddenPosition);
            } else {
                $("#bl-same-price").css(this.hiddenPosition);
            }
        },
        showContent: function(){
            $(this.forSamePriceContentUrl).css(this.shownPosition);
        },
        loadContent : function(container, dataPost,callback){
            this.forSamePriceContainer = container;
            $.ajax({
                url: this.forSamePriceContentUrl,
                type: "post",
                data: JSON.stringify(dataPost)
            }).done(function(response){
                try{
                    $(container).html(response);
                }catch(ex){
                }
                
                if(this.platform=="desktop"){
                    ResOwlSlider();
                }
            }.bind(this)).always(function(){

                if ($('#bl-same-price .item').length) {
                    $('#bl-same-price').fadeIn(300);  
                }

                callback();
                
                // next link
                var firstItem = $('#bl-same-price .wcontent .img').first();
                var pathNameNextLink = $(firstItem[0]).attr('href');

                $('#next-listing').on('click', function(){
                    if (pathNameNextLink) {
                        window.location.href = window.location.origin + pathNameNextLink;
                    } else {
                        $(this).attr('href', 'javascript:void(0)');
                    }
                });

                $('#btn-all-same-price').on('click', function(){
                    window.location.href = linkViewAllSamePrice;
                });

            });
        }
    },
    loadBlockSameProject: {
        forSameProjectContentUrl : "/block-same-project",
        forSameProjectContainer: null,
        platform: 'desktop',
        setPlatform: function(platform){
            this.platform = platform;
            return this;
        },
        loadContent : function(container, dataPost){
            this.forSameProjectContainer = container;
            
            $.ajax({
                url: this.forSameProjectContentUrl,
                type: "post",
                data: JSON.stringify(dataPost)
            }).done(function(response){
                try{
                    $(container).html(response);
                }catch(ex){
                }
                if(this.platform=="desktop"){
                    ResOwlSlider();
                }
            }.bind(this)).always(function(){

                if ($('#bl-same-project .item').length) {
                    $('#bl-same-project').fadeIn(300);  
                }

                // btn view all project
                if (isProject) {
                    $('#btn-all-same-project').on('click', function(){
                        window.location.href = window.location.origin + urlDetailProject;
                    });
                }
                
            });
        }
    }
};