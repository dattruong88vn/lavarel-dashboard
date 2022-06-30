$(document).ready(function () {
    $(document).on('click', '.stop-contact', function(){
        $('#modal-confirm-stop-contact').modal();
    });
    //
    $(document).on('click', '#request-contact', function(){
        $('#modal-confirm-request-contact').modal();
    });
    //
    $(document).on('click', '.btn-confirm-stop', function(){
        var dataPost = {};
        dataPost.requestType = 39;
        App.Feature.Post("/api/stop-or-request-contact", dataPost ,function (response) {
            $('#modal-confirm-stop-contact').modal('hide');
            if(response.result){
                App.UI.Done('Thao tác thành công, bạn vui lòng chờ xác nhận từ Propzy');
                $('.modal-popup').on('hidden.bs.modal', function () {
                    location.reload();
                });
            } else {
                App.UI.Error('Có lỗi xảy ra, bạn vui lòng thao tác lại');
            }
        });
    });
    //
    $(document).on('click', '.btn-confirm-contact', function(){
        var dataPost = {};
        dataPost.requestType = 40;
        App.Feature.Post("/api/stop-or-request-contact", dataPost ,function (response) {
            $('#modal-confirm-request-contact').modal('hide');
            if(response.result){
                App.UI.Done('Thao tác thành công, bạn vui lòng chờ xác nhận từ Propzy');
                $('.modal-popup').on('hidden.bs.modal', function () {
                    location.reload();
                });
            } else {
                App.UI.Error(response.message);
            }
        });
    });
});
