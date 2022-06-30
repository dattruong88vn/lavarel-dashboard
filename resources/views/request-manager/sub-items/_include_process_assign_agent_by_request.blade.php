@section('_include_process_assign_agent_by_request')

@append

@section('page-js')
    <script language="JavaScript">

        $(function(){
            console.log('run _include_process_assign_agent_by_request');

//            $('.assign-agent-by-request').magnificPopup({
//                type: 'ajax',
//                callbacks: {
//                    parseAjax: function(mfpResponse) {
//                    },
//                    ajaxContentAdded: function() {
//                        $('#table-assign-agent-from-request-one').DataTable({
//                            "paging": true,
//                            "lengthChange": true,
//                            "searching": true,
//                            "ordering": false,
//                            "info": true,
//                            "autoWidth": true
//                        });
//                        $('#table-assign-agent-from-request-multi').DataTable({
//                            "paging": true,
//                            "lengthChange": true,
//                            "searching": true,
//                            "ordering": false,
//                            "info": true,
//                            "autoWidth": true
//                        });
//                    }
//                }
//
//            });

        });

//        function doAssignRequestToAgentOne(request_id, str_agent_id, str_listing_id)
//        {
//            $('#cur_request_id').val(request_id);
//            $('#str_listing_id').val(str_listing_id);
//
//            $.magnificPopup.open({
//                items: {
//                    src: '#assign-agent-popup-one',
//                    type: 'inline',
//                },
//                closeOnBgClick: false,
//                removalDelay: 300,
//                mainClass: 'my-mfp-slide-bottom'
//            });
//        }

//        function doAssignRequestToAgentMulti(request_id, str_agent_id)
//        {
////            console.log(request_id);
////            $("input:checkbox[name='ProductCode']")
//
//            $("input[name='chkAgentId[]']").each(function () {
////                console.log(this.value);
//                if(str_agent_id.indexOf(','+this.value+',') >= 0) {
//                    this.checked = true;
//                } else
//                {
//                    this.checked = false;
//                }
//            });
//
//            $('#cur_request_id').val(request_id);
//
//            $.magnificPopup.open({
//                items: {
//                    src: '#assign-agent-popup-multi',
//                    type: 'inline',
//                },
//                closeOnBgClick: false,
//                removalDelay: 300,
//                mainClass: 'my-mfp-slide-bottom'
//            });
//        }

        function callAssignAgentByRequest(id, url, str_listing_id)
        {
            console.log(url);
            $('#cur_request_id').val(id);
            $('#str_listing_id').val(str_listing_id);
            $.magnificPopup.open({
                items: {
                    src: url,
                    type: 'ajax',
                },
                closeOnBgClick: false,
                removalDelay: 300,
                mainClass: 'my-mfp-slide-bottom',
                callbacks: {
                    parseAjax: function(mfpResponse) {
                    },
                    ajaxContentAdded: function() {
                        $('#table-assign-agent-from-request-one').DataTable({
                            "paging": true,
                            "lengthChange": true,
                            "searching": true,
                            "ordering": false,
                            "info": true,
                            "autoWidth": true
                        });
                        $('#table-assign-agent-from-request-multi').DataTable({
                            "paging": true,
                            "lengthChange": true,
                            "searching": true,
                            "ordering": false,
                            "info": true,
                            "autoWidth": true
                        });
                    }
                }
            });

        }

        function chooseAgentByRequestSubmit(choose_type) // 1 = one, 2 = multi
        {
//            console.log($("input[name='radAgentId[]']:checked").length);

            sList = '';
            validate = false;

            if (choose_type == 1) {
                console.log($("input[name='radAgentId']:checked").length);
                console.log($("input[name='radAgentId']:checked").val());
                if ($("input[name='radAgentId']:checked").length > 0) {
                    validate = true;

                    sList = $("input[name='radAgentId']:checked").val()+',';
                    console.log($("input[name='radAgentId']:checked").val());
                }
            } else{
                $("input[name='chkAgentId[]']").each(function () {
                    if(this.checked)
                    {
                        validate = true;
                        sList += this.value+',';
                    }
                });

            }

            if (!validate)
            {
                showPageAlert('Error', 'Bạn phải chọn danh sách Agent!');
                return;
            }

            $('#list_agent_id').val(sList);
            $('#choose_type').val(choose_type);
            $('#frmAssignRequest').attr('action', '{{ url('request-manager/assign-request-to-agent') }}');
            console.log($('#frmAssignRequest').serialize());
            $('#frmAssignRequest').submit();
        }

    </script>



@append