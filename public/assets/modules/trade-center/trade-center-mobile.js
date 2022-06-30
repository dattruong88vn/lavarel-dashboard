$(document).ready(function(){
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        navText: ['&#x27;next&#x27;', '&#x27;prev&#x27;'],
        dots: true,
        autoplay: true,
        responsive: {
            0: {
                items: 1,
                nav: false
            },
            600: {
                items: 2,
                nav: false
            },
            1000: {
                items: 3,
                nav: false
            }
        }
    });
    
    var locations = '';
    setTimeout(function(){
        App.Feature.Get('/api/get-all-tc', function(response){
            if(response.result){
                locations = response.locations;
            }
            var map = new google.maps.Map(document.getElementById('maps'), {
                zoom: 12,
                center: new google.maps.LatLng(10.787972, 106.636815),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });
            
            var infowindow = new google.maps.InfoWindow();
            var marker, i;
            for (i = 0; i < locations.length; i++) {
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                    map: map,
                    icon: '/assets/images/icons/icon-tc.png'
                });
            }
            google.maps.event.addListener(marker, 'mouseover', (function (marker, i) {
                return function () {
                    infowindow.setContent('<div class="infowindow">'+ locations[i][0] + '<p style="text-align:center;"> '+ locations[i][4] +'</p> </div>');
                    infowindow.open(map, marker);
                };
            })(marker, i));
        });
    },1000);
    //
    $('.more-infos').click(function(){
        var id = $(this).data('id');
        setTimeout(function () {
            $("#carousel-"+id).find('.active').removeClass('left');
        }, 3000);
    });
    //
    stationClick();
    //
    $("#selectedDistrict").change(function () {
        var dataPost = {};
        if($(this).val() !== '')
            dataPost.districtIds = [$(this).val()];
        else
        {
            dataPost.districtIds = null;
            location.reload();
        }
            
        dataPost.numberItem = 10;
        dataPost.page = 1;
        dataPost.isPagination = false;
        console.log(dataPost);
        App.Feature.Post('/api/get-tc-by-district', dataPost, function(response){
            if(response.result){
                $('.tc-by-district').html('');
                var html = '';
                $.each(response.data.list, function(key,val){
                    html+= '<div id="block-deal-'+val.tcId+'" class="block-deal block-deal-'+val.tcId+'">';
                    html+= '<h4><p id="station-'+val.tcId+'" class="station-click" data-id="'+val.tcId+'" data-latitude="'+val.latitude+'" data-longitude="'+val.longitude+'" data-fullname="'+ val.fullName +'" data-address="'+ val.address +'">'+val.fullName+'</p></h4>';
                    if(val.shortDescription !== null){
                        html+= '<p class="p-about">'+val.shortDescription+' <a id="more-'+val.tcId+'" class="more-infos" href="" data-id="'+val.tcId+'" data-toggle="modal" data-target="#myModal-'+val.tcId+'">xem thêm</a></p>';
                    }
                    html+= '<p><b>Địa chỉ:</b> '+val.address+'</p>';
                    html+= '<p><b>Hotline:</b> (028) 73 066 099</p>';
                    html+= '</div>';
                });
                $('.tc-by-district').html(html);
                //
                var actual_link = window.location.href;
                var lastUrl = actual_link.split('/').pop();
                if (lastUrl.match("p[2-9]*")) {
                    var link = location.href.replace('/'+lastUrl, '', window.location.href);
                    window.history.pushState('object', document.title, link);
                }
                stationClick();
            }
        });
    });
});

var stationClick = function(){
    $('.station-click').click(function(){
        var latitude = $(this).data('latitude');
        var longitude = $(this).data('longitude');
        var fullName = $(this).data('fullname');
        var address = $(this).data('address');
        var infowindow = new google.maps.InfoWindow();
        var marker, i;
        
        var map = new google.maps.Map(document.getElementById('maps'), {
            zoom: 15,
            center: new google.maps.LatLng(latitude, longitude),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(latitude, longitude),
            map: map,
            icon: '/assets/images/icons/icon-tc.png'
        });
        google.maps.event.addListener(marker, 'mouseover', (function (marker, i) {
            return function () {
                infowindow.setContent('<div class="infowindow">'+ fullName + '<p style="text-align:center;"> '+ address +'</p> </div>');
                infowindow.open(map, marker);
            };
        })(marker, i));
        $(document).scrollTop(0);
    });
};