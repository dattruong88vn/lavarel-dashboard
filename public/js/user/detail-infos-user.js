// new for update info
const departmentsMap = new Map();
const tcsMap = new Map();
let departmentChooseArea = [];
let dbZones = null;
let dbTeams = null;
let dbDistricts = null;
let dbWards = null;
let districts = [];
let wards = [];
var manageZoneInstance = null;
var zoneInstance = null;
var teamInstance = null;
var tcInstance = null;
var cityInstance = null;
var districtInstance = null;
var wardInstance = null;
var departmentInstance = null;
var infoUserResponse = null;
var _isFirstLoad = true;
async function initPage() {
    await getPromdiseDepartments();
    await getPromdiseTcs();
    //fill tcs
    getPromiseCities();
    //initSelectZone();
    //initSelectTcs();
    //initSelectDepartment();
    //initSelectDepartment();
    /*initSelectPositions();*/
    //initSelectTcs();
    //initSelectArea();
    initSelectDistricts();
    districtInstance.setValue($("#preDistrictId").val().split("|"));
    initSelectWards();
    wardInstance.setValue($("#preWardId").val().split("|"));
    //fill zone
    zoneInstance.setValue($("#preZoneId").val().split("|"));
    //fill city
    //fill district
    //fill ward
    //fill department
    //fill position
}
const getPromdiseDepartments = async function () {
    let response = [];
    await axios.post('/departments/api-get-all', {})
        .then(function (xhr) {
            if(xhr.data.result) {
                response = xhr.data.data;
            }
        })
        .catch(function (error) {
            console.error(error);
        });
    if(response.length > 0) {
        response.forEach(item => {
            let departments = [];
            if(departmentsMap.has(item.departmentType)) {
                departments = [...departmentsMap.get(item.departmentType), item];
            } else {
                departments = [item];
            }
            departmentsMap.set(item.departmentType, departments);
        });
    }
    initSelectZone(true);
    
    //initSelectManageZone();
    initSelectTeam();
    //initSelectManageTeam();
    initSelectDepartment();
    departmentInstance.setValue($("#preDepartmentId").val().split("|"));
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
            tcInstance.setValue($("#preTcId").val().split("|"));
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
                cityInstance.setValue($("#preCityId").val().split("|"));
            }
        })
        .catch(function (error) {
            console.error(error);
        });
    //initSelectCities();
};
//get district by zone team
const getDistrictsByZoneTeamCity = async function (dataPost, isFirstLoad = false) {
    axios
        .post("/common/get-districts-by-zone-team", dataPost)
        .then(function (xhr) {
            if (xhr.data) {
                districts = xhr.data.data.list.map((x) => {
                    return {
                        id: x.districtId+"_"+x.cityId,
                        name: x.departmentName ? x.departmentName + " - " + x.districtShortName : x.districtShortName,
                    };
                });
                districtField[0].selectize.destroy();
                initSelectDistricts();
                if (isFirstLoad) {
                    districtInstance.setValue($("#preDistrictId").val().split("|"));
                    isFirstLoad = false;
                }
            }
        })
        .catch(function (error) {
            console.error(error);
        });
};
//get ward by zone team district
const getWardByZoneTeamDistrict = async function (dataPost, isFirstLoad = false) {
    axios
        .post("/common/get-wards-by-zone-team-district", dataPost)
        .then(function (xhr) {
            if (xhr.data) {
                wards = xhr.data.data.map((x) => {
                    return {
                        id: x.wardId+"_"+x.cityId+"_"+x.districtId,
                        name: x.wardName,
                    };
                });
                wardField[0].selectize.destroy();
                initSelectWards();
                if (isFirstLoad) {
                    wardInstance.setValue($("#preWardId").val().split("|"));
                    isFirstLoad = false;
                }
            }
        })
        .catch(function (error) {
            console.error(error);
        });
};
const initSelectZone = function(isFirstLoad = false){
    const zoneMap = departmentsMap.get('ZONE');
    let zones = [];
    if (zoneMap) {
        zones = zoneMap.map(it => ({
            name : it.departmentName,
            id : it.id,
            parentId : it.parentId
        }));
    }
    //$('#preferZone').val(prefer.join(','));
    var zone = $("#zoneIds").selectize({
        plugins: ['remove_button'],
        valueField: 'id',
        labelField: 'name',
        searchField: 'name',
        options: zones,
        render: {
            item: function (data, escape) {
                let _prefer = $('#preferZone').val().trim() == data.id ? 'prefered-item' : '';
                return `<div> <span class="zone-prefer ${_prefer}" onclick="setPreferZone(this, ${data.id})"><i class="fa fa-star" /></i></span>  ${data.name}</div>`;
            },
            option : function(item, escape) {
                return `<div data-parent-id="${item.parentId}" value="${item.id}-${item.name}">${item.name}</div>`;
            }
        },
        create: false,
        onItemRemove: function (data) {
            var id = $("#preferZone").val();
            if (id == data) {
                $("#preferZone").val('');
            }
        },
        onItemAdd: function (value, item) {
            var currentPrefered = $("#preferZone").val().trim();
            if (!currentPrefered) {
                $(".zone-prefer").removeClass("prefered-item");
            }
        },
        onChange : function (value) {
            if (value == null) {
                isFirstLoad = false;
            }
            //console.log('onChange zone');
            departmentChooseArea = value? value: [];
            const zone = new Map();
            if (Array.isArray(value)) {
                zones.forEach(it => {
                    if (value.indexOf(String(it.id)) > -1) {
                        zone.set(it.id, it);
                    }
                });
            }
            
            initSelectTeam(zone, isFirstLoad);
            getCitiesByZoneTeam(value, isFirstLoad);
            getDistrictsByZoneTeamCity({ zoneIds: value }, isFirstLoad);
            getWardByZoneTeamDistrict({ departmentIds: value }, isFirstLoad);
            if(isFirstLoad) {
                teamInstance.setValue($("#preTeamId").val().split("|"));
            }
            renderSelectAdminOfZones(true);
            //initSelectArea();
            //manageZoneInstance.setValue(value);
            alert(isFirstLoad);
        }
    });
    zoneInstance = zone[0].selectize;
    
    // reload Team
    // initSelectTeam(zoneInit);
    // renderSelectAdminOfZones(true);
    // initSelectArea();
    
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
    var manageZone = $("#manageZones").selectize({
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
const initSelectTeam = function(zones = new Map(), isFirstLoad = false){
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
    var team = $("#teamIds").selectize({
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
            getCitiesByZoneTeam(value, isFirstLoad);
            getDistrictsByZoneTeamCity({ teamIds: value }, isFirstLoad);
            getWardByZoneTeamDistrict({ departmentIds: value }, isFirstLoad);
            //initSelectCities();
            //initSelectArea();
            //manageTeamInstance.setValue(value);
            isFirstLoad = false;
        },
    });
    teamInstance = team[0].selectize;
    return false;
};
//get cities by team
const getCitiesByZoneTeam = async function (ids, isFirstLoad = false) {
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
                cityInstance ? cityInstance.destroy() : '';
                debugger;
                initSelectCities();
                if (isFirstLoad) {
                    cityInstance.setValue($("#preCityId").val().split("|"));
                    isFirstLoad = false;
                }
            }
        })
        .catch(function (error) {
            console.error(error);
        });
};
const initSelectTcs = function(isFirstLoad = true){
    let options = [];
    tcsMap.forEach((it) => {
        options.push({
            name: it.fullName,
            id: it.tcId,
        });
    });
    options.sort((before, after) => before.id - after.id);
    var tc = $("#tcIds").selectize({
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
    tcInstance = tc[0].selectize;
    return false;
};
const initSelectDepartment = function(isFirstLoad = true){
    const dataMap = departmentsMap.get("DEPARTMENT");
    let options = [];
    if (dataMap) {
        options = dataMap.map((it) => ({
            name: it.departmentName,
            id: it.id,
            parentId: it.parentId,
        }));
    }
    var department = $("#departmentIds").selectize({
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
    departmentInstance = department[0].selectize;
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
    cityInstance = cityField[0].selectize;
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
            getWardByZoneTeamDistrict({ districtIds: value.map((o) => {return(o.split("_")[0])}) });
        },
    });
    districtInstance = districtField[0].selectize;
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
    wardInstance = wardField[0].selectize;
    return false;
};
const renderSelectAdminOfDepartments = function(isFistRender){
    var html = "";
    $("#departmentIds option:selected").each(function(){
        var value = $(this).attr("value");
        var name = $(this).html();
        var selected = "";
        if(isFistRender){
            for(var i=0;i<_USER_DEPARTMENTS.length; i++){
                var dep = _USER_DEPARTMENTS[i];
                if(dep.departmentId == value && dep.isGroupAdmin){
                    selected = "selected='selected'";
                }
            }
        }
        html += "<option value='"+value+"' "+selected+" >";
        html += name;
        html += "</option>";
    });
    $("#adminOfDepartments").html(html);
    $("#adminOfDepartments").select2();
};
const renderSelectAdminOfZones = function(isFistRender){
    var html = "";
    $("#zoneIds option:selected").each(function(){
        var value = $(this).attr("value");
        var name = $(this).html();
        var selected = "";
        if(isFistRender){
            for(var i=0;i<_USER_DEPARTMENTS.length; i++){
                var dep = _USER_DEPARTMENTS[i];
                if(dep.departmentId == value && dep.isGroupAdmin){
                    selected = "selected='selected'";
                }
            }
        }
        html += "<option value='"+value+"' "+selected+" >";
        html += name;
        html += "</option>";
    });
    $("#adminOfZones").html(html);
    $("#adminOfZones").select2();
};
const renderSelectAdminOfTeams = function(isFistRender){
    var html = "";
    $("#teamIds option:selected").each(function(){
        var value = $(this).attr("value");
        var name = $(this).html();
        var selected = "";
        if(isFistRender){
            for(var i=0;i<_USER_DEPARTMENTS.length; i++){
                var dep = _USER_DEPARTMENTS[i];
                if(dep.departmentId == value && dep.isGroupAdmin){
                    selected = "selected='selected'";
                }
            }
        }
        html += "<option value='"+value+"' "+selected+" >";
        html += name;
        html += "</option>";
    });
    $("#adminOfTeams").html(html);
    $("#adminOfTeams").select2();
};
const renderPositionsSelect = function(valueDepartment = []){
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
                        $("#positionId" + id).selectize()[0].selectize.setValue($('#prePositionId').val().split("|"));
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            }
        });
    }
};
const initSelectArea = async function(isFirstLoad = true, action = 'default'){
    let cities = [];
    await axios.post('/common/getCitiesByZoneTeam', {
        countryIds: [],
        departmentIds: $('#zoneIds').val().map(x => Number(x))
    }).then(xhr => {
        cities = xhr.data.data.list;
    }).catch(err => {
        console.error(err);
    });
	
	// default items
    let defaultItems = [];
    let prefer = [];
    if (isFirstLoad && Array.isArray(_USER_CITIES) && _USER_CITIES.length > 0) {
        cities.forEach(it => {
            const finds = _USER_CITIES.find(itFilter => it.cityId == itFilter.cityId);
            if (finds != undefined) {
                defaultItems.push(it.cityId);
                // set prefer
                if (finds.isPrimary === true) {
                    prefer.push(it.cityId);
                }
            }
        });
    }
    if(action == "change"){
        defaultItems = [];
    }
	reloadSelCities(cities);
    if($('#cityIds').length > 0){
        $('#preferCity').val(prefer.join(','));
        $('#cityIds').selectize()[0].selectize.destroy();
        $("#cityIds").selectize({
            plugins: ['remove_button'],
            valueField: 'cityId',
            labelField: 'cityName',
            searchField: ['cityName'],
            items: defaultItems,
            options: cities,
            render: {
                item: function (item, escape) {
                    let _prefer = $('#preferCity').val().trim() == item.cityId ? 'prefered-item' : '';
                    return `<div> <span class="city-prefer ${_prefer}" onclick="setPreferCity(this, ${item.cityId})"><i class="fa fa-star" /></i></span>  ${item.cityName}</div>`;
                },
                option : function(item, escape) {
                    return `<div value="${item.cityId}">${item.cityName}</div>`;
                }
            },
            create: false,
            onItemRemove: function (data) {
                var id = $("#preferCity").val();
                if (id == data) {
                    $("#preferCity").val('');
                }
            },
            onItemAdd: function (value, item) {
                var currentPrefered = $("#preferCity").val().trim();
                if (!currentPrefered) {
                    $(".city-prefer").removeClass("prefered-item");
                }
            }
        });
	}
	initSelectDistrict(isFirstLoad, action);
	return false;
};
// const initSelectDistrict = async function(isFirstLoad = true, action = 'default'){
//     let districts = [];
//     await axios.post('/zone/get-districts-by-department', {
//         department : departmentChooseArea.join(',')
//     }).then(xhr => {
//         if(xhr.data.result) {
//             districts = xhr.data.data;
//         }
//     }).catch(err => {
//         console.error(err);
//     });
//     // sort
//     districts.sort((before, after) => before.districtId - after.districtId);
//     if($('#zoneIds').val() == null){
//         districts = _ALL_DISTRICT;
//     }
//     // default items
//     let defaultItems = [];
//     let prefer = [];
//     if (isFirstLoad && Array.isArray(_USER_DISTRICTS) && _USER_DISTRICTS.length > 0) {
//         districts.forEach(it => {
//             const finds = _USER_DISTRICTS.find(itFilter => it.districtId == itFilter.districtId);
//             if (finds != undefined) {
//                 defaultItems.push(it.districtId);
//                 // set prefer
//                 if (finds.isPrimary === true) {
//                     prefer.push(it.districtId);
//                 }
//             }
//         });
//     }
//     if(action == "change"){
//         defaultItems = [];
//     }
// 	dbDistricts = dbDistricts ?? defaultItems;
// 	reloadSelDistricts(districts);
//     if($('#districtIds').length > 0){
//         $('#preferDistrict').val(prefer.join(','));
//         $('#districtIds').selectize()[0].selectize.destroy();
//         $("#districtIds").selectize({
//             plugins: ['remove_button'],
//             valueField: 'districtId',
//             labelField: 'districtName',
//             searchField: ['districtName'],
//             items : defaultItems,
//             options : districts,
//             render: {
//                 item: function (item, escape) {
//                     let _prefer = $('#preferDistrict').val().trim() == item.districtId ? 'prefered-item' : '';
//                     return `<div> <span class="district-prefer ${_prefer}" onclick="setPreferArea(this, ${item.districtId})"><i class="fa fa-star" /></i></span>  ${item.districtName}</div>`;
//                 },
//                 option : function(item, escape) {
//                     return `<div value="${item.districtId}">${item.districtName}</div>`;
//                 }
//             },
//             create: false,
//             onItemRemove: function (data) {
//                 var id = $("#preferDistrict").val();
//                 if (id == data) {
//                     $("#preferDistrict").val('');
//                 }
//             },
//             onItemAdd: function (value, item) {
//                 var currentPrefered = $("#preferDistrict").val().trim();
//                 if (!currentPrefered) {
//                     $(".district-prefer").removeClass("prefered-item");
//                 }
//             }
//         });
//     }
//     return false;
// };
//-------//
var updateData = {};
var updatePositionsContact = function (event,element){
    event.stopPropagation();
    var userId = $(element).attr('data-userId');
    var parent = $(element).parents("ul");
    var positionIds = [];
    $(parent.find("li")).each(function(){
        var pos = $(this).find('.data-position').val();
        if($(this).find('.data-position').is(":checked")){
            positionIds.push(pos);
        }
    });
    updateData['userId'] = userId;
    updateData['positionIds'] = positionIds;
    
    console.log(updateData);
    
    showPropzyLoading();
        
    $.ajax({
        url: "/user/update-positions",
        data: JSON.stringify(updateData),
        type: "post"
    }).done(function (response) {
        console.log(response);
        if (response.result) {
            console.log(response.message);
        } else {
            showPropzyAlert(response.message);
        }
    }).always(function () {
        hidePropzyLoading();
    });
};
var dateTimeRender = function (data, type, object) {
    if (!data)
        return "";
    return $.format.date(new Date(data), "dd/MM/yyyy");
};
var renderLink = function (data, type, object) {
    return "<a href='/deal/detail/" + object.dealId + "'>" + data + "</a>";
};
function generateListUrl(userId, statusId, progressQuoIDs){
    var baseUrl = "/user/get-list-deal/" + userId + '/' + statusId;
    var params = "";
    if(progressQuoIDs){
        params += "progressQuoIDs="+progressQuoIDs;
    }
    return baseUrl + "?" + params;
}
var showData = function (userId, statusId, progressQuoIDs) {
    $("#data-detail").DataTable().ajax.url(generateListUrl(userId, statusId, progressQuoIDs)).load();
    return false;
};
/*var initSelectDepartment = function(){
    $("#departmentIds").selectize({
        plugins: ['remove_button'],
        render: {
            item: function (data, escape) {
                var currentPrefered = $("#preferDepartment").val().trim();
                var isPrefered = "";
                if (currentPrefered && data.value.split('-')[0] == currentPrefered) {
                    isPrefered = "prefered-item";
                }
                var returnVal = '<div> <span class="department-prefer ' + isPrefered + '" onclick="return setPreferDepartment(this, ' + data.value.split('-')[0] + ')"><i class="fa fa-star" /></i></span> ' + data.text + '</div>';
                return returnVal;
            }
        },
        create: false,
        onItemRemove: function (data) {
            var arr = data.split('-');
            var id = arr[0];
            var name = arr[1];
            $('.position-prefer').removeClass('prefered-item');
            $('#preferPosition').val('');
            var idInput = $("#preferDepartment").val();
            if (idInput == id) {
                $("#preferDepartment").val('');
            }
        },
        onItemAdd: function (value, item) {
            var currentPrefered = $("#preferDepartment").val().trim();
            if (!currentPrefered) {
                $(".department-prefer").removeClass("prefered-item");
            }
        }
    });
    return false;
};*/
function setPreferDepartment(selector, id) {
    // reset position
    $('.position-prefer').removeClass('prefered-item');
    $('#preferPosition').val('');
    // reset departments
    $(".department-prefer").removeClass('prefered-item');
    $("#preferDepartment").val(id);
    $(selector).addClass('prefered-item');
    return false;
};
var initSelectPositions = function() {
    $("#positionIds").selectize({
        plugins: ['remove_button'],
        render: {
            item: function (data, escape) {
                var currentPrefered = $("#preferPosition").val().trim();
                var isPrefered = "";
                if (currentPrefered && data.value.split('-')[0] == currentPrefered) {
                    isPrefered = "prefered-item";
                }
                var returnVal = '<div> <span class="position-prefer ' + isPrefered + '" onclick="return setPreferPosition(this, ' + data.value.split('-')[0] + ')"><i class="fa fa-star" /></i></span> ' + data.text + '</div>';
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
};
function setPreferPosition(selector, id) {
    var preferDepartment = $('#preferDepartment').val();
    if(preferDepartment == ''){
        alert('Cần chọn 1 bộ phận yêu thích');
        return false;
    }
    
    var idDepartmentPositionPrefer = $(selector).parents().eq(3).prev().val();
    if(preferDepartment == idDepartmentPositionPrefer){
        $(".position-prefer").removeClass('prefered-item');
        $("#preferPosition").val(id);
        $(selector).addClass('prefered-item');
    }else{
        alert('Chức vụ yêu thích phải thuộc bộ phận yêu thích');
    }
    
    return false;
}
function setPreferZone(selector, id) {
    // reset zone
    $('.zone-prefer').removeClass('prefered-item');
    $("#preferZone").val(id);
    $(selector).addClass('prefered-item');
    return false;
};
function setPreferTeam(selector, id) {
    // reset zone
    $('.team-prefer').removeClass('prefered-item');
    $("#preferTeam").val(id);
    $(selector).addClass('prefered-item');
    return false;
};
function setPreferTc(selector, id) {
    // reset zone
    $('.tc-prefer').removeClass('prefered-item');
    $("#preferTc").val(id);
    $(selector).addClass('prefered-item');
    return false;
};
function setPreferCity(selector, id) {
    // reset zone
    $('.city-prefer').removeClass('prefered-item');
    $("#setPreferCity").val(id);
    $(selector).addClass('prefered-item');
    return false;
};
function setPreferArea(selector, id) {
    // reset zone
    $('.district-prefer').removeClass('prefered-item');
    $("#preferDistrict").val(id);
    $(selector).addClass('prefered-item');
    return false;
};
function PositionIdDom(id, defaultItems = [], prefer = []) {
    //$("#preferPosition").val(prefer.join(','));
    $(id).selectize({
        plugins: ['remove_button'],
        items : defaultItems,
        render: {
            item: function (data, escape) {
                var currentPrefered = $("#preferPosition").val().trim();
                var isPrefered = "";
                if (currentPrefered && data.value.split('-')[0] == currentPrefered) {
                    isPrefered = "prefered-item";
                }
                var returnVal = '<div> <span class="position-prefer ' + isPrefered + '" onclick="return setPreferPosition(this, ' + data.value.split('-')[0] + ')"><i class="fa fa-star" /></i></span> ' + data.text + '</div>';
                return returnVal;
            }
        },
        create: false,
        onItemRemove: function (data) {
            var id = $("#preferDepartment").val();
            if (id == data) {
                $("#preferDepartment").val('');
            }
        },
        onItemAdd: function (value, item) {
            var currentPrefered = $("#preferDepartment").val().trim();
            if (!currentPrefered) {
                $(".department-prefer").removeClass("prefered-item");
            }
        }
    });
    return false;
}
$(function(){
    var userId = $('#userId').val();
    initPage();
    $('#status-user').on('change',function(){
        var status = $('#status-user').val();
        var dataSend = {};
        dataSend['userId'] = userId;
        dataSend['statusId'] = status;
        //console.log(dataSend);
        showPropzyLoading();
        $.ajax({
            url: "/user/do-update-status-user",
            data: JSON.stringify(dataSend),
            type: "post"
        }).done(function (response) {
            //console.log(response);
            if (response.result) {
                showPropzyAlert(response.message);
                $('#alertModal').on('hide.bs.modal',function () {
                    window.location.reload();
                });
            } else {
                showPropzyAlert(response.message);
            }
        }).always(function () {
            hidePropzyLoading();
        });
    });
    
    $("#startDate").datepicker({
        format: 'dd-mm-yyyy',
        autoclose: true,
        minDate: 0
    });
    //initSelectDepartment();
    //initSelectDistrict();
    initSelectPositions();
    //
    var validateOptions = {
        ignore: null,
        rules: {
            "name": {required: true},
            "email" : {required: true},
            "departmentIds[]": {required: true},
            //"preferDepartment" : {required: true},
            // "districtIds[]": {required: true},
            // "preferDistrict": {required: true},
            "positionIds[]" : {required: true},
            //"preferPosition" : {required: true},
            // "zoneIds[]": {required: true},
            // "preferZone": {required: true},
            // "teamIds[]": {required: true},
            // "preferTeam": {required: true},
            "tcIds[]": {required: true}
            //"preferTc": {required: true}
        },
        messages: {
            "name": {required: 'Nhập Tên bộ phận'},
            "email" : {required: 'Chọn Loại bộ phận'},
            "departmentIds[]": {required: 'Nhập Phòng ban'},
            //"preferDepartment": {required: 'Chọn Phòng ban yêu thích'},
            // "districtIds[]": {required: 'Chọn khu vực quản lý'},
            // "preferDistrict": {required: 'Chọn khu vực quản lý yêu thích'},
            "positionIds[]" : {required: "Chọn chức vụ"},
            //"preferPosition" : {required: "Chọn chức vụ yêu thích"},
            // "zoneIds[]": {required: "Chọn Zone"},
            // "preferZone": {required: "Chọn Zone yêu thích"},
            // "teamIds[]": {required: "Chọn Team"},
            // "preferTeam": {required: "Chọn Team yêu thích"},
            "tcIds[]": {required: "Chọn TC"}
            //"preferTc": {required: "Chọn TC yêu thích"}
        }
    };
    //
    var getList = function(limit = 10){
        var tableList = $("#data-detail").DataTable({
            "processing": true,
            "serverSide": true,
            "ajax": "/user/get-list-deal/"+userId+"/-1?limit="+limit,
            "scrollX": false,
            "lengthChange": true,
            "autoWidth": false,
            "lengthMenu": [[10, 25, 50], [10 + ' records', 25 + ' records', 50 + ' records']],
            "pagingType": "full_numbers",
            "iDisplayLength": limit,
            "drawCallback": function (oSettings) {
                $('.dataTables_paginate > .pagination').addClass('pagination-sm');
                var pagination = $(this).closest('.dataTables_wrapper').find('.dataTables_paginate');
                pagination.toggle(this.api().page.info().pages > 1);
            },
            "columns": [
                {data: 'dealId', orderable: false},
                {data: 'customerName', render: renderLink, orderable: false},
                {data: 'statusName'},
                {data: 'progressName'},
                {data: 'tmName'},
                {data: 'createdDate', render: dateTimeRender, orderable: false}
            ],
            "order": [[2, 'desc']],
            "language":
                {
                    "search" : "Tìm kiếm",
                    "paginate" : {
                        previous: "<",
                        next: ">",
                        first: "|<",
                        last: ">|"
                    },
                    "lengthMenu": "Hiển thị _MENU_ trên 1 trang",
                    "searchPlaceholder": "ID, Tên KH",
                    "info": "Hiển thị _START_ đến _END_ của _TOTAL_",
                    "emptyTable": "Chưa có dữ liệu",
                    "infoEmpty": ""
                },
            "createdRow": function (row, data, index) {
                //console.log(data);
                if (!data.isActivated) {
                    $('td', row).parent('tr').addClass("unactivated");
                }
                if (data.isNew) {
                    $('td', row).parent('tr').addClass("item-new");
                }
            }
        });
    };
    getList();
    $('#edit-infos').click(function(event){
        event.preventDefault();
        $('#updateInfosContacts').modal();
    });
    //
    $('#update-password').click(function(e){
        e.preventDefault();
        $('#updatePassword').modal();
    });
    //
    $('#cancel-update-infos').click(function(event){
        event.preventDefault();
        $('#updateInfosContacts').modal('hide');
    });
    //
    $(".span-eyes").unbind("click");
    $(".span-eyes").on('click', function(){
        $(this).parent().find('input').each(function(){
            if ($(this).attr('type') == 'password') {
                $(this).attr('type', 'text');
            } else {
                $(this).attr('type', 'password');
            }
        });
    });
    //
    var validateUpdateInfosUser = $("#form-update-infos-user").validate(validateOptions);
    
    var inputAllowNumber = function(input, allowSeparator){
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
	};
    
    inputAllowNumber(".phone_num",false);
    $('#update-infos').click(function(event) {
        event.preventDefault();
        if (!validateUpdateInfosUser.form()) {
            showPropzyAlert("Có lỗi xảy ra. Vui lòng kiểm tra dữ liệu của bạn.");
            return false;
        }
        var isValidated = true;
        var form = $('#form-update-infos-user');
        form.find('.errors').html('');
        //
        var photo = $('#photo').val() == '' ? null : $('#photo').val();
        var userId = $('#userId').val();
        var userName = $('#userName').val();
        var name = $('#name').val();
        var email = $('#email').val();
        const voipPassword = $('#voipPassword').val().trim();
        //
        var flagPhone = false;
        var phones = [];
        $('#updateInfosContacts input[name="phone"]').each(function(){
			let parent = $(this).parent('.col-md-5');
			parent.find('input').removeAttr('style');
            if($(this).val() !== ''){
                if ($(this).val().length >= 10 && $(this).val().trim().length <= 15) {
                    phones.push({
                        "phone" : $(this).val(),
						"isPrimary" : parent.siblings().find('select').val() == '1' ? true : false
                    });
                } else if($(this).val().trim().length > 15 || $(this).val().trim().length < 10){
                    parent.find('input').css('border','2px solid red');
                    parent.find('.errors').html('Số điện thoại không hợp lệ');
                    showPropzyAlert("Có lỗi xảy ra. Vui lòng kiểm tra dữ liệu của bạn.");
                    isValidated = false;
                }
            }
        });
        
        $('#updateInfosContacts select[name="primaryPhone"]').each(function(){
			let parent = $(this).parent('.col-md-3');
            if($(this).val() == 1){
                if(parent.siblings().find('input').val() == ''){
					parent.siblings().find('input').css('border','2px solid red');
                    flagPhone = true;
					parent.siblings().find('.errors').html('Nhập số điện thoại chính');
                }
            } else {
				parent.siblings().find('input').removeAttr('style');
            }
        });
        var flagPrimary = true;
        if(phones){
            $.each(phones,function(k,v){
                //console.log(v.isPrimary);
                if(v.isPrimary == 1){
                    flagPrimary = false;
                    return false;
                }
            });
        }
        
        if(flagPhone == true || flagPrimary == true){
            phones = null;
            //console.log('fail');
            showPropzyAlert("Có lỗi xảy ra. Vui lòng kiểm tra dữ liệu của bạn.");
            return false;
        }
        var listing = [];
        if ($("input[name='chkBuy']").is(":checked")) {
            listing.push(1);
        }
        if ($("input[name='chkRent']").is(":checked")) {
            listing.push(2);
        }
        //console.log(phones);
        var voipId = $('#voipId').val().trim();
        //
        // zone
        const zones = [];
        const zoneIds = $('#zoneIds').val();
        const preferZone = $('#preferZone').val();
        const adminOfZones = $("#adminOfZones").val();
        if(zoneIds){
            $.each(zoneIds,function(k,v){
                var arr = v.split('-');
                var id = arr[0];
                var isGroupAdmin = false;
                if(adminOfZones && $.inArray(id, adminOfZones)>=0){
                    isGroupAdmin = true;
                }
                if(id == preferZone){
                    zones[k] = {
                        "departmentId" : id,
                        "isPrimary" : true,
                        "isGroupAdmin": isGroupAdmin
                    };
                } else {
                    zones[k] = {
                        "departmentId" : id,
                        "isPrimary" : false,
                        "isGroupAdmin": isGroupAdmin
                    };
                }
            });
        }
        // team
        const teams = [];
        const teamIds = $('#teamIds').val();
        const preferTeam = $('#preferTeam').val();
        const adminOfTeams = $("#adminOfTeams").val();
        if(teamIds){
            $.each(teamIds,function(k,v){
                var arr = v.split('-');
                var id = arr[0];
                var isGroupAdmin = false;
                if(adminOfTeams && $.inArray(id, adminOfTeams)>=0){
                    isGroupAdmin = true;
                }
                if(id == preferTeam){
                    teams[k] = {
                        "departmentId" : id,
                        "isPrimary" : true,
                        "isGroupAdmin": isGroupAdmin
                    };
                } else {
                    teams[k] = {
                        "departmentId" : id,
                        "isPrimary" : false,
                        "isGroupAdmin": isGroupAdmin
                    };
                }
            });
        }
        // tc
        const tcs = [];
        const tcIds = $('#tcIds').val();
        const preferTc = $('#preferTc').val();
        if(tcIds){
            $.each(tcIds,function(k,v){
                var arr = v.split('-');
                var id = arr[0];
                if(id == preferTc){
                    tcs[k] = {
                        "tcId" : id,
                        "isPrimary" : true
                    };
                } else {
                    tcs[k] = {
                        "tcId" : id,
                        "isPrimary" : false
                    };
                }
            });
        }
        var departments = [];
        var positions = [];
        var departmentIds = $('#departmentIds').val();
        var preferDepartment = $('#preferDepartment').val();
        var preferPosition = $('#preferPosition').val();
        var adminOfDepartments = $("#adminOfDepartments").val();
        if(departmentIds){
            $.each(departmentIds,function(k,v){
                var arr = v.split('-');
                var id = arr[0];
                var isGroupAdmin = false;
                if(adminOfDepartments && $.inArray(id, adminOfDepartments)>=0){
                    isGroupAdmin = true;
                }
                if(id == preferDepartment){
                    departments[k] = {
                        "departmentId" : id,
                        "isPrimary" : true,
                        "isGroupAdmin": isGroupAdmin
                    };
                } else {
                    departments[k] = {
                        "departmentId" : id,
                        "isPrimary" : false,
                        "isGroupAdmin": isGroupAdmin
                    };
                }
            });
        }
        // position
        var i = 0;
        $.each($('.positionIds .selectized'), function(k,v){
            $.each(v, function(key, value){
                var arr = value.value.split('-');
                var id = arr[0];
                if(id == parseInt(preferPosition)){
                    positions[i] = {
                        "positionId" : id,
                        "isPrimary" : true
                    };
                } else {
                    positions[i] = {
                        "positionId" : id,
                        "isPrimary" : false
                    };
                }
                i++;
            });
		});
		//
        var cities = [];
        var cityIds = $('#cityIds').val();
        var preferCity = $('#preferCity').val();
        if(cityIds){
            $.each(cityIds,function(k,v){
                var arr = v.split('-');
                var id = arr[0];
                if(id == preferCity){
                    cities[k] = {
                        "cityId" : id,
                        "isPrimary" : true
                    };
                } else {
                    cities[k] = {
                        "cityId" : id,
                        "isPrimary" : false
                    };
                }
            });
        }
        //
        var districts = [];
        var districtIds = $('#districtIds').val();
        var preferDistrict = $('#preferDistrict').val();
        if(districtIds){
            $.each(districtIds,function(k,v){
                var arr = v.split('-');
                var id = arr[0];
                if(id == preferDistrict){
                    districts[k] = {
                        "cityId" : id.split("_")[1],
                        "districtId" : id.split("_")[0],
                        "isPrimary" : true
                    };
                } else {
                    districts[k] = {
                        "cityId" : id.split("_")[1],
                        "districtId" : id.split("_")[0],
                        "isPrimary" : false
                    };
                }
            });
        }
        //
        //phuong
        const wardIds = $("#wardIds").val();
        const preferWard = $("#preferWard").val();
        var wards = null;
        if (wardIds) {
            wards = wardIds.map((it) => {
                const data = {
                    isPrimary: false,
                    wardId: it.split("_")[0],
                    cityId: it.split("_")[1],
                    districtId: it.split("_")[2]
                };
                data.isPrimary = it == preferWard;
                return data;
            });
        }
        var startDate = HumanToEpoch2($('#startDate').val());
        //
        var dataSend = {};
        dataSend['photo'] = photo;
        dataSend['userName'] = userName;
        dataSend['userId'] = userId;
        dataSend['statusId'] = $('#statusId').val();
        dataSend['msnv'] = $('#employeeCode').val();
        dataSend['name'] = name;
        dataSend['email'] = email;
        dataSend['phones'] = phones;
        dataSend['voipId'] = voipId;
        dataSend['voipPassword'] = voipPassword;
        dataSend['departments'] = departments;
        dataSend['positions'] = positions;
        dataSend['cities'] = cities;
        dataSend['districts'] = districts;
        dataSend['wards'] = wards;
        dataSend["listingTypes"] = listing;
        dataSend['zones'] = zones;
        dataSend['teams'] = teams;
        dataSend['tcs'] = tcs;
        dataSend['startDate'] = startDate;
        dataSend['signature'] = CKEDITOR.instances['signature'].getData();
        dataSend['socialUid'] = parseInt($("#listuser :selected").val());
        dataSend['autoCreateAgent'] = ( $("#autoCreateAgent").length > 0 && $("#autoCreateAgent").prop("checked") );
        // dataSend['autoCreateAgent'] = true;
        console.log(dataSend);
        if (false === isValidated) {
            return false;
        }
        showPropzyLoading();
        var department = getDepartmentsArray(departments);
        $.ajax({
            url: "/user/do-update-infos-user",
            data: JSON.stringify(dataSend),
            type: "post"
        }).done(function (response) {
            console.log(response);
            if (response.result) {
                infoUserResponse = response;
                
                // showPropzyAlert(response.message);
                // $('#alertModal').on('hide.bs.modal',function () {
                //     window.location.reload();
                // });
                if (departmentCheckPos(department)) {
                    // only for Pos open modal to choose option
                    if (response["data"]["existingDistrictUsers"] && response["data"]["existingDistrictUsers"].length > 0) {
                        // open modal
                        $("#pos-choose-district-modal").modal();
                        // render options
                        $("#user-id-update-district").val(response['data']["userId"]);
                        renderHtmlAssignedDistrict(response["data"]["existingDistrictUsers"]);
                    } else {
						//if (!checkChangeZTDW()) {
							// showPropzyAlert("Bạn đã cập nhật thành công account", 'Thông báo', function () {
							// 	window.location.reload();
                            // });
                        //}
                    }
                } else {
                    if(infoUserResponse.data.length < 1) {
                        window.location.reload();
                    }
                    showReceiveListingsModal(infoUserResponse.data);
					// if (!checkChangeZTDW()) {
					// 	// showPropzyAlert("Bạn đã cập nhật thành công account", 'Thông báo', function () {
					// 	// 	window.location.reload();
                    //     // });
                    // }
                }
            } else {
                showPropzyAlert(response.message);
            }
        }).always(function() {
            hidePropzyLoading();
        });
    });
    //
    var validatePasswordOptions = {
        ignore: null,
        rules: {
            "old_password": {required: true},
            "password": {required: true},
            "confirm_password": {required: true, equalTo : "#user_pass"}
        },
        messages: {
            "old_password": {required: 'Nhập Mật khẩu cũ'},
            "password": {required: 'Nhập Mật khẩu'},
            "confirm_password": {required: "Nhập xác nhận mật khẩu", equalTo: 'Xác nhận mật khẩu không trùng khớp'}
        }
    };
    
    var validateChangePassword = $("#form-update-pass-user").validate(validatePasswordOptions);
    
    $('#update-pass').on('click', function (event){
        event.preventDefault();
        if (!validateChangePassword.form()) {
            return false;
        }
        var isValidated = true;
        var form = $('#form-update-pass-user');
        form.find('.errors').html('');
        var password = $('#user_pass').val();
        var partern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_])[a-zA-Z0-9!@#$%^&*()_]{8,20}$/;
        if(password.match(partern) == null){
            $("#user_pass").parent().find('.errors').html('Mật khẩu bao gồm 8-20 ký tự, ít nhất 1 chữ thường, 1 chữ hoa, 1 số, và 1 ký tự đặc biệt, không dấu và không khoảng trắng');
            isValidated = false;
        }
        var dataPost = {};
        dataPost.userId = $('#userId').val();
        dataPost.oldPassword = $('#user_pass_old').val();
        dataPost.password = password;
        dataPost.rePassword = password;
        console.log(dataPost);
        if (false === isValidated) {
            return false;
        }
        $.ajax({
            url: "/user/do-change-password",
            data: JSON.stringify(dataPost),
            type: "put"
        }).done(function (response) {
            console.log(response);
            if (response.result) {
                alert(response.message);
                location.href = '/logout';
            } else {
                alert(response.message);
            }
        }); 
    });
    
    // $('#source').change(function () {
    //     if ($('#source').val() != "") {
    //         // urlUserList = "/get-user/" + $('#source').val();
    //         // var html = "<option value=''>---Vui lòng chọn----</option>";
    //         // get_sync(urlUserList, true, function (data) {
    //         //     users = data['data'];
    //         //     console.log(users);
    //         //     if (data['result']) {
    //         //         $.each(data['data'], function (index, value) {
    //         //             html += '<option phone="' + value.phone + '" accountid="' + value.accountId + '" value="' + value.socialUid + '">' + value.name + '</option>';
    //         //         });
    //         //     }
    //         //     $('#listuser').html(html).select2;
    //         // });
            
    //     } else {
    //         var html = "<option value=''>---Không Có---</option>";
    //         $('#listuser').html(html).select2;
    //     }
    // });
    $('#listuser').select2({
        ajax: {
          url: '/get-user-by-source',
          type: 'POST',
          data: function (params) {
            var query = {
                keyword: params.term,
                source: $('#source').val()
            }
            return query;
          },
          processResults: function (data, params) {
            return {
                results: $.map(data, function (item) {
                    return {
                        text: item.name,
                        id: item.socialUid,
                        data: item
                    };
                })
            };
            }
        },
        minimumInputLength: 1
      });
});
function departmentCheckPos(departmentIds) {
    const isPos = departmentIds.find(it=> {
        return [14, 15, 16, 17].indexOf(it) > -1;
    });
    if(isPos) {
        return true;
    }
    return false;
}
function getDepartmentsArray($data) {
    var result = [];
    if(Array.isArray($data) && $data.length > 0) {
        $.each($data, function (i, depart) {
            result.push(parseInt(depart.departmentId));
        });
    }
    return result;
}
function renderHtmlAssignedDistrict(listDistrict) {
    $("#btn-pos-choose-district").hide();
    $("#tb-pos-choose-district").find("tbody").html("");
    let listTr = [];
    $.each(listDistrict, function (i, val) {
        const selectCase = "<select class='form-control select-case-assigned-district' data-user='"+val.userId+"' data-district='"+val.districtId+"'>" +
            "<option value='0'>Chọn tác vụ</option>" +
            "<option value='1'>Chuyển listing</option>" +
            "<option value='2'>Chuyển listing và xóa quận</option>" +
            "</select>";
        let tr = "<tr>";
        tr += "<td>" + val.districtName + "</td>";
        tr += "<td>" + val.userName + "</td>";
        tr += "<td>" + selectCase + "</td>";
        tr += "</tr>";
        listTr.push(tr);
    });
    $("#tb-pos-choose-district").find("tbody").html(listTr.join(""));
    if (listTr.length > 0 ) {
        $("#btn-pos-choose-district").show();
    }
}
$(document).on('click', "#btn-pos-choose-district", function (e) {
    e.preventDefault();
    ModalConfirm.showModal({
        message: "Bạn chắc chắn muốn chuyển giao tin đăng cho user mới",
        onYes: function (modal) {
            updateDistricUser();
        }
    });
})
function updateDistricUser() {
    const url = "/users/update-district-assigned";
    const data = {
        userId : null,
        list : []
    };
    data.userId = $("#user-id-update-district").val();
    $(".select-case-assigned-district").each(function (i, element) {
        if ($(element).val() != 0) {
            data.list.push({
                userId : $(element).data('user'),
                districtId : $(element).data('district'),
                updateCase : $(element).val(),
            });
        }
    });
    showPropzyLoading();
    post_sync(url, data, true, function (xhr) {
        hidePropzyLoading();
        if (xhr.result == true) {
            location.reload();
        } else {
            showPropzyAlert("Đã có lỗi xảy ra. xin vui lòng thử lại cập nhật quận");
        }
    });
}
function parseMonth(mnth) {
    switch (mnth.toLowerCase()) {
        case 'january':
        case 'jan':
        case 'enero':
            return 1;
        case 'february':
        case 'feb':
        case 'febrero':
            return 2;
        case 'march':
        case 'mar':
        case 'marzo':
            return 3;
        case 'april':
        case 'apr':
        case 'abril':
            return 4;
        case 'may':
        case 'mayo':
            return 5;
        case 'jun':
        case 'june':
        case 'junio':
            return 6;
        case 'jul':
        case 'july':
        case 'julio':
            return 7;
        case 'aug':
        case 'august':
        case 'agosto':
            return 8;
        case 'sep':
        case 'september':
        case 'septiembre':
        case 'setiembre':
            return 9;
        case 'oct':
        case 'october':
        case 'octubre':
            return 10;
        case 'nov':
        case 'november':
        case 'noviembre':
            return 11;
        case 'dec':
        case 'december':
        case 'diciembre':
            return 12;
    }
    return mnth;
}
function HumanToEpoch2(strDate) {
    strDate = strDate.replace(/[\,]/g, '');
    strDate = strDate.replace(/^\s+|\s+$/g, '');
    strDate = strDate.replace(/ +(?= )/g, '');
    strDate = strDate.replace(/^(\d+)\./, '$1');
    var ok = 0;
    var skipDate = 0;
    var content = "";
    var date = "";
    var format = "";
    var yr = 1970;
    var mnth = 1;
    var dy = 1;
    var hr = 0;
    var mn = 0;
    var sec = 0;
    var dmy = 1;
    if (!ok) {
        var dateTimeSplit = strDate.split(" ");
        var dateParts = dateTimeSplit[0].split("-");
        if (dateParts.length === 1) dateParts = dateTimeSplit[0].split(".");
        if (dateParts.length === 1) {
            dmy = 0;
            dateParts = dateTimeSplit[0].split("/");
        }
        if (dateParts.length === 1) {
            dmy = 1;
            if (dateTimeSplit.length > 2) {
                if (dateTimeSplit[2].split(":").length === 1) {
                    strDate = strDate.replace(dateTimeSplit[0] + ' ' + dateTimeSplit[1] + ' ' + dateTimeSplit[2], dateTimeSplit[0] + '-' + dateTimeSplit[1] + '-' + dateTimeSplit[2]);
                    dateTimeSplit = strDate.split(" ");
                    dateParts = dateTimeSplit[0].split("-");
                }
            }
        }
        if (dateParts.length === 1) {
            dateParts = dateTimeSplit;
            if (dateTimeSplit.length > 3) timeParts = dateTimeSplit[4];
        }
        if (dateParts.length > 2) {
            if (dateParts[0] > 100) {
                yr = dateParts[0];
                mnth = parseMonth(dateParts[1]);
                dy = dateParts[2];
                format = "YMD";
            } else {
                if (dmy) {
                    dy = dateParts[0];
                    mnth = parseMonth(dateParts[1]);
                    yr = dateParts[2];
                    format = "DMY";
                    if ((!parseFloat(mnth)) || (!parseFloat(dy))) {
                        dy = dateParts[1];
                        mnth = parseMonth(dateParts[0]);
                        format = "MDY";
                    }
                } else {
                    mnth = parseMonth(dateParts[0]);
                    dy = dateParts[1];
                    yr = dateParts[2];
                    format = "MDY";
                    if ((!parseFloat(mnth)) || (!parseFloat(dy))) {
                        dy = dateParts[0];
                        mnth = parseMonth(dateParts[1]);
                        format = "DMY";
                    }
                }
            }
            ok = 1;
        }
        if (ok && dateTimeSplit[1]) {
            var timeParts = dateTimeSplit[1].split(":");
            if (timeParts.length >= 2) {
                hr = timeParts[0];
                mn = timeParts[1];
            }
            if (timeParts.length >= 3) {
                sec = timeParts[2];
            }
            if ((dateTimeSplit[2] && dateTimeSplit[2].toLowerCase() === "pm") && (parseFloat(hr) < 12)) hr = parseFloat(hr) + 12;
            if ((dateTimeSplit[2] && dateTimeSplit[2].toLowerCase() === "am") && (parseFloat(hr) === 12)) hr = 0;
        }
    }
    if (!ok) {
        date = new Date(strDate);
        if (date.getFullYear() > 1900) {
            ok = 1;
            skipDate = 1;
        }
    }
    if (ok) {
        if (!skipDate) {
            if (mnth !== parseFloat(mnth)) mnth = parseMonth(mnth);
            if (yr < 30) yr = 2000 + parseFloat(yr);
            if (yr < 200) yr = 1900 + parseFloat(yr);
            var usedGMT = 0;
            if (((strDate.toUpperCase().indexOf('GMT') > 0) || (strDate.toUpperCase().indexOf('UTC') > 0)) && (strDate.toUpperCase().indexOf('GMT+') == -1) && (strDate.toUpperCase().indexOf('UTC+') == -1)) {
                date = new Date(Date.UTC(yr, mnth - 1, dy, hr, mn, sec));
                usedGMT = 1;
            } else {
                date = new Date(yr, mnth - 1, dy, hr, mn, sec);
            }
        }
        content = date.getTime();
    }
    return content;
}
var allEntis = '';
var getAllEntities = function(){
    $.ajax({
        url: "/user-role/get-all-entities",
        async: false,
        type: "get"
    }).done(function (response) {
        allEntis = response.entities;
    });
};
getAllEntities();
var initSelectRoles = function(){
    $("#roles").selectize({
        plugins: ['remove_button'],
        create: false,
        onItemRemove: function (data) {
            var arr = data.split('-');
            var id = arr[0];
            var name = arr[1];
            var input_entity = $('#table-permission #input_entity').get();
            for (var i = 0; i < input_entity.length; i++) {
                if(id == $(input_entity[i]).val()){
                    $(input_entity[i]).parent().parent().remove();
                }
            }
        },
        onItemAdd: function (value, item) {
            $('#table-permission').removeClass('quick-add-layout');
            var object_entiti = {};
            var arr = value.split('-');
            var id = arr[0];
            var name = arr[1];
            $.each(allEntis, function(key, val){
                if(id == val['id']){
                    object_entiti = val;
                }
            });
            //console.log(object_entiti);
            var html = '<tr>';
            html+= '<td>';
            html+= '<input type="hidden" id="input_entity" value="'+object_entiti.id+'" />';
            html+= object_entiti.name;
            html+= '</td>';
            $.each(object_entiti.actions, function(k,v){
                html+= '<td>';
                html+= '<input type="hidden" name="'+v.actionName.toLowerCase()+'_action" id="input_action" value="'+v.actionId+'" />';
                html+= '<select id="select_permission" name="'+v.actionName.toLowerCase()+'_permission" class="form-control select2" style="width: 100%;">';
                html+= '<option entityid="-1" actionid="-1" value="-1">--Chọn--</option>';
                $.each(v.permissions, function(ke,va){
                    html+= '<option entityid="'+object_entiti.id+'" actionid="'+v.actionId+'" value="'+va.permissionId+'" >';
                    html+= va.permissionName;
                    html+= '</option>';
                });
                html+= '</select>';
                html+= '</td>';
            });
            html+= '</tr>';
            $('#table-permission tbody').append(html);
        }
    });
    return false;
};
initSelectRoles();
// function submit
function saveUserPermissions(userId) {
    var postData = {
        "userId": userId
    };
    var privatePermissions = [];
    var permissions = $('#table-permission #select_permission').get();
    for (var i = 0; i < permissions.length; i++) {
        if ($(permissions[i]).val() != -1) {
            var element = $("option:selected", $(permissions[i]));
            var entityId = element.attr("entityid");
            var actionId = element.attr("actionid");
            privatePermissions.push({
                "entityId": entityId,
                "actionId": actionId,
                "permissionId": $(permissions[i]).val()
            });
        }
    }
    postData.permissions = privatePermissions;    
    //End
    //console.log(JSON.stringify(dataPost));
    $.ajax({
        url: "/user/save-permissions",
        type: "post",
        data: JSON.stringify(postData)
    }).done(function (response) {
        //console.log(response);
        if(response.result){
            $('#modalMyPermissions').modal('hide');
        }
    }).always(function () {
        // hidePropzyLoading();
    });
}
$("#btn-save-my-permissions").on("click", function(event){
    event.preventDefault();
    saveUserPermissions($("#userId").val());
});
$("#btn-show-permissions").on("click", function(event){
    event.preventDefault();
    $("#modalMyPermissions").modal();
});
let modalStep = 1;
const confirmBSA = (step) => {
	modalStep = step;
	$('#confirmBSAModal').modal();
}
const reassignAndNext = () => {
	$('#confirmBSAModal').modal('hide');
	switch (modalStep) {
		case 1:
			showTransferDealsModal();
			break;
		case 2:
			showReceiveListingsModal();
			break;
		default:
			break;
	}
};
const checkChangeZTDW = () => {
	let isChange = false;
	// // Check zones
	// const currentZones = $('#zoneIds').val() ?? [];
	// let diffZones = [];
	// for (let i = 0; i < currentZones.length; i++) {
	// 	let zoneId = Number(currentZones[i]);
	// 	if (!dbZones.includes(zoneId)) {
	// 		diffZones.push(String(zoneId));
	// 	}
	// }
	// for (let i = 0; i < dbZones.length; i++) {
	// 	let zoneId = String(dbZones[i]);
	// 	if (!currentZones.includes(zoneId)) {
	// 		diffZones.push(String(zoneId));
	// 	}
	// }
	// // Check teams
	// const currentTeams = $('#teamIds').val() ?? [];
	// let diffTeams = [];
	// for (let i = 0; i < currentTeams.length; i++) {
	// 	let teamId = Number(currentTeams[i]);
	// 	if (!dbTeams.includes(teamId)) {
	// 		diffTeams.push(String(teamId));
	// 	}
	// }
	// for (let i = 0; i < dbTeams.length; i++) {
	// 	let teamId = String(dbTeams[i]);
	// 	if (!currentTeams.includes(teamId)) {
	// 		diffTeams.push(String(teamId));
	// 	}
	// }
	// // Check districts
	// const currentDistricts = $('#districtIds').val() ?? [];
	// let diffDistricts = [];
	// for (let i = 0; i < currentDistricts.length; i++) {
	// 	let districtId = Number(currentDistricts[i]);
	// 	if (!dbDistricts.includes(districtId)) {
	// 		diffDistricts.push(String(districtId));
	// 	}
	// }
	// for (let i = 0; i < dbDistricts.length; i++) {
	// 	let districtId = String(dbDistricts[i]);
	// 	if (!currentDistricts.includes(districtId)) {
	// 		diffDistricts.push(String(districtId));
	// 	}
	// }
	// // Check wards
	// const currentWards = $('#wardIds').val() ?? [];
	// let diffWards = [];
	// // for (let i = 0; i < currentWards.length; i++) {
	// // 	let wardId = Number(currentWards[i]);
	// // 	if (!dbWards.includes(wardId)) {
	// // 		diffWards.push(String(wardId));
	// // 	}
	// // }
	// // for (let i = 0; i < dbWards.length; i++) {
	// // 	let wardId = String(dbWards[i]);
	// // 	if (!currentWards.includes(wardId)) {
	// // 		diffWards.push(String(wardId));
	// // 	}
	// // }
	// if (
	// 	diffZones.length ||
	// 	diffTeams.length ||
	// 	diffDistricts.length ||
	// 	diffWards.length
	// ) {
	// 	isChange = true;
    // }
    
    
	//if (isChange) {
        $('#transferListingsModal').modal();
        
		// $('.sel-zones').val(diffZones);
		// $('.sel-teams').val(diffTeams);
		// $('.sel-districts').val(diffDistricts);
        // $('.sel-wards').val(diffWards);
        
		$('.sel-zones').select2({
			width: '100%'
		});
		$('.sel-teams').select2({
			width: '100%'
		});
		$('.sel-districts').select2({
			width: '100%'
		});
		$('.sel-wards').select2({
			width: '100%'
		});
	//}
	return isChange;
};
const reloadSelZones = (zones) => {
	$('.sel-zones').html('');
	zones.forEach((zone) => {
		$('.sel-zones').append(
			'<option value="' + zone.id + '">' + zone.name + '</option>'
		);
	});
	$('.sel-zones').select2({
		width: '100%',
	});
};
const reloadSelTeams = (teams) => {
	$('.sel-teams').html('');
	teams.forEach((team) => {
		$('.sel-teams').append(
			'<option value="' + team.id + '">' + team.name + '</option>'
		);
	});
	$('.sel-teams').select2({
		width: '100%',
	});
};
const reloadSelCities = (cities) => {
	$('.sel-cities').html('');
	cities.forEach((city) => {
		$('.sel-cities').append(
			'<option value="' + city.cityId + '">' + city.cityName + '</option>'
		);
	});
	$('.sel-cities').select2({
		width: '100%',
	});
};
const reloadSelDistricts = (districts) => {
	$('.sel-districts').html('');
	districts.forEach((district) => {
		$('.sel-districts').append(
			'<option value="' +
				district.districtId +
				'">' +
				district.districtName +
				'</option>'
		);
	});
	$('.sel-districts').select2({
		width: '100%',
	});
};
const reloadSelWards = (wards) => {
	$('.sel-wards').html('');
	wards.forEach((ward) => {
		$('.sel-wards').append(
			'<option value="' + ward.id + '">' + ward.name + '</option>'
		);
	});
	$('.sel-wards').select2({
		width: '100%',
	});
};
