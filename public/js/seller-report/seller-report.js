$(document).ready(function () {
    setTimeout(function(){
        var map = new google.maps.Map(document.getElementById('maps'), {
            zoom: 13,
            center: new google.maps.LatLng(latListing, longListing),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        var markerSub, i;
        for (i = 0; i < arrayLongLatListings.length; i++) {
            markerSub = new google.maps.Marker({
                position: new google.maps.LatLng(arrayLongLatListings[i].latitude, arrayLongLatListings[i].longitude),
                map: map,
                icon: '/images/seller-report/sub-marker.png'
            });
        }
        var markerMain;
        markerMain = new google.maps.Marker({
            position: new google.maps.LatLng(latListing, longListing),
            map: map,
            icon: '/images/seller-report/main-marker.png'
        });
        // draw canvas
        var wellCircle = new google.maps.Circle({
            strokeColor: '#008BB2',
            fillColor: '#008BB2',
            map: map,
            center: new google.maps.LatLng(listingGeo[0], listingGeo[1]),
            radius: 2400
        });
    },1000);
});