var myAccountPage = (function() {
    /**
     * Constructor
     * @constructor
     */
    function myAccountPage() {
    }
    myAccountPage.prototype.init = function() {
        loadDefaultData();
        bindEvents();
        bindMessages();
    };
    function loadDefaultData() {
        var ele_birthday = $('input[name="birthday"]');
        ele_birthday.datetimepicker({
            format: 'DD/MM/YYYY'
        });
        if(userType==4) {
            var ele_issuedDate=$('input[name="issuedDate"]');
            var issuedDate = ele_issuedDate.val().length!=0 ? moment.unix(ele_issuedDate.val()/1000).format('DD/MM/YYYY'): moment();
            ele_issuedDate.val(issuedDate);
            ele_issuedDate.datetimepicker({
                format: 'DD/MM/YYYY'
            });
        }
    }
    function bindMessages() {
    }

    function bindEvents() {
        App.UI.addRules();
        App.UI.inputAllowNumber(["input[name='phone']","input[name='company_phone']","input[name='idNo']","input[name='experience']"]);
        $(".btn-save").click(function () {
            var checkSend = App.UI.checkValidRules($("#form-my-acount"),{
                name: {
                    validators: {
                        notEmpty: {
                            message: messages.dangky_name_empty
                        }
                    }
                },
                phone: {
                    validators: {
                        notEmpty: {
                            message: messages.dangky_phome_empty
                        },
                        isPhone: {
                            message: messages.dangky_phone_wrongformat
                        }
                    }
                },
                company_phone: {
                    validators: {
                        isPhone: {
                            message: messages.dangky_phone_wrongformat
                            }
                    }
                },
                email: {
                    validators: {
                        emailAddress: {
                            message: messages.dangky_email_wrongformat
                        }
                    }
                },
                company_email: {
                    validators: {
                        emailAddress: {
                            message: messages.dangky_email_wrongformat
                        }
                    }
                },
                idNo: {
                    validators: {
                        stringLength: {
                            min: 9,
                            max: 9,
                            message: 'CMND chỉ được 9 số'
                        }
                    }
                }
            });
            if(checkSend){
                var birthDay = checkSend.birthday.trim();
                var dataSend = {
                    "name": checkSend.name.trim(),
                    "phone": checkSend.phone.trim(),
                    "photo": checkSend.image.trim(),
                    "email": checkSend.email.trim(),
                    "birthDay":  birthDay ? birthDay:null,
                    "gender": checkSend.gender.trim()
                };
                if(userType==4){
                    var agentBankInfos = {};
                    agentBankInfos.bankId = $('#bankName').val();
                    agentBankInfos.branchId = $('#bankBranch').val();
                    agentBankInfos.accountNumber = $('#bankNumber').val();
                    var moreAgent = {
                        "aboutMe": checkSend.aboutMe,
                        "experience": checkSend.experience ? parseInt(checkSend.experience):0,
                        "address": checkSend.address,
                        "latitude": parseFloat(checkSend.latitude),
                        "longitude": parseFloat(checkSend.longitude),
                        "idNo":checkSend.idNo,
                        "issuedDate": moment(parseInt(checkSend.issuedDate.trim()), "DD/MM/YYYY HH:mm").unix()*1000,
                        "issuedPlace": checkSend.issuedPlace,
                        "employmentType": checkSend.employmentType,
                        "listingTypeIds": checkSend.listingType!='null' ? [parseInt(checkSend.listingType)]: null,
                        "districtIds": checkSend.districtIds && checkSend.districtIds.length ? checkSend.districtIds:null,
                        "company": {
                            "name": checkSend.company_name,
                            "address": checkSend.company_address,
                            "phone": checkSend.company_phone,
                            "email": checkSend.company_email
                        },
                        "agentBankInfos": [agentBankInfos]
                    };
                    dataSend = Object.assign({}, dataSend, moreAgent);
                };
                console.log(JSON.stringify(dataSend));
                App.Feature.Post('/api/update-profile',dataSend,function (response) {
                    if(response.result){
                        App.UI.Done("Cập nhật tài khoản thành công",function(){
                            console.log(response);
                        });
                    }else{
                        App.UI.Error(response.message);
                    }
                },true);
            }
        });
    }
    return myAccountPage;
})();
$(document).ready(function() {
    (new myAccountPage()).init();
    if ($('.employmentType:checked').val()==1) {
        $('.bl-company').show();
    } else if ($('.employmentType:checked').val()==3) {
        $('.bl-company').hide();
    }
    $('.employmentType').change(function(){
        if ($(this).val() == 1) {
            $('.bl-company').show();
        } else if ($(this).val() == 3){
            $('.bl-company').hide();
        }
    });
    //
    setTimeout(function(){
        $("#districtIds").selectize({
            plugins: ['remove_button'],
            create: false
        });
    },500);
    //
    $('#bankName').change(function(){
        var bankId = $(this).val();
        $('#bankBranch').html('');
        App.Feature.Get("/api/get-branch-by-bank/" + bankId, function (response) {
            //console.log(response);
            if(response.result){
                var html = '';
                if(response.data.list.length > 0){
                    $.each(response.data.list, function(key,val){
                        html+= '<option value="'+val.branchId+'">';
                        html+= val.name;
                        html+= '</option>';
                    });
                    console.log(html);
                    $('#bankBranch').html(html);
                }
            }
        });
    });
});