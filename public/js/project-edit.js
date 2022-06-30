var BASE_URL = "";

var root_url_path_img = "http://cdn.propzy.vn/media_test/";
var url_thumb = root_url_path_img+"thumbnail_for_similar/";
var url_large = root_url_path_img+"thumbnail_for_gridview/";
var url_path_img = root_url_path_img+"images/ ";
var objectProject = {
  "address":"Binh duong",
  "latitude":10.794406,
  "longitude":106.680099,
  "projectName":"Dự án F",
  "projectDescription":"Mô tả",
  "projectDescriptionEn":"Description",
  "photo":[],
  "developerId":1,
  "pId":null,
  "amenitiesList":[],
  "inProgressList":[],
  "brokerageFirmsList":[],
  "allowOtherAgent":true
}

$(function () {
  function get_class_input(){
    $(".file-image-progress").fileinput({
            deleteUrl:"/imageProjectRemover",
            allowedFileExtensions : ['jpg', 'png','gif'],
            overwriteInitial: false,
            allowedFileTypes: ['image'],
            slugCallback: function(filename) {
                return filename.replace('(', '_').replace(']', '_');
            }
        });
    var today = new Date();   
    $('datePicker').datepicker({ 
      format: 'dd-mm-yyyy',
      //startDate: today,
      clearBtn: true,
      todayHighlight: true
    });
    $('.datePicker').datepicker({
                    format: 'dd-mm-yyyy'
                }).on('changeDate', function(e) {
                  // Revalidate the date field
                  //$('#eventForm').formValidation('revalidateField', 'eventDate');
                   
    });   
  }
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
  count_tab = count_tab > 0 ? count_tab : 1;
  var tabID = count_tab;
  var noEventDate = count_tab-1;
  var today = new Date();   
    $('#datePicker').datepicker({ 
      format: 'dd-mm-yyyy',
      //startDate: today,
      clearBtn: true,
      todayHighlight: true
    });

  var context = {
    tab_ID:tabID,
    noEventDate: tabID,

  };
  $('#btn-add-tab').click(function () {
            tabID++;
            noEventDate++;
            context.tab_ID = tabID;
            context.noEventDate= noEventDate;
            var template = $('#progressing-tmpl').html();
            var compiledTemplate = Template7.compile(template);
            var html = compiledTemplate(context);
            $('#tab-list li').eq(-1).before($('<li><a href="#tab' + tabID + '" role="tab" data-toggle="tab">Tab ' + tabID + '&nbsp&nbsp<button class="close" type="button" title="Remove this page">×</button></a></li>'));
            $('#tab-content').append($('<div class="tab-pane fade" id="tab' + tabID + '">'+ html +'</div>'));
            
            setTimeout(function(){ 
                 $('#tab-list a[href="#tab' + tabID + '"]').tab('show');
            }, 200);  
            //building.block.push(blockBuiding)   
            get_class_input();         
        });
  $('.radio_check').waitUntilExists(function(){
      $('.radio_check').click(function(){               
          $('.radio_check').prop('checked', false);
          $(this).prop('checked', true);
      });
    });
  $('#tab-list').on('click','.close',function(){
      var tabID = $(this).parents('a').attr('href');
      $(this).parents('li').remove();
      $(tabID).remove();

      //display first tab
      var tabFirst = $('#tab-list a:first');
      tabFirst.tab('show');
  });  
  $("#tab-content").on();
  
  if(!$('#tab1').html()) {
    $('#tab1').append(html);    
  }
  $("#finish-reviewing").click(function(){
    objectProject.address = $('#address').val() != "" ? $('#address').val() : null;
    objectProject.latitude = $('#lat').val() != "" ? parseFloat($('#lat').val()) : null ;
    objectProject.longitude = $('#long').val() != "" ? parseFloat($('#long').val()): null;
    objectProject.projectName = $('#name').val() != "" ? $('#name').val() : null;
    objectProject.projectDescription = CKEDITOR.instances["description"].getData() != "" ? CKEDITOR.instances["description"].getData() : null;
    objectProject.projectDescriptionEn = CKEDITOR.instances["description-en"].getData() != "" ? CKEDITOR.instances["description-en"].getData() : null;
    objectProject.developerId = $('#developer').val() != "" ? parseInt($('#developer').val()) : null;
    objectProject.photo = [];

    $(".imageListing .file-preview .file-preview-initial").each(function(idx, element){
      var fileName = $(element).find("img").attr('title');
      objectProject.photo.push({
        link : $(element).find("img").attr("src"),
        caption: $(element).find(".file-footer-caption input").val()
      });
      
      // objectProject.photo.push({
      //   url_path : url_path_img,
      //   url_thumb: url_thumb+fileName,
      //   url_large : url_large+fileName,
      //   file_id : $(element).find("img").attr("fileid"),
      //   file_name : fileName,
      //   caption : $(element).find(".file-footer-caption input").val()
      // });
    });
    objectProject.photo = (($('.imageListing .file-preview-frame').length == 0) ? null : JSON.stringify(objectProject.photo));
    objectProject.amenitiesList = [];
    $('.amenity-content input[type="checkbox"]:checked').each(function()
    {
        ObjectAmenities = {
          "id": {
                "amenityId":985
           }
        }      
            ObjectAmenities.id.amenityId = parseInt($(this).val());      
            // break;
            objectProject.amenitiesList.push(ObjectAmenities);  
    });  
    objectProject.brokerageFirmsList = [];
    $('#brokerage input[type="checkbox"]:checked').each(function()
    {
        objectBrokerage = {
           "id":{
             "brokerageFirmId":1
           },
           "id":{
             "brokerageFirmId":2
           }
         }
          
          objectBrokerage.id.brokerageFirmId = parseInt($(this).val());       
          // break;
          objectProject.brokerageFirmsList.push(objectBrokerage); 
         
    });  
    $('#freeAgent').is(':checked') ? objectProject.allowOtherAgent = true : objectProject.allowOtherAgent = false;

    objectProject.inProgressList = [];
    var objectProgressPhoto = [];    

    $("#tab-content .tab-pane").each(function(idx, element){
        //var timeSpan = null;
        //var startAt = null;
        objectProgressPhoto = [];
        $(element).find(".processingImage .file-preview .file-preview-initial").each(function(idxx, elementt){

          var fileName = $(elementt).find("img").attr('title');
          objectProgressPhoto.push({
            link : $(elementt).find("img").attr("src"),
            caption: $(elementt).find(".file-footer-caption input").val()
          });

        });
       // console.log("Date: "+$(element).find('.eventDate').val());
        //console.log("Timespan: "+Date.parse($(element).find('.eventDate').val()));
        objectProgressPhoto = $(element).find('.processingImage .file-preview-frame').length == 0 ? null : JSON.stringify(objectProgressPhoto);
        // objectProgressPhoto.push({
        //   url_path : url_path_img,
        //   url_thumb: url_thumb+fileName,
        //   url_large : url_large+fileName,
        //   file_id : $(element).find("img").attr("fileid"),
        //   file_name : fileName,
        //   caption : $(element).find(".file-footer-caption input").val()
        // });
        //if($(element).find('.eventDate').attr("ischange") == 1){
           // timeSpan = startAtChange;
        //}
        //else{
           // timeSpan = 
        //}

        //startAt = timeSpan;
        //console.log(startAt);
        objectProject.inProgressList.push({
            name: $(element).find("#processing-name").val() || null,
            nameEn: $(element).find("#processing-name-en").val() || null,
            photo:objectProgressPhoto,
            startAt: $(element).find('.eventDate').val() != "" ? $(element).find('.eventDate').val().parseDate("-") : null,
            started: $(element).find('input:radio[name="started"]').is(":checked") ? true : false     
      });
      });
    if(isEdit){
      objectProject.pId = parseInt($('#pid').val());
      post_sync("/editProject", objectProject, false, function(data){
          console.log(objectProject);
          if(data.result){
            console.log(objectProject);
            if(data.result){
              if(confirm("Bạn đã cấp nhật thành công")) {
              }
              else {
                location.reload();
              }
            }
          }
          console.log(data);
        });
    }
    });

})

