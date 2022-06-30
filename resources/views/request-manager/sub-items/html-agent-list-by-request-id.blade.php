@extends('layout.empty')

@section('content')

    <div id="assign-agent-popup-<?php echo ($chooseType == 1 ? 'one' : 'multi'); ?>"
         class="white-popup {{ $show_dialog_class }}"
         style="width: 60%; max-width: inherit">
        <a href="javascript:void(0);" onclick="$.magnificPopup.close();" class="mpf-close-cus">X close</a>
        <div class="content-popup">
            <div class="title">
                <h1>Assign Agent By Request</h1>
            </div>
            <div class="inner-popup box">

                <div class="box-body">
                    <table id="table-assign-agent-from-request-<?php echo ($chooseType == 1 ? 'one' : 'multi'); ?>" class="table table-bordered table-striped">
                        <thead>
                        <tr>
                            <th>Agent</th>
                            <th>Type</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>#</th>
                        </tr>
                        </thead>
                        <tbody>
                        @foreach($agentList as $item)
                            <tr>
                                <td style="width: 25%;">{{ $item->name }}</td>
                                <td style="width: 30%;">{{ $item->agentTypeName }}</td>
                                <td>{{ $item->email }}</td>
                                <td>{{ $item->phone }}</td>
                                <td style="width: 1%;">
                                    <div class="checkbox">
                                        <?php
                                            $checked = '';
                                            if(strrpos($str_assigned_id ,'-'.$item->agentId.'-') !== false)
                                                $checked = 'checked';
                                        ?>
                                        @if ($chooseType == 1)
                                            <label><input type="radio" name="radAgentId" value="{{ $item->agentId }}" {{$checked}}></label>
                                        @else
                                            <label><input type="checkbox" name="chkAgentId[]" value="{{ $item->agentId }}" {{$checked}}></label>
                                        @endif
                                    </div>
                                </td>
                            </tr>
                        @endforeach
                        </tbody>
                    </table>
                    <button type="button" id="btnSend" name="btnSend" onclick="chooseAgentByRequestSubmit(<?php echo $chooseType; ?>, this);" class="btn btn-block btn-primary">Gửi</button>
                </div>

            </div>
        </div>
    </div>


@endsection