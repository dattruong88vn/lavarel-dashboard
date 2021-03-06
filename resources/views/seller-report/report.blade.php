
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <link href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i&amp;subset=vietnamese" rel="stylesheet">
        <title>Seller Report</title>
        <link rel="shortcut icon" type="image/x-icon" href="/assets/images/icons/favicon.ico?v=2.1" />
        <link href="{{loadAsset('css/seller-report/seller-report.css')}}" rel="stylesheet" />
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    </head>
    <body bgcolor="#efefef">
        @if(true)
            
            <script src="https://maps.googleapis.com/maps/api/js?key={{$googleKey}}&libraries=places" async defer></script>
            <script type="text/javascript">
                var latListing = '{{ $data->latListing }}';
                var longListing = '{{ $data->longListing }}';
                var arrayLongLatListings = JSON.parse('{!! json_encode($data->arrayLongLatListings) !!}');
                var listingGeo = ['{{ $data->latListing}}', '{{ $data->longListing }}'];
            </script>
            
            
            <table border="0" cellspacing="0" cellpadding="0" bgcolor="#ee7423" align="center" class="content">
                <tr>
                    <td style="">
                        <table align="center" cellpadding="0" cellspacing="0" width="100%" class="background-gradient" style="padding: 25px 0px 0;display: block;padding-left: 5%;padding-right: 5%;">
                            <tr>
                                <td align="center" style="padding-bottom: 18px;">
                                    <img src="{{ loadAsset('images/seller-report/logo.png') }}" alt="" width="180" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <!--div container-->
                                    <table align="center" cellpadding="0" cellspacing="0" width="100%" bgcolor="#fff" style="border-radius: 20px;">
                                        <!--row noidung-->
                                        <tr>
                                            <td bgcolor="#fff" style="border-radius: 20px;">
                                                <table bgcolor="#fff" align="center" cellpadding="0" cellspacing="0" width="100%" style="border-radius: 20px;">
                                                    <!--B??o c??o t??nh tr???ng-->
                                                    <tr>
                                                        <td align="center">
                                                            <p style="font-size: 22px; text-align: center;color: #f17423;line-height: 30px;margin: 12px 0 0">B??o c??o t??nh tr???ng <br/>b???t ?????ng s???n c???a qu?? kh??ch ??ang b??n</p>
                                                            <p style="font-size: 14px; text-align: center;color: #000;margin: 8px 0;">Th???i gian: {{ date('d/m/Y', $data->startDate/1000) }} ?????n {{ date('d/m/Y', $data->endDate/1000) }}</p>
                                                        </td>
                                                    </tr>

                                                    <!--MAPS-->
                                                    <tr>
                                                        <td align="" style="padding: 15px 20px 0 40px;" class="tb-maps">
                                                            <table align="center" cellpadding="0" cellspacing="0" width="100%">
                                                                <tr>
                                                                    
                                                                        <td class="col-60" align="center" style="padding-right: 30px;">
                                                                            <div id="maps" class="bl-map" frameborder="0" style="width:100%;height:306px;" allowfullscreen ></div>
                                                                            <p style="font-size: 14px;color: #000;">{{ $data->numberItem }} B??S trong c??ng b??n k??nh 2km <br/>khu v???c {{ $data->districtName }}</p>
                                                                        </td>
                                                                        <td class="col-40" style="vertical-align: top;">
                                                                            <table align="center" cellpadding="0" cellspacing="0" width="100%" bgcolor="#e8f1f8" style="padding: 0 20px;">
                                                                                <tr>
                                                                                    <td>
                                                                                        <p style="background-color: #155aa9;font-size: 14px;color: #fff;
                                                                                           border-radius: 10px;text-align: center;padding: 10px 0;margin-bottom: 18px;">M?? B??S: {{ $data->listingId }}</p>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>
                                                                                        <img src="{{ $data->photo->link }}" alt="Propzy" style="border-radius: 10px;width: 100%;" />
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>
                                                                                        <table align="center" cellpadding="0" cellspacing="0" width="100%" style="color: #155aa9;padding: 15px 0 10px;">
                                                                                            <tr>
                                                                                                <td class="col-30">
                                                                                                    <p style="font-size: 23px;color: #f17423;margin: 8px 0;margin-top: 2px;">{{ $data->formatPrice }}</p>
                                                                                                </td>
                                                                                                <td align="right" class="col-70">
                                                                                                    <p style="font-size: 16px;margin: 8px 0">{{ $data->districtName }}</p>
                                                                                                </td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td class="col-30">
                                                                                                    <p style="font-size: 14px;margin: 2px 0 0">{{ $data->formatUnitPrice }}</p>
                                                                                                </td>
                                                                                                <td align="right" class="col-70">
                                                                                                    <p style="font-size: 10px;margin: 2px 0 0">S??? ng??y ????ng b??n: {{ $data->dateLiveListing }}</p>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </table>
                                                                        </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>

                                                    <!--PH??N T??CH TH??? TR?????NG CHUNG-->
                                                    <tr>
                                                        <td align="" class="tb-phantich">
                                                            <table align="center" cellpadding="0" cellspacing="0" width="100%">
                                                                <tr>
                                                                    <td align="center">
                                                                        <p style="background-color: #155aa9;font-size: 20px;text-transform: uppercase;padding: 15px 0;color: #fff;font-weight: 500;margin-bottom: 0;">PH??N T??CH TH??? TR?????NG CHUNG</p>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td style="padding: 25px 25px 20px;" class="td-border">
                                                                        <table align="center" cellpadding="0" cellspacing="0" width="100%" style="border: 2px solid #004577;padding: 15px 8px 5px 15px;color: #00538e;">
                                                                            
                                                                                <tr>
                                                                                    <td class="col-40" style="vertical-align: top">
                                                                                        <p style="font-size: 18px;font-weight: 500;margin: 0;">Kh??ch mua nh?? quan t??m ??i???u g?? nh???t khi xem nh???</p>
                                                                                        
                                                                                        <p style="font-size: 14px;font-weight: 300;line-height: 19px;">B??n c???nh nh???ng y???u t??? ???nh h?????ng ?????n quy???t ?????nh mua nh?? c???a kh??ch h??ng l?? m??i tr?????ng s???ng xung quanh, khu v???c an ninh, h??ng x??m th??n thi???n, h???p phong th???y,... ??i???u m?? kh??ch mua nh?? quan t??m nhi???u nh???t l?? <span style="font-weight: 900">GI?? B??N</span>.</p>
                                                                                    </td>
                                                                                    <td class="col-60">
                                                                                        <table align="center" cellpadding="0" cellspacing="0" width="100%" style="padding-left: 20px;">
                                                                                            <tr>
                                                                                                <td align="center" class="p-yeuto"><p style="font-size: 15px;margin-top: 4px;">C??c y???u t??? quan t??m khi mua B??S</p></td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td class="border-chart" style="position: relative;">
                                                                                                    <table align="center" cellpadding="0" cellspacing="0" width="100%">
                                                                                                        <tr>
                                                                                                            <td class="col-50" style="border-right: 2px solid #e8e8e8;">
                                                                                                                <p style="font-size: 12px;font-weight: 300;margin: 5px 0;">C??c ti???n ??ch xung quanh</p>
                                                                                                            </td>
                                                                                                            <td class="col-50">
                                                                                                                <div style="background: #1887d8;height: 15px;display: inline-block;vertical-align: middle;margin-left: -1px;width: 27%;"></div>
                                                                                                                <span style="font-size: 10px;font-weight: 300;">27%</span>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td class="col-50" style="border-right: 2px solid #e8e8e8;">
                                                                                                                <p style="font-size: 12px;font-weight: 300;margin: 5px 0;">S??? n??m x??y d???ng</p>
                                                                                                            </td>
                                                                                                            <td class="col-50">
                                                                                                                <div style="background: #1887d8;height: 15px;display: inline-block;vertical-align: middle;margin-left: -1px;width: 27%;"></div>
                                                                                                                <span style="font-size: 10px;font-weight: 300;">27%</span>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td class="col-50" style="border-right: 2px solid #e8e8e8;">
                                                                                                                <p style="font-size: 12px;font-weight: 300;margin: 5px 0;">T??? su???t sinh l???i</p>
                                                                                                            </td>
                                                                                                            <td class="col-50">
                                                                                                                <div style="background: #1887d8;height: 15px;display: inline-block;vertical-align: middle;margin-left: -1px;width: 37%;"></div>
                                                                                                                <span style="font-size: 10px;font-weight: 300;">37%</span>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td class="col-50" style="border-right: 2px solid #e8e8e8;">
                                                                                                                <p style="font-size: 12px;font-weight: 300;margin: 5px 0;">Phong thu???</p>
                                                                                                            </td>
                                                                                                            <td class="col-50">
                                                                                                                <div style="background: #1887d8;height: 15px;display: inline-block;vertical-align: middle;margin-left: -1px;width: 44%;"></div>
                                                                                                                <span style="font-size: 10px;font-weight: 300;">44%</span>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td class="col-50" style="border-right: 2px solid #e8e8e8;">
                                                                                                                <p style="font-size: 12px;font-weight: 300;margin: 5px 0;">An ninh</p>
                                                                                                            </td>
                                                                                                            <td class="col-50">
                                                                                                                <div style="background: #1887d8;height: 15px;display: inline-block;vertical-align: middle;margin-left: -1px;width: 50%;"></div>
                                                                                                                <span style="font-size: 10px;font-weight: 300;">50%</span>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td class="col-50" style="border-right: 2px solid #e8e8e8;">
                                                                                                                <p style="font-size: 12px;font-weight: 300;margin: 5px 0;">V??? tr??</p>
                                                                                                            </td>
                                                                                                            <td class="col-50">
                                                                                                                <div style="background: #1887d8;height: 15px;display: inline-block;vertical-align: middle;margin-left: -1px;width: 65%;"></div>
                                                                                                                <span style="font-size: 10px;font-weight: 300;">65%</span>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td class="col-50" style="border-right: 2px solid #e8e8e8;">
                                                                                                                <p style="font-size: 12px;font-weight: 900;margin: 5px 0;">Gi??</p>
                                                                                                            </td>
                                                                                                            <td class="col-50">
                                                                                                                <div style="background: #1887d8;height: 15px;display: inline-block;vertical-align: middle;margin-left: -1px;width: 76%;"></div>
                                                                                                                <span style="font-size: 10px;font-weight: 300;">76%</span>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    </table>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td class="td-chart">
                                                                        <table align="center" cellpadding="0" cellspacing="0" width="100%" style="padding: 0 25px 0 15px;">
                                                                            <tr>
                                                                                <td align="center" class="col-70" style="padding-right: 2%;">
                                                                                    <!-- averagePrice / price -->
                                                                                    @if($data->averageUnitPriceChart > $data->unitPriceChart)
                                                                                        <img src="{{ loadAsset('images/seller-report/type-2.png') }}" alt="Propzy" style="width: 100%;" />
                                                                                        <p class="text-price-chart">
                                                                                            <span class="price">{{ $data->unitPriceChart }}</span>
                                                                                            <span class="aver-price">{{ $data->averageUnitPriceChart }}</span>
                                                                                        </p>
                                                                                    @elseif ($data->averageUnitPriceChart < $data->unitPriceChart)
                                                                                        <img src="{{ loadAsset('images/seller-report/type-1.png') }}" alt="Propzy" style="width: 100%;" />
                                                                                        <p class="text-price-chart">
                                                                                            <span class="aver-price">{{ $data->averageUnitPriceChart }}</span>
                                                                                            <span class="price">{{ $data->unitPriceChart }}</span>
                                                                                        </p>
                                                                                    @elseif($data->averageUnitPriceChart == $data->unitPriceChart)
                                                                                        <img src="{{ loadAsset('images/seller-report/type-3.png') }}" alt="Propzy" style="width: 100%;" />
                                                                                        <p class="text-price-chart">
                                                                                            <span class="price">{{ $data->unitPriceChart }}</span>
                                                                                        </p>
                                                                                    @endif
                                                                                    <p style="font-size: 15px;color: #00538e;">???nh h?????ng c???a gi?? b??n v?? s??? ng??y ????ng b??n</p>
                                                                                </td>
                                                                                <td class="col-30" style="font-size: 10px;color: #00538e">
                                                                                    <table align="center" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 5px;" class="table-border">
                                                                                        <tr>
                                                                                            <td style="background-color: #ebf7ff;border: 1px solid #026cb9;padding: 3px;">
                                                                                                <p style="margin: 0;font-weight: bold;font-style: italic;">T??nh h??nh th??? tr?????ng trong c??ng khu v???c</p>
                                                                                                <p style="margin: 7px 0 0">??? Gi?? b??n trung b??nh: <span style="display: inline-block;float: right;color: #f17423;font-weight: 500">{{ $data->averageUnitPrice }}</span></p>
                                                                                                <p style="margin: 0">??? Th???i gian b??n trung b??nh: <span style="display: inline-block;float: right;color: #f17423;font-weight: 500">{{ $data->averageTimeSell }} ng??y</span></p>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </table>
                                                                                    <table align="center" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 5px;" class="table-border">
                                                                                        <tr>
                                                                                            <td style="background-color: #ebf7ff;border: 1px solid #026cb9;padding: 3px;">
                                                                                                <p style="margin: 0;font-weight: bold;font-style: italic;">Ch?? th??ch</p>
                                                                                                <p style="margin: 5px 0 0">??? Th???ng k?? so s??nh gi?? b??n B??S c???a qu?? kh??ch v???i B??S c??ng khu v???c trong b??n k??nh 2 - 5 km.</p>
                                                                                                <p style="margin: 0">??? S??? li???u trung b??nh l?? s??? li???u ???????c t??nh tr??n m2 ?????t, ch??a t??nh gi?? tr??n di???n t??ch x??y d???ng.</p>
                                                                                                <p style="margin: 0">??? Th??ng tin th??? tr?????ng chung l?? ????? qu?? kh??ch ????nh gi?? t??nh tr???ng B??S c???a qu?? kh??ch ??ang ??? ????u so v???i th??? tr?????ng</p>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </table>
                                                                                    <table align="center" cellpadding="0" cellspacing="0" width="100%" style="" class="table-border">
                                                                                        <tr>
                                                                                            <td style="background-color: #ebf7ff;border: 1px solid #026cb9;padding: 3px;">
                                                                                                <p style="margin: 0;font-weight: bold;font-style: italic;">G???i ??</p>
                                                                                                <p style="margin: 5px 0 0">??? Th???i gian ????ng b??n nh?? c???a qu?? kh??ch ??ang b??? k??o d??i so v???i th??? tr?????ng chung.</p>
                                                                                                <p style="margin: 0">??? N???u qu?? kh??ch mu???n b??n nh?? nhanh h??n, c???n ??i???u ch???nh gi?? b??n ph?? h???p v???i th??? tr?????ng.</p>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                                
                                                                    <tr>
                                                                        <td align="center" style="padding: 32px 0 30px">
                                                                            <a style="color: #fff;text-transform: uppercase;background-color: #ff7a00;border-radius: 6px;padding: 8px 35px 7px;text-decoration: none;font-size: 12px;font-weight: 500;">??I???U CH???NH GI?? B??N</a>
                                                                        </td>
                                                                    </tr>
                                                               
                                                            </table>
                                                        </td>
                                                    </tr>

                                                    <!--TH??NG TIN B???T ?????NG S???N C???A B???N-->
                                                    <tr>
                                                        <td align="">
                                                            <table align="center" cellpadding="0" cellspacing="0" width="100%" style="color: #00538e;margin-top: 40px;">
                                                                <tr>
                                                                    <td align="center">
                                                                        <p style="background-color: #155aa9;font-size: 20px;text-transform: uppercase;padding: 15px 0;color: #fff;font-weight: 500;margin: 0;">TH??NG TIN B???T ?????NG S???N C???A QU?? KH??CH</p>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td align="center" style="font-weight: bold;color: #00538e;">
                                                                        <p style="font-size: 15px;padding-top: 5px">C??c ho???t ?????ng li??n quan ?????n B??S c???a qu?? kh??ch so s??nh v???i c??c B??S kh??c <br/>trong c??ng khu v???c</p>
                                                                        <p style="font-size: 11px;">T???:   {{ date('d/m/Y', $data->startDate/1000) }} - ?????n: {{ date('d/m/Y', $data->endDate/1000) }}</p>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <table align="center" cellpadding="0" cellspacing="0" width="100%" style="color: #00538e;font-size:12px;font-weight: 400;padding: 0 5%;">
                                                                            <tr>
                                                                                <td>
                                                                                    <p style="padding-left: 30px;margin: 5px 0"><span style="background-color: #026cb9;height: 25px;width: 28px;border-radius: 30px;display: inline-block;vertical-align: middle;margin-right: 5px;"></span> B??S c???a qu?? kh??ch</p>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td style="position: relative;">
                                                                                    <table align="center" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 5px">
                                                                                        <tr>
                                                                                            <td>
                                                                                                <p>
                                                                                                    <span style="width: 33.33%;display: inline-block;float: left;">Min</span>
                                                                                                    <span style="width: 33.33%;display: inline-block;float: left;text-align: center;">L?????t xem online</span>
                                                                                                    <span style="width: 33.33%;display: inline-block;text-align: right;">Max</span>
                                                                                                </p>
                                                                                                <div class="bg-chart" style="position: relative;">
                                                                                                    <span style="display: inline-block;float: left;padding-left: 1%">{{ $data->minOfView }}</span>
                                                                                                    <span style="display: inline-block;float: right;padding-right: 2px">{{ $data->maxOfView }}</span>
                                                                                                </div>
                                                                                                <div style="background-color: #026cb9;height: 25px;width: {{ $data->percentOfView ? $data->percentOfView : 10 }}%;border-radius: 30px;position: absolute;bottom: 0;left: 5%;text-align: right;color: #fff;">
                                                                                                    <span style="display: inline-block;padding: 6px 15px;">{{ $data->numberOfView }}</span>
                                                                                                </div>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td style="position: relative;">
                                                                                    <table align="center" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 5px">
                                                                                        <tr>
                                                                                            <td>
                                                                                                <p>
                                                                                                    <span style="width: 33.33%;display: inline-block;float: left;color: transparent;">Min</span>
                                                                                                    <span style="width: 33.33%;display: inline-block;float: left;text-align: center;">?????t l???ch xem</span>
                                                                                                    <span style="width: 33.33%;display: inline-block;text-align: right;color: transparent;">Max</span>
                                                                                                </p>
                                                                                                <div class="bg-chart" style="position: relative;">
                                                                                                    <span style="display: inline-block;float: left;padding-left: 1%">{{ $data->minOfBook }}</span>
                                                                                                    <span style="display: inline-block;float: right;padding-right: 7px">{{ $data->maxOfBook }}</span>
                                                                                                </div>
                                                                                                <div style="background-color: #026cb9;height: 25px;width: {{ $data->percentOfBook ? $data->percentOfBook : 10 }}%;border-radius: 30px;position: absolute;bottom: 0;left: 5%;text-align: right;color: #fff;">
                                                                                                    <span style="display: inline-block;padding: 6px 15px;">{{ $data->numberOfBook }}</span>
                                                                                                </div>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td style="position: relative;">
                                                                                    <table align="center" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 5px">
                                                                                        <tr>
                                                                                            <td>
                                                                                                <p>
                                                                                                    <span style="width: 33.33%;display: inline-block;float: left;color: transparent;">Min</span>
                                                                                                    <span style="width: 33.33%;display: inline-block;float: left;text-align: center;">Th????ng l?????ng</span>
                                                                                                    <span style="width: 33.33%;display: inline-block;text-align: right;color: transparent;">Max</span>
                                                                                                </p>
                                                                                                <div class="bg-chart" style="position: relative;">
                                                                                                    <span style="display: inline-block;float: left;padding-left: 1%">{{ $data->minOfNegotiate }}</span>
                                                                                                    <span style="display: inline-block;float: right;padding-right: 7px">{{ $data->maxOfNegotiate }}</span>
                                                                                                </div>
                                                                                                <div style="background-color: #026cb9;height: 25px;width: {{ $data->percentOfNegotiate ? $data->percentOfNegotiate : 10 }}%;border-radius: 30px;position: absolute;bottom: 0;left: 5%;text-align: right;color: #fff;">
                                                                                                    <span style="display: inline-block;padding: 6px 15px;">{{ $data->numberOfNegotiate }}</span>
                                                                                                </div>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td align="center">
                                                                        <p style="font-size: 16px;font-weight: bold;padding-top: 12px">????nh gi?? t??? kh??ch h??ng ??i xem nh?? th???c t???</p>
                                                                        <table align="center" cellpadding="0" cellspacing="0" width="80%" style="border: 1px solid #026cb9;font-size: 12px">
                                                                            <tr>
                                                                                <td align="center" class="col-60" style="border-right: 1px solid #026cb9;border-bottom: 1px solid #026cb9;padding: 12px;font-weight: 900;">?????c ??i???m ????nh gi??</td>
                                                                                <td align="center" class="col-40" style="border-bottom: 1px solid #026cb9;padding: 12px;font-weight: 900;font-size: 12px;">??i???m ????nh gi??</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td align="center" class="col-60" style="border-right: 1px solid #026cb9;border-bottom: 1px solid #026cb9;padding: 12px;">???????ng ??i v??o</td>
                                                                                <td align="center" class="col-40" style="border-bottom: 1px solid #026cb9;padding: 12px;font-size: 10px;;font-size: 12px;">{{ $data->scoreReviewOfStreet }}/5 <img src="{{ loadAsset('images/seller-report/star.png') }}" alt="" width="10"></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td align="center" class="col-60" style="border-right: 1px solid #026cb9;border-bottom: 1px solid #026cb9;padding: 12px;">V??? tr??, m???t ti???n nh??</td>
                                                                                <td align="center" class="col-40" style="border-bottom: 1px solid #026cb9;padding: 12px;font-size: 10px;;font-size: 12px;">{{ $data->scoreReviewOfPosition }}/5 <img src="{{ loadAsset('images/seller-report/star.png') }}" alt="" width="10"></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td align="center" class="col-60" style="border-right: 1px solid #026cb9;border-bottom: 1px solid #026cb9;padding: 12px;">Ki???n tr??c nh??</td>
                                                                                <td align="center" class="col-40" style="border-bottom: 1px solid #026cb9;padding: 12px;font-size: 10px;;font-size: 12px;">{{ $data->scoreReviewOfHouseArchitecture }}/5 <img src="{{ loadAsset('images/seller-report/star.png') }}" alt="" width="10"></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td align="center" class="col-60" style="border-right: 1px solid #026cb9;border-bottom: 1px solid #026cb9;padding: 12px;">Gi?? tr??? c??n nh??</td>
                                                                                <td align="center" class="col-40" style="border-bottom: 1px solid #026cb9;padding: 12px;font-size: 10px;;font-size: 12px;">{{ $data->scoreReviewOfHouseValue }}/5 <img src="{{ loadAsset('images/seller-report/star.png') }}" alt="" width="10"></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td align="center" class="col-60" style="border-right: 1px solid #026cb9;padding: 12px;">M??i tr?????ng s???ng</td>
                                                                                <td align="center" class="col-40" style="padding: 12px;font-size: 10px;;font-size: 12px;">{{ $data->scoreReviewOfSLifeEnv }}/5 <img src="{{ loadAsset('images/seller-report/star.png') }}" alt="" width="10"></td>
                                                                            </tr>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                                
                                                                    <tr>
                                                                        <td align="center" style="padding: 32px 0">
                                                                            <a style="color: #fff;text-transform: uppercase;background-color: #ff7a00;border-radius: 6px;padding: 8px 40px 7px;text-decoration: none;font-weight: 500;font-size: 12px;">C???P NH???T H??NH ???NH V?? TH??NG TIN</a>
                                                                        </td>
                                                                    </tr>
                                                                
                                                            </table>
                                                        </td>
                                                    </tr>

                                                    <!--G??Y ???N T?????NG V???I KH??CH H??NG-->
                                                    <tr>
                                                        <td>
                                                            <table align="center" cellpadding="0" cellspacing="0" width="100%" style="font-size: 12px;color: #00538e;margin-top: 40px;">
                                                                <tr>
                                                                    <td align="center">
                                                                        <p style="background-color: #155aa9;font-size: 20px;text-transform: uppercase;padding: 15px 0;color: #fff;font-weight: 500;margin: 0;">G??Y ???N T?????NG V???I KH??CH H??NG</p>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td style="padding: 25px 0">
                                                                        <table align="center" cellpadding="0" cellspacing="0" width="100%">
                                                                            <tr>
                                                                                <td class="td-hinhanh" style="display: -webkit-box;display: -ms-flexbox;display: flex;-webkit-box-align: start;  -ms-flex-align: start;align-items: center; padding: 0 55px;">
                                                                                    <span style="font-size: 27px;font-weight: 700;color: #f17423;text-transform: uppercase;">99% h??nh ???nh nh?? ?????p</span>
                                                                                    <span style="font-weight: 500;padding-left: 10px;-webkit-box-flex: 1;-ms-flex: 1;">???nh h?????ng ?????n quy???t ?????nh kh??ch h??ng <br/> mu???n xem ti???p B??S ??ang rao b??n</span>
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td style="padding: 0 15px;">
                                                                        <p style="padding: 0 10px;margin: 0 0 2px;font-weight: 900;">1. V??? sinh & d???n d???p nh?? c???a s???ch s??? tr?????c khi ch???p ???nh ????ng b??n</p>
                                                                        <p style="padding: 0 10px;margin: 0 0 5px">N???u c???n t??ng gi?? tr??? nh?? cao h??n, h??y s???a ch???a nh???ng ch??? b??? h???ng, c?? n??t ho???c s??n m???i l???i ng??i nh??</p>
                                                                        <table align="center" cellpadding="0" cellspacing="0" width="100%" style="padding-top: 12px">
                                                                            <tr>
                                                                                <td align="center" class="col-50" style="padding: 0 12px">
                                                                                    <img src="{{ loadAsset('images/seller-report/img1.jpg') }}" alt="" style="width:100%;" />
                                                                                    <p style="color: #f17423;font-size: 14;font-weight: 500">H??nh ???nh kh??ng b???t m???t</p>
                                                                                </td>
                                                                                <td align="center" class="col-50" style="padding: 0 12px">
                                                                                    <img src="{{ loadAsset('images/seller-report/img2.jpg') }}" alt="" style="width:100%;" />
                                                                                    <p style="color: #f17423;font-size: 14;font-weight: 500">H??nh ???nh thu h??t</p>
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td style="padding: 5px 15px 0;">
                                                                        <p style="padding: 0 10px;margin: 0 0 2px;font-weight: 900;">2. Ch???n g??c ch???p v?? ch???p th???t nhi???u h??nh nhi???u g??c ?????p</p>
                                                                        <p style="padding: 0 10px;margin: 0 0 5px">N???u qu?? kh??ch kh??ng bi???t c??ch ch???p, h??y li??n h??? Propzy ????? ???????c t?? v???n v?? h??? tr??? th??m.</p>
                                                                        <table align="center" cellpadding="0" cellspacing="0" width="100%" style="padding-top: 12px">
                                                                            <tr>
                                                                                <td align="center" class="col-50" style="padding: 0 12px">
                                                                                    <img src="{{ loadAsset('images/seller-report/img3.jpg') }}" alt="" style="width:100%;" />
                                                                                </td>
                                                                                <td align="center" class="col-50" style="padding: 0 12px">
                                                                                    <img src="{{ loadAsset('images/seller-report/img4.jpg') }}" alt="" style="width:100%;" />
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                        <table align="center" cellpadding="0" cellspacing="0" width="100%" style="padding-top: 20px">
                                                                            <tr>
                                                                                <td align="center" class="col-50" style="padding: 0 12px">
                                                                                    <img src="{{ loadAsset('images/seller-report/img5.jpg') }}" alt="" style="width:100%;" />
                                                                                    <p style="color: #f17423;font-size: 14;font-weight: 500">H??nh ???nh kh??ng b???t m???t</p>
                                                                                </td>
                                                                                <td align="center" class="col-50" style="padding: 0 12px">
                                                                                    <img src="{{ loadAsset('images/seller-report/img6.jpg') }}" alt="" style="width:100%;" />
                                                                                    <p style="color: #f17423;font-size: 14;font-weight: 500">H??nh ???nh thu h??t</p>
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                               
                                                                    <tr>
                                                                        <td align="center" style="padding: 10px 0 35px">
                                                                            <a style="color: #fff;text-transform: uppercase;background-color: #ff7a00;border-radius: 6px;padding: 8px 40px 7px;text-decoration: none;font-weight: 500;font-size: 12px">C???P NH???T H??NH ???NH V?? TH??NG TIN</a>
                                                                        </td>
                                                                    </tr>
                                                                
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <table align="center" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 40px;">
                                                                <tr>
                                                                    <td align="center">
                                                                        <p style="background-color: #155aa9;font-size: 20px;text-transform: uppercase;padding: 15px 0;color: #fff;font-weight: 500;margin: 0;">GI???I PH??P H??? TR??? KH??C T??? PROPZY</p>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td align="center">
                                                                        <table align="center" cellpadding="0" cellspacing="0" width="100%" style="font-size: 12px;font-weight: bold;color: #00538e;padding-top: 22px">
                                                                            <tr>
                                                                                <td align="center" class="col-30">
                                                                                    <img src="{{ loadAsset('images/seller-report/img-service1.png') }}" alt="" width="73" />
                                                                                    <p style="padding-top: 5px">B??n gi?? t???t h??n</p>
                                                                                </td>
                                                                                <td align="center" class="col-30">
                                                                                    <img src="{{ loadAsset('images/seller-report/img-service2.png') }}" alt="" width="73" />
                                                                                    <p style="padding-top: 5px">Th???m ?????nh l???i</p>
                                                                                </td>
                                                                                <td align="center" class="col-30">
                                                                                    <img src="{{ loadAsset('images/seller-report/img-service3.png') }}" alt="" width="73" />
                                                                                    <p style="padding-top: 5px">Y??u c???u kh??c</p>
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                                
                                                                    <tr>
                                                                        <td align="center" style="padding: 17px 0 40px">
                                                                            <a  style="color: #fff;text-transform: uppercase;background-color: #ff7a00;border-radius: 6px;padding: 8px 40px 7px;text-decoration: none;font-size: 12px;font-weight: 500">LI??N H??? NGAY NH???N H??? TR???</a>
                                                                        </td>
                                                                    </tr>
                                                                
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <!--row footer-->
                            <tr>
                                <td align="center">
                                    <table align="center" cellpadding="0" cellspacing="0" width="100%" style="padding: 25px">
                                        <tr>
                                            <td style="vertical-align: top;width: 180px">
                                                <img src="{{ loadAsset('images/seller-report/logo-footer.png') }}" alt="" width="147" />
                                            </td>
                                            <td style="font-size: 12px;color: #656565;">
                                                <p style="margin: 0 0 5px">Tr??? s??? ch??nh: T???ng 5, to?? nh?? Flemington</p>
                                                <p style="margin: 5px 0">182 L?? ?????i H??nh, P.15, Q.11, TP.HCM</p>
                                                <p style="margin: 5px 0">Website: <a href="https://propzy.vn" style="text-decoration: none;color: #656565">propzy.vn</a></p>
                                                <p style="margin: 5px 0">C???n h??? tr???? G???i ngay: <a href="tel:*4663" style="text-decoration: none;color: #656565">*4663</a></p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        @else
        
            <!-- b???n ko th??? xem b??o c??o n??y -->
            <div style="text-align: center;font-size: 18px;margin-top: 100px;">
                <img src="{{ loadAsset('images/seller-report/vector.png') }}"/>
                <p>Qu?? kh??ch kh??ng th??? xem b??o c??o n??y. <br/>Ki???m tra l???i t??i kho???n c???a qu?? kh??ch</p>
            </div>
            
        @endif
        <script type="text/javascript" src="{{ loadAsset('js/seller-report/seller-report.js') }}"></script>
    </body>
</html>