@extends('layout.empty')


@section('content')

    <div class="row">
        <div class="col-md-12">
            <div class="box">
                <div class="box-header with-border">
                    <h3 class="box-title">Danh Sách Notes</h3>
                </div>
                <div class="box-body">
                    <table id="table-none" class="table table-bordered table-striped">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Note</th>
                            <th>#</th>
                        </tr>
                        </thead>
                        <tbody>

                        @foreach($noteList as $item)
                            <tr id="row_{{$item->id}}">
                                <td>{{ $item->id }}</td>
                                <td>
                                    <div class="note-title">
                                        {{ $item->title }}
                                    </div>
                                    <div id="note_content_{{$item->id}}" class="note-content">
                                        {!! nl2br($item->note) !!}
                                    </div>
                                </td>
                                <td>
                                    <a href="javascript:void(0)" onclick="loadNote('edit', {{$item->id}})" class="add-note">Edit</a>
                                    <a href="javascript:void(0)" onclick="loadNote('delete', {{$item->id}})">Delete</a>
                                </td>
                            </tr>
                        @endforeach
                        </tbody>
                    </table>
                    <div class="box-footer">
                        <button type="button" class="btn btn-primary pull-right add-note" onclick="loadNote('add', 0)">Thêm Note</button>
                    </div>
                </div>
            </div><!-- /.box -->
        </div>
    </div>


    <div id="note-popup" class="white-popup mfp-hide zoom-anim-dialog">
        <a href="javascript:void(0)" class="mpf-close-cus" onclick="$.magnificPopup.close()">X close</a>
        <div class="content-popup">
            <div class="title">
                <h1>Transaction Note</h1>
            </div>
            <div class="inner-popup box">
                <div class="box-body">
                    <form method="POST" id="frmNote" name="frmNote" action="{{ url('transaction-manager/action-note/'.$transactionId) }}">
                        <input type="hidden" id="note_action" name="note_action" value="">
                        <input type="hidden" id="note_id" name="note_id" value="">
                        <textarea rows="10" class="ch-textare" id="note_content" name="note_content"></textarea>
                        <button type="button" class="btn btn-block btn-primary" onclick="doSubmitNote()">Gửi</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <script language="JavaScript">

        $(function(){
            console.log('chay trong file chinh');
            $('#action-bar').hide();
        });

        function loadNote(action, note_id)
        {
            $('#note_id').val('');
            $('#note_content').html('');
            if(action == 'add')
            {
                $('#note_action').val('add');
            }
            if(action == 'edit')
            {
                $('#note_id').val(note_id);
                $('#note_content').html($('#note_content_'+note_id).html().trim());
                $('#note_action').val('edit');
            }
            if(action == 'delete')
            {
                $('#note_id').val(note_id);
                $('#note_action').val('delete');
                showPageAlert('Xác nhận', 'Bạn muốn xóa dữ liệu này', null, function () {

                    console.log($("#frmNote").attr('action'));
                    console.log($("#frmNote").serialize());
                    doSubmitNote();
                });
                return;
            }
            console.log($('#note_content_'+note_id).html());
            $.magnificPopup.open({
                items: {
                    src: '#note-popup',
                    type: 'inline',
                },
                closeOnBgClick: false,
                removalDelay: 300,
                mainClass: 'my-mfp-slide-bottom'
            });
        }


        function doSubmitNote()
        {
            console.log('start : doSubmitNote');
            $.ajax({
                type: 'POST',
                url: $("#frmNote").attr('action'),
                data: $("#frmNote").serialize(),
                success: function(data){
                    data = JSON.parse(data);
                    console.log(data);
                    $.magnificPopup.close();
                    showPageAlert('Message', data.message);
                    location.reload();
                },
                error: function(data){
                    console.log(data);
                    $.magnificPopup.close();
//                    location.reload();
                }
            });


        }

    </script>

@endsection


