var startApp = function () {
    var dataPostListing = {
        projectId : dataProjectInfo.projectId
    };
    // request get listing similar
    setTimeout( function() {
        ListingDetailProject.loadBlockRentProject.setPlatform('desktop')
        .loadContent('#rental', dataPostListing, function(){
            ListingDetailProject.loadBlockBuyProject.setPlatform('desktop').loadContent('#vendor', dataPostListing, function(){
                ListingDetailProject.loadBlockNearbyProject.setPlatform('desktop').loadContent('#nearby', dataPostListing);
            });
        });
    }, 2000);
    
    var url = window.location.href;
    $("#fb-like").click(function () {
        FB.ui({
            method: 'like',
            action_type: 'og.likes',
            action_properties: JSON.stringify({
                object: url
            })
        }, function (response) {
            
        });
    });
    $("#fb-message").click(function () {
        FB.ui(
            {
                method: 'send',
                link: url
            }, function (response) {});
    });
};

// bind like listing
var bindCartAjax  = function (element) {

    var listingId = parseInt($(element).attr("listingid"));
    var removeCart = Cart.removeFavListing(listingId,element);
    if(!removeCart) {
        !isLogin ? addcart(element) : Mycollection.addCollection(listingId);
    }
    return element;
};
$(".btnGallery").click(function (e) {
    e.preventDefault();
    $("#gallery .tab-content").css("display", "block");
});

function downloadDocuments(element) {
    var link = $(element).attr("data-link-download");

    fetch(link)
    .then(res => res.blob())
    .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        // the filename you want
        var nameFile = link.substring(link.lastIndexOf("/") + 1, link.length);

        a.download = nameFile;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    })
    .catch(() => App.UI.Error("Đã có lỗi xảy ra"));
   
}

// slide
$('.bl-zoom').click(function (e) {
	$.fancybox.open(propertyImages, {}, $('.syn-slider-2 .owl-item').index($('.syn-slider-2 .owl-item.current')));
});

$('.syn-slider-1 .item').click(function (e) {
	$.fancybox.open(propertyImages, {}, $('.syn-slider-2 .owl-item').index($('.syn-slider-2 .owl-item.current')));
});