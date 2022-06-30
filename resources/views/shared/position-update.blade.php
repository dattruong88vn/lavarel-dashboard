<div class="form-group" id="display-basic-position">
  <label for="" class="col-sm-2 control-label">Vị trí</label>
  <div class="col-sm-10" >
    <div class="panel panel-default">
      <div class="panel-body">
          <div class="row">
            <div id="matTienResetForm" class="col-sm-6 formReset">
              <div class="checkbox">
                <label>
                  <input name="position[0][id][positionId]" value="1" id="mat-tien-checkbox"
                  {{!empty($lead->positionListRender['matTien']->positionId) && 1==$lead->positionListRender['matTien']->positionId?"checked":""}} 
                  type="checkbox"> Mặt tiền
                </label>
              </div>
              <hr>
              <div class="row disabledBox">
                <label class="control-label col-xs-12 col-sm-12 col-md-4 label-roadFrontageWidth">Độ rộng
                  mặt tiền</label>
                <div class="col-xs-12 col-sm-12 col-md-8">
                  <input id="roadFrontageWidth" placeholder="m" name="position[0][roadFrontageWidth]" type="number" min="0" class="form-control" value="{{!empty($lead->positionListRender['matTien']) && $lead->positionListRender['matTien']->roadFrontageWidth?$lead->positionListRender['matTien']->roadFrontageWidth:""}}">
                </div>
              </div>
            </div>
            <div id="hemResetForm" class="col-sm-6 formReset">
              <div class="checkbox">
                <label>
                  <input name="position[1][id][positionId]" value="2" id="hem-checkbox"
                  {{!empty($lead->positionListRender['hem']->positionId) && 2==$lead->positionListRender['hem']->positionId?"checked":""}} 
                  type="checkbox"> Hẻm
                </label>
              </div>
              <hr>
              <!-- <div class="row">
                <label class="control-label col-xs-12 col-sm-12 col-md-4">Độ rộng hẻm</label>
                <div class="col-xs-12 col-sm-12 col-md-8">
                  <input id="roadFrontageWidth" name="position[1][roadFrontageWidth]" type="number" min="0" class="form-control" value="{{!empty($lead->positionListRender['hem']) && $lead->positionListRender['hem']->roadFrontageWidth?$lead->positionListRender['hem']->roadFrontageWidth:""}}">
                </div>
              </div> -->
              <!-- <br> -->
              <div class="row disabledBox">
                <label class="control-label col-xs-12 col-sm-12 col-md-4 label-roadFrontageDistance">Khoảng cách</label>
                <div class="col-xs-12 col-sm-12 col-md-8">
                  <select id="roadFrontageDistance" name="position[1][roadFrontageDistance]" class="form-control">
                    <option value="">Chọn</option>
                    <?php foreach ($roadFrontageDistances as $key => $value): ?>
                    <option value="{{$key}}" {{isset($lead->positionListRender['hem']->roadFrontageDistanceFrom) && $lead->positionListRender['hem']->roadFrontageDistanceFrom==$key?"selected":""}}>{{$value}}</option>
                    <?php endforeach; ?>
                  </select>
                </div>
              </div>
              <br>
              <div class="row disabledBox">
                <label class="control-label col-xs-12 col-sm-12 col-md-4 label-alleyType1">Loại hẻm</label>
                <div class="col-xs-12 col-sm-12 col-md-8">
                  <select class="form-control alleyType" id="alleyType1" name="position[1][alleyType]">
                    <option value="">Chọn</option>
                    <?php foreach ($alleyTypes as $key => $value): ?>
                      <option {{!empty($lead->positionListRender['hem']->alleyType) && $lead->positionListRender['hem']->alleyType==$key?"selected":""}} value="{{$key}}">{{$value}}</option>
                    <?php endforeach; ?>
                  </select>
                </div>
              </div>
              <br>
              <div class="row disabledBox">
                <label class="control-label col-xs-12 col-sm-12 col-md-4 label-alleyId">Độ rộng hẻm</label>
                <div class="col-xs-12 col-sm-12 col-md-8">
                  <div class="row">
                    <div class="col-md-6">
                      <select id="alleyId" name="position[1][alleyId]" class="form-control">
                        <option value="">Chọn</option>
                        <?php foreach ($alleys as $alley): ?>
                        <option value="{{$alley->alleyId}}" 
                        {{!empty($lead->positionListRender['hem']->alleyId) && $lead->positionListRender['hem']->alleyId==$alley->alleyId?"selected":""}}> 
                            {{ $alley->alleyName}}
                        </option>
                        <?php endforeach; ?>
                      </select>
                    </div>
                    <div class="col-md-6">
                      <input id="alleyWidth" placeholder="m" name="position[1][alleyWidth]" type="number" min="0" class="form-control" value="{{!empty($lead->positionListRender['hem']->alleyWidth) && $lead->positionListRender['hem']->alleyWidth?$lead->positionListRender['hem']->alleyWidth:""}}">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</div>

<script type="text/javascript">
  $(document).ready(function(){
    $('.formReset .checkbox input').each(function(){
        if($(this).prop('checked')){
            $(this).parents('.formReset').find('.row').removeClass('disabledBox');

            // add required
            if ($(this).attr('id') == 'hem-checkbox') {
                $(this).parents('.formReset').find('.label-roadFrontageDistance').addRequired();
                $(this).parents('.formReset').find('.label-alleyType1').addRequired();
                $(this).parents('.formReset').find('.label-alleyId').addRequired();
            } else if ($(this).attr('id') == 'mat-tien-checkbox') {
                $(this).parents('.formReset').find('.label-roadFrontageWidth').addRequired();
            }

        } else {
            $(this).parents('.formReset').find('.row').addClass('disabledBox');
            // remove required
            if ($(this).attr('id') == 'hem-checkbox') {
                $(this).parents('.formReset').find('.label-roadFrontageDistance').removeRequired();
                $(this).parents('.formReset').find('.label-alleyType1').removeRequired();
                $(this).parents('.formReset').find('.label-alleyId').removeRequired();
            } else if ($(this).attr('id') == 'mat-tien-checkbox') {
                $(this).parents('.formReset').find('.label-roadFrontageWidth').removeRequired();
            }
        }
    })
    $('.formReset .checkbox input').change(function() {
        if(!$(this).prop('checked')){
            var curentId = '#'+$(this).parents('.formReset').attr('id');
            clearForm($(curentId));
            $(this).parents('.formReset').find('.row').addClass('disabledBox');

            // remove required
            if ($(this).attr('id') == 'hem-checkbox') {
                $(this).parents('.formReset').find('.label-roadFrontageDistance').removeRequired();
                $(this).parents('.formReset').find('.label-alleyType1').removeRequired();
                $(this).parents('.formReset').find('.label-alleyId').removeRequired();
            } else if ($(this).attr('id') == 'mat-tien-checkbox') {
                $(this).parents('.formReset').find('.label-roadFrontageWidth').removeRequired();
            }

        } else {
            $(this).parents('.formReset').find('.row').removeClass('disabledBox');

            // add required
            if ($(this).attr('id') == 'hem-checkbox') {
                $(this).parents('.formReset').find('.label-roadFrontageDistance').addRequired();
                $(this).parents('.formReset').find('.label-alleyType1').addRequired();
                $(this).parents('.formReset').find('.label-alleyId').addRequired();
            } else if ($(this).attr('id') == 'mat-tien-checkbox') {
                $(this).parents('.formReset').find('.label-roadFrontageWidth').addRequired();
            }
        }
    });
  })
</script>
