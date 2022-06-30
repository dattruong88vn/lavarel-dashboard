@extends('layout.empty')

@section('content')

    <div id="assign-agent-popup-<?php echo ($chooseOnlyOne == true ? 'one' : 'multi'); ?>" class="white-popup mfp-hide zoom-anim-dialog">
        <a href="#" class="mpf-close-cus">X close</a>
        <div class="content-popup">
            <div class="title">
                <h1>Assign</h1>Request #1
            </div>
            <div class="inner-popup box">

                <div class="box-body">
                    <table id="table-assign-<?php echo ($chooseOnlyOne == true ? 'one' : 'multi'); ?>" class="table table-bordered table-striped">
                        <thead>
                        <tr>
                            <th>Agent</th>
                            <th>Type</th>
                            <th>Address</th>
                            <th width="10%">#</th>
                        </tr>
                        </thead>
                        <tbody>
                        @foreach($agentList as $item)
                            <tr>
                                <td>{{ $item->name }}</td>
                                <td>{{ $item->phone }}</td>
                                <td>{{ $item->email }}</td>
                                <td>
                                    <div class="checkbox">
                                        @if ($chooseOnlyOne == true)
                                            <label><input type="radio" name="radAgentId" value="{{ $item->agentId }}"></label>
                                        @else
                                            <label><input type="checkbox" name="chkAgentId[]" value="{{ $item->agentId }}"></label>
                                        @endif
                                    </div>
                                </td>
                            </tr>
                        @endforeach
                        </tbody>
                    </table>
                    <button type="button" id="btnSend" name="btnSend" onclick="chooseAgentSubmit(<?php echo ($chooseOnlyOne == true) ? 1 : 2; ?>);" class="btn btn-block btn-primary">Gửi</button>
                </div>


            </div>
        </div>
    </div>

@endsection