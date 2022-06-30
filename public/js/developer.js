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
  "inProgressList":[]
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
    $('.datePicker').datepicker({ 
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
  var tabID = 1;
  var noEventDate = 0;
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

    objectProject.inProgressList = [];

    $("#tab-content .tab-pane").each(function(idx, element){
        var objectProgressPhoto = [] ;
      $("#processingImage"+idx+" .file-preview .file-preview-initial").each(function(idx, element){
    
        var fileName = $(element).find("img").attr('title');
        objectProgressPhoto.push({
          link : $(element).find("img").attr("src"),
          caption: $(element).find(".file-footer-caption input").val()
        });
        
        // objectProgressPhoto.push({
        //   url_path : url_path_img,
        //   url_thumb: url_thumb+fileName,
        //   url_large : url_large+fileName,
        //   file_id : $(element).find("img").attr("fileid"),
        //   file_name : fileName,
        //   caption : $(element).find(".file-footer-caption input").val()
        // });
      });
     objectProgressPhoto = (($('#processingImage'+idx+' .file-preview-frame').length == 0) ? null : JSON.stringify(objectProgressPhoto));
        objectProject.inProgressList.push({
            name: $(element).find("#processing-name").val() || null,
            nameEn: $(element).find("#processing-name-en").val() || null,
            photo:objectProgressPhoto,
            startAt:$(element).find('#eventDate'+idx+'').val() == "" ? null : Date.parse($(element).find('#eventDate'+idx+'').val()),
            started: $('input:radio[id="started'+idx+'"]').is(":checked") ? true : false     
        });
      });
    
    if(isCreate) {
        objectProject.pId = null;
        post_sync("/createProject", objectProject, false, function(data){
          console.log(objectProject);
          if(data.result){
            console.log(objectProject);
            if(data.result){
              if(confirm("Bạn đã thêm thành công")) {
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

