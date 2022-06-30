
var startApp = function(){  
    try{
        $('.group-select select.form-control').each(function (key,item) {
            $(item).select2({
                minimumResultsForSearch: Infinity,
                dropdownParent: $(item).parent(),
                language: {
                    noResults: function(){
                        return "Không có dữ liệu";
                    }
                }
            });
        });
    }catch(ex){

    }
    LandingPage.initCarousel();
    //search_bar();

};