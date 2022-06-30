$(document).ready(function() {
    create.init();

    // Đổi loại hình giao dịch
    $("#propertyTrans").on("change", function(e) {
        e.preventDefault();
        if (!detail.isEditFlag) {
            var propertyTrans = $.isNumeric($("#propertyTrans").val()) ? parseInt($("#propertyTrans").val()) : "";
            // Thuê
            if (propertyTrans == 2) {
                // Reset value [Giấy chủ quyền]
                $("#rightTypes").select2("val","");
                // Disabled [Giấy chủ quyền]
                $("#rightTypes-required").hide();
                $("#rightTypes").prop("disabled", true);
                $(".gcn-required").hide();
            } 
            // Bán
            else if (propertyTrans == 1) {
                // Enabled [Giấy chủ quyền]
                $("#rightTypes-required").show();
                $("#rightTypes").prop("disabled", false);
                $(".gcn-required").show();
            }
            create.reloadPropertyTypes(propertyTrans);
        }
    });

    // Đổi quận -> Phường
    $("#districtId").on("change", function() {
        if ($("#districtId").val() != "") {
            create.loadWardWithDistrict();
        }
    });

    // Đổi phường -> Đường
    $("#wardId").on("change", function() {
        if ($("#wardId").val() != "") {
            create.loadStreetWithWard();
        }
    });

    $("#streetId").on("change", function() {
        $.map(create.streetData, function(item) {            
            if (item.id == parseInt($("#streetId").val())) {
                var widthValue = (item.widthValue) ? item.widthValue : "";
                $("div.mat-tien").find("#alleyWidth").val(widthValue);
                // Độ rộng mặt tiền - Trong hẻm
                $("div.trong-hem").find("#widthFrontWay").val(widthValue);
                // Đơn giá mặt tiền đường
                var price = (item.price) ? item.price : "";
                $("#priceStreetFrontage").autoNumeric("set", price);
            }
        });
    });

    $("#houseTypes").on("change", function() {
        create.displayConstructionTypes();
    })

    // Check trùng owner (phone)
    $("#check-ownerphone-btn").click(function(e) {
        e.preventDefault();
        create.checkExistedOwner(true);
    });

    // Check trùng owner (email)
    $("#check-ownermail-btn").click(function(e) {
        e.preventDefault();
        create.checkExistedOwner(true);
    });

    // Xử lý position = 1 (Mat tien)/2(Hem)
    $(".position").on("click", function() {
        // Mặt tiền (1)
        if ($("input[name=position]:checked").val() == 1) {
            $(".mat-tien").show();
            $("#chi-tiet-mat-tien").hide();
            $("#haveBeSide-facade").prop("checked", false);
            $(".trong-hem").hide();
        }
        // Hẻm (2) 
        else if ($("input[name=position]:checked").val() == 2) {
            $(".mat-tien").hide();
            $("#chi-tiet-hem").hide();
            $("#haveBeSide-alley").prop("checked", false);
            $(".trong-hem").show();
        }
    });
    // Xử lý bên hông - Mặt tiền
    $("#haveBeSide-facade").click(function() {
        if ($(this).prop("checked") == true) {
            create.displayElements("#chi-tiet-mat-tien");
        } else {
            create.displayElements("");
        }
    });

    // Xử lý bên hông - Hẻm
    $("#haveBeSide-alley").click(function() {
        if ($(this).prop("checked") == true) {
            create.displayElements("#chi-tiet-hem");
        } else {
            create.displayElements("");
        }
    });

    // Check trùng tin đăng theo địa chỉ
    $("#check-duplicated-address").click(function(e) {
        e.preventDefault();
        create.checkDuplicatedAddress();
    });

    // Xử lý hình ảnh
    // Upload image
    $("body").on("click", "#add-image-item", function() {
        var newImageItem = $(".add-image-placeholder").clone();
        var newImageItemInput = newImageItem.find("input");

        newImageItemInput.on("change", prepareUpload);
        newImageItemInput.trigger("click");
        return false;
    });
    // Remove image
    $("body").on("click", ".remove-image-button", function() {
        var oldImageSrc = $(this).parents("li").data("src");
        create.deletingOldImages.push(oldImageSrc);
        if (create.uploadedImages.indexOf(oldImageSrc) > -1) {
            create.uploadedImages.splice(create.uploadedImages.indexOf(oldImageSrc),1);
        }        
        $(this).parent().remove();
        $("#add-image-item").trigger("blur"); //  Prevent IE auto keep selecting DOM content
    });

    // Xử lý hình GCN
    // Upload GCN image
    $("body").on("click", "#add-gcn-image-item", function() {
        var newImageItem = $(".add-gcn-image-placeholder").clone();
        var newImageItemInput = newImageItem.find("input");

        newImageItemInput.on("change", prepareUploadGCN);
        newImageItemInput.trigger("click");
        return false;
    });

    // Remove image
    $("body").on("click", ".remove-gcn-image-button", function() {
        var oldImageSrc = $(this).parents("li").data("src");
        create.deletingOldGCNImages.push(oldImageSrc);
        if (create.uploadedGCNImages.indexOf(oldImageSrc) > -1) {
            create.uploadedGCNImages.splice(create.uploadedGCNImages.indexOf(oldImageSrc),1);
        }        
        $(this).parent().remove();
        $("#add-image-item").trigger("blur"); //  Prevent IE auto keep selecting DOM content
    });

    // Cập nhật OWNER (nút 1)
    $("#update-owner-btn").click(function(e) {
        e.preventDefault();
        create.updateOwner();
    })
    // Cập nhật listing
    $("#update-listing-btn").click(function(e) {
        e.preventDefault();
        create.updateListing();
    });

    // Đăng real listing
    $("#create-listing-btn").click(function(e) {
        // Disabled button
        $(this).attr("disabled", true);
        e.preventDefault();
        create.addRealListing();
    });

    // Gửi DIY
    $("#diy-btn").click(function(e) {
        e.preventDefault();
        create.sendDIY();
    });

    // Unlock
    $("#unlock-btn").click(function(e) {
        e.preventDefault();
        create.unlock();
    });

    //////////////// Meeting Popup ////////////////

    // Hiển thị POPUP
    $("#meeting-popup").click(function(e) {
        e.preventDefault();
        create.showPopupMeeting();
    });

    //////////////// ~ . ~ ////////////////
    
    /**
     * Tính năng mới
     * 17/05/2017
     * 
     */
    $("#statusId").change(function() {
        console.log($(this).val());
        if ($(this).val() == 5) {
            // Show substatus        
            $(".subStatus").show();
            create.showSubStatus();
        } else {
            $(".subStatus").hide();
        }
    });

    // Auto check phone
    $("#phone").blur(function() {
        var isValid = true;
        if (!$("#phone").val()) {
            isValid = false;
        } else if (!isValidPhone($("#phone").val())) {
            isValid = false;
        }

        if (!isValid) {
            var errorMsg = "<span id='phone-error'><code>SĐT không hợp lệ</code></span><br>";
            $(".phone-error").html(errorMsg);
            $("#phone").css("border-color", "red");
            showPropzyAlert("Xin vui lòng kiểm tra SĐT");
        } else {
            $(".phone-error").html("");
            $("#phone").css("border-color", "");
        }
    });

    //  field cần làm mờ 
    //  sau khi chọn đất nền : 
    //  phòng ngủ, wc, số tầng, loại nhà, loại  công trình (Khung,Mái,Tường,Sàn,Trần)
    $("#propertyTypes").change(function(e) {
        e.preventDefault();
        // Đất nền (id = 13)
        if ($("#propertyTypes").val() == 13) {
            $("#bedRooms-required").hide();
            $("#bedRooms").val("");
            $("#bedRooms").prop("disabled", true);
            $("#bathRooms-required").hide();
            $("#bathRooms").val("");
            $("#bathRooms").prop("disabled", true);
            $("#numberFloor").val("");
            $("#numberFloor").prop("disabled", true);
            $("#houseTypes").select2('val','');
            $("#houseTypes").prop("disabled", true);

            try{
                $("#construct-roof").select2('val','');
            }catch(ex){}
            $("#construct-roof").prop("disabled", true);                

            try{
                $("#construct-wall").select2('val','');
            }catch(ex){}
            $("#construct-wall").prop("disabled", true);

            try{
                $("#construct-floor").select2('val','');
            }catch(ex){}
            $("#construct-floor").prop("disabled", true);

            try{
                $("#construct-ceil").select2('val','');
            }catch(ex){}
            $("#construct-ceil").prop("disabled", true);

        } else {
            $("#bedRooms").prop("disabled", false);
            $("#bathRooms").prop("disabled", false);
            $("#numberFloor").prop("disabled", false);
            $("#houseTypes").prop("disabled", false);
            $("#construct-roof").prop("disabled", false);
            $("#construct-wall").prop("disabled", false);
            $("#construct-floor").prop("disabled", false);
            $("#construct-ceil").prop("disabled", false);
        }
    });

    $("body").on("click", ".lso-image", function(e) {
        e.preventDefault();
        $("#lsoImageView").attr("src", this.src);
        $("#imageModal").show();
    });
});


// Prepare Upload
function prepareUpload(event) {
    event.preventDefault();
    var e = event;

    var isFirefox = typeof InstallTrigger !== 'undefined';

    var fileElement = null;
    if (isFirefox) {
        fileElement = e.originalEvent.target;
    } else {
        fileElement = e.originalEvent.srcElement;
    }

    for (var i = 0; i < fileElement.files.length; i++) {
        var file = fileElement.files[i];
        (function(file) {
            var validFile = create.validateImageUpload(file);
            if (!validFile) {
                e.target.value = "";
                return false;
            }

            var reader = new FileReader();
            reader.onload = function() {
                var newImageItemFile = reader.result;
                var newImageElement = e.target.parentElement;
                var newImage = '<li data-time="' + file.lastModifiedDate + '">';
                var newImage = newImage + '<a type="button" class="remove-image-button">';
                var newImage = newImage + '<i class="fa fa-times"></i>';
                var newImage = newImage + '</a>'
                var newImage = newImage + '<img class="lso-image" data-name="' + file.name + '" src="' + newImageItemFile + '" width="80" height="80" />';
                var newImage = newImage + '<input type="file" name="files[]" accept=".jpg,.jpeg,.gif,.png" class="hidden" multiple></li>';
                $(newImage).insertBefore("#add-image-item");
                create.uploadNewImages.push(file);
            }
            reader.readAsDataURL(file);
        })(fileElement.files[i]);
    }
}

// Prepare Upload GCN
// [TO-DO] Clean up this code 
function prepareUploadGCN(event) {
    event.preventDefault();
    var e = event;

    var isFirefox = typeof InstallTrigger !== 'undefined';

    var fileElement = null;
    if (isFirefox) {
        fileElement = e.originalEvent.target;
    } else {
        fileElement = e.originalEvent.srcElement;
    }

    for (var i = 0; i < fileElement.files.length; i++) {
        var file = fileElement.files[i];
        (function(file) {
            var validFile = create.validateImageUpload(file);
            if (!validFile) {
                e.target.value = "";
                return false;
            }

            var reader = new FileReader();
            reader.onload = function() {
                var newImageItemFile = reader.result;
                var newImageElement = e.target.parentElement;
                var newImage = '<li data-time="' + file.lastModifiedDate + '">';
                var newImage = newImage + '<a type="button" class="remove-image-button">';
                var newImage = newImage + '<i class="fa fa-times"></i>';
                var newImage = newImage + '</a>'
                var newImage = newImage + '<img class="lso-image" data-name="' + file.name + '" src="' + newImageItemFile + '" width="80" height="80" />';
                var newImage = newImage + '<input type="file" name="files[]" accept=".jpg,.jpeg,.gif,.png" class="hidden" multiple></li>';
                $(newImage).insertBefore("#add-gcn-image-item");
                create.uploadNewGCNImages.push(file);
            }
            reader.readAsDataURL(file);
        })(fileElement.files[i]);
    }
}
