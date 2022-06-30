var tableUnblockPhone = $("#table-unblock-phone").DataTable({
    "processing": true,
    "searching": true,
    "serverSide": true,
    "ajax": "/customer/get-phone-list",
    "scrollX": false,
    "lengthChange": false,
    "paging": true,
    "pageLength": 10,
    "order": false,
    "drawCallback": function () {
        $('.dataTables_paginate > .pagination').addClass('pagination-sm');
        var pagination = $(this).closest('.dataTables_wrapper').find('.dataTables_paginate');
        pagination.toggle(this.api().page.info().pages > 1);
    },
    "columns": [
        { data: 'verifyValue', orderable: false },
        {
            data: 'updatedDate', orderable: false, render: (data, type, object) => {
                if (!data)
                    return "";
                return $.format.date(new Date(data), "HH:mm dd/MM/yyyy");
            }
        },
        {
            data: 'verifyId', orderable: false, render: (data) => {
                var btnUnblock = `<div onClick='handleUnblockPhone(${data})' class="btn-unblock-phone"><i class="fa fa-unlock" aria-hidden="true"></i></div>`;
                return btnUnblock;
            }
        }
    ],
    "language": {
        "paginate": {
            previous: "<",
            next: ">",
            first: "|<",
            last: ">|"
        },
        "info": "Hiển thị _START_ đến _END_ của _TOTAL_",
        "emptyTable": "Chưa có dữ liệu",
        "infoEmpty": "",
    }
});

function handleUnblockPhone (verifyId) {
    showPropzyLoading();
    $.ajax({
        url: `/customer/request-unblock-phone?verifyId=${verifyId}`,
        type: "get"
    }).done(function (response) {
        if (response.result) {
            showPropzyAlert(response.message);

            // when 1 item left -> back to previous page
            if ($('#table-unblock-phone tbody tr').length == 1) {
                tableUnblockPhone.page('previous').draw(false);;
            }

            tableUnblockPhone.ajax.reload(null, false);
        } else {
            showPropzyAlert(response.message);
        }
    }).always(function () {
        hidePropzyLoading();
    });
}