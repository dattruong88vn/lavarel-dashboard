@section('_include_process_assign_staff')
    <?php echo $html_bde_list_choose_one; ?>
@endsection

@section('page-js')
    <script language="JavaScript">

        $(function(){
            console.log('run _include_process_assign_staff');
        });

        function doAssignRequestToBdeOne(request_id)
        {
            $('#cur_request_id').val(request_id);
            $.magnificPopup.open({
                items: {
                    src: '#assign-bde-popup-one',
                    type: 'inline',
                },
                closeOnBgClick: false,
                removalDelay: 300,
                mainClass: 'my-mfp-slide-bottom'
            });
        }

        function chooseBdeSubmit(choose_type) // 1 = one, 2 = multi
        {
            console.log('chooseBdeSubmit');

            sList = '';
            validate = false;

            if (choose_type == 1) {
                console.log($("input[name='radBdeId']:checked").length);
                console.log($("input[name='radBdeId']:checked").val());
                if ($("input[name='radBdeId']:checked").length > 0) {
                    validate = true;

                    sList = $("input[name='radBdeId']:checked").val()+',';
                    console.log($("input[name='radBdeId']:checked").val());
                }
            } else{
                $("input[name='chkBdeId[]']").each(function () {
                    if(this.checked)
                    {
                        validate = true;
                        sList += this.value+',';
                    }
                });

            }

            $("input[name='chkBdeId[]']").each(function () {
                if(this.checked)
                {
                    validate = true;
                    sList += this.value+',';
                }
            });

            if (!validate)
            {
                showPageAlert('Error', 'Bạn phải chọn danh sách Staff!');
                return;
            }

            $('#list_staff_id').val(sList);

            $('#choose_type').val(choose_type);

            $('#frmAssignRequest').attr('action', '{{ url('request-manager/assign-request-to-staff') }}');
            console.log($('#frmAssignRequest').serialize());
            console.log($('#frmAssignRequest').attr('action'));
            $('#frmAssignRequest').submit();

        }



    </script>



@append