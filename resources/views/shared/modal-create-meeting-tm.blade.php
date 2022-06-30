<!-- @section('page-css')
    <style type="text/css">
        #modal-create-meeting-tm label{
            position: relative;
            cursor: pointer;
            color: #666;
            font-size: 14px;
        }

        #modal-create-meeting-tm input[type="checkbox"], input[type="radio"]{
            position: absolute;
            right: 9000px;
        }

        /*Check box*/
        #modal-create-meeting-tm input[type="checkbox"] + .label-text:before{
            content: "\f096";
            font-family: "FontAwesome";
            speak: none;
            font-style: normal;
            font-weight: normal;
            font-variant: normal;
            text-transform: none;
            line-height: 1;
            -webkit-font-smoothing:antialiased;
            width: 1em;
            display: inline-block;
            margin-right: 5px;
        }

        #modal-create-meeting-tm input[type="checkbox"]:checked + .label-text:before{
            content: "\f14a";
            color: #2980b9;
            animation: effect 250ms ease-in;
        }

        #modal-create-meeting-tm input[type="checkbox"]:disabled + .label-text{
            color: #aaa;
        }

        #modal-create-meeting-tm input[type="checkbox"]:disabled + .label-text:before{
            content: "\f0c8";
            color: #ccc;
        }

        /*Radio box*/

        #modal-create-meeting-tm input[type="radio"] + .label-text:before{
            content: "\f10c";
            font-family: "FontAwesome";
            speak: none;
            font-style: normal;
            font-weight: normal;
            font-variant: normal;
            text-transform: none;
            line-height: 1;
            -webkit-font-smoothing:antialiased;
            width: 1em;
            display: inline-block;
            margin-right: 5px;
        }

        #modal-create-meeting-tm input[type="radio"]:checked + .label-text:before{
            content: "\f192";
            color: #8e44ad;
            animation: effect 250ms ease-in;
        }

        #modal-create-meeting-tm input[type="radio"]:disabled + .label-text{
            color: #aaa;
        }

        #modal-create-meeting-tm input[type="radio"]:disabled + .label-text:before{
            content: "\f111";
            color: #ccc;
        }

        /*Radio Toggle*/

        #modal-create-meeting-tm .toggle input[type="radio"] + .label-text:before{
            content: "\f204";
            font-family: "FontAwesome";
            speak: none;
            font-style: normal;
            font-weight: normal;
            font-variant: normal;
            text-transform: none;
            line-height: 1;
            -webkit-font-smoothing:antialiased;
            width: 1em;
            display: inline-block;
            margin-right: 10px;
        }

        #modal-create-meeting-tm .toggle input[type="radio"]:checked + .label-text:before{
            content: "\f205";
            color: #16a085;
            animation: effect 250ms ease-in;
        }

        #modal-create-meeting-tm .toggle input[type="radio"]:disabled + .label-text{
            color: #aaa;
        }

        #modal-create-meeting-tm .toggle input[type="radio"]:disabled + .label-text:before{
            content: "\f204";
            color: #ccc;
        }


        @keyframes effect{
            0%{transform: scale(0);}
            25%{transform: scale(1.3);}
            75%{transform: scale(1.4);}
            100%{transform: scale(1);}
        }
    </style>
@stop -->

<!-- Modal -->
<div id="modal-create-meeting-tm" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div style="background-color: darkgray;color: white;font-weight: bold;" class="modal-header">
        <button type="button" class="close" data-dismiss="modal"><i style="" class="fa fa-times" aria-hidden="true"></i></button>
        <h4 class="modal-title">TẠO MEETING</h4>
      </div>
      <div class="modal-body">
        <div class="row">
            <div class="col-md-12">
                @foreach($need_active as $lead_active)
                    <div class="form-check checkbox-inline" style="padding-left: 0px">
                            <label>
                                <input checked="checked" type="checkbox" value="{{$lead_active->leadId}}" name="leadIds[]"> <span class="label-text">{{$lead_active->leadId}}</span>
                            </label>
                    </div>
                @endforeach
                <!-- 
                    <label class="checkbox-inline"><input checked="checked" type="checkbox" value="{{$lead_active->leadId}}">{{$lead_active->leadId}}</label>
                 -->
            </div>
            <div style="margin-top: 28px;" class="col-md-6">
                <label style="font-weight: normal;">Chọn giờ:</label>
                <div class="input-group bootstrap-timepicker">
                    <input class="form-control disspace numvad timepicker whenTime" value="{{date('H:i')}}">
                    <div class="input-group-addon">
                        <i class="glyphicon glyphicon-time"></i>
                    </div>
                </div>
                <div class="errors"></div>
            </div>
            <div style="margin-top: 28px;" class="col-md-6">
                <label style="font-weight: normal;">Chọn ngày:</label>
                <div class="input-group date">
                    <input class="form-control whenDate numvad disspace" value="{{date('d/m/Y')}}">
                    <div class="input-group-addon">
                        <i class="fa fa-calendar"></i>
                    </div>
                </div>
            </div>
            <div style="margin-top: 28px;" class="col-md-6">
                <?php
                $tcs = get_transaction_centers();
                ?>
                <select class="form-control select-valid" name="tCId">
                    <option value="">Chọn TC</option>
                    <?php foreach ($tcs as $tc): ?>
                        <option value="{{$tc->id}}">{{$tc->name}}</option>
                    <?php endforeach; ?>
                </select>
            </div>
            <div style="margin-top: 28px;" class="col-md-6">
                <select class="form-control select-valid assignTo" name="assignTo">
                    <!-- <option value="3620194" selected="selected">select2/select2</option> -->
                    <option value="">Chọn BA</option>
                </select>
            </div>
            <div style="margin-top: 5px;" class="col-md-12 hidden otherAdd">
                <!-- <label style="font-weight: normal;">Nhập địa chỉ khác:</label> -->
                <input type="text" class="form-control address select-valid" name="Nhập địa chỉ ...">
            </div>
            <div style="margin-top: 28px;" class="col-md-12">
                <textarea rows="9" name="noteTm" class="form-control" placeholder="Nhập ghi chú cho BA..."></textarea>
            </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-success pull-right disabled submit"><i style="" class="fa fa-paper-plane-o" aria-hidden="true"></i>  Tạo meeting</button>
        <!-- <button type="button" class="btn btn-default" data-dismiss="modal">Close</button> -->
      </div>
    </div>

  </div>
</div>