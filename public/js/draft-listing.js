var BASE_URL = "";

var root_url_path_img = "http://cdn.propzy.vn/media_test/";
var url_thumb = root_url_path_img+"thumbnail_for_similar/";
var url_large = root_url_path_img+"thumbnail_for_gridview/";
var url_path_img = root_url_path_img+"images/ ";

var url_path_video = "http://cdn.propzy.vn/media_test/video/";
var isBuilding = true;
var moveInDate;
var buildingObject;
var blockObject;
var blocksObject;
var agents;
var building = {
  nameBuilding: "",
  blockBuilding: 0,
  block:[],
  infoManager: "",
  nameManager: "",
  emailManager: "",
  phoneManager: "",
  telephoneManager:""
}

var blockBuiding = {
  blockId: 1,
  nameBlock:  "",
  floorBlock: 0,
  basementBlock: 0,
  yearBuiltBlock: 0, 
  elevatorBlock: 0,
  yearFixBlock: 0,
  motobikeBlock: 0,
  carBlock: 0,
  cleaningFeeBlock: "",
  utilitiesBuildingBlocks:[],
  utilitiesBuildingBlock: "",
  descriptionBlock: "",
}

var listingObjectBuilding = {
   "sizeWidth":0,
   "sizeLength":0,
   "deposit":2,
   "moveInDate":moveInDate,
   "allowChange":true,
   "bathRooms":1.5,
   "bedRooms":2,
   "description":"",
   "floors":2,
   "floorSize":100,
   "lotSize":1000,
   "smallSize":32354.5,
   "price":2344545,
   "currency":"",
   "title":"",
   "yearBuilt":2014,
   "mainPhoto":[],
   "photo":[],
   "mainVideo":[],
   "video":[],
   "linkOfListing":"",
   "source":9,
   "unit":"ABC1080",
   "listing":{
      "listingId":2,
      "title":"",
      "latitude":10.79997,
      "longitude":106.718483,
      "address":"",
      "shortAddress":"",
      "listingType":{
         "listingTypeID":2
      },
      "propertyType":{
         "propertyTypeID":4
      },
      "purpose":{
         "purPoseID":2
      },
      "listingTypeName":"",
      "purposeName":"",
      "propertyTypeName":"",
      "yearBuilt":2013,
      "yearFixed":2014,
      "numberBasement":1,//(=null khi không có dữ liệu)
      "numberElevator":1,//(=null khi không có dữ liệu)
      "numberFloor":1,//(=null khi không có dữ liệu)
      "cityId":1,
      "districtId":14,
      "isMezzanine": false,
      "isRooftop": false,
      "isPenhouse": false
   },
    "city":{
      "cityId":1
   },
   "district":{
      "districtId":14
   },
   "direction":{
      "dId":1
   },

   "amenitiesOtherList":[],
   "amenitiesList":[
      {
         "id":{
            "amenityId":1
         },
         "amenityName":""
      },
      {
         "id":{
            "amenityId":2
         },
         "amenityName":""
      }
   ],
   "relatedListingFees":[
      {
         "id":{
            "feesTypeId":1
         },
         "feesName":"",
         "price":232.3,
         "currency":"USD"
      },
      {
         "id":{
            "feesTypeId":2
         },
         "feesName":"test2",
         "price":232.3,
         "currency":"VND"
      }
   ],
   "relatedListingMetaTags":[
      {
         "metaName":"title",
         "metaContent":"",
         "metaContentEn":""
      },
      {
         "metaName":"description",
         "metaContent":"",
         "metaContentEn":""
      },
      {
         "metaName":"keywords",
         "metaContent":"",
         "metaContentEn":""
      }
   ],
   "commissionList":[
   ],
   "socialCommunications":[
      {
         "id":{
            "socialUid": -1
         },
         "email":"",
         "name":"",
         "address":"",
         "phone":""
      }
   ],
   "noteForAgent": "",
   "socialUser":{
      "socialUid": null
   },
   "account":{
      "accountId": null    
   },
   "draftId":null,
   "commissionFrom": null,
    "commissionTo": null,
    "commissionPrice": null,
    "rlLanguages":[],
}

var listingObjectNotBuilding = {
   "sizeWidth":320,
   "sizeLength":12,
   "deposit":2,
   "moveInDate":moveInDate,
   "allowChange":true,
   "bathRooms":1.5,
   "bedRooms":2,
   "description":"",
   "floors":null,
   "floorSize":null,
   "lotSize":1000,
   "smallSize":32354.5,
   "price":2344545,
   "currency":"vnd",
   "title":"",
   "yearBuilt":2014,
   "mainPhoto":[],
   "photo":[],
   "mainVideo":[],
   "video":[],
   "source":9,
   "unit":"ABC1080",
   "linkOfListing":"",
   "listing":{      
      "title":"",
      "latitude":10.79997,
      "longitude":106.718483,
      "address":"",
      "shortAddress":"",
      "listingType":{
         "listingTypeID":2
      },
      "propertyType":{
         "propertyTypeID":2
      },
      "purpose":{
         "purPoseID":1
      },
      "listingTypeName":"",
      "purposeName":"",
      "propertyTypeName":"",
      "yearBuilt":2013,
      "yearFixed":2014,     
      "cityId":1,
      "districtId":14,
   },
   "direction":{
      "dId":1
   },
    "city":{
      "cityId":1
   },
   "district":{
      "districtId":14
   },
   "amenitiesOtherList":null,
   "amenitiesList":[],
   "relatedListingFees":[],
   "relatedListingMetaTags":[
      {
         "metaName":"title",
         "metaContent":"",
         "metaContentEn":""
      },
      {
         "metaName":"description",
         "metaContent":"",
         "metaContentEn":""
      },
      {
         "metaName":"keywords",
         "metaContent":"",
         "metaContentEn":""
      }
   ],
   "commissionList":[
   ],
   "socialCommunications":[
      {
         "id":{
            "socialUid": -1
         },
         "email":"",
         "name":"",
         "phone":""
      }
   ],
   "noteForAgent": "",
   "socialUser":{
      "socialUid": null
   },
   "account":{
      "accountId": null    
   },
   "draftId":null,
    "commissionFrom": null,
    "commissionTo": null,
    "commissionPrice": null,
    "rlLanguages":[],
}

var socialAgent = {
  "id":{
     "socialUid":""
  },
  "email":"",
  "name":"",
  "phone":"",
  "address":"",
  "agentType":{
     "agentTypeId":1
  }
}
var rlMoveInDate = {
       "moveInNow": false,
       "afterSigningContract" : false ,
       "moveInDate": null,
       "afterNumberDays" : null,   
      };
var propertyTypeId = $('#kind-bds').val();      
 if(propertyTypeId == 1 || propertyTypeId == 4 || propertyTypeId == 10 || propertyTypeId == 8 )
          {
            $("#building").prop("disabled", false);
            $("#block").prop("disabled", false);
             isBuilding = true;
             //get listbing
          }
          else
          {
            $("#building").prop("disabled", true);
            $("#block").prop("disabled", true);
            isBuilding = false;
}
if(propertyTypeId == 7){
  $("#building").prop("disabled", false);
  if($('#building').val() == ""){
      isBuilding = false;      
    }
    else{
      isBuilding = true; 
    }
}
var level = 2;

var purposeId = $('#purpose-business').val();
var districtId = $('#district').val();

var agentList = [];
//console.log(urlAgentList);

$(function () {
    CKEDITOR.replace('description');
    CKEDITOR.replace('description-en');
    CKEDITOR.replace('noteForAgent');
    CKEDITOR.replace('noteForAgent-en');
    var today = new Date();   
    $('#datePicker').datepicker({ 
      format: 'dd-mm-yyyy',
      //startDate: today,
      clearBtn: true,
      todayHighlight: true
    });

    $('#city').change(function(){
      var url = "/get-district/"+$(this).val();
      get_sync(url, true, function(data){
        var html = "";
        $.each(data, function(index, value){
          html += '<option value="'+value.districtId+'">'+value.districtName+'</option>';
        });
        $('#district').html(html).select2();
        //console.log(html);
      });
    });
    //Cộng Trừ Thông tin hoa hồng
    $('.row-hh').each(function(){
      $(this).find('.txt-add').waitUntilExists(function(){
        $(".txt-add").on('click', function() {
          $(this).parent('.add-row').append('<i class="fa fa-minus minus-row"> Trừ</i>');
          $(this).remove();
          var template = $('#hoa-hong-tmpl').html();
          var compiledTemplate = Template7.compile(template);
          $('.wrapper-hoahong').append(compiledTemplate({}));

          $(".select2").select2();
        });
      },false, false);
    });
    $( "#seeonmap" ).on("click", function() {
        var lat= $.trim($('#lat').val());
        var lng= $.trim($('#long').val());
        var link = 'https://www.google.com/maps/?q='+lat+','+lng;
        window.open(link);
        return false;
    }); 

    $('.row-hh').each(function(){
      $(this).find('.minus-row').waitUntilExists(function(){
          $(".minus-row").on('click', function() {
           $(this).parents('.row-hh').remove();
        });
      },false, false);
    });
    $.fn.waitUntilExists = function(handler, shouldRunHandlerOnce, isChild) {
    var found = 'found';
    var $this = $(this.selector);
    var $elements = $this.not(function() {
        return $(this).data(found);
    }).each(handler).data(found, true);

    if (!isChild) {
        (window.waitUntilExists_Intervals = window.waitUntilExists_Intervals || {})[this.selector] =
        window.setInterval(function() {
            $this.waitUntilExists(handler, shouldRunHandlerOnce, true);
        }, 500);
    } else if (shouldRunHandlerOnce && $elements.length) {
        window.clearInterval(window.waitUntilExists_Intervals[this.selector]);
    }
    return $this;
}
   // console.log(url);
$('#type-business').change(function(){
        listingTypeId = $('#type-business').val();        
        get_agent_list();        
          //console.log(data);   
        var url_property_type = "/property_type/list/"+listingTypeId;
        console.log(url_property_type);
        get_sync(url_property_type, true, function(data){
        var html="";
          console.log(data);
        $.each(data, function(index, value){
            html += '<option value="'+value.propertyTypeID+'">'+value.typeName+'</option>';
        });

        $('#kind-bds').html(html);
        $('#kind-bds').find('option[value='+kind_bds+']').attr('selected','selected');
        $('#kind-bds').select2();
        propertyTypeId = $('#kind-bds').val();
           // $('#kind-bds>option:eq('+kind_bds+')').prop('selected', true);z
        if($('#type-business').val() == 2)
            {
              html_get_purpose = '<option value="2">Thương mại</option><option value="1">Để ở</option>';   
              $('#purpose-business').html(html_get_purpose).select2();
              purposeId = $('#purpose-business').val(); 
              get_agent_list();              
              $("input[type=radio]").attr('disabled', true);
             
              get_amenities(); 
              if(propertyTypeId == 1 || propertyTypeId == 4 || propertyTypeId == 10 || propertyTypeId == 8 || propertyTypeId == 7)
              {
                $("#building").prop("disabled", false);
                   //get listing
              }
              else{
                  $("#building").prop("disabled", true);
              }
          
              var template = $('#commission-for-rent-tmpl').html();
              var compiledTemplate = Template7.compile(template);
              $('.wrapper-hoahong').html(compiledTemplate({})); 

              var templateMoveindate = $('#move-in-date-rent').html();
              var compiledTemplateMoveindate = Template7.compile(templateMoveindate);
              $('.wrapper-move-in-date').html(compiledTemplateMoveindate({}));
              $('#datePicker').datepicker({
                    format: 'dd-mm-yyyy'
                }).on('changeDate', function(e) {
                  // Revalidate the date field
                  //$('#eventForm').formValidation('revalidateField', 'eventDate');
                    moveInDate = e.date.getTime();
                });                                        
            }
        if($('#type-business').val() == 1)
            {
              html_get_purpose = '<option value="3">Bán</option>';  
              $('#purpose-business').html(html_get_purpose).select2();    
              purposeId = $('#purpose-business').val(); 
              get_agent_list();

              $("input[type=radio]").attr('disabled', false);
              get_amenities();
              if(propertyTypeId == 1 || propertyTypeId == 4 || propertyTypeId == 10 || propertyTypeId == 8 || propertyTypeId == 7){
                  $("#building").prop("disabled", false);
                   //get listbing
              }
              else{
                  $("#building").prop("disabled", true);
              }
              
              var template = $('#commission-for-sale-tmpl').html();
              var compiledTemplate = Template7.compile(template);
              $('.wrapper-hoahong').html(compiledTemplate({})); 

              var templateMoveindate = $('#move-in-date-sale').html();
              var compiledTemplateMoveindate = Template7.compile(templateMoveindate);
              $('.wrapper-move-in-date').html(compiledTemplateMoveindate({}));
              
              $('input:radio[name="optradio"]').change(function(){
                  var  html ="";
                    if($(this).attr('id') == "afterNumberDays")
                    {
                      for(var i =1; i<=24; i++)
                      {
                        html += '<option value="'+i+'">'+i+' tháng</option>';
                      }
                     
                      $('#afterNumberDaysSelect').html(html).select2();
                    }
                    else 
                    {
                      html="";
                      $('#afterNumberDaysSelect').html(html).select2();
                    }                       
            });

            }     
        console.log(urlAgentList);
        }); 
    });
    function get_amenities(){
      url = "/get-amenities/"+listingTypeId+"/"+propertyTypeId+'/'+level;
      console.log(url);
      get_sync(url, true, function(data){
        var template = $('#tien-ich-tmpl').html();
        var compiledTemplate = Template7.compile(template);
        $('#amenities').html(compiledTemplate(data));
        console.log(data);
      });
    };

    $('input:radio[name="optradio"]').change(function(){
          var  html ="";
            if($(this).attr('id') == "afterNumberDays")
            {
              for(var i =1; i<=24; i++)
              {
                html += '<option value="'+i+'">'+i+' tháng</option>';
              }
             
                    $('#afterNumberDaysSelect').html(html).select2();
            }
            else 
            {
              html="";
              $('#afterNumberDaysSelect').html(html).select2();
            }                       
    });
    $('#kind-bds').change(function(){
          if($(this).val()==7){
            $('#purpose-business').find('option[value=2]').attr('selected','selected');
            $('#purpose-business').select2();
          }
          propertyTypeId = $('#kind-bds').val();
          //console.log(propertyTypeId);
          if(propertyTypeId == 1 || propertyTypeId == 4 || propertyTypeId == 10 || propertyTypeId == 8)
          {
            $("#building").prop("disabled", false);
            $("#block").prop("disabled", false);
             isBuilding = true;
             //get listbing
          }
          else
          {
            $("#building").prop("disabled", true);
            $("#block").prop("disabled", true);
            isBuilding = false;
          }
          if(propertyTypeId == 7){
            $("#building").prop("disabled", false);
            //$("#block").prop("disabled", false);
            if($('#building').val() == ""){
                isBuilding = false;      
              }
              else{
                isBuilding = true; 
                $("#block").prop("disabled", false);
              }
          }
          if(propertyTypeId == 4 || propertyTypeId == 5 || propertyTypeId == 6 || propertyTypeId == 7){
              $('.type-of-price').text('/m²/tháng')
          }else{
            $('.type-of-price').text('/tháng')
          }
          get_amenities();     
    });   


    $('#purpose-business').change(function(){
        propertyTypeId = $('#kind-bds').val();
         if(propertyTypeId == 1 || propertyTypeId == 4 || propertyTypeId == 10 || propertyTypeId == 8)
          {
            $("#building").prop("disabled", false);
            $("#block").prop("disabled", false);
             isBuilding = true;
             //get listbing
          }
          else
          {
            $("#building").prop("disabled", true);
            $("#block").prop("disabled", true);
            isBuilding = false;
          }
          if(propertyTypeId == 7){
            if($('#building').val() == ""){
                isBuilding = false; 
              }
              else{
                isBuilding = true; 
                $("#block").prop("disabled", false);
              }
          }
        purposeId = $(this).val();
        get_agent_list();
        console.log(urlAgentList);
    });

    $('#district').change(function(){
        districtId = $(this).val();
        get_agent_list();
        console.log(urlAgentList);
    });

    /*
      Address with google
    */
    $("#address").geocomplete()
      .bind("geocode:result", function(event, result){
        console.log(result);
        $('#lat').val(result.geometry.location.lat());
        $('#long').val(result.geometry.location.lng());

        listingObjectBuilding.latitude = result.geometry.location.lat();
        listingObjectBuilding.longitude = result.geometry.location.lng();
        listingObjectBuilding.listing.address = result.formatted_address;


        listingObjectNotBuilding.latitude = result.geometry.location.lat();
        listingObjectNotBuilding.longitude = result.geometry.location.lng();
        listingObjectNotBuilding.listing.address = result.formatted_address;                  
    });
    function updateInfoBlock(blockIndex){
    //getBlockDetail($('#block').val()); 

            blockObject = buildingObject.building.blocks[blockIndex];
            $('#yearbuilt').val(buildingObject.building.blocks[blockIndex].yearBuilt);
            $('#yearfixed').val(buildingObject.building.blocks[blockIndex].yearFixed);
            $('#floor-listing').val(buildingObject.building.blocks[blockIndex].numberFloor);
            $('#baseme').val(buildingObject.building.blocks[blockIndex].numberBasement);
            $('#numberElevator').val(buildingObject.building.blocks[blockIndex].numberElevator);
            /*  if(buildingObject.building.blocks[blockIndex].numberBasement){
              $('#baseme option[value='+buildingObject.building.blocks[blockIndex].numberBasement+']').attr('selected','selected').parent().select2();
            }
            else{
              //$("#baseme option:first").attr('selected','selected');
              $('#baseme option[value=""]').attr('selected','selected').parent().select2();
            }

            if(buildingObject.building.blocks[blockIndex].numberBasement){
              $('#numberElevator option[value='+buildingObject.building.blocks[blockIndex].numberElevator+']').attr('selected','selected').parent().select2();
            }
            else{
             // $("#numberElevator option:first").attr('selected','selected');
              $('#numberElevator option[value=""]').attr('selected','selected').parent().select2();
            } */
           
            updatePlaceNumber(buildingObject.building.blocks[blockIndex].numberFloor);
      }

      $('#floor-listing').keyup(function() {
        updatePlaceNumber($(this).val());
      });

    function updatePlaceNumber(number){
          $('#place-number').empty().select2();
          $('#place-number').append('<option value="0">---Vui Lòng Chọn---</option>');
          $('#place-number').append('<option value="-1">Trệt</option>');  
          $('#place-number').append('<option value="-2">Lửng</option>'); 
          $('#place-number').append('<option value="-3">Sân thượng</option>').select2();        
          for (i = 1; i <= number ; i++) { 
              html = '<option value="'+i+'">'+i+'</option>';
              $('#place-number').append(html).select2();
          }
      }
    function getBuidingDetail(buidingId){
        urlBuidingDetail = '/get-buiding-detail/'+buidingId;
        get_sync(urlBuidingDetail, true, function(data){
          buildingObject = data;
          $('#address').val(data.address);
          $('#short-address').val(data.shortAddress);
          $('#lat').val(data.latitude);
          $('#long').val(data.longitude);
          $('#city option[value='+data.cityId+']').attr('selected','selected').parent().select2();

          $('#short-address').val(data.shortAddress);
          var url_get_district = "/get-district/"+data.cityId;
          get_sync(url_get_district, true, function(data){
            var html_get_district = "";
            $.each(data, function(index, value){
              html_get_district += '<option value="'+value.districtId+'">'+value.districtName+'</option>';
            }); 
            $('#district').html(html_get_district); 
            $('#district').find('option[value='+buildingObject.districtId+']').attr('selected','selected');
            $('#district').select2();   

          });
          districtId = data.districtId;
          get_agent_list();
         
          
          if(data.building.blocks.length == 0){
              $('#yearbuilt').val(data.yearBuilt);
              $('#yearfixed').val(data.yearFixed);
              $('#floor-listing').val(data.numberFloor);
              $('#baseme').val(data.numberBasement);
              $('#numberElevator').val(data.numberElevator);
               /*if(data.numberBasement){
                  $('#baseme option[value='+data.numberBasement+']').attr('selected','selected').parent().select2();
                }
                else{
                  //$("#baseme option:first").attr('selected','selected');
                  $('#baseme option[value=""]').attr('selected','selected').parent().select2();
                }
                if(data.numberElevator){ 
                  $('#numberElevator option[value='+data.numberElevator+']').attr('selected','selected').parent().select2();
                }
                else{
                  //$("#numberElevator option:first").attr('selected','selected');
                  $('#numberElevator option[value=""]').attr('selected','selected').parent().select2();
                }*/
              updatePlaceNumber(data.numberFloor);
              }else{
                  updateInfoBlock(0);
              }
        });
    }

    $('#block').change(function(){
      indexBlock = parseInt($(this).find(":selected").attr('data-index'));
      updateInfoBlock(indexBlock);
    });

    $("#ownerAddress").geocomplete();         
    $('#building').change(function(){
      if(propertyTypeId == 7){
            $("#building").prop("disabled", false);
            if($('#building').val() == ""){
                isBuilding = false;      
              }
              else{
                isBuilding = true; 
                $("#block").prop("disabled", false)
              }
      }
      if($(this).val()){
        var url = "/get-block-list/"+$(this).val();
        get_sync(url, true, function(data){
          console.log(data);
          blocksObject = data['data'];
          if(data['result']){
            var html = "";
            $.each(data['data'], function(index, value){
              html += '<option data-index="'+index+'" value="'+value.blockId+'">'+value.blockName+'</option>';
            });
            $('#block').html(html).select2();
          }
          //console.log(html);
        });
        //$('#floor-listing').val();
        getBuidingDetail($(this).val());
      }
    });  
    $('#source').change(function(){
      if($('#source').val() != ""){
      urlUserList = "/get-user/"+$('#source').val();
      var html = "<option value=''>Vui lòng chọn</option>";
      get_sync(urlUserList, true, function(data){
        users = data['data'];
        console.log(users);
        if(data['result']){
             
              $.each(data['data'], function(index, value){
                html += '<option phone="'+value.phone+'" accountid="'+value.accountId+'" value="'+value.socialUid+'">'+value.name+'</option>';
              });                 
              };
          $('#listuser').html(html);
          $('#listuser').find('option[value='+socialUserId+']').attr('selected','selected');
          $('#listuser').select2();         
        });
      }
      else{
         var html = "<option value=''>---Vui lòng chọn---</option>";
         $('#listuser').html(html).select2();
      }

    });
});
  function get_agent_list(){
    urlAgentList = '/get-agent-list/'+listingTypeId+'/'+purposeId+'/'+districtId;
    get_sync(urlAgentList, true, function(data){
      agents = data['data'];
      if(data['result']){
            var html = "<option value=''>Vui lòng chọn</option>";
            $.each(data['data'], function(index, value){

              html += '<option id="socialAgent" address="" phone="'+value.phone+'" socialUid="'+value.socialUid+'" name="'+value.name+'" email="'+value.email+'" value="'+value.agentId+'">'+value.name+'</option>';
            });
            $('#agentList').html(html).select2();
          }
      console.log(agentList);           
    });
  }
  function get_user_list(){
    if($('#source').val() != ""){
      urlUserList = "/get-user/"+$('#source').val();
      var html = "<option value=''>---Vui lòng chọn----</option>";
      get_sync(urlUserList, true, function(data){
        users = data['data'];
        console.log(users);
        if(data['result']){            
              $.each(data['data'], function(index, value){
                html += '<option phone="'+value.phone+'" accountid="'+value.accountId+'" value="'+value.socialUid+'">'+value.name+'</option>';
              });            
            }
        $('#listuser').html(html).select2();
        console.log(listuser  );           
    });
  }
  else{
     var html = "<option value=''>---Vui lòng chọn---</option>";
     $('#listuser').html(html).select2();
    }
  }

 function get_amenities(){
  url = "/get-amenities/"+listingTypeId+"/"+propertyTypeId+'/'+level;
  get_sync(url, true, function(data){
    var template = $('#tien-ich-tmpl').html();
    var compiledTemplate = Template7.compile(template);
    $('#amenities').html(compiledTemplate(data));
    console.log(data);
  });
  }
  function get_property_type(){
        listingTypeId = $('#type-business').val();         
        var url_property_type = "/property_type/list/"+listingTypeId;
    
        get_sync(url_property_type, true, function(data){
        var html="";
          console.log(data);
        $.each(data, function(index, value){
            html += '<option value="'+value.propertyTypeID+'">'+value.typeName+'</option>';
        });
        $('#kind-bds').html(html).select2();
     });
    };
  $('#agentList').change(function(e){
        if($(this).val() == ""){
          $(this).closest('.agent-content').find('input').prop("disabled", true);
        }
        else{
          $(this).closest('.agent-content').find('input').prop("disabled", false);
          $('#agentTel').val($(this).find(":selected").attr('phone'));
          $('#agentEmail').val($(this).find(":selected").attr('email'));
          $('#agentAddress').val($(this).find(":selected").attr('address'));
        }
  });
function prepareListingData(){
      listingObjectBuilding.amenitiesOtherList = [];
      listingObjectNotBuilding.amenitiesOtherList = [];
      listingObjectBuilding.rlLanguages = [];
      listingObjectNotBuilding.rlLanguages = listingObjectBuilding.rlLanguages;
      
      if($('#amenities-other').val() != "" && $('#amenities-other').length > 0 && $('#amenities-other-en').val() == "") {
      var amenitiesplit = $('#amenities-other').val().split(",");
      $.each(amenitiesplit,function(index, value){      
            listingObjectBuilding.amenitiesOtherList.push({
              "amenityName":$.trim(value),
              "amenityNameEn":null,
            });        
        });
        listingObjectNotBuilding.amenitiesOtherList = listingObjectBuilding.amenitiesOtherList;
      }
      if($('#amenities-other-en').val() != "" && $('#amenities-other-en').length > 0 && $('#amenities-other').val() == ""){
      var amenitiesplit = $('#amenities-other-en').val().split(",");
      $.each(amenitiesplit,function(index, value){      
            listingObjectBuilding.amenitiesOtherList.push(
                {
                  "amenityName":null,
                  "amenityNameEn":$.trim(value),
                });        
        });
        listingObjectNotBuilding.amenitiesOtherList = listingObjectBuilding.amenitiesOtherList;
      }
      if($('#amenities-other-en').val() != "" && $('#amenities-other-en').length > 0 && $('#amenities-other').val() != "" && $('#amenities-other').length > 0 ){
      var amenitiesplitEn = [];
      var amenitiesplit = [];
      var amenitiesplitEn = $('#amenities-other-en').val().split(",");
      var amenitiesplit = $('#amenities-other').val().split(",");

      if(amenitiesplit.length > amenitiesplitEn.length){
        $.each(amenitiesplit,function(index, value){     
              listingObjectBuilding.amenitiesOtherList.push({
              "amenityName":$.trim(value),
              "amenityNameEn":$.trim(amenitiesplitEn[index]) != "" ? $.trim(amenitiesplitEn[index]) : null,
            });        
          });
          listingObjectNotBuilding.amenitiesOtherList = listingObjectBuilding.amenitiesOtherList;
      }
      else{
        $.each(amenitiesplitEn,function(index, value){     
              listingObjectBuilding.amenitiesOtherList.push({
              "amenityName":$.trim(amenitiesplit[index]) != "" ? $.trim(amenitiesplit[index]) : null ,
              "amenityNameEn":$.trim(value),
            });        
          });
          listingObjectNotBuilding.amenitiesOtherList = listingObjectBuilding.amenitiesOtherList;  
      }
    }  
    var sizeWidth = $("#width").val() =="" ? null : $("#width").val();
    listingObjectBuilding.sizeWidth = parseInt(sizeWidth);
    listingObjectNotBuilding.sizeWidth = parseInt(sizeWidth);

    var sizeLength = $("#length").val() =="" ? null : $("#length").val() ;
    listingObjectNotBuilding.sizeLength = parseInt(sizeLength);
    listingObjectBuilding.sizeLength = parseInt(sizeLength);

    if($('#type-business').val() == 1 ){
    var deposit = $("#deposit").val() == "" ? null : parseInt($("#deposit").val())*1000000;  

      listingObjectNotBuilding.deposit = deposit;
      listingObjectBuilding.deposit = deposit;
    var price = parseFloat($("#price").val())*1000000;

      listingObjectNotBuilding.price = price;
      listingObjectBuilding.price = price;
    }
    if($('#type-business').val() == 2 ){
    var deposit = $("#deposit").val() == "" ? null : parseInt($("#deposit").val());  

      listingObjectNotBuilding.deposit = deposit;
      listingObjectBuilding.deposit = deposit;
    var price = parseFloat($("#price").val());

      listingObjectNotBuilding.price = price;
      listingObjectBuilding.price = price;
    }
    //if($('#moveInNow').is(':checked')){
      //listingObjectNotBuilding.moveInDate = parseFloat(new Date().getTime() - (20 * 24 * 60 * 60 * 1000));
      //listingObjectBuilding.moveInDate = listingObjectNotBuilding.moveInDate;
   // }
    //else{
     // listingObjectNotBuilding.moveInDate = $('#eventDate').val() == "" ? null : Date.parse($('#eventDate').val());;
     // listingObjectBuilding.moveInDate = listingObjectNotBuilding.moveInDate;
    //}
   
    var bathroom = parseInt($("#bathroom-number").val());
    listingObjectNotBuilding.bathRooms = bathroom;
    listingObjectBuilding.bathRooms = bathroom;

    if($('#kind-bds').val() == "4" || $('#kind-bds').val() == "10"){
        var bedRooms = null;
        listingObjectNotBuilding.bedRooms = bedRooms;
        listingObjectBuilding.bedRooms = bedRooms;
      }
    else{
        var bedRooms = $("#bedroom-number").val() == "" ? null : parseInt($("#bedroom-number").val());
        listingObjectNotBuilding.bedRooms = bedRooms;
        listingObjectBuilding.bedRooms = bedRooms;
    }  
    var rlLanguage = {
      "id":{"language":"en"},
      "description": null,
      "noteForAgent": null,
      "title": null
    }
    if(CKEDITOR.instances["description-en"].getData() == "" && CKEDITOR.instances["noteForAgent-en"].getData() == "" && $('#title-listing-en').val() ==""){
      var descriptionEn = null;
      rlLanguage.description =  descriptionEn

      var noteForAgentEn =  null;
      rlLanguage.noteForAgent =  noteForAgentEn;

      var title =  null;
      rlLanguage.title =  title;

      listingObjectNotBuilding.rlLanguages = null;
      listingObjectBuilding.rlLanguages = null;
    }
    else
    {
      if(CKEDITOR.instances["description-en"].getData() != ""){
        var descriptionEn = CKEDITOR.instances["description-en"].getData();
        rlLanguage.description = descriptionEn;
      }
      if(CKEDITOR.instances["noteForAgent-en"].getData() != ""){
        var noteForAgentEn =  CKEDITOR.instances["noteForAgent-en"].getData();
        rlLanguage.noteForAgent =  noteForAgentEn;            
      }
      if($('#title-listing-en').val() !=""){
        var title =  $('#title-listing-en').val();
        rlLanguage.title =  title;
      }
      listingObjectNotBuilding.rlLanguages.push(rlLanguage); 
      listingObjectBuilding.rlLanguages = listingObjectNotBuilding.rlLanguages;
    }
    var description = CKEDITOR.instances["description"].getData() == ""  ? null : CKEDITOR.instances["description"].getData();
    //listingObjectNotBuilding.description = description;   
    //listingObjectBuilding.description = description;
    listingObjectNotBuilding.description =  description;
    listingObjectBuilding.description = listingObjectNotBuilding.description;

    var floors = parseInt($("#place-number").val());
    listingObjectNotBuilding.floors = floors;
    listingObjectBuilding.floors = floors;

    var floorSize = $("#acreage-lease").val() =="" ? null : parseInt($("#acreage-lease").val());
    listingObjectNotBuilding.floorSize = floorSize;
    listingObjectBuilding.floorSize = floorSize;

    var lotSize = $("#acreage-land").val() == "" ? null : parseInt($("#acreage-land").val());
    listingObjectNotBuilding.lotSize = lotSize;
    listingObjectBuilding.lotSize = lotSize;

    var smallSize = $("#acreage-small").val() == "" ? null : parseFloat($("#acreage-small").val());
    listingObjectNotBuilding.smallSize = smallSize;
    listingObjectBuilding.smallSize = smallSize;


    var currency = $("#currency").select2('data')[0].text;
    listingObjectNotBuilding.currency = currency;
    listingObjectBuilding.currency = currency;

    var yearBuilt = $("#yearbuilt").val() == "" ? null : parseInt($("#yearbuilt").val());
    listingObjectNotBuilding.yearBuilt = yearBuilt;
    listingObjectBuilding.yearBuilt = yearBuilt;

      listingObjectBuilding.photo = [];
      listingObjectBuilding.mainPhoto = [];
    $(".imageListing .file-preview .file-preview-initial").each(function(idx, element){
      var fileName = $(element).find("img").attr('title');
      listingObjectBuilding.photo.push({
        link : $(element).find("img").attr("src"),
        caption: $(element).find(".file-footer-caption input").val()
      });
      
      listingObjectBuilding.mainPhoto.push({
        url_path : url_path_img,
        url_thumb: url_thumb+fileName,
        url_large : url_large+fileName,
        file_id : $(element).find("img").attr("fileid"),
        file_name : fileName,
        caption : $(element).find(".file-footer-caption input").val()
      });
    });
   
    listingObjectBuilding.photo = ((listingObjectBuilding.photo.length == 0) ? null : JSON.stringify(listingObjectBuilding.photo));
    listingObjectNotBuilding.photo = listingObjectBuilding.photo;

    listingObjectBuilding.mainPhoto = ((listingObjectBuilding.mainPhoto.length == 0) ? null : JSON.stringify(listingObjectBuilding.mainPhoto)) ;
    listingObjectNotBuilding.mainPhoto = listingObjectBuilding.mainPhoto;

    listingObjectBuilding.video = [];
    listingObjectBuilding.mainVideo = [];
    $(".videoListing .file-preview .file-preview-initial").each(function(idx, element){
      listingObjectBuilding.video.push($(element).find("video source").attr("src"));

      listingObjectBuilding.mainVideo.push({
        url_path : url_path_video,
        url_video: $(element).find("video source").attr("src"),
        file_id : $(element).find("video source").attr("name"),
        file_name : $(element).find("video source").attr("title"),
        caption : $(element).find(".file-footer-caption input").val()
      });

    });

    listingObjectBuilding.video =((listingObjectBuilding.video.length == 0) ? null : JSON.stringify(listingObjectBuilding.video)) ;
    listingObjectNotBuilding.video = listingObjectBuilding.video;

    listingObjectBuilding.mainVideo = ((listingObjectBuilding.mainVideo.length == 0) ? null : JSON.stringify(listingObjectBuilding.mainVideo)) ;
    listingObjectNotBuilding.mainVideo = listingObjectBuilding.mainVideo;

    var source = $("#source").val() == "" ? null : parseInt($("#source").val());
    listingObjectNotBuilding.source = source;
    listingObjectBuilding.source = source;

    if($("#listuser").val()!= ""){
      
      listingObjectNotBuilding.socialUser.socialUid = parseInt($("#listuser").val());
      listingObjectNotBuilding.account.accountId = parseInt($("#listuser").find(":selected").attr('accountid'));

      listingObjectBuilding.socialUser.socialUid = parseInt($("#listuser").val());
      listingObjectBuilding.account.accountId = parseInt($("#listuser").find(":selected").attr('accountid'));
    }
    else{
      var user = null;
      listingObjectNotBuilding.socialUser = user;
      listingObjectNotBuilding.account = user;

      listingObjectBuilding.socialUser = user;
      listingObjectBuilding.account = user;
    }
    var unit = $("#apartment-number").val() == "" ? null : $("#apartment-number").val();
    listingObjectNotBuilding.unit = unit;
    listingObjectBuilding.unit = unit;

    var listingLatitude = $("#lat").val() == "" ? null : parseFloat($("#lat").val());
    listingObjectNotBuilding.listing.latitude = listingLatitude;
    listingObjectBuilding.listing.latitude = listingLatitude;

    var listingLongitude = $("#long").val() == "" ? null : parseFloat($("#long").val());
    listingObjectNotBuilding.listing.longitude = listingLongitude;
    listingObjectBuilding.listing.longitude = listingLongitude;

    var listingAddress = $("#address").val() == "" ? null : $("#address").val();
    listingObjectNotBuilding.listing.address = listingAddress;
    listingObjectBuilding.listing.address = listingAddress;

    var listingShortAddress = $("#short-address").val() == "" ? null : $("#short-address").val();
    listingObjectNotBuilding.shortAddress = listingShortAddress;
    listingObjectBuilding.shortAddress = listingShortAddress;

   
    listingObjectNotBuilding.listing.listingType.listingTypeID = parseInt($('#type-business').val());
    listingObjectBuilding.listing.listingType.listingTypeID = parseInt($('#type-business').val());

    listingObjectNotBuilding.listing.propertyType.propertyTypeID = parseInt(propertyTypeId);
    listingObjectBuilding.listing.propertyType.propertyTypeID = parseInt(propertyTypeId);

    listingObjectNotBuilding.listing.purpose.purPoseID = parseInt(purposeId);
    listingObjectBuilding.listing.purpose.purPoseID = parseInt(purposeId);

    listingObjectNotBuilding.listing.listingTypeName = $('#type-business').select2('data')[0].text;
    listingObjectBuilding.listing.listingTypeName = $('#type-business').select2('data')[0].text;

    listingObjectNotBuilding.listing.purposeName = $('#purpose-business').select2('data')[0].text;
    listingObjectBuilding.listing.purposeName = $('#purpose-business').select2('data')[0].text;

    listingObjectNotBuilding.listing.propertyTypeName = $('#kind-bds').select2('data')[0].text;
    listingObjectBuilding.listing.propertyTypeName = $('#kind-bds').select2('data')[0].text

    if($("#city").val() == "" ){
      var cityId = null;
      listingObjectNotBuilding.listing.cityId = cityId;
      listingObjectBuilding.listing.cityId = cityId;

      listingObjectNotBuilding.city = cityId;
      listingObjectBuilding.city = cityId;
    }
    else{
      var cityId = parseInt($("#city").val());
      listingObjectNotBuilding.listing.cityId = cityId;
      listingObjectBuilding.listing.cityId = cityId;

      listingObjectNotBuilding.city.cityId = cityId;
      listingObjectBuilding.city.cityId = cityId;
    }
    var textBds = $('#kind-bds option:selected').text().slug(); 
    var districtName = $('#district option:selected').text().slug(); 
    //var propertyTypeId = $('#kind-bds').val();
    if(propertyTypeId == 4){
       buildingName = "#RID#";
      }else{
       buildingName = $('#kind-bds option:selected').text().slug()+"-"+"#RID#";
    }
    listingObjectBuilding.linkOfListing = SITE_VIEW+'/chi-tiet/'+textBds+'/'+districtName+'/'+buildingName;
    listingObjectNotBuilding.linkOfListing = SITE_VIEW+'/chi-tiet/'+textBds+'/'+districtName+'/'+buildingName;
    var direction = $("#direction").val();
    if(direction == 0){
      delete listingObjectNotBuilding.direction ;
      delete listingObjectBuilding.direction ;
    }else{
      listingObjectNotBuilding.direction = { "dId": parseInt(direction) };
      listingObjectBuilding.direction = listingObjectNotBuilding.direction;
    }
    if($("#district").val() == ""){
      var districtId = null;
      listingObjectNotBuilding.listing.districtId = districtId;
      listingObjectBuilding.listing.districtId = districtId;

      listingObjectNotBuilding.district = districtId;
      listingObjectBuilding.district = districtId;
    }
    else{
      var districtId = parseInt($("#district").val());
      listingObjectNotBuilding.listing.districtId = districtId;
      listingObjectBuilding.listing.districtId = districtId;

      listingObjectNotBuilding.district.districtId = districtId;
      listingObjectBuilding.district.districtId = districtId;
    }

    listingObjectNotBuilding.amenitiesList = [];

    $('.amenity-content input[type="checkbox"]:checked').each(function()
    {
        var content = $(this).closest('.utilitie-item-content');
        ObjectAmenities ={
         "id":{
            "amenityId":0
         },
         "amenityName":""
         }

         if($(this).attr('data') == 0){
            ObjectAmenities.id.amenityId = parseInt($(this).val());
            ObjectAmenities.amenityName = $(this).attr('dataText');
            // break;
            listingObjectNotBuilding.amenitiesList.push(ObjectAmenities);  
            listingObjectBuilding.amenitiesList = listingObjectNotBuilding.amenitiesList;
         }
    });                  

    if(listingObjectNotBuilding.amenitiesList.length == 0)
    {
        listingObjectNotBuilding.amenitiesList = null;
        listingObjectBuilding.amenitiesList = listingObjectNotBuilding.amenitiesList
    }
              
    listingObjectNotBuilding.relatedListingFees = [];
    $('.fee-listing').each(function(){
        relatedFee = {
          "id":{
              "feesTypeId":1
           },
          "feesName":"test1",
          "price":232.3,
          "currency":"USD"
        }
        if($(this).find('input[type="checkbox"]').is(':checked'))
        {
          relatedFee.id.feesTypeId = parseInt($(this).find('#fee-checkbox').attr('ftId'));
          relatedFee.feesName = $(this).find('#fee-checkbox').attr('dataname');
          relatedFee.price = null;
          relatedFee.currency=null;  
          relatedFee.includingPrice = true;         
        }
        else
        {
          relatedFee.id.feesTypeId = parseInt($(this).find('#fee-checkbox').attr('ftId'));
          relatedFee.feesName = $(this).find('#fee-checkbox').attr('dataname');
          if($('#type-business').val() == 1 ){
          relatedFee.price = parseInt($(this).find('#fee').val())*1000;}
          if($('#type-business').val() == 2 ){
          relatedFee.price = parseInt($(this).find('#fee').val())}
          relatedFee.currency = $("#currency_fee").select2('data')[0].text;   
          relatedFee.includingPrice = false;    
        }
        console.log(relatedFee);
        listingObjectNotBuilding.relatedListingFees.push(relatedFee);
        listingObjectBuilding.relatedListingFees.push(relatedFee);
        
    });
    
    if($('#type-business').val() == 2 ) {
        if($('#moveInNow').is(':checked')){
          rlMoveInDate.moveInDate =  null ; //parseFloat(new Date().getTime() - (20 * 24 * 60 * 60 * 1000));
          rlMoveInDate.afterSigningContract = false;
          rlMoveInDate.moveInNow = true;
          rlMoveInDate.afterNumberDays= null;
        }
        else{
          rlMoveInDate.moveInDate = $('#eventDate').val() == "" ? null : Date.parse($('#eventDate').val());
          rlMoveInDate.afterSigningContract = false;
          rlMoveInDate.moveInNow = false;
          rlMoveInDate.afterNumberDays= null;
          
        } 
    }
    if($('#type-business').val() == 1 )
    {
         if($('#afterSigningContract').is(':checked'))
         {
          rlMoveInDate.moveInDate = null;
          rlMoveInDate.afterSigningContract = true;
          rlMoveInDate.moveInNow = false;
          rlMoveInDate.afterNumberDays= null;
         }
         if($('#afterNumberDays').is(':checked'))
         {
          rlMoveInDate.moveInDate = null;
          rlMoveInDate.afterSigningContract = false;
          rlMoveInDate.moveInNow = false;
          rlMoveInDate.afterNumberDays= parseInt($('#afterNumberDaysSelect').val());

         }
         if($('#moveInNowSale').is(':checked'))
         {
          rlMoveInDate.moveInDate = null;
          rlMoveInDate.afterSigningContract = false;
          rlMoveInDate.moveInNow = true;
          rlMoveInDate.afterNumberDays= null; 
         }
    }
    listingObjectBuilding.relatedListingFees = listingObjectNotBuilding.relatedListingFees;                
    listingObjectNotBuilding.commissionList = [];

    $('.row-hh').each(function(){
      if($(this).find('.commision-time').val() != "" && $(this).find('.commision').val() != "" && $('#type-business').val() == 2 ){
        commision = {
             "commision":0.5,
             "contractTime":2
          },
        commision.commision = parseFloat($(this).find('.commision').val());
        commision.contractTime = parseInt($(this).find('.commision-time').val());
        listingObjectNotBuilding.commissionList.push(commision);
        listingObjectNotBuilding.commissionFrom = null;
        listingObjectNotBuilding.commissionTo = null;
        listingObjectNotBuilding.commissionPrice = null 
      }
    });
      if($('.row-hh').find('[name="sellCommission"]:checked').val() == 1 && $('#type-business').val() == 1){        
          if($('#sellCommissionValue').val() !="" ){
            listingObjectNotBuilding.commissionFrom = parseFloat($('.row-hh').find('#sellCommissionValue').val()) ;
            listingObjectNotBuilding.commissionTo = parseFloat($('.row-hh').find('#sellCommissionValue').val()) ;
            listingObjectNotBuilding.commissionPrice = null ;
            listingObjectNotBuilding.commissionList = null;

            listingObjectBuilding.commissionFrom = parseFloat($('.row-hh').find('#sellCommissionValue').val()) ;
            listingObjectBuilding.commissionTo = parseFloat($('.row-hh').find('#sellCommissionValue').val()) ;
            listingObjectBuilding.commissionPrice = null ;
            listingObjectBuilding.commissionList = null;
          }
          else
          {
            listingObjectNotBuilding.commissionFrom =null ;
            listingObjectNotBuilding.commissionTo = null ;
            listingObjectNotBuilding.commissionPrice = null ;
            listingObjectNotBuilding.commissionList = null;

            listingObjectBuilding.commissionFrom = null ;
            listingObjectBuilding.commissionTo = null ;
            listingObjectBuilding.commissionPrice = null ;
            listingObjectBuilding.commissionList = null;
          }
      }
       if($('.row-hh').find('[name="sellCommission"]:checked').val() ==2 && $('#type-business').val() == 1){  
          if($('#sellCommissionValueMoney').val() !="" ){    
            listingObjectNotBuilding.commissionFrom = null;
            listingObjectNotBuilding.commissionTo = null;
            listingObjectNotBuilding.commissionPrice = parseFloat($('.row-hh').find('#sellCommissionValueMoney').val())*1000000 ;
            listingObjectNotBuilding.commissionList = null;

            listingObjectBuilding.commissionFrom = null;
            listingObjectBuilding.commissionTo = null;
            listingObjectBuilding.commissionPrice = parseFloat($('.row-hh').find('#sellCommissionValueMoney').val())*1000000 ;
            listingObjectBuilding.commissionList = null;
          }
          else{
            listingObjectNotBuilding.commissionFrom = null;
            listingObjectNotBuilding.commissionTo = null;
            listingObjectNotBuilding.commissionPrice = null;
            listingObjectNotBuilding.commissionList = null;

            listingObjectBuilding.commissionFrom = null;
            listingObjectBuilding.commissionTo = null;
            listingObjectBuilding.commissionPrice = null;
            listingObjectBuilding.commissionList = null;
          }
      }
    if(listingObjectNotBuilding.commissionList == null)
    {
        listingObjectNotBuilding.commissionList = null;
        listingObjectBuilding.commissionList = listingObjectNotBuilding.commissionList
    }
    listingObjectBuilding.commissionList = listingObjectNotBuilding.commissionList;

    if($("#title-content-meta").val() != "" || $("#title-content-meta-en").val() != ""){
    listingObjectNotBuilding.relatedListingMetaTags[0].metaContent = $("#title-content-meta").val() == "" ? null :$("#title-content-meta").val();
    listingObjectNotBuilding.relatedListingMetaTags[0].metaContentEn = $("#title-content-meta-en").val() == "" ? null :$("#title-content-meta-en").val();
    listingObjectNotBuilding.relatedListingMetaTags[0].metaName = $("#title-content-meta").val() == "" ? null : "title";

    }
    if($("#meta-description").val() != "" || $("#meta-description-en").val() != "" ){

      listingObjectNotBuilding.relatedListingMetaTags[1].metaName = $("#meta-description").val() == "" ? null : "description";
      listingObjectNotBuilding.relatedListingMetaTags[1].metaContent = $("#meta-description").val() == "" ? null : $.trim($("#meta-description").val());
      listingObjectNotBuilding.relatedListingMetaTags[1].metaContentEn = $("#meta-description-en").val() == "" ? null : $.trim($("#meta-description-en").val());
    }

    if($("#keyword").val() != "" || $("#keyword-en").val() != ""){
    listingObjectNotBuilding.relatedListingMetaTags[2].metaContent = $("#keyword").val() == "" ? null : $("#keyword").val();
    listingObjectNotBuilding.relatedListingMetaTags[2].metaName = $("#keyword").val() == "" ? null : "keywords";
    listingObjectNotBuilding.relatedListingMetaTags[2].metaContentEn = $("#keyword-en").val() == "" ? null : $("#keyword-en").val();
    }

    listingObjectBuilding.relatedListingMetaTags[0].metaContent =  listingObjectNotBuilding.relatedListingMetaTags[0].metaContent
    listingObjectBuilding.relatedListingMetaTags[0].metaContentEn =  listingObjectNotBuilding.relatedListingMetaTags[0].metaContentEn
    listingObjectBuilding.relatedListingMetaTags[1].metaContent = listingObjectNotBuilding.relatedListingMetaTags[1].metaContent
    listingObjectBuilding.relatedListingMetaTags[1].metaContentEn = listingObjectNotBuilding.relatedListingMetaTags[1].metaContentEn
    listingObjectBuilding.relatedListingMetaTags[2].metaContent = listingObjectNotBuilding.relatedListingMetaTags[2].metaContent
    listingObjectBuilding.relatedListingMetaTags[2].metaContentEn = listingObjectNotBuilding.relatedListingMetaTags[2].metaContentEn

    listingObjectNotBuilding.socialCommunications[0].email = $("#ownerEmail").val() == "" ? null : $("#ownerEmail").val();
    listingObjectNotBuilding.socialCommunications[0].name = $("#namesocialcommunications").val() == "" ? null : $("#namesocialcommunications").val();
    listingObjectNotBuilding.socialCommunications[0].phone = $("#townerTel").val() == "" ? null : $("#townerTel").val();
    listingObjectNotBuilding.socialCommunications[0].address = $("#ownerAddress").val() == "" ? null : $("#ownerAddress").val();  

    listingObjectBuilding.socialCommunications[0].email = listingObjectNotBuilding.socialCommunications[0].email;
    listingObjectBuilding.socialCommunications[0].name =  listingObjectNotBuilding.socialCommunications[0].name;
    listingObjectBuilding.socialCommunications[0].phone = listingObjectNotBuilding.socialCommunications[0].phone;
    listingObjectBuilding.socialCommunications[0].address =  listingObjectNotBuilding.socialCommunications[0].address;


    if($('#allowchange').find('input[type="checkbox"]').is(':checked')){
      listingObjectNotBuilding.allowChange = true;
      listingObjectBuilding.allowChange = true;
    } 
    else { 
      listingObjectNotBuilding.allowChange = false;
      listingObjectBuilding.allowChange = false;
    }  

    if($('#isVat').is(':checked')){
      listingObjectNotBuilding.isVAT = true;
      listingObjectBuilding.isVAT = listingObjectNotBuilding.isVAT;
    } 
    else { 
      listingObjectNotBuilding.isVAT = false;
      listingObjectBuilding.isVAT = listingObjectNotBuilding.isVAT;
    }  


    listingObjectBuilding.socialCommunications.splice(1,1);
    listingObjectNotBuilding.socialCommunications = listingObjectBuilding.socialCommunications;
    if($('#agentList').val() != ""){
      //add
      socialAgent.id.socialUid = $("#agentList").val() == "" ? null : $("#agentList").select2().find(":selected").attr("socialuid");
     
      socialAgent.email = $('#agentEmail').val() == "" ? null : $('#agentEmail').val();    
      socialAgent.name = $("#agentList").val() == "" ? null : $("#agentList").select2('data')[0].text; 
      socialAgent.telephone = $("#agentTel").val() == "" ? null : $("#agentTel").val(); 
      socialAgent.phone = $('#agentPhone').val() == "" ? null : $('#agentPhone').val();
      socialAgent.address = $('#agentAddress').val() == "" ? null : $('#agentAddress').val(); 

      listingObjectBuilding.socialCommunications.push(socialAgent);
      listingObjectNotBuilding.socialCommunications = listingObjectBuilding.socialCommunications
    }

    var noteForAgent = CKEDITOR.instances["noteForAgent"].getData() == ""  ? null : CKEDITOR.instances["noteForAgent"].getData();
    listingObjectBuilding.noteForAgent = noteForAgent; 
    listingObjectNotBuilding.noteForAgent = listingObjectBuilding.noteForAgent;

    if(isBuilding){  
      
      var listingYearBuilt = null;
      listingObjectNotBuilding.listing.yearBuilt = (listingYearBuilt != "") ? listingYearBuilt : null;
      listingObjectBuilding.listing.yearBuilt = listingObjectNotBuilding.listing.yearBuilt;

      var listingYearFixed= null;
      listingObjectNotBuilding.listing.yearFixed = (listingYearFixed != "") ? listingYearFixed : null;
      listingObjectBuilding.listing.yearFixed = listingObjectNotBuilding.listing.yearFixed;

      var numberBasement = null;
      listingObjectNotBuilding.listing.numberBasement = numberBasement;
      listingObjectBuilding.listing.numberBasement = numberBasement;

      var numberElevator = null;
      listingObjectNotBuilding.listing.numberElevator = numberElevator;
      listingObjectBuilding.listing.numberElevator = numberElevator;

      var numberFloor = null;
      listingObjectNotBuilding.listing.numberFloor = numberFloor;
      listingObjectBuilding.listing.numberFloor = numberFloor;
         
      listingObjectBuilding.blockId = ($('#block').val() == "") ? null : parseInt($('#block').val());     
      listingObjectBuilding.listing.listingId = parseInt($('#building').select2().find(":selected").attr("listingId"));
      //delete listingObjectBuilding.listing.city;
      //delete listingObjectBuilding.listing.districtId;
    
      if($("#title-listing").val() != ""){
        var title = $("#title-listing").val();
        listingObjectNotBuilding.title = title;
        listingObjectBuilding.title = title;

        listingObjectBuilding.listing.title = title;
        listingObjectNotBuilding.listing.title = title;
      }
      else{
        var title = $("#building").select2('data')[0].text;
        listingObjectNotBuilding.title = title;
        listingObjectBuilding.title = title;

        listingObjectBuilding.listing.title = title;
        listingObjectNotBuilding.listing.title = title;
      }

    }else{
      delete listingObjectBuilding.listing.listingId;
      delete listingObjectBuilding.blockId;

      var numberFloor = $("#floor-listing").val() == "" ? null : parseInt($("#floor-listing").val());
      listingObjectNotBuilding.listing.numberFloor = numberFloor;
      listingObjectBuilding.listing.numberFloor = numberFloor;

      var listingYearBuilt = $("#yearbuilt").val() == "" ? null : parseInt($("#yearbuilt").val());
      listingObjectNotBuilding.listing.yearBuilt = listingYearBuilt;
      listingObjectBuilding.listing.yearBuilt = listingObjectNotBuilding.listing.yearBuilt;

      var listingYearFixed = $("#yearfixed").val() == "" ? null : parseInt($("#yearfixed").val());
      listingObjectNotBuilding.listing.yearFixed = listingYearFixed;
      listingObjectBuilding.listing.yearFixed = listingObjectNotBuilding.listing.yearFixed;

      var numberBasement = $("#baseme").val() == "" ? null : parseInt($("#baseme").val());
      listingObjectNotBuilding.listing.numberBasement = numberBasement;
      listingObjectBuilding.listing.numberBasement = numberBasement;

      var numberElevator = $("#numberElevator").val() == "" ? null : parseInt($("#numberElevator").val());
      listingObjectNotBuilding.listing.numberElevator = numberElevator;
      listingObjectBuilding.listing.numberElevator = numberElevator;

      if($('input[name="isRooftop"]').is(':checked')){
        listingObjectNotBuilding.listing.isRooftop = true;
        listingObjectBuilding.listing.isRooftop = true;
      }
      if($('input[name="isMezzanine"]').is(':checked')){
        listingObjectNotBuilding.listing.isMezzanine = true;
        listingObjectBuilding.listing.isMezzanine = true;
      }
      if($('input[name="isPenhouse"]').is(':checked')){
        listingObjectNotBuilding.listing.isPenhouse = true;
        listingObjectBuilding.listing.isPenhouse = true;        
      }
       //listingObjectBuilding.title = ""
      var title = $("#title-listing").val();
      listingObjectBuilding.title = title;
      listingObjectNotBuilding.title = title;

      listingObjectBuilding.listing.title = title;
      listingObjectNotBuilding.listing.title = title;

      //listingObjectBuilding.listing.cityId = parseInt($('#city').val());
      //listingObjectBuilding.listing.districtId = parseInt($('#district').val());
    }
    return true;
}