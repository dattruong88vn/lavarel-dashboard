$(document).ready(function () {
    var parentId = $('#parentId').val();
    $.ajax({
        url: "/common/get-list-parents/id-" + parentId,
        type: 'get'
    }).done(function (response) {
        if (response.result) {
            var treeData = [];
            $.each(response.data, function (k, v) {
                if (v.departmentType == 'ZONE') {
                    treeData.push(buildTree(v));
                }
            });
            $('#treeview').treeview({
                data: treeData
            });
        } else {
            showPropzyAlert(response.message);
        }
    });

    jQuery.validator.addMethod("noSpaceAsEmpty", function (value, element) {
        return value.trim() != "" && value != "";
    }, jQuery.validator.messages.noSpaceAsEmpty);

    var validateOptions = {
        ignore: null,
        rules: {
            "department_name": {required: true, noSpaceAsEmpty: true},
            "zoneId": {required: true},
            'department_manage': {required: true}
        },
        messages: {
            "department_name": {required: 'Vui lòng nhập Tên nhóm', noSpaceAsEmpty: 'Vui lòng nhập Tên nhóm'},
            "emailCCLegal": {multiemail: "Vui lòng nhập đúng email"},
            "zoneId": {required: 'Vui lòng chọn khu vực'},
            'department_manage': {required: 'Vui lòng chọn thành phố'}
        }
    };

    var validateDepartment = $("#form-department").validate(validateOptions);
    $('#department-submit').on('click', function (event) {
        event.preventDefault();
        if (!validateDepartment.form()) {
            return false;
        }

        var form = $('#form-department');
        form.find('.errors').html('');

        var districtIds = $('#districtIds').val();
        let wards = [];
        let districts = [];
        if (districtIds) {
            districtIds.map(it => {
                var arr = it.split('-');
                districts.push({
                    countryId: $('#countryId').val(),
                    cityId: $('#department_manage').val(),
                    districtId: arr[0]
                });

                var wardIds = $('#wardId' + arr[0]).val();
                if ($('#wardId_district_' + arr[0]).is(':checked')) {
                    wardIds = wards_list['wards_' + arr[0]];
                }
                if (wardIds) {
                    wardIds.map(w => {
                        wards.push({
                            countryId: $('#countryId').val(),
                            cityId: $('#department_manage').val(),
                            districtId: arr[0],
                            wardId: w
                        });
                    });
                }
                return it;
            });
        }
        $textError = '';
        if (districts.length === 0) {
            $textError = 'Vui lòng chọn quận/huyện';
        }
        if (wards.length === 0) {
            $textError += ($textError === '' ? '' : '<br/>') + 'Vui lòng chọn phường/xã';
        }
        if ($textError !== '') {
            showPropzyAlert($textError);
            return;
        }
        var dataPost = {
            departmentName: $('#department_name').val().trim(),
            departmentShortName: $('#department_shortname').val().trim(),
            departmentType: 'GROUP',
            parentId: $('#zoneId').val(),
            countries: [{
                countryId: $('#countryId').val()
            }],
            cities: [{
                countryId: $('#countryId').val(),
                cityId: $('#department_manage').val()
            }],
            districts: districts,
            wards: wards
        };
        showPropzyLoading();
        var urlDoActionDepartment = '/departments/do-create-department';
        if (parseInt($('#departmentId').val(), 10) > 0) {
            urlDoActionDepartment = '/departments/do-update-department';
            dataPost.departmentId = $('#departmentId').val();
        }
        $.ajax({
            url: urlDoActionDepartment,
            data: JSON.stringify(dataPost),
            type: "post"
        }).done(function (response) {
            if (response.result) {
                showPropzyAlert(response.message);
                $('#modalDepartment').modal('hide');
                $('#alertModal').on('hide.bs.modal', function () {
                    location.reload();
                });
            } else {
                showPropzyAlert(response.message);
            }
        }).always(function () {
            hidePropzyLoading();
        });
    });

    $('#department-cancel').on('click', function (event) {
        event.preventDefault();
        $('#modalDepartment').modal('hide');
    });
    $('#zoneId').change(function (e) {
        let zoneId = $(this).val();
        PROPZY_JSON.renderCity(zoneId, 0);
    });
    $('#department_manage').change(function (e) {
        let cityId = $(this).val();
        $('#countryId').val($(this).find(':selected').attr('data-country-id'));
        PROPZY_JSON.renderDistrict(cityId, [], []);
    });
    ///common/edit-department/
});

const selectizes_array = {};
const wards_list = {};
const PROPZY_JSON = {
    renderDistrict: (cityId, districts = [], departmentWards = []) => {
        var zoneId = $('#zoneId').val();
        $.ajax({
            type: 'POST',
            url: '/common/getDistrictsByZoneTeam',
            data: JSON.stringify({
                countryIds: [],
                cityIds: [cityId],
                zoneIds: [zoneId],
                teamIds: []
            })
        }).done(function (response) {
            if (response.result) {
                let district = $('<select id="districtIds" name="districtIds[]" multiple="multiple"></select>');
                $('#wardIds_select_container').html('');
                $('#districtIds_container').html('').append(district);

                var data = [];
                if (response.data && response.data.list) {
                    data = response.data.list;
                }
                data.map(it => {
                    var selected = '';
                    if (districts.find(i => i.districtId === it.districtId)) {
                        selected = 'selected';
                    }
                    district.append('<option value="' + it.districtId + '-' + it.districtName + '" ' + selected + '>' + it.districtName + '</option>');
                    return it;
                });
                PROPZY_JSON.initSelectDistrict();
                districts.map(d => {
                    var wards = departmentWards.filter(w => w.districtId == d.districtId).map(w => w.wardId);
                    PROPZY_JSON.renderWardsSelect(d.districtId + '-' + d.districtName, wards, cityId);
                    return d;
                });
                return;
            }
            showPropzyAlert(response.message);
        }).always(function () {
            hidePropzyLoading();
        });
    },
    renderCity: (zoneId, cityId = 0) => {
        $.ajax({
            type: 'POST',
            url: '/common/getCitiesByZoneTeam',
            data: JSON.stringify({
                countryIds: [],
                departmentIds: [zoneId]
            })
        }).done(function (response) {
            if (response.result) {
                let city = $('#department_manage');
                city.html('');
                var data = [];
                if (response.data && response.data.list) {
                    data = response.data.list;
                }
                data.map(it => {
                    city.append('<option value="' + it.cityId + '" data-country-id="' + it.countryId + '">' + it.cityName + '</option>');
                    return it;
                });
                if (parseInt(cityId, 10) > 0) {
                    city.val(cityId + '');
                    return;
                }
                city.val(city.find('option:first').val());
                city.trigger('change');
                return;
            }
            showPropzyAlert(response.message);
        }).always(function () {
            hidePropzyLoading();
        });
    },
    openPopup: (element, id) => {
        PROPZY_JSON.clearForm('TẠO NHÓM', id);
        $('#modalDepartment').modal();
        if (parseInt(id, 10) > 0) {
            $.ajax({
                url: "/common/getZoneDetail/" + id,
                type: "get"
            }).done(function (response) {
                if (response.result) {
                    var data = response.data;
                    $('#modal-title').html('CẬP NHẬT NHÓM: ' + data.departmentName);
                    $('#zoneId').val(data.parentId);
                    $('#departmentId').val(data.id);
                    $('#department_name').val(data.departmentName);
                    $('#department_shortname').val(data.departmentShortName);
                    if (data.emailCCLegal) {
                        $('#emailCCLegal').val(data.emailCCLegal);
                    }
                    var countryId = 0;
                    data.departmentCountries.map(i => {
                        countryId = i.countryId;
                        return i;
                    });

                    var cityId = 0;
                    data.departmentCities.map(i => {
                        cityId = i.cityId;
                        return i;
                    });
                    $('#countryId').val(countryId);
                    PROPZY_JSON.renderCity(data.parentId, cityId);
                    PROPZY_JSON.renderDistrict(cityId, data.departmentDistricts, data.departmentWards);
                }

            }).always(function () {
                hidePropzyLoading();
            });
        };
    },
    clearForm: (title, departmentId) => {
        $('#modal-title').html(title);
        $('#departmentId').val(departmentId);
        if (parseInt(departmentId, 10) <= 0) {
            $('#zoneId').val($("#zoneId option:first").val()).trigger('change');
        }
        $('#department_name').val('');
        $('#department_shortname').val('');
        $('#department_manage').html('');
        $('#districtIds').html('');
        $('#wardIds_select_container').html('');
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
                var arr = data.split('-');
                $('#wardIds_select_container div[districtName="' + arr[1] + '"]').remove();
            },
            onItemAdd: function (value, item) {
                PROPZY_JSON.renderWardsSelect(value, []);
            }
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
    renderWardsSelect: (v, wards = [], cityId = -1) => {
        if (v != null) {
            var arr = v.split('-');
            var id = arr[0];
            var name = arr[1];

            var zoneId = $('#zoneId').val() || -1;
            if (parseInt(cityId, 10) < 0) {
                cityId = $('#department_manage').val() || -1;
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
                        departmentIds: [zoneId],
                        countryIds: [],
                        cityIds: [cityId],
                        districtIds: [id]
                    }),
                }).done(function (response) {
                    var wardList = response.data;
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
    }
}
function buildTree(data) {
    if (data == null || data.length == 0) {
        return null;
    }
    let tag = '';
    if (data.departmentType == 'GROUP') {
        tag += '<button data-id="' + data.id + '" class="pull-right btn btn-xs btn-info btn-update tooltip-success popup-update-department"  onclick="return PROPZY_JSON.openPopup(this, ' + data.id + ')"><i class="ace-icon fa fa-pencil bigger-120"></i></button>';
        // tag += '<button data-id="' + data.id + '" class="btn btn-xs btn-add btn-create tooltip-success popup-create-department"  onclick="return createPopup(this, ' + data.id + ')"><i class="ace-icon fa fa-plus bigger-120"></i></button>';
        tag += '<button onclick="renderUsersList(' + data.id + ')" class="pull-right btn bn-link btn-xs"><i class="fa fa-street-view" aria-hidden="true"></i></button>';
    }
    let textDepartmentName = data.departmentName.length > 35 ? trimText(data.departmentName, 8) : data.departmentName;
    var tree = {
        text: textDepartmentName + tag,
        href: '#' + data.id,
        tags: '[' + data.id + ']',
        nodes: []
    };
    if (data.children !== null && data.children.length > 0) {
        $.each(data.children, function (k, v) {
            tree.nodes.push(buildTree(v));
        });
    }
    return tree;
}