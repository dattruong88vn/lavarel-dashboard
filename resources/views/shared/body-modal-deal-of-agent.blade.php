<div class="modal-body">
  <div class="row">
    <div class="col-md-3">
      <!-- <label class="radio-inline"><input onchange="showHideSeftBuy(this)" type="radio" name="optradio"
          class="selftBuyRadio" value="1" checked>Mua cho khách hàng</label> -->
          <label class="radio-inline"><input type="radio" name="optradio"
          class="selftBuyRadio" value="1" checked>Mua cho khách hàng</label>
    </div>
    <div class="col-md-3">
      <!-- <label class="radio-inline"><input onchange="showHideSeftBuy(this)" type="radio" name="optradio"
          class="selftBuyRadio" value="2">Mua cho chính mình</label> -->
          <label class="radio-inline"><input type="radio" name="optradio"
          class="selftBuyRadio" value="2">Mua cho chính mình</label>
    </div>
  </div>
  <div class="selftBuy">
    @foreach($data as $index => $item)
    <hr />
    <div class="row selftBuy">
      <div class="col-md-3">
        <div style="margin:0px auto" class="radio">
          <label><input onchange="showBtnMatchLeadDeal()" {{!empty($item->dealId) && $item->statusId == 27 ? "disabled" : ""}} class="radio_match_request" name="radio_match_request" type="radio" value="{{$item->leadId}}"><b>LeadID: {{$item->leadId}}</b> </label>
        </div>
      </div>
      <div class="col-md-3">
        <label>BA:</label> {{$item->baName}}
      </div>
      <div class="col-md-3">
        <label>Tiến độ:</label> {{$item->statusName}}
      </div>
    </div> <!-- \ row -->

    <div class="row selftBuy">
      <div class="col-md-3">
        <label>KH:</label> {{$item->customerName}}
      </div>
      <div class="col-md-3">
        <label>Loại hình GD:</label> {{$item->listingTypeName}}
      </div>
      <div class="col-md-3">
        <label>Giá:</label> {{$item->formatedInitialBudget}} - {{$item->formatedFinalBudget}}
      </div>
    </div> <!-- \ row -->

    <div class="row selftBuy">
      <div class="col-md-3">
        <label>Số ĐT:</label> {{$item->phones}}
      </div>
      <div class="col-md-3">
        <label>Loại BĐS:</label> {{$item->propertyTypeName}}
      </div>
      <div class="col-md-3">
        <label>Quận:</label> {{$item->districtName}}
      </div>
      <div class="col-md-3">
        <label>Phường:</label> {{$item->wardName}}
      </div>
    </div> <!-- \ row -->
    @if($index != (count($data) - 1))
    <hr />
    @endif
    @endforeach
  </div>
</div>
<div class="modal-footer">
  <button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button>
  <button type="button" onclick="btnMatchLeadDealFunc(this)" class="btn btn-default btnMatchLeadDeal" disabled data-isagent="true">Cập nhật</button>
  <button onclick="createLeadFunc(this)" type="button" class="btn btn-default createLead" data-createtype="create">Tạo mới</button>
  <!-- @if(count($data) == 0)
    <button onclick="createLeadFunc(this)" type="button" class="btn btn-default createLead" data-createtype="create">Tạo mới</button>
  @endif -->
</div>

<script type="text/javascript">
  function showHideSeftBuy(element) {
    if ($(element).val() == 2) {
      $('.selftBuy').hide();
      $('#modal-deal-of-agent').find('.btnMatchLeadDeal').prop('disabled', true);
    } else {
      $('.selftBuy').show();
      $('#modal-deal-of-agent').find('.radio_match_request').prop('checked', false);
    }
  }
  function showBtnMatchLeadDeal(){
			$('#modal-deal-of-agent').find('.btnMatchLeadDeal').removeAttr('disabled');
  }
</script>