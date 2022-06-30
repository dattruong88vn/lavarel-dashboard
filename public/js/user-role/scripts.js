function forgotPassword(phone = null, email = null){
    var dataPost = {};
    dataPost.phone = phone;
    dataPost.email = email;
    console.log(dataPost);
    $.ajax({
        url: "/user-role/forgot-password",
        type: 'post',
        data: JSON.stringify(dataPost)
    }).done(function (response) {
        console.log(response);
    });
}

function renderUsersList(teamId){
    $.ajax({
        url: `/departments/admin-get-users-list/${teamId}`,
        type: 'post',
        data: JSON.stringify({})
    }).done(function (response) {
        if (response.result) {
            let leaders = response.data.manager.map(function(leader,index){
                return leader.name;
            })
            let title = leaders.length > 0 ? `Team Leader: ${leaders.join(', ')}` : `Team Leader: N/A`;
            let html = `
                <div style="margin: 14% 0px 5px 0px;
                        padding-right: 15px;">
                    <span>${title}<span>
                    <span style="float:right" class="badge">Tổng thành viên: ${response.data.numberOfUser}<span>
                </div>
            `;
            html += '<ul class="list-group">';
            if(response.data.members != null && response.data.members.length > 0){
                $.each(response.data.members,function(index,item){
                    let leaders = item.positions.map(function(leader,index){
                        return leader.positionName;
                    })
                    let title = leaders.length > 0 ? `Bộ phận: ${leaders.join(', ')}` : `Bộ phận: N/A`;
                    let name = item.name != null ? item.name : `ID: ${item.userId} (${item.statusName})`;
                    html += `<li class="list-group-item node-treeview node-selected" style="">${name} - <span>${title}</span></li>`;
                    
                })
            }else{
                html += `<li class="list-group-item node-treeview node-selected" style="">Không tìm thấy dữ liệu</li>`;
            }
            html += `</ul>`;
            $('#treeviewPosition').html(html);    
        } else {
            showPropzyAlert(response.message);
        }
    });
}

function renderTeamList(zoneId){
    $.ajax({
        url: `/departments/admin-get-team-list/${zoneId}`,
        type: 'post',
        data: JSON.stringify({})
    }).done(function (response) {
        if (response.result) {
            let leaders = response.data.manager.map(function(leader,index){
                return leader.name;
            })
            let title = leaders.length > 0 ? `ASM: ${leaders.join(', ')}` : `ASM: N/A`;
            let html = `
                <div style="margin: 14% 0px 5px 0px;
                        padding-right: 15px;">
                    <span>${title}<span>
                    <span style="float:right" class="badge">Tổng thành viên: ${response.data.numberOfUser}<span>
                </div>
            `;
            html += '<ul class="list-group">';
            if(response.data.teams != null && response.data.teams.length > 0){
                $.each(response.data.teams,function(index,item){
                    let leaders = item.manager.map(function(leader,index){
                        return leader.name;
                    })
                    let title = leaders.length > 0 ? `Leader: ${leaders[0]}` : `Leader: N/A`;
                    if(item.team){
                        html += `<li class="list-group-item node-treeview node-selected" style=""> ${item.team.departmentName} - <span>${title}</span><span class="badge">${item.numberOfUser}</span></li>`;
                    }
                })
            }else{
                html += `<li class="list-group-item node-treeview node-selected" style="">Không tìm thấy dữ liệu</li>`;
            }
            html += `</ul>`;
            $('#treeviewPosition').html(html);    
        } else {
            showPropzyAlert(response.message);
        }
    });
}

function renderPositionList(id,departmentName){
    $('#departmentName').html(departmentName);
    $.ajax({
        url: "/user-role/list-position",
        type: 'post',
        data: JSON.stringify({'id':id})
    }).done(function (response) {
        if (response.result) {
            var treeData = [];
            $.each(response.data, function (k, v) {
                treeData.push(buildTreePosition(v));
            });
            //console.log(treeData);
            $('#wrapTreeviewPosition').css("padding-top","20%");
            $('#treeviewPosition').treeview({
                data: treeData
            });
        } else {
            showPropzyAlert(response.message);
        }
    });
}

function buildTreePosition(data) {
    if (data == null || data.length == 0) {
        return null;
    }
    var tag = '<button data-id="' + data.positionId + '" class="pull-right btn btn-xs btn-danger" data-type="delete" onclick="deletePostion(this,'+ data.positionId +'); return false;"><i class="ace-icon fa fa-trash bigger-120"></i></button>';
    tag += '<button data-id="' + data.positionId + '" class="pull-right btn btn-xs btn-info" data-toggle="modal" data-type="edit" data-target="#myModal"><i class="ace-icon fa fa-pencil bigger-120"></i></button>';
    tag += '<button data-departmentid="'+data.departmentId+'" data-id="' + data.positionId + '" class="btn btn-xs pull-right" data-toggle="modal" data-type="quickAdd" data-target="#myModal"><i class="ace-icon fa fa-plus bigger-120"></i></button>';
    var tree = {
        text: data.positionName + tag,
        href: '#' + data.positionId,
        tags: '[' + data.positionId + ']',
        nodes: []
    };
    if (data.children !== null && data.children.length > 0) {
        $.each(data.children, function (k, v) {
            tree.nodes.push(buildTreePosition(v));
        });
    }

    return tree;
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

$(document).ready(function(){});

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

// translate to vietnam
$('#create-position input[type=text], #create-position select').on('change invalid', function() {
    var textfield = $(this).get(0);
    textfield.setCustomValidity('');

    if (!textfield.validity.valid) {
        textfield.setCustomValidity('Vui lòng không để trống');
    }
});

// function submit
function submitCreateAccount() {
    var dataPost = {'positionId': $('#positionId').val() == '' ? null : $('#positionId').val()};
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
    dataPost.permissions = privatePermissions;
    dataPost.positionName = $('#name').val();
    dataPost.departmentId = $('#department').val();
    dataPost.parentId = $('#parent').val();
    //End
    //console.log(JSON.stringify(dataPost));
    $.ajax({
        url: "/user-role/store-position",
        type: "post",
        data: JSON.stringify(dataPost)
    }).done(function (response) {
        //console.log(response);
        if(response.result){
            $('#myModal').modal('hide');
            renderPositionList(dataPost.departmentId,$("#department option:selected").text());
        }
    }).always(function () {
        // hidePropzyLoading();
    });
}

$('#myModal').on('hidden.bs.modal',function(){
    $('#myModal .modal-body').html('... Đang tải form');
});

var form = document.querySelector('#create-position');

// process submit after valid
form.addEventListener('submit', function (e) {
    e.preventDefault();
    //console.log('bla');
    submitCreateAccount();
}, false);

$('#myModal').on('shown.bs.modal', function (e) {
    var type = $(e.relatedTarget).data('type');
    if(type == 'edit'){
        $('#myModalLabel').text('Cập nhật chức vụ');
        $('#btn-submit').text('Cập nhật');
    } else {
        $('#myModalLabel').text('Tạo chức vụ mới');
        $('#btn-submit').text('Thêm');
    }
    var url = "/user-role/create-position";
    if(type == 'edit'){
        url = "/user-role/edit-position/"+$(e.relatedTarget).data('id');
    }else if(type == 'quickAdd'){//quickAddPosition
        url = "/user-role/quick-add-position/"+$(e.relatedTarget).data('departmentid')+"/"+$(e.relatedTarget).data('id');
    }
    // will only come inside after the modal is shown
    $.ajax({
        url: url,
        type: "post"
    }).done(function (response) {
        $('#myModal .modal-body').html(response);
        $("#department,#parent").selectize();
        initSelectRoles();
        $('#department').change(function(){
            if($('#department').val() != ''){
                $.ajax({
                    url: "/user-role/genarate-parent-position/"+$('#department').val(),
                    type: "get"
                }).done(function (response) {
                    $('#parent').selectize()[0].selectize.destroy();
                    $('#parent').html(response);
                    $("#parent").selectize();
                }).always(function () {
                    // hidePropzyLoading();
                });
            }
        });
        //console.log(response);
    }).always(function () {
        // hidePropzyLoading();
    });
});

function deletePostion(element, positionId){
    if(!confirm('Bạn có chắc xóa không?')){
        return false;
    } else {
        showPropzyLoading();
        var dataPost = {};
        dataPost.positionId = positionId;
        $.ajax({
            url: "/departments/do-delete-position",
            data: JSON.stringify(dataPost),
            type: "post"
        }).done(function (response) {
            console.log(response);
            if (response.result) {
                $('#treeviewPosition').find('.node-selected').remove();
                showPropzyAlert(response.message);
            } else {
                showPropzyAlert(response.message);
            }
        }).always(function () {
            hidePropzyLoading();
        });
    }
};