const renderCommentHis = (comments) => {
    if(comments && comments.length > 0){
        return comments.map((comment)=>{
            const _cmts = comment.comments.map((cmt)=>{
                return `<div class="historiesDefault" style="padding-left:5px; white-space: pre-line;">${cmt.comment}</div>`
            }).join('');
            let photos = comment.photos.map((photo)=>{
                return `<a style="padding:0px;" href="${photo.link}" data-toggle="lightbox" data-gallery="multiimages" data-title="" class="col-sm-3">
                            <img style="width:85%;height: 50px; border:3px solid gray; object-fit: cover;" src="${photo.link}" class="img-responsive">
                        </a>`
            })
            return `<div class="historiesDefault"><b>${comment.categoryName}: </b>${_cmts}</div><div class="historiesDefault row row-img-scroll">${photos.join('')}</div>`;
        }).join('');
    }
    return "";
}
const render_entity_call = (res,object) => {
    switch (object.contentType) {
        case 1:
            if (object?.directionName) {
                res.push('<div class="historiesDefault"><b>Hướng cuộc gọi: </b>' + object.directionName + '</div>');
            }
            if (object?.statusName) {
                res.push('<div class="historiesDefault"><b>Trạng thái: </b>' + object.statusName + '</div>');
            }
            if (object?.numberOfFailedCall) {
                res.push('<div class="historiesDefault"><b>Số lần gọi không thành công: </b>' + object.numberOfFailedCall + '</div>');
            }
            if (object?.recordLink) {
                res.push('<div class="historiesDefault"><b>File ghi âm cuộc gọi: </b></div>');
                res.push(`<div class="historiesDefault">
                    <audio controls>
                        <source src="${object.recordLink}" type="audio/wav">
                        <source src="${object.recordLink}" type="audio/wav">
                    </audio>
                </div>`)
            }
            res.push(renderCommentHis(object.comments));
            break;
    }
}

$(document).ready(()=>{
    $('#showHisCall').on('click',()=>{
        $('#modalHisCall').modal();
    })

    $('#modalHisCall').on('shown.bs.modal', function (e) {
        $("#table-histories-call").dataTable().fnDestroy();
        $('#table-histories-call').dataTable({
            "processing": true,
            "searching": false,
            "serverSide": true,
            "ajax": `/call/get-histories/${$('#showHisCall').data('entitytype')}/${$('#showHisCall').data('entityid')}`,
            "scrollX": false,
            "lengthChange": false,
            "pageLength":3,
            "columns": [{
                    data: 'startedDate',
                    orderable:false,
                    render:(data)=>{
                        return moment.unix(data / 1000).format("HH:mm:ss DD-MM-YYYY")
                    }
                },
                {
                    data: 'directionName',
                    orderable: false
                },
                {
                    data: 'createdByName',
                    orderable: false
                },
                {
                    data: 'statusName',
                    orderable: false,
                },
                {
                    data: 'comments',
                    orderable: false,
                    render:(data)=>{
                        return renderCommentHis(data);
                    }
                },
                {
                    data: 'recordLink',
                    orderable: false,
                    render:(data)=>{
                        return `<audio controls style="width:150px">
                            <source src="${data}" type="audio/wav">
                            <source src="${data}" type="audio/wav">
                        </audio>`;
                    }
                }
            ],
            "order": [],
            "language": {
                "paginate": {
                    previous: "<",
                    next: ">",
                    first: "|<",
                    last: ">|"
                },
                "info": "Trang _PAGE_ của _PAGES_",
                "emptyTable": "Chưa có lịch sử thay đổi",
                "infoEmpty": "",
            }
        });
    })
})