$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('#_token').val()
    }
});
loadRegions();
function loadRegions(){
    $.ajax({
        "url":"/zone/get-regions",
        "type":"get"
    }).done(function(response){
        var html = "";
        if(response.result){
            for(var i=0;i<response.data.length;i++){
                var item = response.data[i];
                html+="<option value="+item.regionId+">"+item.regionName+"</option>";
            }
        }
        $("#regions").html(html).select2();
    }).always(function(){
        
    });
}
function loadCities(){
    var postData = {
        
    };
    $.ajax({
        "url":"/zone/get-cities-by-regions",
        "type":"post",
        "data": postData
    }).done(function(response){
        
    }).always(function(){
        
    });
}