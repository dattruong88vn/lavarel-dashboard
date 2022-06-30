var BuyRentProjectContentLoader = {
    forRentContentUrl : "/content-thue",
    forRentContainer: null,
    forProjectContentUrl : "/content-du-an",
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
    showBuyContent: function(){
        $("#bl-for-buy-content").css(this.shownPosition);
    },
    hideBuyContent: function(){
        $("#bl-for-buy-content").css(this.hiddenPosition);
    },
    showRentContent: function(){
        $(this.forRentContainer).css(this.shownPosition);
    },
    hideRentContent: function(){
        $(this.forRentContainer).css(this.hiddenPosition);
    },
    showProjectContent: function(){
        $(this.forProjectContainer).css(this.shownPosition);
    },
    hideProjectContent: function(){
        $(this.forProjectContainer).css(this.hiddenPosition);
    },
    loadRentContent : function(container){
        this.forRentContainer = container;
        if($(container).find(".for-rent-content").length>0){
            this.hideBuyContent();
            this.hideProjectContent();
            this.showRentContent();
            App.UI.hideLoadding();
            return false;
        }
        App.UI.showLoadding();
        $.ajax({
            url: this.forRentContentUrl
        }).done(function(response){
            App.UI.hideLoadding();
            this.hideBuyContent();
            this.hideProjectContent();
            try{
                $(container).html(response);
            }catch(ex){
            }
            if(this.platform=="desktop"){
                LandingPage.initCarousel();
            }
            this.showRentContent();
        }.bind(this)).always(function(){
            App.UI.hideLoadding();
        });
    },
    loadProjectContent : function(container){
        this.forProjectContainer = container;
        if($(container).find(".for-project-content").length>0){
            this.hideBuyContent();
            this.hideRentContent();
            this.showProjectContent();
            App.UI.hideLoadding();
            return false;
        }
        App.UI.showLoadding();
        $.ajax({
            url: this.forProjectContentUrl
        }).done(function(response){
            App.UI.hideLoadding();
            this.hideBuyContent();
            this.hideRentContent();
            try{
                $(container).html(response);
            }catch(ex){
            }
            if(this.platform=="desktop"){
                LandingPage.initCarousel();
            }
            ResOwlSlider();
            this.showProjectContent();
        }.bind(this)).always(function(){
            App.UI.hideLoadding();
        });
    },
    loadBuyContent: function(){
        this.showBuyContent();
        this.hideRentContent();
        this.hideProjectContent();
    }
};