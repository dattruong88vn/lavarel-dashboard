var myListingPage = (function() {

    var pageLoadding = false;
    var totalPages = $("#totalPages").val();
    var pageIndex = $("#pageIndex").val();
    var numberItem = $("#numberItem").val();
    var data = {
        page : pageIndex,
        numberItem : numberItem,
        dataPost : {
            listingTypeIds : null
        }
    };
    /**
     * Constructor
     * @constructor
     */
    function myListingPage() {
    }
    myListingPage.prototype.init = function() {
        loadDefaultData();
        bindEvents();
        bindMessages();
    };
    function loadDefaultData() {
        getMyListingsByType(data);
    }
    function bindMessages() {
    }

    function bindEvents() {
        $(".dropdown-menu li").click(function() {
            $('.dropdown-toggle').html($(this).text()+'<span class="caret"></span>');
        });
        // lay tat ca listing
        $('body').off('click','#get-all-listing').on('click','#get-all-listing',function(e) {
            var listingTypeIds = null;
            data.page = pageIndex = $("#pageIndex").val();
            data.dataPost.listingTypeIds = listingTypeIds;
            getMyListingsByType(data);
        });
        // lay danh sach tin dang BÁN
        $('body').off('click','#get-listing-for-sell').on('click','#get-listing-for-sell',function(e) {
            var listingTypeIds = [1];
            data.page = pageIndex = $("#pageIndex").val();
            data.dataPost.listingTypeIds = listingTypeIds;
            getMyListingsByType(data);
        });
        // lay danh sach tin dang THUÊ
        $('body').off('click','#get-listing-for-rent').on('click','#get-listing-for-rent',function(e) {
            var listingTypeIds = [2];
            data.page = pageIndex = $("#pageIndex").val();
            data.dataPost.listingTypeIds = listingTypeIds;
            getMyListingsByType(data);
        });
        // share facebook
        $('body').off('click','.btn-share').on('click','.btn-share',function(e) {
            var url = $(this).data('url');
            var title = $(this).data('title');
            var description = $(this).data('description');
            var image = $(this).data('img');
            openPopupShareFb(url, title, description, image, 580, 325);
        });
        $(document).scroll(function() {
            if (($(window).scrollTop() + $(window).height()) >= $(".bl-footer").offset().top + 100) {
                if (pageIndex < totalPages) {
                    pageIndex++;
                    var isMore = true;
                    data.page = pageIndex;
                    getMyListingsByType(data,isMore);
                }
            }
        });
    }
    function openPopupShareFb(url, title, descr, image, winWidth, winHeight) {
        var winTop = (screen.height / 2) - (winHeight / 2 + 50);
        var winLeft = (screen.width / 2) - (winWidth / 2 + 10);
        window.open('http://www.facebook.com/sharer.php?s=100&p[title]=' + title + '&p[summary]=' + descr + '&p[url]=' + url + '&p[images][0]=' + image, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
    }
    function getMyListingsByType(dataPost, loadMore = false) {
        if (!pageLoadding) {
            $.ajax({
                type: "POST",
                url: '/api/render-my-listings-by-type-mobile',
                data: JSON.stringify(dataPost),
                beforeSend: function () {
                    $('.ajax-loading').show();
                    pageLoadding = true;
                }

            }).success(function (response) {
                if (hasValue(response)) {
                    if (!loadMore) {
                        $(".col-listing").html(response);
                    } else {
                        $(".col-listing").append(response);
                    }
                    formatFirstWord();
                    removeItem();
                }
                pageLoadding = false;
                $('.ajax-loading').hide();
            }).fail(function (jqXHR, ajaxOptions, thrownError) {
                pageIndex--;
                $('.ajax-loading').hide();
            });
        } else {
            pageIndex--;
        }
    }
    
    function removeItem(){
        $(".col-dropdown-listing").each(function(){
            if($(this).find("li").length==0){
                $(this).remove();
            }
        });        
    };
    function formatFirstWord() {
        $(".p-price").html(function(){
            var text= $(this).text().trim().split(" ");
            var first = text.shift();
            return (text.length > 0 ? "<b>"+ first + "</b> " : first) + text.join(" ");
        });
    }
    function hasValue(value) {
        if (typeof value == "undefined") {
            return false;
        }
        if (typeof value == "number") {
            return true;
        }
        if (value == undefined || value == null || value == "") {
            return false;
        }
        if (typeof value == "string" && value.trim() == "") {
            return false;
        }
        if (typeof value == "object" && value.length == 0) {
            return false;
        }
        if (typeof value == "function") {
            return false;
        }
        return true;
    }
    return myListingPage;
})();
$(document).ready(function() {
    (new myListingPage()).init();
});