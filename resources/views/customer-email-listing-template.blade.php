<style type="text/css">
    table{border-color: '#ccc'}
</style>
<div style="padding: 0 50px; margin: 30px auto;">
    <div>
        <p>Chào {{$lead->customers->name}},</p>
        <p>{{$currentUser->name}} đến từ công ty Propzy Việt Nam. Hiện trên Propzy.vn có một số <span class="propertyType">{{$lead->propertyType->typeName}}</span> đúng với nhu cầu tìm kiếm của anh/chị. Vui lòng bấm vào link để xem chi tiết nhé:</p>
        <table cellpadding="0" bordercolor="#ccc" cellspacing="0" border="1" style="margin:auto; border-color: #e4e2e2 !important;">
          <tbody>
          <tr >
            <td style="text-align:center">
              <div style="width:170">Hình ảnh</div>
            </td>
            @for($i=0; $i<count($listings); $i++)
              <td><a href="{{$listings[$i]->link}}"><img width="180" src="{{$listings[$i]->photo->link}}" alt=""></a></td>
            @endfor
          </tr>
          <tr >
            <td style="text-align:center">Giá</td>
            @for($i=0; $i<count($listings); $i++)
              <td style="color:red; font-weight:bold;text-align:center"><a style="color:red; font-weight:bold" href="{{$listings[$i]->link}}"><u>{{$listings[$i]->formatPrice}}</u></a></td>
            @endfor
          </tr>
          <tr >
            <td style="text-align:center">Kết cấu</td>
            @for($i=0; $i<count($listings); $i++)
              <td style="text-align:center">
                <?php if (isset($listings[$i]->numberFloor)) { ?>
                    <?php
                    if ($listings[$i]->propertyTypeId == 11) {
                        if ($listings[$i]->numberFloor === 1) {
                            echo 'Trệt';
                        } elseif ($listings[$i]->numberFloor > 1) {
                            $numberFloor = $listings[$i]->numberFloor;
                            echo '1 trệt';
                            if ($listings[$i]->isMezzanine) {
                                echo ", " . '1 lửng';
                                $numberFloor -= 1;
                            }
                            if ($listings[$i]->isPenhouse) {
                                echo ", " . '1 áp mái';
                                $numberFloor -= 1;
                            }
                            if ($listings[$i]->isRooftop) {
                                echo ", " . '1 tầng tdượng';
                                $numberFloor -= 1;
                            }
                            if ($numberFloor - 1 != 0) {
                                echo " + " . ($numberFloor - 1);
                                if ($listings[$i]->numberFloor > 2)
                                    echo " " . 'lầu';
                                else
                                    echo " " . 'lầu';
                            }
                        }
                    }
                    else {
                        if ($listings[$i]->numberFloor === 0) {

                        } elseif ($listings[$i]->numberFloor === -9) {

                        } else {
                            echo $listings[$i]->numberFloor;
                        }
                        echo " " . 'lầu';
                    }
                    ?>
                <?php } ?>
              </td>
            @endfor
          </tr>

          <tr >
            <td style="text-align:center">Rộng x Dài</td>
            @for($i=0; $i<count($listings); $i++)
              <td style="text-align:center">
                @if($listings[$i]->sizeWidth != "" && $listings[$i]->sizeLength != "")
                  {{$listings[$i]->sizeWidth}} x {{$listings[$i]->sizeLength}}
                @else
                  - -
                @endif
              </td>
            @endfor
          </tr>

          <tr >
            <td style="text-align:center">PN - WC</td>
            @for($i=0; $i<count($listings); $i++)
              <td style="text-align:center">
              @if(!empty($listings[$i]->bedRooms) && !empty($listings[$i]->bathRooms))
                {{$listings[$i]->bedRooms}} - {{$listings[$i]->bathRooms}}
              @else
                - -
              @endif
              </td>
            @endfor
          </tr>

          <tr >
            <td style="text-align:center">Hẻm / Mặt tiền</td>
            @for($i=0; $i<count($listings); $i++)
              <td style="text-align:center">
                @if($listings[$i]->alley == null)
                  <?php echo "Mặt tiền"; ?>
                @else
                  {{$listings[$i]->alley}}
                @endif

              </td>
            @endfor
          </tr>

          <tr >
            <td style="text-align:center">Địa chỉ</td>
            @for($i=0; $i<count($listings); $i++)
              <td style="text-align:center">{{$listings[$i]->wardName}}, {{$listings[$i]->districtName}}</td>
            @endfor
          </tr>
          </tbody>
        </table>


        <div style="text-align:center;margin:20px 0px;">
          <a style="padding:10px 20px;background:#2d9fd9;color:white;font-weight:bold;text-decoration:none;" href="https://propzy.vn/nha-rieng-ban-hcm">Xem thêm</a>
        </div>

        <p>Liên hệ {{$currentUser->name}} để lên lịch đi xem MIỄN PHÍ ngay và không bỏ lỡ cơ hội này.</p>
        <p>Propzy rất vui được tư vấn và hỗ trợ anh/chị.</p>
    </div>
    <hr />
    <div class="">
      @include('templates.emailSignature', ['currentUser' => $currentUser])
    </div>
</div>
