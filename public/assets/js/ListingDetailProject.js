var ListingDetailProject = {

    loadBlockRentProject: {
        forRentDetailProjectContentUrl : "/block-buy-rent-for-detail-project",
        forRentDetailProjectContainer: null,
        platform: 'desktop',
        setPlatform: function(platform){
            this.platform = platform;
            return this;
        },
        loadContent : function(container, dataPost, callbackForBuy){
            this.forRentDetailProjectContainer = container;
            $.ajax({
                url: this.forRentDetailProjectContentUrl + `/${dataPost.projectId}/2`,
                type: "get",
            }).done(function(response){
                try{
                    $(container).html(response);
                }catch(ex){
                }
                
                if(this.platform=="desktop"){
                    ResOwlSlider();
                }
            }.bind(this)).always(function(){
                if ($('#rental .group-item').length) {
                    $('.scroll-bds-rent').fadeIn(300);
                    $('#rental').fadeIn(300);          
                }

                callbackForBuy();

            });
        }
    },

    loadBlockBuyProject: {
        forBuyDetailProjectContentUrl : "/block-buy-rent-for-detail-project",
        forBuyDetailProjectContainer: null,
        platform: 'desktop',
        setPlatform: function(platform){
            this.platform = platform;
            return this;
        },
        loadContent : function(container, dataPost, callbackForNearby){
            this.forBuyDetailProjectContainer = container;
            
            $.ajax({
                url: this.forBuyDetailProjectContentUrl + `/${dataPost.projectId}/1`,
                type: "get"
            }).done(function(response){
                try{
                    $(container).html(response);
                }catch(ex){
                }
                
                if(this.platform=="desktop"){
                    ResOwlSlider();
                }
            }.bind(this)).always(function(){

                if ($('#vendor .group-item').length) {
                    $('.scroll-bds-buy').fadeIn(300);
                    $('#vendor').fadeIn(300);  
                } 

                callbackForNearby();
            });
        }
    },

    loadBlockNearbyProject: {
        forNearbyDetailProjectContentUrl : "/block-nearby-for-detail-project",
        forNearbyDetailProjectContainer: null,
        platform: 'desktop',
        setPlatform: function(platform){
            this.platform = platform;
            return this;
        },
        loadContent : function(container, dataPost){
            this.forNearbyDetailProjectContainer = container;
            
            $.ajax({
                url: this.forNearbyDetailProjectContentUrl,
                type: "post",
                data: JSON.stringify(dataPost)
            }).done(function(response){
                try{
                    $(container).html(response);
                }catch(ex){
                }

                $('#btn-all-nearby').click(function(){
                    window.location.href = window.location.origin + '/du-an/du-an-' + slugProjectName;
                })

                if(this.platform=="desktop"){
                }
            }.bind(this)).always(function(){

                if ($('#nearby .witem').length) {
                    $('#nearby').fadeIn(300);             
                }
            });
        }
    }

};