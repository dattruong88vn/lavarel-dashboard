@extends('layout.empty')

@section('content')

    <div id="assign-bde-popup-<?php echo ($chooseOnlyOne == true ? 'one' : 'multi'); ?>" class="white-popup mfp-hide zoom-anim-dialog">
        <a href="#" class="mpf-close-cus">X close</a>
        <div class="content-popup">
            <div class="title">
                <h1>Member</h1>
            </div>
            <div class="inner-popup box">

                <div class="box-body">
                    <table id="table-assign-bde-<?php echo ($chooseOnlyOne == true ? 'one' : 'multi'); ?>" class="table table-bordered table-striped">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th width="10%">#</th>
                        </tr>
                        </thead>
                        <tbody>
                        @foreach($staffList as $item)
                            <tr>
                                <td>{{ $item->userId }}</td>
                                <td>{{ $item->name }}</td>
                                <td>
                                    <div class="checkbox">
                                        @if ($chooseOnlyOne == true)
                                            <label><input type="radio" name="radStaffId" value="{{ $item->userId }}"></label>
                                        @else
                                            <label><input type="checkbox" name="checkStaffId[]" value="{{ $item->userId }}"></label>
                                        @endif
                                    </div>
                                </td>
                            </tr>
                        @endforeach
                        </tbody>
                    </table>
                    <button type="button" id="btnSend" name="btnSend" onclick="assignStaffToTransaction(<?php echo ($chooseOnlyOne == true) ? 1 : 2; ?>);" class="btn btn-block btn-primary">Gửi</button>
                </div>


            </div>
        </div>
    </div>

@endsection