let PROPZY_JSON = {
    init: () => {
        $("#add-contacts").on("click", function (event) {
            event.preventDefault();
            if (!validateFormInvite.form()) {
                showPropzyAlert(
                    "Có lỗi xảy ra. Vui lòng kiểm tra dữ liệu của bạn."
                );
                return false;
            }
            //
            var isValidated = true;
            var form = $("#form-invite-contacts");
            form.find(".errors").html("");
            //
            var name = form.find("#fullName").val().trim();
            var userName = form.find("#username").val().trim();
            var employeeCode = form.find("#employeeCode").val().trim();
            var phone = form.find("#invite_phone").val().trim();
            if (phone.trim() === "") {
                $("#invite_phone")
                    .parent()
                    .find(".errors")
                    .html("Nhập số điện thoại");
                isValidated = false;
            }
            if (phone.trim().length > 15 || phone.trim().length < 10) {
                $("#invite_phone")
                    .parent()
                    .find(".errors")
                    .html("Số điện thoại không hợp lệ");
                isValidated = false;
            }
            var listing = [];
            if ($("input[name='chkBuy']").is(":checked")) {
                listing.push(1);
            }
            if ($("input[name='chkRent']").is(":checked")) {
                listing.push(2);
            }
            var startDate = form.find("#startDate").val();
            startDate = startDate.split("/");
            startDate = new Date(
                startDate[1] + "/" + startDate[0] + "/" + startDate[2]
            ).getTime();
            var email = form.find("#invite_email").val().trim();
            // department
            var departments = [];
            var positions = [];
            var departmentIds = $("#departmentIds").val();
            var preferDepartment = $("#preferDepartment").val();
            var preferPosition = $("#preferPosition").val();
            $.each(departmentIds, function (k, v) {
                var arr = v.split("-");
                var id = arr[0];
                if (id == preferDepartment) {
                    departments[k] = {
                        departmentId: id,
                        isPrimary: true,
                    };
                } else {
                    departments[k] = {
                        departmentId: id,
                        isPrimary: false,
                    };
                }
            });
            // position
            var i = 0;
            $.each($(".positionIds.selectized"), function (k, v) {
                $.each(v, function (key, value) {
                    if (parseInt(value.value) == parseInt(preferPosition)) {
                        positions[i] = {
                            positionId: value.value,
                            isPrimary: true,
                        };
                    } else {
                        positions[i] = {
                            positionId: value.value,
                            isPrimary: false,
                        };
                    }
                    i++;
                });
            });
            // zone
            var zones = [];
            var zoneIds = $("#zoneIds").val();
            var preferZone = $("#preferZone").val();
            if (zoneIds) {
                $.each(zoneIds, function (k, v) {
                    var arr = v.split("-");
                    var id = arr[0];
                    if (id == preferZone) {
                        zones[k] = {
                            departmentId: id,
                            isPrimary: true,
                        };
                    } else {
                        zones[k] = {
                            departmentId: id,
                            isPrimary: false,
                        };
                    }
                });
            }
            // team
            var teams = [];
            var teamIds = $("#teamIds").val();
            var preferTeam = $("#preferTeam").val();
            if (teamIds) {
                $.each(teamIds, function (k, v) {
                    var arr = v.split("-");
                    var id = arr[0];
                    if (id == preferTeam) {
                        teams[k] = {
                            departmentId: id,
                            isPrimary: true,
                        };
                    } else {
                        teams[k] = {
                            departmentId: id,
                            isPrimary: false,
                        };
                    }
                });
            }
            // tc
            var tcs = [];
            var tcIds = $("#tcIds").val();
            var preferTc = $("#preferTc").val();
            if (tcIds) {
                $.each(tcIds, function (k, v) {
                    var arr = v.split("-");
                    var id = arr[0];
                    if (id == preferTc) {
                        tcs[k] = {
                            tcId: id,
                            isPrimary: true,
                        };
                    } else {
                        tcs[k] = {
                            tcId: id,
                            isPrimary: false,
                        };
                    }
                });
            }
            // tc
            const areaIds = $("#areaIds").val();
            const preferArea = $("#preferArea").val();
            var areas = null;
            if (areaIds) {
                areas = areaIds.map((it) => {
                    const data = {
                        isPrimary: false,
                        districtId: it,
                    };
                    data.isPrimary = it == preferArea;
                    return data;
                });
            }
            //thanh pho, quan huyen, phuong xa
            const cityIds = $("#cityIds").val();
            const preferCity = $("#preferCity").val();
            var cities = null;
            if (cityIds) {
                cities = cityIds.map((it) => {
                    const data = {
                        isPrimary: false,
                        cityId: it,
                    };
                    data.isPrimary = it == preferCity;
                    return data;
                });
            }
            //quan
            const districtIds = $("#districtIds").val();
            const preferDistrict = $("#preferDistrict").val();
            var districts = null;
            if (districtIds) {
                districts = districtIds.map((it) => {
                    const data = {
                        isPrimary: false,
                        districtId: it,
                    };
                    data.isPrimary = it == preferDistrict;
                    return data;
                });
            }
            
            //phuong
            const wardIds = $("#wardIds").val();
            const preferWard = $("#preferWard").val();
            var wards = null;
            if (wardIds) {
                wards = wardIds.map((it) => {
                    const data = {
                        isPrimary: false,
                        wardId: it,
                    };
                    data.isPrimary = it == preferWard;
                    return data;
                });
            }
            const dataSend = {};
            dataSend["name"] = name;
            dataSend["email"] = email;
            dataSend["phones"] = [
                {
                    phone: phone,
                    isPrimary: true,
                },
            ];
            dataSend["startDate"] = startDate;
            dataSend["userName"] = userName;
            dataSend["positions"] = positions;
            dataSend["departments"] = departments;
            dataSend["zones"] = zones;
            dataSend["teams"] = teams;
            dataSend["tcs"] = tcs;
            dataSend["cities"] = cities;
            dataSend["districts"] = districts;
            dataSend["wards"] = wards;
            dataSend["listingTypes"] = listing;
            // dataSend['districts'] = [
            //     {
            //       "cityId": 1,
            //       "districtId": 1,
            //       "isPrimary": false
            //     },
            //     {
            //       "cityId": 1,
            //       "districtId": 2,
            //       "isPrimary": false
            //     }
            //   ];
            //dataSend.districts = areas;
            //
            // if (false === isValidated) {
            //     return false;
            // }
            console.log(dataSend, "data send create user");
            showPropzyLoading();
            $.ajax({
                url: "/user/do-invite-contacts",
                data: JSON.stringify(dataSend),
                type: "post",
            })
                .done(function (response) {
                    console.log(response);
                    if (response.result) {
                        showPropzyAlert(response.message);
                        $("#alertModal").on("hide.bs.modal", function () {
                            window.location.href = "/contact/mine";
                        });
                    } else {
                        showPropzyAlert(response.message);
                    }
                })
                .always(function () {
                    hidePropzyLoading();
                });
        });
    }
}

const departmentsMap = new Map();
const tcsMap = new Map();
let cities = [];
let districts = [];
let wards = [];
let departmentChooseArea = [];
var cityField = null;
var districtField = null;
var wardField = null;
var manageZoneInstance = null;
var manageTeamInstance = null;
$(document).ready(function () {
    initPage();
    CKEDITOR.replace("signature");
    CKEDITOR.replace("agent-introduce");
    $("#image_file").change(function () {
        var formData = new FormData();
        formData.append("file_data", $("#image_file")[0].files[0]);
        $.ajax({
            url: "/user/upload-avatar-get-url",
            type: "POST",
            data: formData,
            processData: false, // tell jQuery not to process the data
            contentType: false, // tell jQuery not to set contentType
            success: function (data) {
                $("#photo").val(data == "" ? null : data);
                $("#imgPhoto").attr("src", data);
            },
        });
    });
    $("#startDate").datepicker({
        format: "dd/mm/yyyy",
    });
    const validateOptions = {
        ignore: null,
        rules: {
            fullName: { required: true },
            username: { required: true },
            invite_phone: { required: true },
            invite_email: { required: true, email: true },
            startDate: {required: true},
            "cityIds[]": {required: true},
            "departmentIds[]": { required: true },
            //"preferDepartment": {required: true},
            "positionIds[]": { required: true },
            //"preferPosition": {required: true},
            // "zoneIds[]": {required: true},
            // "preferZone": {required: true},
            // "teamIds[]": {required: true},
            // "preferTeam": {required: true},
            "tcIds[]": { required: true },
            //"preferTc": {required: true}
        },
        messages: {
            fullName: { required: "Nhập họ và tên" },
            invite_phone: { required: "Nhập số điện thoại" },
            invite_email: { required: "Email không hợp lệ" },
            startDate: {required: "Nhập ngày vào làm"},
            username: { required: "Nhập user name" },
            "cityIds[]": {required: "Nhập thành phố"},
            "departmentIds[]": { required: "Chọn bộ phận" },
            //"preferDepartment": {required: "Chọn bộ phận yêu thích"},
            "positionIds[]": { required: "Chọn chức vụ" },
            //"preferPosition": {required: "Chọn chức vụ yêu thích"},
            // "zoneIds[]": {required: "Chọn Zone"},
            // "preferZone": {required: "Chọn Zone yêu thích"},
            // "teamIds[]": {required: "Chọn Team"},
            // "preferTeam": {required: "Chọn Team yêu thích"},
            "tcIds[]": { required: "Chọn TC" },
            //"preferTc": {required: "Chọn TC yêu thích"}
        },
    };
    var validateFormInvite = $("#form-invite-contacts").validate(
        validateOptions
    );
    /*var inputAllowNumber = function(input, allowSeparator){
        allowSeparator = (typeof allowSeparator !== 'undefined' ? allowSeparator : true);
        if($.isArray(input)) {
            $.each(input,function(index,element) {
                $(element).on('input', function () {
                    var text = $(this).val().match(/[\d]/g);
                    if(allowSeparator)
                        var text = $(this).val().match(/[\d\.]/g);
                    text = !!text ? text.join("") : "";
                    $(this).val(text);
                });
            });
        }else{
            $(input).on('input', function () {
                var text = $(this).val().match(/[\d]/g);
                if(allowSeparator)
                    var text = $(this).val().match(/[\d\.]/g);
                text = !!text ? text.join("") : "";
                $(this).val(text);
            });
        }
    };*/
    $("#invite_phone").phoneBasic();
    // inputAllowNumber("#invite_phone",false);
    
});
async function initPage() {
    getPromdiseDepartments();
    getPromdiseTcs();
    getPromiseCities();
    //getPromiseDistricts();
    initSelectDistricts();
    //getPromiseWards();
    initSelectWards();
    /*initSelectPositions();*/
    // initSelectArea();
}
const getPromdiseDepartments = async function () {
    axios
        .post("/departments/api-get-all", {})
        .then(function (xhr) {
            let response = [];
            if (xhr.data.result) {
                response = xhr.data.data;
                console.log(response, "get all");
            }
            if (response.length > 0) {
                response.forEach((item) => {
                    let departments = [];
                    if (departmentsMap.has(item.departmentType)) {
                        departments = [
                            ...departmentsMap.get(item.departmentType),
                            item,
                        ];
                    } else {
                        departments = [item];
                    }
                    departmentsMap.set(item.departmentType, departments);
                });
            }
            initSelectZone();
            initSelectManageZone();
            initSelectTeam();
            initSelectManageTeam();
            initSelectDepartment();
        })
        .catch(function (error) {
            console.error(error);
        });
};
const getPromdiseTcs = async function () {
    axios
        .post("/transaction-manager/get-tc-list", {})
        .then(function (xhr) {
            let response = [];
            if (xhr.data.result) {
                response = xhr.data.data.list;
            }
            if (response.length > 0) {
                response.forEach((item) => {
                    tcsMap.set(item.tcId, item);
                });
            }
            initSelectTcs();
        })
        .catch(function (error) {
            console.error(error);
        });
};
const getPromiseCities = async function () {
    axios
        .post("/common/get-cities", {})
        .then(function (xhr) {
            if (xhr.data) {
                cities = xhr.data.map((x) => {
                    return {
                        id: x.cityId,
                        name: x.cityShortName,
                    };
                });
                initSelectCities();
            }
        })
        .catch(function (error) {
            console.error(error);
        });
    //initSelectCities();
};
//get cities by team
const getCitiesByZoneTeam = async function (ids) {
    axios
        .post("/common/get-cities-by-zone-team", { departmentIds: ids })
        .then(function (xhr) {
            if (xhr.data) {
                cities = xhr.data.data.list.map((x) => {
                    return {
                        id: x.cityId,
                        name: x.cityShortName,
                    };
                });
                cityField[0].selectize.destroy();
                initSelectCities();
            }
        })
        .catch(function (error) {
            console.error(error);
        });
};
const getPromiseDistricts = async function () {
    axios
        .post("/common/get-districts/1", {})
        .then(function (xhr) {
            if (xhr.data.result) {
                districts = xhr.data.data.map((x) => {
                    return {
                        id: x.districtId,
                        name: x.districtName,
                    };
                });
                initSelectDistricts();
            }
        })
        .catch(function (error) {
            console.error(error);
        });
};
//get district by zone team
const getDistrictsByZoneTeamCity = async function (dataPost) {
    axios
        .post("/common/get-districts-by-zone-team", dataPost)
        .then(function (xhr) {
            if (xhr.data) {
                districts = xhr.data.data.list.map((x) => {   
                    return {
                        id: x.districtId,
                        name: x.departmentName ? x.departmentName + " - " + x.districtShortName : x.districtShortName,
                    };
                });
                districtField[0].selectize.destroy();
                initSelectDistricts();
            }
        })
        .catch(function (error) {
            console.error(error);
        });
};
const getPromiseWards = async function () {
    axios
        .post("/common/get-wards/1", {})
        .then(function (xhr) {
            if (xhr.data.result) {
                wards = xhr.data.data.map((x) => {
                    return {
                        id: x.wardId,
                        name: x.wardName,
                    };
                });
                initSelectWards();
            }
        })
        .catch(function (error) {
            console.error(error);
        });
};
//get ward by zone team district
const getWardByZoneTeamDistrict = async function (dataPost) {
    axios
        .post("/common/get-wards-by-zone-team-district", dataPost)
        .then(function (xhr) {
            if (xhr.data) {
                wards = xhr.data.data.map((x) => {
                    return {
                        id: x.wardId,
                        name: x.wardName,
                    };
                });
                wardField[0].selectize.destroy();
                initSelectWards();
            }
        })
        .catch(function (error) {
            console.error(error);
        });
};
const initSelectDepartment = function () {
    const dataMap = departmentsMap.get("DEPARTMENT");
    let options = [];
    if (dataMap) {
        options = dataMap.map((it) => ({
            name: it.departmentName,
            id: it.id,
            parentId: it.parentId,
        }));
    }
    $("#departmentIds").selectize({
        plugins: ["remove_button"],
        valueField: "id",
        labelField: "name",
        searchField: "name",
        options: options,
        render: {
            item: function (data, escape) {
                return `<div> <span class="department-prefer" onclick="setPreferDepartment(this, ${data.id})"><i class="fa fa-star" /></i></span>  ${data.name}</div>`;
            },
        },
        create: false,
        onItemRemove: function (id) {
            $(`#positionGenerate #position-by-department-${id}`).remove();
            $(".position-prefer").removeClass("prefered-item");
            $("#preferPosition").val("");
            var idInput = $("#preferDepartment").val();
            if (idInput == id) {
                $("#preferDepartment").val("");
            }
        },
        onItemAdd: function (value, item) {
            var currentPrefered = $("#preferDepartment").val().trim();
            if (!currentPrefered) {
                $(".department-prefer").removeClass("prefered-item");
            }
        },
        onChange: function (value) {
            const data = [];
            if (Array.isArray(value)) {
                options.forEach((it) => {
                    if (value.indexOf(String(it.id)) > -1) {
                        data.push(it);
                    }
                });
            }
            renderPositionsSelect(data);
            //renderArea($(this).val());
        },
    });
    return false;
};
var initSelectZone = function () {
    const zoneMap = departmentsMap.get("ZONE");
    let zones = [];
    if (zoneMap) {
        zones = zoneMap.map((it) => ({
            name: it.departmentName,
            id: it.id,
            parentId: it.parentId,
        }));
    }
    var zone = $("#zoneIds").selectize({
        plugins: ["remove_button"],
        valueField: "id",
        labelField: "name",
        searchField: "name",
        options: zones,
        render: {
            item: function (data, escape) {
                return `<div> <span class="zone-prefer" onclick="setPreferZone(this, ${data.id})"><i class="fa fa-star" /></i></span>  ${data.name}</div>`;
            },
            option: function (item, escape) {
                return `<div data-parent-id="${item.parentId}" value="${item.id}-${item.name}">${item.name}</div>`;
            },
        },
        create: false,
        onItemRemove: function (data) {
            var id = $("#preferZone").val();
            if (id == data) {
                $("#preferZone").val("");
            }
            $("#all-zone").prop("checked", false);
        },
        onItemAdd: function (value, item) {
            var currentPrefered = $("#preferZone").val().trim();
            if (!currentPrefered) {
                $(".zone-prefer").removeClass("prefered-item");
            }
        },
        onChange: function (value) {
            console.log("onChange zone");
            departmentChooseArea = value;
            const zone = new Map();
            if (Array.isArray(value)) {
                zones.forEach((it) => {
                    if (value.indexOf(String(it.id)) > -1) {
                        zone.set(it.id, it);
                    }
                });
            }
            console.log(zone);
            getCitiesByZoneTeam(value);
            getDistrictsByZoneTeamCity({ zoneIds: value });
            getWardByZoneTeamDistrict({ departmentIds: value });
            initSelectTeam(zone);
            initSelectManageTeam(zone);
            initSelectArea();
            //clonezone
            console.log(zoneInstance.options);
            manageZoneInstance.setValue(value);
        },
    });
    var zoneInstance = zone[0].selectize;
    $("#all-zone").click(function (e) {
        if ($("#all-zone").is(":checked")) {
            zoneInstance.setValue(Object.keys(zoneInstance.options));
            manageZoneInstance.setValue(Object.keys(zoneInstance.options));
        } else {
            zoneInstance.setValue();
        }
    });
    return false;
};
const initSelectManageZone = function () {
    const zoneMap = departmentsMap.get("ZONE");
    let zones = [];
    if (zoneMap) {
        zones = zoneMap.map((it) => ({
            name: it.departmentName,
            id: it.id,
            parentId: it.parentId,
        }));
    }
    var manageZone = $("#manageZone").selectize({
        plugins: ["remove_button"],
        valueField: "id",
        labelField: "name",
        searchField: "name",
        options: zones,
        render: {
            item: function (data, escape) {
                return `<div> <span class="zone-prefer" onclick="setPreferZone(this, ${data.id})"><i class="fa fa-star" /></i></span>  ${data.name}</div>`;
            },
            option: function (item, escape) {
                return `<div data-parent-id="${item.parentId}" value="${item.id}-${item.name}">${item.name}</div>`;
            },
        },
        create: false,
        onItemRemove: function (data) {
            // var id = $("#preferZone").val();
            // if (id == data) {
            //     $("#preferZone").val('');
            // }
            // $("#all-zone").prop( "checked", false);
        },
        onItemAdd: function (value, item) {
            var currentPrefered = $("#preferManageZone").val().trim();
            if (!currentPrefered) {
                $(".zone-prefer").removeClass("prefered-item");
            }
        },
        onChange: function (value) {
            // console.log('onChange zone');
            // departmentChooseArea = value;
            // const zone = new Map();
            // if (Array.isArray(value)) {
            //     zones.forEach(it => {
            //         if (value.indexOf(String(it.id)) > -1) {
            //             zone.set(it.id, it);
            //         }
            //     });
            // }
            // console.log(zone);
            // getCitiesByZoneTeam(value);
            // getDistrictsByZoneTeamCity({"zoneIds": value});
            // getWardByZoneTeamDistrict({"departmentIds": value});
            // initSelectTeam(zone);
            // initSelectArea();
        },
    });
    manageZoneInstance = manageZone[0].selectize;
};
const initSelectTeam = function (zones = new Map()) {
    const teamMap = departmentsMap.get("GROUP");
    let teams = [];
    if (teamMap) {
        teamMap.forEach((it) => {
            if (zones.has(it.parentId)) {
                teams.push({
                    name: it.departmentName,
                    id: it.id,
                    parentId: it.parentId,
                    parentName: zones.get(it.parentId).name,
                });
            }
        });
    }
    // sort
    teams.sort((before, after) => before.parentId - after.parentId);
    $("#teamIds").selectize()[0].selectize.destroy();
    $("#teamIds").selectize({
        plugins: ["remove_button"],
        valueField: "id",
        labelField: "name",
        searchField: ["name", "parentName"],
        options: teams,
        render: {
            item: function (item, escape) {
                return `<div> <span class="team-prefer" onclick="setPreferTeam(this, ${item.id})"><i class="fa fa-star" /></i></span>  ${item.name} - </strong>${item.parentName}</strong></div>`;
            },
            option: function (item, escape) {
                return `<div data-parent-id="${item.parentId}" value="${item.id}-${item.name}">${item.name} - <strong>${item.parentName}</strong></div>`;
            },
        },
        create: false,
        onItemRemove: function (data) {
            var id = $("#preferTeam").val();
            if (id == data) {
                $("#preferTeam").val("");
            }
        },
        onItemAdd: function (value, item) {
            var currentPrefered = $("#preferTeam").val().trim();
            if (!currentPrefered) {
                $(".team-prefer").removeClass("prefered-item");
            }
        },
        onChange: function (value) {
            console.log("onChange team");
            departmentChooseArea = value;
            getCitiesByZoneTeam(value);
            getDistrictsByZoneTeamCity({ teamIds: value });
            getWardByZoneTeamDistrict({ departmentIds: value });
            //initSelectCities();
            initSelectArea();
            manageTeamInstance.setValue(value);
        },
    });
    return false;
};
const initSelectManageTeam = function (zones = new Map()) {
    const teamMap = departmentsMap.get("GROUP");
    let teams = [];
    if (teamMap) {
        teamMap.forEach((it) => {
            if (zones.has(it.parentId)) {
                teams.push({
                    name: it.departmentName,
                    id: it.id,
                    parentId: it.parentId,
                    parentName: zones.get(it.parentId).name,
                });
            }
        });
    }
    // sort
    teams.sort((before, after) => before.parentId - after.parentId);
    $("#manageTeamIds").selectize()[0].selectize.destroy();
    var manageTeam = $("#manageTeamIds").selectize({
        plugins: ["remove_button"],
        valueField: "id",
        labelField: "name",
        searchField: ["name", "parentName"],
        options: teams,
        render: {
            item: function (item, escape) {
                return `<div> <span class="team-prefer" onclick="setPreferTeam(this, ${item.id})"><i class="fa fa-star" /></i></span>  ${item.name} - </strong>${item.parentName}</strong></div>`;
            },
            option: function (item, escape) {
                return `<div data-parent-id="${item.parentId}" value="${item.id}-${item.name}">${item.name} - <strong>${item.parentName}</strong></div>`;
            },
        },
        create: false,
        onItemRemove: function (data) {
            // var id = $("#preferTeam").val();
            // if (id == data) {
            //     $("#preferTeam").val('');
            // }
        },
        onItemAdd: function (value, item) {
            // var currentPrefered = $("#preferTeam").val().trim();
            // if (!currentPrefered) {
            //     $(".team-prefer").removeClass("prefered-item");
            // }
        },
        onChange: function (value) {
            // console.log('onChange team');
            // departmentChooseArea = value;
            // getCitiesByZoneTeam(value);
            // getDistrictsByZoneTeamCity({"teamIds": [28]});
            // getWardByZoneTeamDistrict({"departmentIds": value});
            // //initSelectCities();
            // initSelectArea();
        },
    });
    manageTeamInstance = manageTeam[0].selectize;
    return false;
};
const initSelectTcs = function () {
    let options = [];
    tcsMap.forEach((it) => {
        options.push({
            name: it.fullName,
            id: it.tcId,
        });
    });
    options.sort((before, after) => before.id - after.id);
    $("#tcIds").selectize({
        plugins: ["remove_button"],
        valueField: "id",
        labelField: "name",
        searchField: ["name"],
        options: options,
        render: {
            item: function (item, escape) {
                return `<div> <span class="tc-prefer" onclick="setPreferTc(this, ${item.id})"><i class="fa fa-star" /></i></span>  ${item.name}</div>`;
            },
            option: function (item, escape) {
                return `<div value="${item.id}-${item.name}">${item.name}</div>`;
            },
        },
        create: false,
        onItemRemove: function (data) {
            var id = $("#preferTc").val();
            if (id == data) {
                $("#preferTc").val("");
            }
        },
        onItemAdd: function (value, item) {
            var currentPrefered = $("#preferTc").val().trim();
            if (!currentPrefered) {
                $(".tc-prefer").removeClass("prefered-item");
            }
        },
    });
    return false;
};
const initSelectCities = () => {
    console.log(cities);
    cityField = $("#cityIds").selectize({
        plugins: ["remove_button"],
        valueField: "id",
        labelField: "name",
        searchField: "name",
        options: cities,
        render: {
            item: function (data, escape) {
                return `<div><span class="city-prefer" onclick="setPreferCity(this, ${data.id})"><i class="fa fa-star" /></i></span>  ${data.name}</div>`;
            },
            option: function (item, escape) {
                return `<div data-parent-id="${item.parentId}" value="${item.id}-${item.name}">${item.name}</div>`;
            },
        },
        create: false,
        onItemRemove: function (data) {
            var id = $("#preferCity").val();
            if (id == data) {
                $("#preferCity").val("");
            }
        },
        onItemAdd: function (value, item) {
            var currentPrefered = $("#preferCity").val().trim();
            if (!currentPrefered) {
                $(".city-prefer").removeClass("prefered-item");
            }
        },
        onChange: function (value) {
            // on change cities
            getDistrictsByZoneTeamCity({ cityIds: value });
        },
    });
    return false;
};
const initSelectDistricts = () => {
    districtField = $("#districtIds").selectize({
        plugins: ["remove_button"],
        valueField: "id",
        labelField: "name",
        searchField: "name",
        options: districts,
        render: {
            item: function (data, escape) {
                return `<div><span class="district-prefer" onclick="setPreferDistrict(this, ${data.id})"><i class="fa fa-star" /></i></span>  ${data.name}</div>`;
            },
            option: function (item, escape) {
                return `<div data-parent-id="${item.parentId}" value="${item.id}-${item.name}">${item.name}</div>`;
            },
        },
        create: false,
        onItemRemove: function (data) {
            var id = $("#preferDistricts").val();
            if (id == data) {
                $("#preferDistricts").val("");
            }
        },
        onItemAdd: function (value, item) {
            // var currentPrefered = $('#preferDistricts').val().trim();
            // if (!currentPrefered) {
            //     $('.district-prefer').removeClass('prefered-item');
            // }
        },
        onChange: function (value) {
            // on change districts
            getWardByZoneTeamDistrict({ districtIds: value });
        },
    });
    return false;
};
const initSelectWards = () => {
    wardField = $("#wardIds").selectize({
        plugins: ["remove_button"],
        valueField: "id",
        labelField: "name",
        searchField: "name",
        options: wards,
        render: {
            item: function (data, escape) {
                return `<div><span class="ward-prefer" onclick="setPreferWard(this, ${data.id})"><i class="fa fa-star" /></i></span>  ${data.name}</div>`;
            },
            option: function (item, escape) {
                return `<div data-parent-id="${item.parentId}" value="${item.id}-${item.name}">${item.name}</div>`;
            },
        },
        create: false,
        onItemRemove: function (data) {
            var id = $("#preferWard").val();
            if (id == data) {
                $("#preferWard").val("");
            }
        },
        onItemAdd: function (value, item) {
            var currentPrefered = $("#preferWard").val().trim();
            if (!currentPrefered) {
                $(".ward-prefer").removeClass("prefered-item");
            }
        },
        onChange: function (value) {
            // on change wards
        },
    });
    return false;
};
const initSelectArea = async function () {
    let districts = [];
    await axios
        .post("/zone/get-districts-by-department", {
            department: departmentChooseArea.join(","),
        })
        .then((xhr) => {
            if (xhr.data.result) {
                districts = xhr.data.data;
            }
        })
        .catch((err) => {
            console.error(err);
        });
    // sort
    districts.sort((before, after) => before.districtId - after.districtId);
    $("#areaIds").selectize()[0].selectize.destroy();
    $("#areaIds").selectize({
        plugins: ["remove_button"],
        valueField: "districtId",
        labelField: "districtName",
        searchField: ["districtName"],
        options: districts,
        render: {
            item: function (item, escape) {
                return `<div> <span class="area-prefer" onclick="setPreferArea(this, ${item.districtId})"><i class="fa fa-star" /></i></span>  ${item.districtName}</div>`;
            },
            option: function (item, escape) {
                return `<div value="${item.districtId}">${item.districtName}</div>`;
            },
        },
        create: false,
        onItemRemove: function (data) {
            var id = $("#preferArea").val();
            if (id == data) {
                $("#preferArea").val("");
            }
        },
        onItemAdd: function (value, item) {
            var currentPrefered = $("#preferArea").val().trim();
            if (!currentPrefered) {
                $(".area-prefer").removeClass("prefered-item");
            }
        },
    });
    return false;
};
/*var initSelectPositions = function() {
    $(".positionIds").selectize({
        plugins: ['remove_button'],
        render: {
            item: function (data, escape) {
                var returnVal = '<div> <span class="position-prefer" onclick="return setPreferPosition(this, ' + data.value.split('-')[0] + ')"><i class="fa fa-star" /></i></span> ' + data.text + '</div>';
                return returnVal;
            }
        },
        create: false,
        onItemRemove: function (data) {
            var id = $("#preferPosition").val();
            if (id == data) {
                $("#preferPosition").val('');
            }
        },
        onItemAdd: function (value, item) {
            var currentPrefered = $("#preferPosition").val().trim();
            if (!currentPrefered) {
                $(".position-prefer").removeClass("prefered-item");
            }
        }
    });
    return false;
};*/
const renderPositionsSelect = function (valueDepartment = []) {
    if (Array.isArray(valueDepartment)) {
        valueDepartment.forEach((item, k) => {
            const departmentName = item.name;
            const id = item.id;
            if (
                $(`#positionGenerate #position-by-department-${id}`).length == 0
            ) {
                axios
                    .get("/common/get-positions/" + id)
                    .then((xhr) => {
                        let data = [];
                        if (xhr.data.result) {
                            data = xhr.data.data.map((it) => {
                                return `<option value="${it.positionId}">${it.positionName}</option>`;
                            });
                        }
                        const html = `<input class="idDepartment" type="hidden" value="${id}"/>
                                <div departmentName="${departmentName}" id="position-by-department-${id}" class="col-md-6">
                                <h5 style="text-align: center;background-color: darkgray;color: white;font-weight: bold;margin-bottom: 0;">${departmentName}</h5>
                                <select class="positionIds" id="positionId${id}" name="positionIds[]" multiple="multiple">${data.join(
                            ""
                        )}</select></div>`;
                        $("#positionGenerate").append(html);
                        PositionIdDom("#positionId" + id);
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            }
        });
    }
};
var renderArea = function (valueDepartment) {
    if (valueDepartment !== null) {
        var text_area = "";
        var dataPost = {};
        var departmentIds = [];
        $.each(valueDepartment, function (k, v) {
            var arr = v.split("-");
            departmentIds[k] = arr[0];
        });
        dataPost.departmentIds = departmentIds;
        //console.log(dataPost);
        $.ajax({
            url: "/common/get-areas-by-department",
            data: JSON.stringify(dataPost),
            type: "post",
        }).done(function (response) {
            //console.log(response);
            if (response.result) {
                if (response.data.length > 0) {
                    $.each(response.data, function (key, value) {
                        text_area += value.districtName + ", ";
                    });
                    text_area = text_area.trim().slice(0, -1);
                }
            }
            $("#text-area").text(text_area);
        });
    } else {
        $("#text-area").text("");
    }
};
function PositionIdDom(id) {
    $(id).selectize({
        plugins: ["remove_button"],
        render: {
            item: function (data, escape) {
                var returnVal =
                    '<div> <span class="position-prefer" onclick="return setPreferPosition(this, ' +
                    data.value.split("-")[0] +
                    ')"><i class="fa fa-star" /></i></span> ' +
                    data.text +
                    "</div>";
                return returnVal;
            },
        },
        placeholder: "--Chon--",
        create: false,
        onItemRemove: function (data) {
            var id = $("#preferDepartment").val();
            if (id == data) {
                $("#preferDepartment").val("");
            }
        },
        onItemAdd: function (value, item) {
            var currentPrefered = $("#preferDepartment").val().trim();
            if (!currentPrefered) {
                $(".department-prefer").removeClass("prefered-item");
            }
        },
    });
    return false;
}
function setPreferDepartment(selector, id) {
    // reset position
    $(".position-prefer").removeClass("prefered-item");
    $("#preferPosition").val("");
    // reset departments
    $(".department-prefer").removeClass("prefered-item");
    $("#preferDepartment").val(id);
    $(selector).addClass("prefered-item");
    return false;
}
function setPreferPosition(selector, id) {
    var preferDepartment = $("#preferDepartment").val();
    if (preferDepartment == "") {
        alert("Cần chọn 1 bộ phận yêu thích");
        return false;
    }
    var idDepartmentPositionPrefer = $(selector).parents().eq(3).prev().val();
    if (preferDepartment == idDepartmentPositionPrefer) {
        $(".position-prefer").removeClass("prefered-item");
        $("#preferPosition").val(id);
        $(selector).addClass("prefered-item");
    } else {
        alert("Chức vụ yêu thích phải thuộc bộ phận yêu thích");
    }
    return false;
}
function setPreferZone(selector, id) {
    // reset zone
    $(".zone-prefer").removeClass("prefered-item");
    $("#preferZone").val(id);
    $(selector).addClass("prefered-item");
    return false;
}
function setPreferTeam(selector, id) {
    // reset zone
    $(".team-prefer").removeClass("prefered-item");
    $("#preferTeam").val(id);
    $(selector).addClass("prefered-item");
    return false;
}
function setPreferTc(selector, id) {
    // reset zone
    $(".tc-prefer").removeClass("prefered-item");
    $("#preferTc").val(id);
    $(selector).addClass("prefered-item");
    return false;
}
function setPreferArea(selector, id) {
    // reset zone
    $(".area-prefer").removeClass("prefered-item");
    $("#preferArea").val(id);
    $(selector).addClass("prefered-item");
    return false;
}
const setPreferCity = (selector, id) => {
    $(".city-prefer").removeClass("prefered-item");
    $("#preferCity").val(id);
    $(selector).addClass("prefered-item");
    return false;
};
const setPreferDistrict = (selector, id) => {
    $(".district-prefer").removeClass("prefered-item");
    $("#preferDistrict").val(id);
    $(selector).addClass("prefered-item");
    return false;
};
const setPreferWard = (selector, id) => {
    $(".ward-prefer").removeClass("prefered-item");
    $("#preferWard").val(id);
    $(selector).addClass("prefered-item");
    return false;
};
function changePrimary(element) {
    if ($(element).val() == 1) {
        $("#alternativePhones").find("select").not(element).val(0);
    }
}
const addNewPhone = () => {
    $("#alternativePhones").append(
        `<div class="form-group">
            <label class="col-md-4 control-label"></label>
            <div class="col-md-5">
                <input class="form-control invite-input invite-phone" name="invite_phone" placeholder="Số điện thoại" />
            </div>
            <div class="col-md-3">
                <select class="form-control" name="primaryPhone" onchange="changePrimary(this);">
                    <option value="1">Số chính</option>
                    <option value="0" selected>Số phụ</option>
                </select>
            </div>
        </div>`
    );
};
