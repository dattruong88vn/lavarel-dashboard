var _validFileExtensions = ["jpg", "jpeg", "png"];

jQuery.validator.addMethod("noSpaceAsEmpty", function (value, element) {
    return value.trim() != "" && value != "";
}, jQuery.validator.messages.noSpaceAsEmpty);
jQuery.validator.addMethod("phoneNumber", function (value, element) {
    return value.trim().length <= 15 && value.trim().length >= 10
}, jQuery.validator.messages.phoneNumber);
jQuery.validator.addMethod("oneOrAll", function (value, element) {
    return (value && value.length > 0) || $('#all-zone').is(':checked');
}, jQuery.validator.messages.oneOrAll);
jQuery.validator.addMethod("requireNormalChar", function (value, element) {
    return value === '' || (value.search(/[0-9]+/g) === -1 && value.search(/[!@#\$%\^\&*\)\(+=._-]+/g) === -1);
}, jQuery.validator.messages.requireNormalChar);
jQuery.validator.addMethod("uploadImageType", function (value, element) {
    return _validFileExtensions.includes(value.substring(value.lastIndexOf(".") + 1))
}, jQuery.validator.messages.uploadImageType);
jQuery.validator.addMethod("uploadImageSize", function (value, element) {
    return element.files[0].size / 1024 / 1024 / 2 < 1;
}, jQuery.validator.messages.uploadImageSize);
jQuery.validator.addMethod("requireAgentIntroduce", function (value, element) {
    const content = $(CKEDITOR.instances['agent_introduce'].getData()).text().replaceAll('\n','');
    return content.length > 0;
}, jQuery.validator.messages.requireAgentIntroduce);
jQuery.validator.addMethod("limitAgentIntroduce", function (value, element) {
    const content = $(CKEDITOR.instances['agent_introduce'].getData()).text().replaceAll('\n','');
    return content.length <= 2000;
}, jQuery.validator.messages.limitAgentIntroduce);
jQuery.validator.addMethod("checkContentIntroduce", function (value, element) {
    return value !== "";
}, jQuery.validator.messages.checkContentIntroduce);
jQuery.validator.addMethod("checkImageUpload", function (value, element) {
    return $("#avatar_profile_photo").attr('src') !== "" && $("#avatar_profile_photo").attr('src') !== "/images/default_avatar_profile_agent.png";
}, jQuery.validator.messages.checkImageUpload);
jQuery.validator.addMethod("checkDuplicatedVal", function (value, element, params) {
    var listVal = [];
    $('select.invite-social-network').not($(element)).each(function () {
        $(this).val() !== '0' && listVal.push($(this).val());
    });
    return listVal.indexOf(value) === -1
}, jQuery.validator.messages.checkDuplicatedVal);
jQuery.validator.addMethod("urlPatern", function (value, element) {
    return value === '' || /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&%'\(\)\*\+,;=.]+$/.test(value);
}, jQuery.validator.messages.urlPatern);
jQuery.validator.addMethod("checkPosition", function (value, element) {
    return value !== "0";
}, jQuery.validator.messages.checkPosition);


var selectizes_array = [];
var wards_list = [];
var positions_list = [];
let PROPZY_JSON = {
    zoneSelectize: null,
    teamSelectize: null,
    departmentSelectize: null,
    departments: [],
    teams: [],
    cities: [],
    phoneOriginal: '',
    emailOriginal: '',
    listSocialNetwork: [],
    recursiveDepartment: (data) => {
        if (data.length === 0) {
            return;
        }
        data.map(i => {
            if (!(PROPZY_JSON.departments.find(d => d.id === i.id))) {
                PROPZY_JSON.departments.push(i);
            }
            PROPZY_JSON.recursiveDepartment(i.children || []);
            return i;
        });
    },
    initSelectTransaction: () => {
        $("#tcIds").selectize({
            plugins: ['remove_button'],
            searchField: "item",
            render: {
                item: function (data, escape) {
                    var returnVal = '<div>' + data.text + '</div>';
                    return returnVal;
                }
            },
            persist: false,
            create: false
        });
        return false;
    },
    renderTransaction: (tcs = []) => {
        $.ajax({
            url: "/transaction-manager/get-tc-list",
            type: 'get'
        }).done(function (response) {
            if (response.result) {
                var container = $('#tcIds_container');
                var obj = $('<select id="tcIds" name="tcIds[]" multiple="multiple"></select>');
                container.html('').append(obj);
                response.data.list.map(i => {
                    var selected = '';
                    if (tcs.find(t => t.tcId == i.tcId)) {
                        selected = 'selected';
                    }
                    obj.append('<option value="' + i.tcId + '" ' + selected + '>' + i.fullName + '</option>');
                    return i;
                });
                PROPZY_JSON.initSelectTransaction();
                return;
            }
            showPropzyAlert(response.message);
        });
    },
    initSelectCity: () => {
        $("#cityIds").selectize({
            plugins: ['remove_button'],
            searchField: "item",
            render: {
                item: function (data, escape) {
                    var returnVal = '<div>' + data.text + '</div>';
                    return returnVal;
                }
            },
            persist: false,
            create: false
        });
        return false;
    },
    renderCity: (cities = [], districts = [], wards = []) => {
        var zoneIds = $('#teamIds').val() || [];
        if (zoneIds.length === 0) {
            zoneIds = $('#zoneIds').val() || [];
            if (zoneIds.length === 0) {
                PROPZY_JSON.departments.filter(i => i.departmentType === 'ZONE').map(i => {
                    zoneIds.push(i.id);
                    return i;
                });
            }
        }
        $.ajax({
            type: 'POST',
            url: '/common/getCitiesByZoneTeam',
            data: JSON.stringify({
                countryIds: [],
                departmentIds: zoneIds
            })
        }).done(function (response) {
            if (response.result) {
                var container = $('#cityIds_container');
                let city = $('<select id="cityIds" name="cityIds[]" multiple="multiple"></select>');
                container.html('').append(city);
                var data = [];
                PROPZY_JSON.cities = [];
                if (response.data && response.data.list) {
                    data = response.data.list;
                }
                data.map(it => {
                    var selected = '';
                    if (cities.find(i => i.cityId)) {
                        selected = 'selected';
                    }
                    city.append('<option value="' + it.cityId + '" data-country-id="' + it.countryId + '" ' + selected + '>' + it.cityName + '</option>');
                    if (!(PROPZY_JSON.cities.find(c => c.cityId === it.cityId))) {
                        PROPZY_JSON.cities.push(it.cityId);
                    }
                    return it;
                });
                PROPZY_JSON.initSelectCity();
                $('#cityIds').change(function () {
                    PROPZY_JSON.renderDistrict();
                });
                //$('#cityIds').trigger('change');
                PROPZY_JSON.renderDistrict(districts, wards);
                return;
            }
            showPropzyAlert(response.message);
        }).always(function () {
            hidePropzyLoading();
        });
    },
    inRenderTeam: (teams, cities, districts, wards, $isLoaded, teamList = []) => {
        var teamObj = $('<select id="teamIds" name="teamIds[]" multiple="multiple"></select>');
        var container = $('#teamIds_container');
        container.html('').append(teamObj);
        PROPZY_JSON.teams = [];
        teamList.map(i => {
            var selected = '';
            if (teams.find(t => t.departmentId == i.departmentId)) {
                selected = 'selected';
            }
            teamObj.append('<option value="' + i.departmentId + '" ' + selected + '>' + i.departmentName + '</option>');
            if (!(PROPZY_JSON.teams.find(t => t.departmentId === i.departmentId))) {
                PROPZY_JSON.teams.push(i.departmentId);
            }

            return i;
        });
        PROPZY_JSON.initSelectTeam();
        $('#teamIds').change(function () {
            PROPZY_JSON.renderCity();
        });
        $('#all-team').prop('checked', false);
        if (teamList && teamList.length == teams.length && teams.length > 0) {
            $('#all-team').trigger('click');
        }
        if (!$isLoaded && (($('#zoneIds').val() || []).length > 0 || $('#all-zone').is(':checked'))) {
            $('#all-team').trigger('click');
        }
        PROPZY_JSON.renderCity(cities, districts, wards);
    },
    renderTeam: (teams = [], cities = [], districts = [], wards = [], $isLoaded = false) => {
        zoneIds = $('#zoneIds').val() || [];
        // if (zoneIds.length === 0) {
        //     PROPZY_JSON.departments.filter(i => i.departmentType === 'ZONE').map(i => {
        //         zoneIds.push(i.id);
        //         return i;
        //     });
        // }
        if (zoneIds.length > 0) {
            $.ajax({
                url: "/common/getTeamByZone",
                type: 'post',
                data: JSON.stringify({
                    zoneIds: zoneIds
                })
            }).done(function (response) {
                if (response.result) {
                    PROPZY_JSON.inRenderTeam(teams, cities, districts, wards, $isLoaded, response.data.filter(i => i.departmentType === 'GROUP'));
                    return;
                }
                showPropzyAlert(response.message);
            });
            return;
        }
        PROPZY_JSON.inRenderTeam(teams, cities, districts, wards, $isLoaded);
    },
    initSelectTeam: () => {
        PROPZY_JSON.teamSelectize = $("#teamIds").selectize({
            plugins: ['remove_button'],
            searchField: "item",
            render: {
                item: function (data, escape) {
                    var returnVal = '<div>' + data.text + '</div>';
                    return returnVal;
                }
            },
            persist: false,
            create: false
        });
        return false;
    },
    initSelectZone: () => {
        PROPZY_JSON.zoneSelectize = $("#zoneIds").selectize({
            plugins: ['remove_button'],
            render: {
                item: function (data, escape) {
                    var returnVal = '<div>' + data.text + '</div>';
                    return returnVal;
                }
            },
            persist: false,
            create: false
        });
        return false;
    },
    initSelectDepartment: () => {
        PROPZY_JSON.departmentSelectize = $("#departmentIds").selectize({
            plugins: ['remove_button'],
            searchField: "item",
            render: {
                item: function (data, escape) {
                    var returnVal = '<div>' + data.text + '</div>';
                    return returnVal;
                }
            },
            onItemRemove: function (data) {
                var arr = data.split('@@');
                $('#positionIds_select_container div[departmentName="' + arr[1] + '"]').remove();
            },
            onItemAdd: function (value, item) {
                PROPZY_JSON.renderPositionsSelect(value, []);
            },
            persist: false,
            create: false
        });
        return false;
    },
    renderZone: (zones = [], teams = [], departments = [], cities = [], districts = [], wards = [], positions = []) => {
        $.ajax({
            url: "/common/get-list-parents/id-0",
            type: 'get'
        }).done(function (response) {
            if (response.result) {
                //PROPZY_JSON.departments = [];
                PROPZY_JSON.recursiveDepartment(response.data);
                var container = $('#zoneIds_container');
                var zoneObj = $('<select id="zoneIds" name="zoneIds[]" multiple="multiple">');
                container.html('').append(zoneObj);
                var zonesList = PROPZY_JSON.departments.filter(i => i.departmentType === 'ZONE');
                zonesList.map(i => {
                    var selected = '';
                    if (zones.find(z => z.departmentId == i.id) !== undefined) {
                        selected = 'selected';
                    }
                    zoneObj.append('<option value="' + i.id + '" ' + selected + '>' + i.departmentName + '</option>');
                    return i;
                });
                PROPZY_JSON.initSelectZone();
                zoneObj.change(() => {
                    PROPZY_JSON.renderTeam();
                });
                $('#all-zone').prop('checked', false);
                if (zonesList && zonesList.length == zones.length && zones.length > 0) {
                    $('#all-zone').trigger('click');
                }

                if (currentUser.userRole == "ASM") {
                    $('.manage-department-checkbox').hide();
                }
                // render department
                var deparmentContainer = $('#container_departmentIds');
                var departmentObj = $('<select id="departmentIds" name="departmentIds[]" multiple="multiple"></select>');
                deparmentContainer.html('').append(departmentObj);
                PROPZY_JSON.departments.filter(i => i.departmentType === 'DEPARTMENT').map(i => {
                    var selected = '';
                    if (departments.find(d => d.departmentId == i.id)) {
                        selected = 'selected';
                    }
                    departmentObj.append('<option value="' + i.id + '@@' + i.departmentName + '"' + selected + '>' + i.departmentName + '</option>');
                    return i;
                });
                PROPZY_JSON.initSelectDepartment();
                $('#positionIds_select_container').html('');
                departments.map(d => {
                    var pos = positions.filter(w => w.departmentId == d.departmentId).map(w => w.positionId);
                    PROPZY_JSON.renderPositionsSelect(d.departmentId + '@@' + d.departmentName, pos);
                    return d;
                });
                PROPZY_JSON.renderTeam(teams, cities, districts, wards, true);

                let isZoneManage = zones.filter(i => i.isGroupAdmin).length > 0;
                let isTeamManage = teams.filter(i => i.isGroupAdmin).length > 0;
                let isDepartmentManage = departments.filter(i => i.isGroupAdmin).length > 0;
                if (isZoneManage) {
                    $('#manage-zone').prop('checked', true);
                }
                if (isTeamManage) {
                    $('#manage-team').prop('checked', true);
                }
                if (isDepartmentManage) {
                    $('#manage-department').prop('checked', true);
                }

                return;
            }
            showPropzyAlert(response.message);
        });
    },
    clearForm: (title) => {
        $('#modal-title').html(title);
        PROPZY_JSON.renderZone();
        PROPZY_JSON.renderTransaction();
    },
    loadProfile: () => {
        var id = $('#profileId').val() || 0;
        if (parseInt(id, 10) > 0) {
            $.ajax({
                url: "/contact/get-profile/" + id,
                type: "get"
            }).done(function (response) {
                if (parseInt(response.code, 10) === 200) {
                    var data = response.data;
                    $('#fullName').val(data.userInfor.name);
                    $('#realName').val(data.userInfor.realName);
                    $('#employeeCode').val(data.userInfor.msnv);
                    $('#invite_email').val(data.userInfor.email);
                    $('#username').val(data.userInfor.userName || '');
                    if (data.userInfor.userName && data.userInfor.userName != '') {
                        $('#username').attr('readonly', true);
                    }
                    PROPZY_JSON.emailOriginal = data.userInfor.email;
                    $('#phone_container').html('');

                    $('#voipId').val(data.userInfor.voipId || '');
                    $('#voipPassword').val(data.userInfor.voipPassword || '');

                    $('#voip3CXID').val(data.userInfor.voip3CXId || '');
                    $('#voip3CXPassword').val(data.userInfor.voip3CXPassword || '');

                    CKEDITOR.instances.signature.setData(data.userInfor.signature || '', function () {
                        this.checkDirty();
                    });
                    $('#imgPhoto').attr('src', data.userInfor.photo);

                    if (data.userInfor.socialUser) {
                        $('#userTypeId').val(data.userInfor.socialUser.userType.id);
                        $('#listUser option:selected').each(function () {
                            $(this).remove();
                        });
                        $('#listUser').append(`<option value="${data.userInfor.socialUser.socialUid}" selected>${data.userInfor.socialUser.name}</option>`).trigger('change');
                    }
                    data.phones.map(i => {
                        var $checked = i.isPrimary ? 'checked' : '';
                        PROPZY_JSON.addPhone(i.phone, $checked);
                        if ($checked !== '') {
                            PROPZY_JSON.phoneOriginal = i.phone;
                        }
                        return i;
                    });
                    data.listingTypes.map(i => {
                        if (i == 1) {
                            $("#chkBuy").prop('checked', true);
                        } else if (i == 2) {
                            $("#chkRent").prop('checked', true);
                        }
                        return i;
                    });
                    if (data.userInfor.startDate) {
                        $('#startDate').val(PROPZY_JSON.toDateString(new Date(data.userInfor.startDate)));
                    }

                    // agent profile
                    $('#avatar_profile_photo').attr('src', data.userInfor.photoAgent || "/images/default_avatar_profile_agent.png");
                    $('#agent_position').val(data.userInfor.userTitleId || "0");
                    CKEDITOR.instances.agent_introduce.setData(data.userInfor.about || '', function () {
                        this.checkDirty();
                    });

                    if (Array.isArray(data.userSocialNetworks) && data.userSocialNetworks.length > 0) {
                        $('#social_network_container').children().remove();
                        data.userSocialNetworks.map(item => {
                            PROPZY_JSON.addSocialNetwork(item.socialNetworkTypeId, item.socialNetworkUrl);

                        });
                    }
                    // end agent profile

                    var zones = data.departments.filter(i => i.departmentType === 'ZONE');
                    var teams = data.departments.filter(i => i.departmentType === 'GROUP');
                    var departments = data.departments.filter(i => i.departmentType === 'DEPARTMENT');
                    PROPZY_JSON.renderZone(zones, teams, departments, data.cities, data.districts, data.wards, data.positions);
                    PROPZY_JSON.renderTransaction(data.tcs);

                    const statusId = data.userInfor.statusId;
                    const statusPublic = data.userInfor.publicUserAgentStatus;

                    let strBadge = `<span class="badge" style="background: darkgray;">Chưa xuất bản</span>`;
                    let strAgentUrlDetail = "";

                    if (statusId === 2) {
                        $('#public-infos').removeClass('hide');
                        if (statusPublic === 1 || statusPublic === 2) {
                            $('#unpublic-infos').removeClass('hide');

                            strBadge = `<span class="badge" style="background: #148b47;">Đã xuất bản</span>`

                            let publishName = data.publishName;
                            publishName = RemoveVNSign(publishName).replace(/\s/g, "-");
                            const url = window?.PORTAL_BASE_URL ? `${window?.PORTAL_BASE_URL}moi-gioi/${publishName}-id${id}` : "#";
                            strAgentUrlDetail = `<div class="agent_url"><a style="margin-bottom: 20px; text-decoration: underline; line-height: 30px; font-size: 13px;" href="${url}" target="_blank">Xem chi tiết hồ sơ</a></div>`
                        }
                    }
                    $("#agent_info").find('.badge').remove();
                    $("#agent_info").find('.agent_url').remove();
                    $("#agent_info").append(strBadge);
                    $('#agent_info').append(strAgentUrlDetail);
                }

            }).always(function () {
                hidePropzyLoading();
            });
        };
    },
    toDateString: ($date) => {
        var $monthString = $date.getMonth() + 1;
        if ($monthString < 10) {
            $monthString = '0' + $monthString;
        }
        var $dateString = $date.getDate();
        if ($dateString < 10) {
            $dateString = '0' + $dateString;
        }
        return $dateString + '/' + $monthString + '/' + $date.getFullYear();
    },
    renderDistrict: (districts = [], departmentWards = []) => {
        var zoneIds = [];
        var teamIds = $('#teamIds').val() || [];
        if (teamIds.length === 0) {
            zoneIds = $('#zoneIds').val() || [];
            if (zoneIds.length === 0) {
                PROPZY_JSON.departments.filter(i => i.departmentType === 'ZONE').map(i => {
                    zoneIds.push(i.id);
                    return i;
                });
            }
        }
        var cityIds = $('#cityIds').val() || [];
        $.ajax({
            type: 'POST',
            url: '/common/getDistrictsByZoneTeam',
            data: JSON.stringify({
                countryIds: [],
                cityIds: cityIds,
                zoneIds: zoneIds,
                teamIds: teamIds
            })
        }).done(function (response) {
            if (response.result) {
                let district = $('<select id="districtIds" name="districtIds[]" multiple="multiple"></select>');
                $('#wardIds_select_container').html('');
                $('#districtIds_container').html('').append(district);

                var data = [];
                if (response.data && response.data.list) {
                    data = [];
                    response.data.list.map(l => {
                        if (!(data.find(d => d.districtId === l.districtId))) {
                            data.push(l);
                        }
                        return l;
                    });
                }
                data.map(it => {
                    var selected = '';
                    if (districts.find(i => i.districtId === it.districtId)) {
                        selected = 'selected';
                    }
                    district.append('<option value="' + it.districtId + '@@' + it.districtName + '@@' + it.cityId + '" ' + selected + '>' + it.districtName + '</option>');
                    return it;
                });
                PROPZY_JSON.initSelectDistrict();
                districts.map(d => {
                    var wards = [];
                    departmentWards.filter(w => w.districtId == d.districtId).map(w => {
                        if (!(wards.find(e => e.wardId === w.wardId))) {
                            wards.push(w.wardId);
                        }
                        return w;
                    });
                    PROPZY_JSON.renderWardsSelect(d.districtId + '@@' + d.districtName + '@@' + d.cityId, wards);
                    return d;
                });
                return;
            }
            showPropzyAlert(response.message);
        }).always(function () {
            hidePropzyLoading();
        });
    },

    initSelectDistrict: () => {
        $("#districtIds").selectize({
            plugins: ['remove_button'],
            searchField: "item",
            render: {
                item: function (data, escape) {
                    var returnVal = '<div>' + data.text + '</div>';
                    return returnVal;
                }
            },
            persist: false,
            create: false,
            onItemRemove: function (data) {
                var arr = data.split('@@');
                $('#wardIds_select_container div[districtName="' + arr[1] + '"]').remove();
            },
            onItemAdd: function (value, item) {
                PROPZY_JSON.renderWardsSelect(value, []);
            }
        });
        return false;
    },
    positionIdDom: (id) => {
        selectizes_array[id] = $(id).selectize({
            plugins: ['remove_button'],
            searchField: "item",
            render: {
                item: function (data, escape) {
                    var returnVal = '<div>' + data.text + '</div>';
                    return returnVal;
                }
            },
            persist: false,
            create: false
        });
        return false;
    },
    WardIdDom: (id) => {
        selectizes_array[id] = $(id).selectize({
            plugins: ['remove_button'],
            searchField: "item",
            render: {
                item: function (data, escape) {
                    var returnVal = '<div>' + data.text + '</div>';
                    return returnVal;
                }
            },
            persist: false,
            create: false
        });
        return false;
    },
    renderPositionsSelect: (v, positions = []) => {
        if (v != null) {
            var arr = v.split('@@');
            var id = arr[0];
            var name = arr[1];
            var arrDepartmentsOfASM = [12, 14, 15, 16, 17]; // id Departments
            const isASMDepartment = arrDepartmentsOfASM.includes(parseInt(id));

            if ($('#positionIds_select_container div[deparmentName="' + name + '"]').length == 0) {

                if (currentUser.userRole == 'ASM' && !isASMDepartment) {
                    // do nothing
                } else {
                    var create_positionIds_select_containerHtml = '<input class="idDepartment" type="hidden" value="' + id + '"/>'
                        + '<div departmentName="' + name + '" class="col-md-6">'
                        + '<h5 style="text-align: center;background-color: darkgray;color: white;font-weight: bold;margin-bottom: 0px;">'
                        + '<input type="checkbox" class="positionId_departments" name="positionId_departments[]" id="positionId_departments_' + id + '" title="Tất cả" value="' + id + '"/>&nbsp;' + name + '</h5>'
                        + '<select class="positionIds" id="positionId' + id + '" name="positionIds[]" multiple="multiple">';
                    $.ajax({
                        url: '/common/get-positions/' + id,
                        type: 'get'
                    }).done(function (response) {
                        var positionList = response.data;
                        if (positionList) {
                            positions_list['positions_' + id] = [];
                            positionList.map(value => {
                                positions_list['positions_' + id].push(value.positionId);
                                var selected = '';
                                if (positions.find(w => w == value.positionId)) {
                                    selected = 'selected';
                                }
                                create_positionIds_select_containerHtml += '<option value="' + value.positionId + '" ' + selected + '>' + value.positionName + '</option>';
                                return value;
                            });

                        }
                        create_positionIds_select_containerHtml += '</select></div>'
                        $('#positionIds_select_container').append(create_positionIds_select_containerHtml);
                        $('input.positionId_departments[type=checkbox]').unbind('click').click(function (e) {
                            var obj = $(this);
                            var selectizeCurrent = selectizes_array['#positionId' + obj.val()][0].selectize;
                            if (obj.is(':checked')) {
                                selectizeCurrent.clear();
                                selectizeCurrent.disable();
                                return;
                            }
                            selectizeCurrent.enable();
                        });
                        PROPZY_JSON.positionIdDom("#positionId" + id);
                        if (positionList && positionList.length == positions.length) {
                            $('#positionId_departments_' + id).trigger('click');
                        }
                    });
                }
            }
        }
    },
    renderWardsSelect: (v, wards = []) => {
        if (v != null) {
            var arr = v.split('@@');
            var id = arr[0];
            var name = arr[1];

            var zoneIds = $('#teamIds').val() || [];
            if (zoneIds.length === 0) {
                zoneIds = $('#zoneIds').val() || [];
                if (zoneIds.length === 0) {
                    PROPZY_JSON.departments.filter(i => i.departmentType === 'ZONE').map(i => {
                        zoneIds.push(i.id);
                        return i;
                    });
                }
            }

            if ($('#wardIds_select_container div[districtName="' + name + '"]').length == 0) {
                var create_wardIds_select_containerHtml = '<input class="idDistrict" type="hidden" value="' + id + '"/>'
                    + '<div districtName="' + name + '" class="col-md-6">'
                    + '<h5 style="text-align: center;background-color: darkgray;color: white;font-weight: bold;margin-bottom: 0px;">'
                    + '<input type="checkbox" class="wardId_districts" name="wardId_districts[]" id="wardId_district_' + id + '" title="Tất cả" value="' + id + '"/>&nbsp;' + name + '</h5>'
                    + '<select class="wardIds" id="wardId' + id + '" name="wardIds[]" multiple="multiple">';
                $.ajax({
                    url: '/common/getWardsByZoneTeamDistrict',
                    type: 'post',
                    data: JSON.stringify({
                        departmentIds: zoneIds,
                        countryIds: [],
                        cityIds: [arr[2]],
                        districtIds: [id]

                    }),
                }).done(function (response) {
                    var wardList = [];
                    response.data.map(d => {
                        if (!(wardList.find(w => w.wardId === d.wardId))) {
                            wardList.push(d);
                        }
                        return d;
                    });
                    if (wardList) {
                        wards_list['wards_' + id] = [];
                        wardList.map(value => {
                            wards_list['wards_' + id].push(value.wardId);
                            var selected = '';
                            if (wards.find(w => w == value.wardId)) {
                                selected = 'selected';
                            }
                            create_wardIds_select_containerHtml += '<option value="' + value.wardId + '" ' + selected + '>' + value.wardName + '</option>';
                            return value;
                        });

                    }
                    create_wardIds_select_containerHtml += '</select></div>'
                    $('#wardIds_select_container').append(create_wardIds_select_containerHtml);
                    $('input.wardId_districts[type=checkbox]').unbind('click').click(function (e) {
                        var obj = $(this);
                        var selectizeCurrent = selectizes_array['#wardId' + obj.val()][0].selectize;
                        if (obj.is(':checked')) {
                            selectizeCurrent.clear();
                            selectizeCurrent.disable();
                            return;
                        }
                        selectizeCurrent.enable();
                    });
                    PROPZY_JSON.WardIdDom("#wardId" + id);
                    // checking the ward list of disrict and ward of object edit. checked when all wards are selected
                    if (wardList && wardList.length == wards.length && wards.length > 0) {
                        $('#wardId_district_' + id).trigger('click');
                    }
                });
            }
        }
    },
    initPhone: () => {
        $('button.phone-remove').unbind('click').click(function () {
            var obj = $(this);
            if (obj.parent().parent().find('.chkPhoneNumberIsMain').is(':checked')) {
                showPropzyAlert('Không xóa được số điện thoại chính');
                return;
            }
            obj.parent().parent().remove();
        });
        $('input.chkPhoneNumberIsMain').unbind('click').click(function () {
            $('input.chkPhoneNumberIsMain').prop('checked', false);
            $('input.invite-phone').removeAttr('name');
            $(this).prop('checked', true);
            $(this).parent().parent().find('.invite-phone').attr('name', 'invite_phone');
        });
    },
    addPhone: (phone = '', checked = '') => {
        var str = `<div class="row" style="margin-top: 10px;">
                        <div class="col-md-6">
                            <input class="form-control invite-input invite-phone" value="${phone}"  ${(checked == '' ? '' : 'name="invite_phone"')}"  placeholder="Số điện thoại" />
                        </div>
                        <div class="col-md-4" style="padding-top: 7px">
                            <input type="checkbox" class="chkPhoneNumberIsMain"value="" ${checked} />
                            <label for="chkPhoneNumberIsMain">số chính</label>
                        </div>
                        <div class="col-md-2 text-right">
                            <button type="button" class="btn btn-danger phone-remove"><i class="fa fa-minus" title="Xóa số điện thoại"></i></button>
                        </div>
                    </div>`;
        $('#phone_container').append(str);
        PROPZY_JSON.initPhone();
    },
    initSocialNetwork: () => {
        PROPZY_JSON.addSocialNetwork();
    },
    addSocialNetwork: (socialId = "", socialLink = "") => {
        const curSelectLength = $('#social_network_container').find('.social_network_select').length;
        const listOption = PROPZY_JSON.listSocialNetwork.map((item) => {
            return `<option value="${item.id}" ${item.id === socialId ? 'selected="selected"' : ''}>${item.name}</option>`
        })
        var str = ` <div class="row social-row" style="margin-top: 10px;">
                        <div class="col-md-4">
                            <select class="invite-social-network form-control social_network_select" name="social_network_select_${curSelectLength}" class="form-control">
                                <option value="0">--- Chọn ---</option>
                                ${listOption}
                            </select>
                        </div>
                        <div class="col-md-6">
                            <input class="form-control social_network" name="social_network_input_${curSelectLength}" value="${socialLink}" style="width: 100%;" placeholder="Nhập đường dẫn" rows="3">
                        </div>
                        <div class="col-md-2 text-right">
                            <button type="button" class="btn btn-danger social-network-remove"><i class="fa fa-minus" title="Xóa mạng xã hội"></i></button>
                        </div>
                    </div>`;
        $('#social_network_container').append(str);
        $('button.social-network-remove').on('click', function () {
            var obj = $(this);
            obj.parent().parent().remove();
            PROPZY_JSON.checkDisplayBtnRemoveSocialNetwork();
        });

        PROPZY_JSON.updateSocialFieldValidate();
        PROPZY_JSON.checkDisplayBtnRemoveSocialNetwork();
    },
    updateSocialFieldValidate: () => {
        var socialSelect = $('#social_network_container').find('.social_network_select');
        var socialInput =  $('#social_network_container').find('.social_network');
        socialSelect.length && PROPZY_JSON.addValidateRules(socialSelect, {checkDuplicatedVal: true, messages: {
            checkDuplicatedVal: 'Vui lòng không chọn trùng'
        }});
        socialInput.length && PROPZY_JSON.addValidateRules(socialInput, {urlPatern: true, messages: {
            urlPatern: 'Vui lòng nhập đúng url'
        }});
    },
    addValidateRules: (eleGroup, rules) => {
        eleGroup.each(function() {
            var self  = $(this);
            self.rules('remove', 'checkDuplicatedVal');
            self.rules('add', rules);
        })
    },
    getListSocialNetwork: () => {
        $.ajax({
            url: "/user/get-list-social-network",
            type: "GET",
            processData: false, // tell jQuery not to process the data
            contentType: false, // tell jQuery not to set contentType
        }).done(function(response) {
            PROPZY_JSON.listSocialNetwork = response;
            PROPZY_JSON.initSocialNetwork();
        });
    },
    checkDisplayBtnRemoveSocialNetwork: () => {
        $('button.social-network-remove').css("display", $('select.invite-social-network').size() === 1 ? "none" : "inline-block");
    },
    initUploadImage: () => {
        $('#avatar_profile_photo').attr('src', "/images/default_avatar_profile_agent.png")
    }
}
let url = "";
let dataPost = {};
let id;
$(function () {
    if (parseInt($('#profileId').val(), 10) > 0) {
        $('#isDisplayUserPortal').css('display', 'block');
    }
    CKEDITOR.replace("signature");
    CKEDITOR.replace("agent_introduce");
    PROPZY_JSON.clearForm('');
    $('#phone-add').click(function () {
        PROPZY_JSON.addPhone();
    });
    $('#social-network-add').on("click", function () {
        PROPZY_JSON.addSocialNetwork();
    });

    PROPZY_JSON.getListSocialNetwork();
    PROPZY_JSON.initPhone();
    PROPZY_JSON.initUploadImage();

    function validateFormContact(isPublic = false) {
        if (isPublic) {
            // case public check required of introduce, position and image
            $("#agent_introduce").rules('add', {
                requireAgentIntroduce: true,
                limitAgentIntroduce: true,
                messages: {
                    requireAgentIntroduce: "Vui lòng nhập giới thiệu",
                    limitAgentIntroduce: "Vui lòng chỉ nhập tối đa 2000 ký tự",
                }
            });
            $("#agent_position").rules('add', {
                checkPosition: true,
                messages: {
                    checkPosition: "Vui lòng chọn Vị trí",
                }
            });
            $("#avatarProfileImage").rules('add', {
                checkImageUpload: true,
                messages: {
                    checkImageUpload: "Vui lòng chọn hình ảnh",
                }
            });
        } else {
            // remove validate required and onchange, then add validate onchange
            $("#agent_introduce").rules('remove');
            $("#agent_position").rules('remove');
            $("#avatarProfileImage").rules('remove');

            $("#agent_introduce").rules('add', {
                limitAgentIntroduce: true,
                messages: {
                    limitAgentIntroduce: "Vui lòng chỉ nhập tối đa 2000 ký tự",
                }
            });
        }

        const validateIntroduce = validateFormInvite.element("#agent_introduce");
        const validatePosition = validateFormInvite.element("#agent_position");
        const validateProfileImage = validateFormInvite.element("#avatarProfileImage");
        const validateForm = $("#form-invite-contacts").validate(validateOptions);

        return validateIntroduce && validatePosition && validateProfileImage && validateForm.form();
    }

    function saveContact(isPublic = false) {
        id = parseInt($('#profileId').val() || 0, 10);
        $('#form-invite-contacts .invisible.prop-hidden').find('input, select').each(function () { $(this).addClass('ignore-validate'); })

        var departments = $('#departmentIds').val() || [];
        var positions = [];
        departments = departments.map(i => {
            var arr = i.split('@@');
            var positionIds = $('#positionId' + arr[0]).val() || [];
            if ($('#positionId_departments_' + arr[0]).is(':checked')) {
                positionIds = positions_list['positions_' + arr[0]];
            }
            positionIds.map(p => {
                positions.push({
                    positionId: p,
                    isPrimary: false
                });
            });
            return {
                departmentId: parseInt(arr[0], 10),
                isPrimary: false,
                isGroupAdmin: $('#manage-department').is(':checked')
            }
        });
        $('#position_required').val('');
        if (positions.length > 0) {
            $('#position_required').val('1');
        }

        if (!validateFormContact(isPublic)) return false;

        var phoneNumbers = [];
        $('input.invite-phone').each(function () {
            if ($(this).val().trim() !== '') {
                phoneNumbers.push({ phone: $(this).val().trim(), isPrimary: $(this).parent().parent().find('.chkPhoneNumberIsMain').is(':checked') });
            }
        });

        var listing = [];
        if ($("#chkBuy").is(":checked")) {
            listing.push(1);
        }
        if ($("#chkRent").is(":checked")) {
            listing.push(2);
        }
        $('#voipId').keypress(function (e) {
            return e.metaKey || // cmd/ctrl
                e.which <= 0 || // arrow keys
                e.which == 8 || // delete key
                /[0-9]/.test(String.fromCharCode(e.which)); // numbers
        });
        var startDate = $("#startDate").val().trim();
        startDate = startDate.split("/");
        startDate = new Date(startDate[1] + "/" + startDate[0] + "/" + startDate[2]).getTime();

        var districts = $('#districtIds').val() || [];
        var wards = [];
        districts = districts.map(i => {
            var arr = i.split('@@');
            var wardIds = $('#wardId' + arr[0]).val() || [];
            if ($('#wardId_district_' + arr[0]).is(':checked')) {
                wardIds = wards_list['wards_' + arr[0]];
            }
            wardIds.map(w => {
                wards.push({
                    cityId: arr[2],
                    districtId: arr[0],
                    wardId: parseInt(w, 10),
                    isPrimary: false
                });
            });
            return {
                cityId: arr[2],
                districtId: arr[0],
                isPrimary: false
            };
        });
        var cities = $('#cityIds').val() || [];
        cities = cities.map(i => {
            return {
                cityId: i,
                isPrimary: false
            }
        });
        var zones = $('#zoneIds').val() || [];
        if ($('#all-zone').is(':checked')) {
            zones = PROPZY_JSON.departments.filter(i => i.departmentType === 'ZONE').map(i => i.id);
        }
        zones = zones.map(i => {
            return {
                departmentId: i,
                isPrimary: false,
                isGroupAdmin: $('#manage-zone').is(':checked')
            }
        });
        var tcs = $('#tcIds').val() || [];
        tcs = tcs.map(i => {
            return {
                tcId: i,
                isPrimary: false
            }
        });
        var teams = $('#teamIds').val() || [];
        if ($('#all-team').is(':checked')) {
            teams = PROPZY_JSON.teams;
        }
        teams = teams.map(i => {
            return {
                departmentId: i,
                isPrimary: false,
                isGroupAdmin: $('#manage-team').is(':checked')
            }
        });

        var userSocialNetworks = [];
        $('select.invite-social-network').each(function () {
            var self = $(this);
            var selfVal = self.val();
            if (selfVal.trim() !== '0' && self.closest('.social-row').find('.social_network').val() !== '') {
                userSocialNetworks.push({ socialNetworkTypeId: +selfVal.trim(), socialNetworkUrl: self.parent().parent().find('.social_network').val() });
            }
        });

        dataPost = {
            photo: $('#imgPhoto').attr('src'),
            userName: id > 0 ? $('#username').val() || null : null,
            userId: id > 0 ? id : null,
            statusId: null,
            name: $("#fullName").val().trim(),
            email: $("#invite_email").val().trim(),
            realName: ($("#realName").val() || '').trim(),
            phones: phoneNumbers,
            voipId: $("#voipId").val().trim(),
            voipPassword: $("#voipPassword").val(),
            voip3CXId: $("#voip3CXID").val().trim(),
            voip3CXPassword: $("#voip3CXPassword").val(),
            departments: departments,
            positions: positions,
            cities: cities,
            districts: districts,
            wards: wards,
            listingTypes: listing,
            zones: zones,
            teams: teams,
            tcs: tcs,
            startDate: startDate,
            signature: CKEDITOR.instances['signature'].getData(),
            socialUid: parseInt($('#listUser').val() || 0),
            autoCreateAgent: $('#isUserPortal').is(':checked'),
            msnv: ($('#employeeCode').val() || '').trim(),
            checkMail: id > 0 ? (PROPZY_JSON.emailOriginal != $("#invite_email").val().trim() && PROPZY_JSON.emailOriginal !== '') : true,
            checkPhone: id > 0 ? phoneNumbers.filter(i => i.isPrimary && i.phone == PROPZY_JSON.phoneOriginal && PROPZY_JSON.phoneOriginal !== '').length === 0 : true,
            // agent
            photoAgent: $('#avatar_profile_photo').attr('src'),
            userTitleId: +$('#agent_position').val(),
            about: CKEDITOR.instances['agent_introduce'].getData(),
            userSocialNetworks
        };
       
        url = "/user/do-invite-contacts";
        if (id > 0) {
            url = "/user/do-update-infos-user";
            if (isPublic) {
                dataPost.isPublish = true;
            }
        }

        if (isPublic) {
            $('#confirmPublicContact').modal('show');
        } else {
            fetchApiSaveContact();
        }
    }

    function fetchApiSaveContact(isPublic = false) {
        showPropzyLoading();

        $.ajax({
            url: url,
            data: JSON.stringify(dataPost),
            type: "post",
        }).done(function (response) {
            if (response.result) {
                showPropzyAlert(isPublic ? "Xuất bản hồ sơ thành công!": response.message);
                $('#updateInfosContacts').modal('hide');
                $("#alertModal").on("hide.bs.modal", function () {
                    if (id > 0 && response.data.assignUsers && response.data.assignUsers.length > 0) {
                        try {
                            showReceiveListingsModal(response.data);
                        } catch (ex) { }
                        return;
                    }
                    window.location.reload();
                });
                return;
            }
            showPropzyAlert(response.message);
        }).always(function () {
            hidePropzyLoading();
        });
    }
    
    $('#listUser').select2({
        ajax: {
            url: '/get-user-by-source',
            type: 'POST',
            data: function (params) {
                var query = {
                    keyword: params.term,
                    source: $('#userTypeId').val()
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
    $('#all-zone').click(function () {
        if ($(this).is(':checked')) {
            PROPZY_JSON.zoneSelectize[0].selectize.clear();
            PROPZY_JSON.zoneSelectize[0].selectize.disable();
            $('#zoneIds').trigger('change');
            return;
        }
        PROPZY_JSON.zoneSelectize[0].selectize.enable();
        $('#zoneIds').trigger('change');
    });
    $('#all-team').click(function () {
        if ($(this).is(':checked')) {
            PROPZY_JSON.teamSelectize[0].selectize.clear();
            PROPZY_JSON.teamSelectize[0].selectize.disable();
            $('#teamIds').trigger('change');
            return;
        }
        PROPZY_JSON.teamSelectize[0].selectize.enable();
        $('#teamIds').trigger('change');
    });
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


    // create validations
    $('#form-invite-contacts .invisible.prop-hidden').find('input, select').each(function () { $(this).addClass('ignore-validate'); });
    var validateOptions = {
        ignore: '.ignore-validate',
        rules: {
            fullName: { required: true, noSpaceAsEmpty: true },
            realName: { required: true, requireNormalChar: true },
            username: { required: true, noSpaceAsEmpty: true },
            invite_email: { required: true, email: true },
            invite_phone: { required: true, phoneNumber: true, noSpaceAsEmpty: true },
            startDate: { required: true },
            position_required: { required: true },
            "districtIds[]": { required: true },
            "cityIds[]": { required: true },
            "tcIds[]": { required: true },
            "departmentIds[]": { required: true },
            
        },
        messages: {
            fullName: { required: 'Vui lòng nhập vào Tên tài khoản', noSpaceAsEmpty: 'Vui lòng nhập vào Tên tài khoản' },
            realName: { required: 'Vui lòng nhập vào Họ và tên', requireNormalChar: 'Họ và tên không được chứa số hoặc kí tự đặc biệt' },
            username: { required: 'Vui lòng nhập vào Tên tài khoản', noSpaceAsEmpty: 'Vui lòng nhập vào Tên tài khoản' },
            invite_email: { required: 'Vui lòng nhập đúng email', email: 'Vui lòng nhập đúng email' },
            invite_phone: { required: 'Vui lòng nhập vào số Điện thoại', noSpaceAsEmpty: 'Vui lòng nhập đúng số Điện thoại', phoneNumber: 'Vui lòng nhập đúng số Điện thoại' },
            startDate: { required: 'Vui lòng nhập vào Ngày bắt đầu làm việc' },
            position_required: { required: 'Vui lòng chọn Chức vụ' },
            "districtIds[]": { required: 'Vui lòng chọn Quận/Huyện quản lý' },
            "cityIds[]": { required: 'Vui lòng chọn Thành phố' },
            "tcIds[]": { required: 'Vui lòng chọn Transaction' },
            "departmentIds[]": { required: 'Vui lòng chọn Bộ phận' },
        },
        errorPlacement: function(error, element) {
            if($(element).hasClass('social_network_select')) {
                $(element).removeClass('error');
            }
            error.insertAfter(element);
        },
        highlight: function(element, errorClass) {
            if($(element).hasClass('social_network_select')) {
                $(element).removeClass('error');
            }
        }
    }
    var validateFormInvite = $("#form-invite-contacts").validate(validateOptions);

    $("#startDate").datepicker({
        format: "dd/mm/yyyy",
    });

    $("#add-contacts, #update-infos").click(() => {
        saveContact();
    });

    $("#public-infos").click(() => {
        saveContact(true);
    });    

    $("#unpublic-infos").click(() => {
        $('#confirmUnpublicContact').modal('show');
    });

    $("#avatarProfileImage").change(function () {
        var formData = new FormData();
        var file = $("#avatarProfileImage")[0].files[0];
        $("#avatarProfileImage").rules('remove');

        if ($("#avatarProfileImage")[0].files.length > 0) {
            $("#avatarProfileImage").rules('add', {
                uploadImageType: true,
                // uploadImageSize: true,
                messages: {
                    uploadImageType: "Vui lòng chọn ảnh có định dạng PNG, JPG, JPEG",
                    // uploadImageSize: "Vui lòng chọn ảnh có dung lượng tối đa 2MB",
                }
            })
            
            if (!validateFormInvite.element("#avatarProfileImage")) {
                return false;
            };
            formData.append("file_data", file);
            $.ajax({
                url: "/user/upload-avatar-get-url",
                type: "POST",
                data: formData,
                processData: false, // tell jQuery not to process the data
                contentType: false, // tell jQuery not to set contentType
                success: function (data) {
                    $("#avatar_profile_photo").attr("src", data).attr("alt", file.name);
                },
            });
        }
    });

    CKEDITOR.instances['agent_introduce'].on('change', function() {
        if (CKEDITOR.instances['agent_introduce'].getData() !== "") {
        $("#agent_introduce").rules('add', {
            requireAgentIntroduce: true,
            limitAgentIntroduce: true,
            messages: {
                requireAgentIntroduce: "Vui lòng nhập giới thiệu",
                limitAgentIntroduce: "Vui lòng chỉ nhập tối đa 2000 ký tự",
            }
        });
    
        if (!validateFormInvite.element("#agent_introduce")) {
            return false;
        };
        }
    });

    $("#submitPublicContact").on("click", function() {
        $('#confirmPublicContact').modal('hide');
        fetchApiSaveContact(true);
    });

    $("#submitUnpublicContact").click(() => {
        var postData = {
            userId: parseInt($('#profileId').val() || 0, 10)
        }        
        showPropzyLoading();
        $.ajax({
            'url': '/user/do-unpublish-contacts',
            'type': 'PUT',
            'data': JSON.stringify(postData)
        }).done(function (response) {
            if (response.result) {
                showPropzyAlert("Ngừng xuất bản hồ sơ thành công!");
                $('#updateInfosContacts').modal('hide');
                $("#confirmUnpublicContact").modal('hide');
                window.location.reload();
            }
        }).fail(function () {
            showPropzyAlert('Có lỗi xảy ra, vui lòng thử lại.');
        }).always(function () {
            hidePropzyLoading();
        });
    });
});