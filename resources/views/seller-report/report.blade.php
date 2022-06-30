
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
                                                    <!--Báo cáo tình trạng-->
                                                    <tr>
                                                        <td align="center">
                                                            <p style="font-size: 22px; text-align: center;color: #f17423;line-height: 30px;margin: 12px 0 0">Báo cáo tình trạng <br/>bất động sản của quý khách đang bán</p>
                                                            <p style="font-size: 14px; text-align: center;color: #000;margin: 8px 0;">Thời gian: {{ date('d/m/Y', $data->startDate/1000) }} đến {{ date('d/m/Y', $data->endDate/1000) }}</p>
                                                        </td>
                                                    </tr>

                                                    <!--MAPS-->
                                                    <tr>
                                                        <td align="" style="padding: 15px 20px 0 40px;" class="tb-maps">
                                                            <table align="center" cellpadding="0" cellspacing="0" width="100%">
                                                                <tr>
                                                                    
                                                                        <td class="col-60" align="center" style="padding-right: 30px;">
                                                                            <div id="maps" class="bl-map" frameborder="0" style="width:100%;height:306px;" allowfullscreen ></div>
                                                                            <p style="font-size: 14px;color: #000;">{{ $data->numberItem }} BĐS trong cùng bán kính 2km <br/>khu vực {{ $data->districtName }}</p>
                                                                        </td>
                                                                        <td class="col-40" style="vertical-align: top;">
                                                                            <table align="center" cellpadding="0" cellspacing="0" width="100%" bgcolor="#e8f1f8" style="padding: 0 20px;">
                                                                                <tr>
                                                                                    <td>
                                                                                        <p style="background-color: #155aa9;font-size: 14px;color: #fff;
                                                                                           border-radius: 10px;text-align: center;padding: 10px 0;margin-bottom: 18px;">Mã BĐS: {{ $data->listingId }}</p>
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
                                                                                                    <p style="font-size: 10px;margin: 2px 0 0">Số ngày đăng bán: {{ $data->dateLiveListing }}</p>
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

                                                    <!--PHÂN TÍCH THỊ TRƯỜNG CHUNG-->
                                                    <tr>
                                                        <td align="" class="tb-phantich">
                                                            <table align="center" cellpadding="0" cellspacing="0" width="100%">
                                                                <tr>
                                                                    <td align="center">
                                                                        <p style="background-color: #155aa9;font-size: 20px;text-transform: uppercase;padding: 15px 0;color: #fff;font-weight: 500;margin-bottom: 0;">PHÂN TÍCH THỊ TRƯỜNG CHUNG</p>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td style="padding: 25px 25px 20px;" class="td-border">
                                                                        <table align="center" cellpadding="0" cellspacing="0" width="100%" style="border: 2px solid #004577;padding: 15px 8px 5px 15px;color: #00538e;">
                                                                            
                                                                                <tr>
                                                                                    <td class="col-40" style="vertical-align: top">
                                                                                        <p style="font-size: 18px;font-weight: 500;margin: 0;">Khách mua nhà quan tâm điều gì nhất khi xem nhà?</p>
                                                                                        
                                                                                        <p style="font-size: 14px;font-weight: 300;line-height: 19px;">Bên cạnh những yếu tố ảnh hưởng đến quyết định mua nhà của khách hàng là môi trường sống xung quanh, khu vực an ninh, hàng xóm thân thiện, hợp phong thủy,... điều mà khách mua nhà quan tâm nhiều nhất là <span style="font-weight: 900">GIÁ BÁN</span>.</p>
                                                                                    </td>
                                                                                    <td class="col-60">
                                                                                        <table align="center" cellpadding="0" cellspacing="0" width="100%" style="padding-left: 20px;">
                                                                                            <tr>
                                                                                                <td align="center" class="p-yeuto"><p style="font-size: 15px;margin-top: 4px;">Các yếu tố quan tâm khi mua BĐS</p></td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td class="border-chart" style="position: relative;">
                                                                                                    <table align="center" cellpadding="0" cellspacing="0" width="100%">
                                                                                                        <tr>
                                                                                                            <td class="col-50" style="border-right: 2px solid #e8e8e8;">
                                                                                                                <p style="font-size: 12px;font-weight: 300;margin: 5px 0;">Các tiện ích xung quanh</p>
                                                                                                            </td>
                                                                                                            <td class="col-50">
                                                                                                                <div style="background: #1887d8;height: 15px;display: inline-block;vertical-align: middle;margin-left: -1px;width: 27%;"></div>
                                                                                                                <span style="font-size: 10px;font-weight: 300;">27%</span>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td class="col-50" style="border-right: 2px solid #e8e8e8;">
                                                                                                                <p style="font-size: 12px;font-weight: 300;margin: 5px 0;">Số năm xây dựng</p>
                                                                                                            </td>
                                                                                                            <td class="col-50">
                                                                                                                <div style="background: #1887d8;height: 15px;display: inline-block;vertical-align: middle;margin-left: -1px;width: 27%;"></div>
                                                                                                                <span style="font-size: 10px;font-weight: 300;">27%</span>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td class="col-50" style="border-right: 2px solid #e8e8e8;">
                                                                                                                <p style="font-size: 12px;font-weight: 300;margin: 5px 0;">Tỷ suất sinh lợi</p>
                                                                                                            </td>
                                                                                                            <td class="col-50">
                                                                                                                <div style="background: #1887d8;height: 15px;display: inline-block;vertical-align: middle;margin-left: -1px;width: 37%;"></div>
                                                                                                                <span style="font-size: 10px;font-weight: 300;">37%</span>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td class="col-50" style="border-right: 2px solid #e8e8e8;">
                                                                                                                <p style="font-size: 12px;font-weight: 300;margin: 5px 0;">Phong thuỷ</p>
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
                                                                                                                <p style="font-size: 12px;font-weight: 300;margin: 5px 0;">Vị trí</p>
                                                                                                            </td>
                                                                                                            <td class="col-50">
                                                                                                                <div style="background: #1887d8;height: 15px;display: inline-block;vertical-align: middle;margin-left: -1px;width: 65%;"></div>
                                                                                                                <span style="font-size: 10px;font-weight: 300;">65%</span>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td class="col-50" style="border-right: 2px solid #e8e8e8;">
                                                                                                                <p style="font-size: 12px;font-weight: 900;margin: 5px 0;">Giá</p>
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
                                                                                    <p style="font-size: 15px;color: #00538e;">Ảnh hưởng của giá bán và số ngày đăng bán</p>
                                                                                </td>
                                                                                <td class="col-30" style="font-size: 10px;color: #00538e">
                                                                                    <table align="center" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 5px;" class="table-border">
                                                                                        <tr>
                                                                                            <td style="background-color: #ebf7ff;border: 1px solid #026cb9;padding: 3px;">
                                                                                                <p style="margin: 0;font-weight: bold;font-style: italic;">Tình hình thị trường trong cùng khu vực</p>
                                                                                                <p style="margin: 7px 0 0">• Giá bán trung bình: <span style="display: inline-block;float: right;color: #f17423;font-weight: 500">{{ $data->averageUnitPrice }}</span></p>
                                                                                                <p style="margin: 0">• Thời gian bán trung bình: <span style="display: inline-block;float: right;color: #f17423;font-weight: 500">{{ $data->averageTimeSell }} ngày</span></p>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </table>
                                                                                    <table align="center" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 5px;" class="table-border">
                                                                                        <tr>
                                                                                            <td style="background-color: #ebf7ff;border: 1px solid #026cb9;padding: 3px;">
                                                                                                <p style="margin: 0;font-weight: bold;font-style: italic;">Chú thích</p>
                                                                                                <p style="margin: 5px 0 0">• Thống kê so sánh giá bán BĐS của quý khách với BĐS cùng khu vực trong bán kính 2 - 5 km.</p>
                                                                                                <p style="margin: 0">• Số liệu trung bình là số liệu được tính trên m2 đất, chưa tính giá trên diện tích xây dựng.</p>
                                                                                                <p style="margin: 0">• Thông tin thị trường chung là để quý khách đánh giá tình trạng BĐS của quý khách đang ở đâu so với thị trường</p>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </table>
                                                                                    <table align="center" cellpadding="0" cellspacing="0" width="100%" style="" class="table-border">
                                                                                        <tr>
                                                                                            <td style="background-color: #ebf7ff;border: 1px solid #026cb9;padding: 3px;">
                                                                                                <p style="margin: 0;font-weight: bold;font-style: italic;">Gợi ý</p>
                                                                                                <p style="margin: 5px 0 0">• Thời gian đăng bán nhà của quý khách đang bị kéo dài so với thị trường chung.</p>
                                                                                                <p style="margin: 0">• Nếu quý khách muốn bán nhà nhanh hơn, cần điều chỉnh giá bán phù hợp với thị trường.</p>
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
                                                                            <a style="color: #fff;text-transform: uppercase;background-color: #ff7a00;border-radius: 6px;padding: 8px 35px 7px;text-decoration: none;font-size: 12px;font-weight: 500;">ĐIỀU CHỈNH GIÁ BÁN</a>
                                                                        </td>
                                                                    </tr>
                                                               
                                                            </table>
                                                        </td>
                                                    </tr>

                                                    <!--THÔNG TIN BẤT ĐỘNG SẢN CỦA BẠN-->
                                                    <tr>
                                                        <td align="">
                                                            <table align="center" cellpadding="0" cellspacing="0" width="100%" style="color: #00538e;margin-top: 40px;">
                                                                <tr>
                                                                    <td align="center">
                                                                        <p style="background-color: #155aa9;font-size: 20px;text-transform: uppercase;padding: 15px 0;color: #fff;font-weight: 500;margin: 0;">THÔNG TIN BẤT ĐỘNG SẢN CỦA QUÝ KHÁCH</p>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td align="center" style="font-weight: bold;color: #00538e;">
                                                                        <p style="font-size: 15px;padding-top: 5px">Các hoạt động liên quan đến BĐS của quý khách so sánh với các BĐS khác <br/>trong cùng khu vực</p>
                                                                        <p style="font-size: 11px;">Từ:   {{ date('d/m/Y', $data->startDate/1000) }} - Đến: {{ date('d/m/Y', $data->endDate/1000) }}</p>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <table align="center" cellpadding="0" cellspacing="0" width="100%" style="color: #00538e;font-size:12px;font-weight: 400;padding: 0 5%;">
                                                                            <tr>
                                                                                <td>
                                                                                    <p style="padding-left: 30px;margin: 5px 0"><span style="background-color: #026cb9;height: 25px;width: 28px;border-radius: 30px;display: inline-block;vertical-align: middle;margin-right: 5px;"></span> BĐS của quý khách</p>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td style="position: relative;">
                                                                                    <table align="center" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 5px">
                                                                                        <tr>
                                                                                            <td>
                                                                                                <p>
                                                                                                    <span style="width: 33.33%;display: inline-block;float: left;">Min</span>
                                                                                                    <span style="width: 33.33%;display: inline-block;float: left;text-align: center;">Lượt xem online</span>
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
                                                                                                    <span style="width: 33.33%;display: inline-block;float: left;text-align: center;">Đặt lịch xem</span>
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
                                                                                                    <span style="width: 33.33%;display: inline-block;float: left;text-align: center;">Thương lượng</span>
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
                                                                        <p style="font-size: 16px;font-weight: bold;padding-top: 12px">Đánh giá từ khách hàng đi xem nhà thực tế</p>
                                                                        <table align="center" cellpadding="0" cellspacing="0" width="80%" style="border: 1px solid #026cb9;font-size: 12px">
                                                                            <tr>
                                                                                <td align="center" class="col-60" style="border-right: 1px solid #026cb9;border-bottom: 1px solid #026cb9;padding: 12px;font-weight: 900;">Đặc điểm đánh giá</td>
                                                                                <td align="center" class="col-40" style="border-bottom: 1px solid #026cb9;padding: 12px;font-weight: 900;font-size: 12px;">Điểm đánh giá</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td align="center" class="col-60" style="border-right: 1px solid #026cb9;border-bottom: 1px solid #026cb9;padding: 12px;">Đường đi vào</td>
                                                                                <td align="center" class="col-40" style="border-bottom: 1px solid #026cb9;padding: 12px;font-size: 10px;;font-size: 12px;">{{ $data->scoreReviewOfStreet }}/5 <img src="{{ loadAsset('images/seller-report/star.png') }}" alt="" width="10"></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td align="center" class="col-60" style="border-right: 1px solid #026cb9;border-bottom: 1px solid #026cb9;padding: 12px;">Vị trí, mặt tiền nhà</td>
                                                                                <td align="center" class="col-40" style="border-bottom: 1px solid #026cb9;padding: 12px;font-size: 10px;;font-size: 12px;">{{ $data->scoreReviewOfPosition }}/5 <img src="{{ loadAsset('images/seller-report/star.png') }}" alt="" width="10"></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td align="center" class="col-60" style="border-right: 1px solid #026cb9;border-bottom: 1px solid #026cb9;padding: 12px;">Kiến trúc nhà</td>
                                                                                <td align="center" class="col-40" style="border-bottom: 1px solid #026cb9;padding: 12px;font-size: 10px;;font-size: 12px;">{{ $data->scoreReviewOfHouseArchitecture }}/5 <img src="{{ loadAsset('images/seller-report/star.png') }}" alt="" width="10"></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td align="center" class="col-60" style="border-right: 1px solid #026cb9;border-bottom: 1px solid #026cb9;padding: 12px;">Giá trị căn nhà</td>
                                                                                <td align="center" class="col-40" style="border-bottom: 1px solid #026cb9;padding: 12px;font-size: 10px;;font-size: 12px;">{{ $data->scoreReviewOfHouseValue }}/5 <img src="{{ loadAsset('images/seller-report/star.png') }}" alt="" width="10"></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td align="center" class="col-60" style="border-right: 1px solid #026cb9;padding: 12px;">Môi trường sống</td>
                                                                                <td align="center" class="col-40" style="padding: 12px;font-size: 10px;;font-size: 12px;">{{ $data->scoreReviewOfSLifeEnv }}/5 <img src="{{ loadAsset('images/seller-report/star.png') }}" alt="" width="10"></td>
                                                                            </tr>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                                
                                                                    <tr>
                                                                        <td align="center" style="padding: 32px 0">
                                                                            <a style="color: #fff;text-transform: uppercase;background-color: #ff7a00;border-radius: 6px;padding: 8px 40px 7px;text-decoration: none;font-weight: 500;font-size: 12px;">CẬP NHẬT HÌNH ẢNH VÀ THÔNG TIN</a>
                                                                        </td>
                                                                    </tr>
                                                                
                                                            </table>
                                                        </td>
                                                    </tr>

                                                    <!--GÂY ẤN TƯỢNG VỚI KHÁCH HÀNG-->
                                                    <tr>
                                                        <td>
                                                            <table align="center" cellpadding="0" cellspacing="0" width="100%" style="font-size: 12px;color: #00538e;margin-top: 40px;">
                                                                <tr>
                                                                    <td align="center">
                                                                        <p style="background-color: #155aa9;font-size: 20px;text-transform: uppercase;padding: 15px 0;color: #fff;font-weight: 500;margin: 0;">GÂY ẤN TƯỢNG VỚI KHÁCH HÀNG</p>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td style="padding: 25px 0">
                                                                        <table align="center" cellpadding="0" cellspacing="0" width="100%">
                                                                            <tr>
                                                                                <td class="td-hinhanh" style="display: -webkit-box;display: -ms-flexbox;display: flex;-webkit-box-align: start;  -ms-flex-align: start;align-items: center; padding: 0 55px;">
                                                                                    <span style="font-size: 27px;font-weight: 700;color: #f17423;text-transform: uppercase;">99% hình ảnh nhà đẹp</span>
                                                                                    <span style="font-weight: 500;padding-left: 10px;-webkit-box-flex: 1;-ms-flex: 1;">ảnh hưởng đến quyết định khách hàng <br/> muốn xem tiếp BĐS đang rao bán</span>
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td style="padding: 0 15px;">
                                                                        <p style="padding: 0 10px;margin: 0 0 2px;font-weight: 900;">1. Vệ sinh & dọn dẹp nhà cửa sạch sẽ trước khi chụp ảnh đăng bán</p>
                                                                        <p style="padding: 0 10px;margin: 0 0 5px">Nếu cần tăng giá trị nhà cao hơn, hãy sửa chữa những chỗ bị hỏng, cũ nát hoặc sơn mới lại ngôi nhà</p>
                                                                        <table align="center" cellpadding="0" cellspacing="0" width="100%" style="padding-top: 12px">
                                                                            <tr>
                                                                                <td align="center" class="col-50" style="padding: 0 12px">
                                                                                    <img src="{{ loadAsset('images/seller-report/img1.jpg') }}" alt="" style="width:100%;" />
                                                                                    <p style="color: #f17423;font-size: 14;font-weight: 500">Hình ảnh không bắt mắt</p>
                                                                                </td>
                                                                                <td align="center" class="col-50" style="padding: 0 12px">
                                                                                    <img src="{{ loadAsset('images/seller-report/img2.jpg') }}" alt="" style="width:100%;" />
                                                                                    <p style="color: #f17423;font-size: 14;font-weight: 500">Hình ảnh thu hút</p>
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td style="padding: 5px 15px 0;">
                                                                        <p style="padding: 0 10px;margin: 0 0 2px;font-weight: 900;">2. Chọn góc chụp và chụp thật nhiều hình nhiều góc đẹp</p>
                                                                        <p style="padding: 0 10px;margin: 0 0 5px">Nếu quý khách không biết cách chụp, hãy liên hệ Propzy để được tư vấn và hỗ trợ thêm.</p>
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
                                                                                    <p style="color: #f17423;font-size: 14;font-weight: 500">Hình ảnh không bắt mắt</p>
                                                                                </td>
                                                                                <td align="center" class="col-50" style="padding: 0 12px">
                                                                                    <img src="{{ loadAsset('images/seller-report/img6.jpg') }}" alt="" style="width:100%;" />
                                                                                    <p style="color: #f17423;font-size: 14;font-weight: 500">Hình ảnh thu hút</p>
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                               
                                                                    <tr>
                                                                        <td align="center" style="padding: 10px 0 35px">
                                                                            <a style="color: #fff;text-transform: uppercase;background-color: #ff7a00;border-radius: 6px;padding: 8px 40px 7px;text-decoration: none;font-weight: 500;font-size: 12px">CẬP NHẬT HÌNH ẢNH VÀ THÔNG TIN</a>
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
                                                                        <p style="background-color: #155aa9;font-size: 20px;text-transform: uppercase;padding: 15px 0;color: #fff;font-weight: 500;margin: 0;">GIẢI PHÁP HỖ TRỢ KHÁC TỪ PROPZY</p>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td align="center">
                                                                        <table align="center" cellpadding="0" cellspacing="0" width="100%" style="font-size: 12px;font-weight: bold;color: #00538e;padding-top: 22px">
                                                                            <tr>
                                                                                <td align="center" class="col-30">
                                                                                    <img src="{{ loadAsset('images/seller-report/img-service1.png') }}" alt="" width="73" />
                                                                                    <p style="padding-top: 5px">Bán giá tốt hơn</p>
                                                                                </td>
                                                                                <td align="center" class="col-30">
                                                                                    <img src="{{ loadAsset('images/seller-report/img-service2.png') }}" alt="" width="73" />
                                                                                    <p style="padding-top: 5px">Thẩm định lại</p>
                                                                                </td>
                                                                                <td align="center" class="col-30">
                                                                                    <img src="{{ loadAsset('images/seller-report/img-service3.png') }}" alt="" width="73" />
                                                                                    <p style="padding-top: 5px">Yêu cầu khác</p>
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                                
                                                                    <tr>
                                                                        <td align="center" style="padding: 17px 0 40px">
                                                                            <a  style="color: #fff;text-transform: uppercase;background-color: #ff7a00;border-radius: 6px;padding: 8px 40px 7px;text-decoration: none;font-size: 12px;font-weight: 500">LIÊN HỆ NGAY NHẬN HỖ TRỢ</a>
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
                                                <p style="margin: 0 0 5px">Trụ sở chính: Tầng 5, toà nhà Flemington</p>
                                                <p style="margin: 5px 0">182 Lê Đại Hành, P.15, Q.11, TP.HCM</p>
                                                <p style="margin: 5px 0">Website: <a href="https://propzy.vn" style="text-decoration: none;color: #656565">propzy.vn</a></p>
                                                <p style="margin: 5px 0">Cần hỗ trợ? Gọi ngay: <a href="tel:*4663" style="text-decoration: none;color: #656565">*4663</a></p>
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
        
            <!-- bạn ko thể xem báo cáo này -->
            <div style="text-align: center;font-size: 18px;margin-top: 100px;">
                <img src="{{ loadAsset('images/seller-report/vector.png') }}"/>
                <p>Quý khách không thể xem báo cáo này. <br/>Kiểm tra lại tài khoản của quý khách</p>
            </div>
            
        @endif
        <script type="text/javascript" src="{{ loadAsset('js/seller-report/seller-report.js') }}"></script>
    </body>
</html>