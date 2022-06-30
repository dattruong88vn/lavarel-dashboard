$(document).ready(function() {
    detail.init();    

    // Sample date picker
    $('#sampleDatePicker').datepicker({});    

    window.onscroll = function() {scrollFunction()};

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            document.getElementById("scrollTopBtn").style.display = "block";
        } else {
            document.getElementById("scrollTopBtn").style.display = "none";
        }
    }

    // When the user clicks on the button, scroll to the top of the document
    $("#scrollTopBtn").click(function(e) {
        e.preventDefault();
        $('body').animate({
                scrollTop: 0
            }, 'slow');
    });

    // Đổi loại hình giao dịch
    $("#propertyTrans").on("change", function(e) {
        e.preventDefault();        
        showErrorLabel("nope");
        if (!detail.isEditFlag) {
            var propertyTrans = $.isNumeric($("#propertyTrans").val()) ? parseInt($("#propertyTrans").val()) : "";
            // Thuê
            if (propertyTrans == 2) {
                // Reset value [Giấy chủ quyền]
                $("#rightTypes").select2("val","");
                // Disabled [Giấy chủ quyền]
                $(".rightTypes-required").hide();
                $("#rightTypes").prop("disabled", true);
                $(".gcn-required").hide();
                // Hide button [Thẩm định]
                $("#valuation-btn").hide();  
                showErrorLabel("other");              
            }
            // Bán
            else if (propertyTrans == 1) {
                // Enabled [Giấy chủ quyền]
                $(".rightTypes-required").show();
                $("#rightTypes").prop("disabled", false);
                $(".gcn-required").show();
                // Show button [Thẩm định]
                $("#valuation-btn").show();
                showErrorLabel("other")
            }
            detail.reloadPropertyTypes(propertyTrans);
        }
    });

    // Đổi quận -> Phường
    $("#districtId").on("change", function() {
        if ($("#districtId").val() != "" && !detail.isEditFlag) {
            detail.loadWardWithDistrict();
        }
    });

    // Đổi phường -> Đường
    $("#wardId").on("change", function() {
        if ($("#wardId").val() != "" && !detail.isEditFlag) {
            detail.loadStreetWithWard();
        }
    });

    $("#streetId").on("change", function() {
        if (!detail.isEditFlag) {
            $.map(detail.streetData, function(item) {
                if (item.id == parseInt($("#streetId").val())) {
                    // Độ rộng mặt tiền - Mặt tiền
                    var widthValue = (item.widthValue) ? item.widthValue : "";
                    $("div.mat-tien").find("#alleyWidth").val(widthValue);
                    // Độ rộng mặt tiền - Trong hẻm
                    $("div.trong-hem").find("#widthFrontWay").val(widthValue);
                    // Đơn giá mặt tiền đường
                    var price = (item.price) ? item.price : "";
                    $("#priceStreetFrontage").autoNumeric("set", price);
                }
            });
        }
    });

    $("#houseTypes").on("change", function() {
        detail.displayConstructionTypes();
    })

    // Check trùng owner (phone)
    $("#check-ownerphone-btn").click(function(e) {
        e.preventDefault();
        detail.checkExistedOwner(true);
    });

    // Check trùng owner (email)
    $("#check-ownermail-btn").click(function(e) {
        e.preventDefault();
        detail.checkExistedOwner(false);
    });

    // Xử lý position = 1 (Mat tien)/2(Hem)
    $(".position").on("click", function() {
        // Mặt tiền (1)
        if ($("input[name=position]:checked").val() == 1) {
            // Set value from trong-hem -> mat-tien
            if ($("div.trong-hem").find("#widthFrontWay").val()) {
                $("div.mat-tien").find("#alleyWidth").val($("div.trong-hem").find("#widthFrontWay").val())
            }
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
            detail.displayElements("#chi-tiet-mat-tien");
        } else {
            detail.displayElements("");
        }
    });

    // Xử lý bên hông - Hẻm
    $("#haveBeSide-alley").click(function() {
        if ($(this).prop("checked") == true) {
            detail.displayElements("#chi-tiet-hem");
        } else {
            detail.displayElements("");
        }
    });

    // Check trùng tin đăng theo địa chỉ
    $("#check-duplicated-address").click(function(e) {
        e.preventDefault();
        detail.checkDuplicatedAddress();
    });

    $("body").on("click", "#isReminder", function() {
        if ($("input[name=isReminder]:checked").val() == 1) {
            $("#reminderMinute").prop("disabled", false);
        } else {
            $("#reminderMinute").prop("disabled", true);
        }
    });

    // Tạo Call Reminder
    $("#reminder-call-btn").click(function(e) {
        e.preventDefault();
        reminder.callReminder();
    });

    // Tạo Reminder
    $("#create-reminder-btn").click(function(e) {
        e.preventDefault();
        reminder.insertReminder();
    })

    // Tạo nhắc nhở


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
        detail.deletingOldImages.push(oldImageSrc);
        if (detail.uploadedImages.indexOf(oldImageSrc) > -1) {
            detail.uploadedImages.splice(detail.uploadedImages.indexOf(oldImageSrc),1);
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
        detail.deletingOldGCNImages.push(oldImageSrc);
        if (detail.uploadedGCNImages.indexOf(oldImageSrc) > -1) {
            detail.uploadedGCNImages.splice(detail.uploadedGCNImages.indexOf(oldImageSrc),1);
        }        
        $(this).parent().remove();
        $("#add-image-item").trigger("blur"); //  Prevent IE auto keep selecting DOM content
    });

    // Cập nhật OWNER (nút 1)
    $("#update-owner-btn").click(function(e) {
        e.preventDefault();
        detail.updateOwner();
    });

    // Hiển thị danh sách yêu cầu nội bộ
    $("#request-internal-btn").click(function(e) {
        e.preventDefault();
        detail.requestInternalModal();
    });

    // Hiển thị modal nhập yêu cầu
    $("#create-request-internal-btn").click(function(e) {
        e.preventDefault();
        detail.createRequestInternalModal();
    });

    // Tạo mới yêu cầu nội bộ
    $("#submit-request-internal-btn").click(function(e) {
        e.preventDefault();
        detail.processRequestInternalModal();
    });

    // Cancel yêu cầu nội bộ
    $("#cancel-request-internal-btn").click(function(e) {
        e.preventDefault();
        $("#create-request-internal-modal").modal("hide");
        $("#request-internal-modal").modal("show");
    });

    // Cập nhật listing
    $("#update-listing-btn").click(function(e) {
        // Disabled button
        $(this).attr("disabled", true);
        e.preventDefault();
        detail.updateListing();
    });

    // Đăng real listing
    $("#create-listing-btn").click(function(e) {
        // Disabled button
        $(this).attr("disabled", true);
        e.preventDefault();
        detail.addRealListing();
    });

    // Ngưng real listing
    $("#stop-listing-btn").click(function(e) {
        e.preventDefault();
        if (confirm("Bạn có đồng ý ngưng listing này ?")) {
            detail.stopRealListing();
        }
    });

    // Từ chối listing
    $("#reject-listing-btn").click(function(e) {
        e.preventDefault();
        $("#modal-reject-listing").modal({backdrop: 'static', keyboard: false});
    });

    $("body").on("click", ".reject-by", function() {
        if ($("input[name=reject-by]:checked").data('control') == "input_text_if_checked") {
            $("#reject-reason").show();
        } else {
            $("#reject-reason").hide();
        }
    });

    $("#reject-lso-submit").click(function(e) {
        e.preventDefault();
        detail.rejectRealListing();
    });

    $("#stop-lso-submit").click(function(e) {
        e.preventDefault();
        detail.stopListing();
    });

    // Bán real listing
    $("#sold-listing-btn").click(function(e) {
        e.preventDefault();
        detail.soldRealListing();
    });

    $(".sold-by").change(function() {
        var soldBy = $(this).val();
        if (soldBy == "owner") {
            $(".sold-add-opts").show();
        } else {
            $(".sold-add-opts").hide();
        }
        detail.displaySoldOption(soldBy);
    });

    $("#sold-lso-submit").click(function(e) {
        e.preventDefault();
        detail.soldListing();
    });

    // Cho thuê real listing
    $("#rent-listing-btn").click(function(e) {
        e.preventDefault();
        detail.rentRealListing();
    });

    $("#rent-lso-submit").click(function(e) {
        e.preventDefault();
        detail.rentListing();
    });

    $(".rent-by").change(function() {
        var rentBy = $(this).val();
        detail.displayRentOption(rentBy);
    });

    $("#resend-btn").click(function(e) {
        e.preventDefault();
        detail.resendInfo();
    });

    // Yêu cầu LS
    $("#request-listing-btn").click(function(e) {
        e.preventDefault();
        detail.requestRealListing();
    });
    $("#request-lso-submit").click(function(e) {
        e.preventDefault();
        detail.requestListing();
    });
    // Tính năng mới
    $(".send-request-opt").change(function() {
      if ($(".send-request-opt:radio:checked").val() == "other") {
        $("#lsoRequestContainer").show();
      } else {
        $("#lsoRequestContainer").hide();
      }
    });

    // Gửi DIY
    $("#diy-btn").click(function(e) {
        e.preventDefault();
        if (confirm('Bấm OK để tiến hành gửi DIY')) {
            detail.sendDIY();
        }
    });

    $(".ps-link").click(function() {
        detail.showPs();
    });

    // PS
    $("#ps-btn").click(function(e) {
        e.preventDefault();
        detail.showPs();
    });    

    $(".done-ps-link").click(function() {
        detail.showDonePs();
    });

    // Gửi PS 
    $("#send-ps").click(function(e) {
        e.preventDefault();
        detail.sendPs();
    });

    // Xong
    $("#send-done-ps").click(function(e) {
        e.preventDefault();
        detail.sendDonePs();
    });    

    // Nhấn delay
    $('#ps-delay-btn').click(function(e) {
        e.preventDefault();
        detail.delayPsNote();
    });

    $("#ps-delay-cancel-btn").click(function(e) {
        e.preventDefault();
        detail.psDelayFlag = false;
        detail.psCount = 0;
        $("#ps-delay-note").val("");
        detail.showDonePs();
    });

    // Unlock
    $("#unlock-btn").click(function(e) {
        e.preventDefault();
        detail.unlock();
    });

    // Popup history
    $("#history-popup").click(function(e) {
        e.preventDefault();
        $("#note").val("");
        $("#history-modal").modal('show');
    });

    // Tạo listing note
    $("#create-listing-note-btn").click(function(e) {
        e.preventDefault();
        detail.createListingNote();
    });

    // Load status id
    $("#statusId").change(function(e) {
        if (!detail.isEditFlag) {
            // Reload sub status
            $("#subStatusId").empty();

            e.preventDefault();
            console.log($(this).val());
            if ($(this).val() == 5) {
                // Show substatus
                $(".subStatus").show();
                detail.showSubStatus();
            } // Từ chối
            else if ($(this).val() == 19) {
                $("#modal-reject-listing").modal({backdrop: 'static', keyboard: false});
            } else {
                $(".subStatus").hide();
            }
        }
    });

    // Load rlisting Status Id
    $("#rlistingStatusId").change(function(e) {
        if (!detail.isEditFlag) {
            e.preventDefault();
            // Từ chối
            if ($(this).val() == 22) {
                $("#modal-reject-listing").modal({backdrop: 'static', keyboard: false});
            }
        }
    });

    // Close modal reject
    $("#close-reject-modal").click(function(e) {
        e.preventDefault();
        window.location.reload();
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
            showPropzyAlert("Xin vui lòng kiểm tra SĐT. Chỉ cho phép nhập số");
        } else {
            $(".phone-error").html("");
            $("#phone").css("border-color", "");
        }
    });

    //  field cần làm mờ
    //  sau khi chọn đất nền :
    //  phòng ngủ, wc, số tầng, loại nhà, loại  công trình (Khung,Mái,Tường,Sàn,Trần)
    $("#propertyTypes").change(function(e) {
        showErrorLabel("nope");
        if (!detail.isEditFlag) {
            e.preventDefault();
            // Đất nền (id = 13)
            if ($("#propertyTypes").val() == 13) {
                $(".bedRooms-required").hide();
                $("#bedRooms").val("");
                $("#bedRooms").prop("disabled", true);
                $(".bathRooms-required").hide();
                $("#bathRooms").val("");
                $("#bathRooms").prop("disabled", true);
                $("#numberFloor").val("");
                $("#numberFloor").prop("disabled", true);
                $("#houseTypes").select2('val','');
                $("#houseTypes").prop("disabled", true);   
                $("#depreciation").prop("disabled", true);             
            } // Nhà riêng (11)
            else if ($("#propertyTypes").val() == 11) {
                showErrorLabel("privateOwner");
            } else {
                showErrorLabel("other");
                $(".bedRooms-required").show();
                $("#bedRooms").prop("disabled", false);
                $(".bathRooms-required").show();
                $("#bathRooms").prop("disabled", false);
                $("#numberFloor").prop("disabled", false);
                $("#houseTypes").prop("disabled", false);                
            }
        }
    });

    $("#go-diy-btn").click(function(e) {
        e.preventDefault();
        if ($.isNumeric($("#diy-hidden-id").val())) {
            window.location.replace("/lso/detail/" + $("#diy-hidden-id").val());
        }
    });

    $("body").on("click", ".lso-image", function(e) {
        $("#lsoImageView").attr("src", this.src);
        $("#imageModal").show();
    });

    // Thẩm định
    $("#valuation-btn").click(function(e) {
        e.preventDefault();
        detail.valuationOfRealEstate();
    });

    // Thêm đường
    $("#createStreet").click(function(e) {
        e.preventDefault();
        detail.startStreetForm();
    });

    // Profile chủ nhà
    $("#profile-btn").click(function(e) {
        e.preventDefault();
        detail.showProfile();
    });    
});

// Change delay date
// Re-check why call three times ???
$(document).on("change", ".delay-date", function(e) {        
    e.preventDefault();
    detail.psCount++;
    if (detail.psCount == 1) {    
        // If value is really change 
        var tmpPsDateChange = $(this).val();
        var tmpPsIdChange = $(this).data('id');
        var tmpPsDataChange = $.grep(detail.donePsData, function(ps) {
            return ps.psId == tmpPsIdChange;
        });

        if (typeof tmpPsDataChange[0] != "undefined") {            
            if (tmpPsDateChange != formatDate(tmpPsDataChange[0].deadline) && tmpPsDateChange) {
                detail.psId = $(this).data('id');
                detail.psDate = $(this).val(); 
                detail.delayPsService();
            } else {                
                detail.showDonePs();
                detail.psCount = 0;
            }
        } else {
            detail.showDonePs();
            detail.psCount = 0;
        } 
    }
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
                detail.uploadNewImages.push(file);
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
                detail.uploadNewGCNImages.push(file);
            }
            reader.readAsDataURL(file);
        })(fileElement.files[i]);
    }
}

/**
 * Popup modal [Tin đăng chủ nhà]
 */
function showModalOwnerPosts() {
  $("#posts-by-owner").modal("show");
  detail.getListOwnerPosts();
}

function showErrorLabel(isType) {
    var privateOwnerErrorLabels = [".cityIdError",".sizeLengthError",".sizeWidthError",
                        ".floorSizeError",".priceError",".numberFloorError",
                        ".commissionTextError",".bedRooms-required",".bathRooms-required",
                        ".rightTypes-required", ".priceStreetFrontageError", ".roadFrontageError",
                        ".houseTypesError", ".constructionTypesError", ".advantagesError",
                        ".depreciationError", ".imagesListError", ".gcn-required", ".lotSizeError"]; 
    
    var otherErrorLabels = [".cityIdError", ".priceError", ".commissionTextError",
                            ".rightTypes-required",
                            ".advantagesError", ".imagesListError", ".gcn-required"];

    if (isType == "privateOwner") {
        $.each(privateOwnerErrorLabels, function(idx, item) {
            $(privateOwnerErrorLabels[idx]).show();
        });
    } else if (isType == "other") {
        $.each(otherErrorLabels, function(idx, item) {
            $(otherErrorLabels[idx]).show();
        });
    } else {
        $.each(privateOwnerErrorLabels, function(idx, item) {
            $(privateOwnerErrorLabels[idx]).hide();
        });
    }
}
