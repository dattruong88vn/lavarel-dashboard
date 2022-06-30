<?php
error_reporting(0);
if (strpos($_SERVER['SERVER_PORT'], "8787") > -1) {

    define('UPLOAD_URL', 'http://124.158.14.30:7777/');
    //define('BASE_API', 'http://124.158.14.30:8080/dashboardcrm/api/'); // server crm sprint 2
    define('BASE_API', 'http://124.158.14.30:8080/dashboard/api/'); // server develop
    //define('BASE_API', 'http://124.158.14.30:8080/dashboardcrmv2/api/');
    define('BASE_API', 'http://124.158.14.32:8080/dashboardv2/api/');
    define('BASE_UPLOAD_API', 'http://124.158.14.30:8080/file/api/'); // upload image
    define('UPLOAD_PATH', __DIR__ . '/../public/media_test/');
    define('PRODUCT_URL', 'http://124.158.14.30/');
    define('SITE_URL', 'http://124.158.14.30:8787/');
    define('AGENT_SITE_URL', 'http://124.158.14.30:9999/');

    //define('BASE_API', 'http://112.213.94.242:8080/dashboard_test/api/');
} else if (strpos($_SERVER['SERVER_ADDR'], "124.158.14.30") > -1) {
    // 124.158.14.30
    // server dev mới
    define('UPLOAD_URL', 'http://124.158.14.30:7777/');
    define('UPLOAD_PATH', '/var/www/html/media/');
    define('BASE_API', 'http://localhost:8080/dashboard/api/');

    // upload image
    define('BASE_UPLOAD_API', 'http://124.158.14.30:8080/file/api/');

    define('SITE_URL', 'http://124.158.14.30:8888/');
    //define('BASE_API', 'localhost:8080/dashboard_test_v2/api/');
    define('PRODUCT_URL', 'http://124.158.14.30/');
    define('AGENT_SITE_URL', 'http://124.158.14.30:9999/');
} else if (strpos($_SERVER['SERVER_NAME'], "dashboardv1.propzy.vn") > -1) {
    // 124.158.14.32
    // server test mới dashboardv1.propzy.vn
    define('UPLOAD_URL', 'http://124.158.14.32:7777/');
    define('UPLOAD_PATH', '/var/www/html/media/');
    define('BASE_API', 'http://124.158.14.32:8080/dashboard/api/');

    // upload image
    define('BASE_UPLOAD_API', 'http://124.158.14.32:8080/file/api/');

    define('SITE_URL', 'https://dashboardv1.propzy.vn/');
    //define('BASE_API', 'localhost:8080/dashboard_test_v2/api/');
    define('PRODUCT_URL', 'http://124.158.14.32/');
    define('AGENT_SITE_URL', 'http://124.158.14.32:9999/');
} else if (strpos($_SERVER['SERVER_ADDR'], "124.158.14.46") > -1) {
    // 124.158.14.32
    // server test mới
    define('UPLOAD_URL', 'http://124.158.14.46:7777/');
    define('UPLOAD_PATH', '/var/www/html/media/');
    define('BASE_API', 'http://124.158.14.32:8080/dashboard/api/');

    // upload image
    define('BASE_UPLOAD_API', 'http://124.158.14.46:8080/file/api/');

    define('SITE_URL', 'http://124.158.14.46:8888/');
    //define('BASE_API', 'localhost:8080/dashboard_test_v2/api/');
    define('PRODUCT_URL', 'http://124.158.14.46');
    define('AGENT_SITE_URL', 'http://124.158.14.46:9999/');
} else if (strpos($_SERVER['SERVER_ADDR'], "124.158.14.32") > -1) {
    // 124.158.14.32
    // server test mới
    define('UPLOAD_URL', 'http://124.158.14.32:7777/');
    define('UPLOAD_PATH', '/var/www/html/media/');
    define('BASE_API', 'http://124.158.14.32:8080/dashboard/api/');

    // upload image
    define('BASE_UPLOAD_API', 'http://124.158.14.32:8080/file/api/');

    define('SITE_URL', 'http://124.158.14.32:8888/');
    //define('BASE_API', 'localhost:8080/dashboard_test_v2/api/');
    define('PRODUCT_URL', 'http://124.158.14.32/');
    define('AGENT_SITE_URL', 'http://124.158.14.32:9999/');
} else if (strpos($_SERVER['SERVER_NAME'], "localhost") > -1 || strpos($_SERVER['SERVER_NAME'], "192.168.40.137") > -1 || strpos($_SERVER['SERVER_NAME'], ".dev") > -1 || strpos($_SERVER['SERVER_NAME'], ".local") > -1) {
    define('UPLOAD_URL', 'http://124.158.14.30:7777/');
    // test máy của duy.
    //define('BASE_API', 'http://192.168.39.10:8081/dashboard/api/');
    //define('BASE_API', 'http://192.168.39.37:8080/DashboardService/api/');
    // API server test
    //define('BASE_API', 'http://localhost:8080/DashboardService/api/');
    // define('BASE_API', 'http://124.158.14.46:8080/dashboard/api/'); // server test
    //define('BASE_API', 'http://124.158.14.32:8080/dashboard/api/');
    define('BASE_API', 'http://124.158.14.30:8080/dashboard/api/');
    //define('BASE_API', 'http://124.158.14.30:8080/dashboard/api/');
    //define('BASE_API', 'http://124.158.14.30:8080/dashboardcrmv2/api/'); // server develop
    //define('BASE_API', 'http://124.158.14.30:8080/dashboardcrm/api/'); // server crm sprint 2

    define('BASE_UPLOAD_API', 'http://124.158.14.30:8080/file/api/'); // upload image
    //define('BASE_API', 'http://develop.propzy.vn:8080/dashboard_test/api/'); // server develop
    // API MÁY JACK
    //define('BASE_API','http://192.168.39.46:8080/DashboardService/api/');
    //define('BASE_API', 'http://localhost:8080/DashboardService/api/');
    // production
    //define('BASE_API', 'http://124.158.14.26:9090/dashboard/api/');// server thiệt
    define('UPLOAD_PATH', __DIR__ . '/../public/media_test/');
    define('PRODUCT_URL', 'http://124.158.14.30/');
    define('SITE_URL', 'http://dashboard.propzy.local/');
    define('AGENT_SITE_URL', 'http://124.158.14.30:9999/');

    //define('BASE_API', 'http://112.213.94.242:8080/dashboard_test/api/');
} else if (strpos($_SERVER['SERVER_NAME'], "test") > -1) {
    //ip 112.213.88.224
    define('UPLOAD_URL', 'http://test.cdn.propzy.vn/media_test/');
    define('UPLOAD_PATH', '/var/www/html/propzyvn_media/media_test/');
    define('BASE_API', 'http://localhost:8080/dashboard_test/api/');

    // upload image
    define('BASE_UPLOAD_API', 'http://112.213.88.224:8080/file/api/');

    define('SITE_URL', 'http://test.dashboard.propzy.vn/');
    //define('BASE_API', 'localhost:8080/dashboard_test_v2/api/');
    define('AGENT_SITE_URL', 'http://test.agents.propzy.vn/');
    define('PRODUCT_URL', 'http://test.propzy.vn/');
} else if (strpos($_SERVER['SERVER_NAME'], "develop") > -1) {
    // 27.0.15.226
    define('UPLOAD_URL', 'http://develop.cdn.propzy.vn/media_test/');
    define('UPLOAD_PATH', '/var/www/html/propzyvn_media/media_test/');
    define('BASE_API', 'http://localhost:8080/dashboard_test/api/');

    // upload image
    define('BASE_UPLOAD_API', 'http://27.0.15.226:8080/file/api/');

    define('SITE_URL', 'http://develop.dashboard.propzy.vn/');
    //define('BASE_API', 'localhost:8080/dashboard_test_v2/api/');
    define('PRODUCT_URL', 'http://develop.propzy.vn/');
    define('AGENT_SITE_URL', 'http://develop.agents.propzy.vn/');
} else if (strpos($_SERVER['SERVER_NAME'], "lso") > -1) {
    // 27.0.15.226
    define('UPLOAD_URL', 'http://develop.cdn.propzy.vn/media_test/');
    define('UPLOAD_PATH', '/var/www/html/propzyvn_media/media_test/');
    define('BASE_API', 'http://develop.propzy.vn:8080/dashboard_lso/api/');

    // upload image
    define('BASE_UPLOAD_API', 'http://27.0.15.226:8080/file/api/');

    define('SITE_URL', 'http://lso.dashboard.propzy.vn/');
    //define('BASE_API', 'localhost:8080/dashboard_test_v2/api/');
    define('PRODUCT_URL', 'http://develop.propzy.vn/');
    define('AGENT_SITE_URL', 'http://develop.agents.propzy.vn/');
} else {
    define('UPLOAD_URL', 'https://cdn.propzy.vn/');
    define('UPLOAD_PATH', '/var/www/html/media/');

    define('BASE_API', 'http://10.158.14.15:9090/dashboard/api/');

    // upload image
    define('BASE_UPLOAD_API', 'https://cdn.propzy.vn:8443/file/api/');

    define('PRODUCT_URL', 'http://propzy.vn/');
    define('SITE_URL', 'http://dashboard.propzy.vn/');
    define('AGENT_SITE_URL', 'http://agents.propzy.vn/');
}
chmod(dirname(__FILE__), 0755);
include_once ("function.php");
if(!empty($_GET['broadcastCode']) && !empty($_GET['source'])){
    if (!empty($_FILES)) {
        function compress_image($source_url, $destination_url, $quality) {
            ini_set("gd.jpeg_ignore_warning", true);
            $info = getimagesize($source_url);
            if ($info['mime'] == 'image/jpeg')
                $image = imagecreatefromjpeg($source_url);
            elseif ($info['mime'] == 'image/gif')
                $image = @imagecreatefromgif($source_url);
            elseif ($info['mime'] == 'image/png')
                $image = @imagecreatefrompng($source_url);

            $contentTemp = file_get_contents($source_url);
            $filename = 'data://image/jpeg;base64,' . base64_encode($contentTemp);
            $exif = @exif_read_data($filename);
            if (isset($exif['Orientation'])) {
                $orientation = $exif['Orientation'];
            }
            if (!empty($orientation)) {
                switch ($orientation) {
                    case 3:
                        $image = imagerotate($image, 180, 0);
                        break;

                    case 6:
                        $image = imagerotate($image, -90, 0);
                        break;

                    case 8:
                        $image = imagerotate($image, 90, 0);
                        break;
                }
            }
            imagejpeg($image, $destination_url, $quality);
            return $destination_url;
        }
        //$images = array();

        $url_image = $_FILES["file"]["name"];
        $urlImage = compress_image($_FILES["file"]["tmp_name"], $url_image, 70);
        $postfields = [
            "file" => new \CURLFile(realpath($urlImage),$_FILES['file']['type']),
            "type" => 'listing'
        ];
        $headers = array("Content-Type"=>"multipart/form-data");
        $uploadRs = postData(BASE_UPLOAD_API .'upload',$postfields,$headers);
        echo json_encode($uploadRs);
        unlink(realpath($urlImage));
        exit();
    }

    $url  = $_SERVER['REQUEST_SCHEME']."://".$_SERVER['SERVER_NAME'].":".$_SERVER['SERVER_PORT'].$_SERVER['REQUEST_URI'];
    $source = BASE_API;
    $order= getData(BASE_API."request/agent/property/".$_GET['broadcastCode'].'/email');
    if(isset($_POST['submit'])){
        $definedPost = [
            'address' =>'Phải chọn địa chỉ',
            'districtId' =>'Phải chọn quận',
            'price' =>'Phải nhập giá',
        ];
        $error = false;
        $errorMessage = [];
        foreach ($definedPost as $key=>$item){
            if(empty($_POST[$key])){
                $error = true;
                $errorMessage[$key] = $item;
            }
        }
        if(!$error){
            $dataSend = [];
            $dataSend[]= array(
                'label' =>"Địa chỉ",
                'field' =>'address',
                'value' =>$_POST['address']
            );

            $dataSend[]= array(
                'label' =>"Quận/Huyện",
                'field' =>'districtId',
                'value' => (int) $_POST['districtId']
            );

            $dataSend[]= array(
                'label' =>"Diện tích",
                'field' =>'floorSize',
                'value' => (float) $_POST['floorSize']
            );

            $dataSend[]= array(
                'label' =>"Giá",
                'field' =>'price',
                'value' => (int)(preg_replace('/[\,|\.]/','',$_POST['price']))
            );

            $images = [];
            foreach ($_POST['photos'] as $key =>$item){
                $images[] =json_decode($item);
            }
            $dataSend[]= array(
                'label' =>"Hình ảnh",
                'field' =>'photos',
                'value' => $images
            );

            $dataSend[]= array(
                'label' =>"Ghi chú",
                'field' =>'crawlerNote',
                'value' => $_POST['crawlerNote']
            );

            $headers = array("Content-Type"=>"application/json; charset=utf-8");
            $response_save = postData(BASE_API."/request/agent/property/".$_GET['broadcastCode'].'/save',array('broadcastUserId'=>$order->data->broadcastUserId,'data'=>$dataSend),$headers);
            if($response_save['code'] =='200')
                $successMessage = true;

        }
    }


    $districts = getData(BASE_API."districts/1/")->data;

    ?>
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Broadcast submit</title>
        <meta name="robots" content="noindex">
        <meta name="googlebot" content="noindex">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="/assets/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
        <link href="/assets/bootstrap/css/bootstrapValidator.min.css" rel="stylesheet" />
        <link href="/assets/css/list-info.css" rel="stylesheet" />

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.16.0/jquery.validate.min.js"></script>


        <script src="/assets/dropzone/exif.js" type="text/javascript"></script>
        <script src="/assets/dropzone/dropzone.js?v=1.0" type="text/javascript"></script>
        <link rel="stylesheet" href="/assets/css/dropzone.css">

        <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?libraries=places,drawing&language=vi-VN&key=AIzaSyDpdmD6vwtMod5wbhS5yYGTD05dsn79UaU"></script>
        <script src="/assets/js/jquery.mask.js" type="text/javascript"></script>
        <meta http-equiv="ScreenOrientation" content="autoRotate:disabled">
        <style type="text/css">
            label.error{
                color: red;
                font-size: 12px;
                font-weight: normal;
                position: absolute;
            }
            a.continue{
                background-color: #fff;
                padding: 10px;
                margin-top: 10px;
                display: inline-block;
                border-radius: 3px;
                box-shadow: 1px 1px 1px 1px #3333334f;
                text-decoration: none;
            }
        </style>
    </head>
    <body class="home" style="background-color:#fffdf9; ">
    <?php if(!isset($successMessage)) {  ?>
        <div class="list-info">
            <div class="bl-logo">
                <a href=""><img src="/assets/images/logo.png" alt="" /></a>
            </div>
            <div class="content-info">
                <div class="bl-content">
                    <div class="bl-info">
                        <div class="bl-title">
                            <span>Thông tin</span>
                        </div>
                        <div class="row" style="border-radius: 5px;margin-left: 0px; margin-right: 0px;padding: 10px 0px;">
                            <?php if(!empty($order) && $order->code == 200 && !empty($order->data)) { ?>
                                <?php $data= $order->data->data; ?>
                                <div class="col-md-6">
                                    <p><b>Loại giao dịch: </b><?php echo $data->transactionType; ?></p>
                                    <p><b>Loại bất động sản: </b><?php echo $data->propertyType; ?></p>
                                    <p><b>Quận: </b><?php echo $data->districts; ?></p>
                                </div>
                                <div class="col-md-6">
                                    <p><b>Ngân sách: </b><?php echo $data->fixedBudget ?></p>
                                    <p><b>Diện tích: </b><?php echo $data->size; ?> m2</p>
                                    <p><b>Ghi chú: </b><?php echo $data->note; ?></p>
                                </div>
                            <?php } else { ?>
                                <div class="alert alert-danger text-center">Không có thông tin hiển thị</div>
                            <?php } ?>

                        </div>
                    </div>
                    <div class="bl-import">

                        <div class="bl-title">
                            <span>Nhập thông tin</span>
                            <span class="span-note">Các thông tin dấu <i class="i-red">*</i> là bắt buộc</span>
                        </div>
                        <form action="<?php echo $url; ?>" method="POST" id="formAgent" class="form-import-info" >

                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="usr">Địa chỉ <span style="color: red">*</span></label>
                                        <div>
                                            <input name="address" id="address" class="form-control" required data-msg="Địa chỉ không được để trống">
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="districtId">Quận <span style="color: red">*</span></label>
                                        <div>
                                            <select name="districtId" class="form-control" required data-msg="Không được để trống">
                                                <?php if(!empty($districts)){ ?>
                                                    <?php foreach ($districts as $item){  ?>
                                                        <option value="<?php echo $item->districtId ?>"><?php echo $item->districtName ?></option>
                                                    <?php } ?>
                                                <?php } ?>

                                            </select>
                                        </div>
                                    </div>
                                </div>


                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="floorSize">Diện tích ( m2 )<span style="color: red">*</span></label>
                                        <div>
                                            <input type="text" name="floorSize" class="form-control" id="floorSize" required data-msg="Diện tích không được để trống">
                                        </div>
                                    </div>
                                </div>


                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="price">Giá ( đồng )<span style="color: red">*</span></label>
                                        <div>
                                            <input  type="text" name="price" class="form-control" id="price" data-msg-number="Chỉ nhập số" required data-msg="Giá không được để trống">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="usr">Hình ảnh <span style="color: red">*</span> <span style="font-size: 12px; color: #666;">(Hình ảnh nhở hơn 5Mb)</span> </label>
                                        <div>
                                            <div class="dropzone" id="my-dropzone" name="myDropzone"></div>
                                            <div id="images">
                                                <input type="text" style="border: 0px; opacity: 0; width: 0px; height: 0px" id="photo" name="photos[]">
                                            </div>
                                            <style type="text/css">
                                                .item-error-upload-imgage{
                                                    color: #ba5858;
                                                    font-size: 11px;
                                                    text-align: center;
                                                    background-color: #fff;
                                                    box-shadow: 2px 3px 16px -12px #000;
                                                    border-radius: 3px;
                                                    padding: 10px;
                                                    border: 1px solid #eee;
                                                    margin-bottom: 5px;
                                                }
                                            </style>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="crawlerNote">Ghi chú</label>
                                        <div>
                                            <textarea rows="6" name="crawlerNote" class="form-control" id="crawlerNote"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12 text-center">
                                    <input type="submit" name="submit" class="btn btn-send" value="Gửi thông tin">
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
        <script type="text/javascript">
            $(document).ready(function() {
                var checkNunber = function(input, allowSeparator){
                    allowSeparator = (typeof allowSeparator !== 'undefined' ? allowSeparator : false);
                    var match = new RegExp("\\d","g");
                    if(allowSeparator)
                        match = new RegExp("\\d|\\"+allowSeparator,"g");
                    if($.isArray(input)) {
                        $.each(input,function(index,element) {
                            $(element).on('input', function () {
                                var text = $(this).val().match(match);
                                text = !!text ? text.join("") : "";
                                $(this).val(text);
                            });
                        });
                    }else{
                        console.log('Yêu cầu check số, Đầu vào phải là 1 mảng');
                    }
                }
                var checkUploadding = false;
                var uploadImage = Dropzone.options.myDropzone= {
                    url: "<?php echo $url ?>",
                    timeout:680000,
                    autoProcessQueue: true,
                    uploadMultiple: false,
                    parallelUploads: 20,
                    maxFiles: 20,
                    maxFilesize: 20,
                    renameFile: function (file) {
                        file.name = new Date().getTime() + '_' + file.name;
                    },
                    acceptedFiles: ".jpeg,.jpg,.png,.gif",
                    dictFileTooBig: 'Hình ảnh lớn hơn 20MB',
                    addRemoveLinks: true,
                    previewsContainer: null,
                    hiddenInputContainer: "body",
                    init: function() {
                        this.on("uploadprogress", function(file, progress, bytesSent) {
                            checkUploadding =true;
                            /* console.log("--------- uploadprogress-------------");*/
                        });
                        this.on("sending", function(file, xhr, formData) {
                            checkUploadding =true;
                            /* console.log("--------- sending-------------");*/
                        });
                        this.on("removedfile", function(file) {
                            $('.input-photo-send.'+file.upload.uuid).remove();
                            if($('#images').find('.input-photo-send').length==0){
                                $("#images").html('<input type="text" style="border: 0px; opacity: 0; width: 0px; height: 0px" name="photos[]" class="input-photo-send" id="photo">');
                            }
                        });
                        this.on("error", function(file,ms,xhr) {
                            console.log(file);
                            console.log(ms);
                            console.log(xhr);
                            $('#my-dropzone').append('<div onclick="this.remove(); return false;" class="dz-preview dz-image-preview dz-error dz-complete"><div class="dz-image item-error-upload-imgage">'+file.name+'<br> ('+ (file.size/(1024*1024)).toFixed(1) +' MB)<br> Tải lỗi, nhấp vào để loại bỏ hình</div></div>');
                            this.removeFile(file);
                        });
                        this.on("canceled", function(file,ms,xhr) {
                            console.log("--------- Canceled-------------");
                            console.log(file);
                        });
                        var key = 0;
                        this.on("success", function(file) {
                            console.log(file);
                            if(file.xhr.response!='null') {
                                $("#images").find("#photo").remove();
                                console.log(file.xhr.response);
                                var image = JSON.parse(file.xhr.response);
                                var data_img = JSON.stringify({
                                    'link': image.data.file_name,
                                    'caption': null,
                                    'isPrivate': false,
                                    'source': "props"
                                });
                                $("#images").append('<input type="text" style="border: 0px; opacity: 0; width: 0px; height: 0px" name="photos[]" value=\'' + data_img + '\' class="input-photo-send ' + file.upload.uuid + '">');
                                key++;

                            } else{
                                this.removeFile(file);
                                $('#my-dropzone').append('<div onclick="this.remove(); return false;" class="dz-preview dz-image-preview dz-error dz-complete"><div class="dz-image item-error-upload-imgage">'+file.name+'<br> ('+ (file.size/(1024*1024)).toFixed(1) +' MB) <br> Tải lỗi, nhấp vào để loại bỏ hình</div></div>');
                            }
                        });
                        this.on("complete", function(file) {
                            //console.log(file);
                            console.log('------------ Report -------------');
                            if(!file.accepted){
                                console.log('Error == name:' + file.name +", Size: " + file.size/(1024*1024)+'Mb, Status: '+file.status);
                            } else {
                                console.log('Success == Name:' + file.name +" Size: " + file.size/(1024*1024)+'Mb, Status: '+file.status);
                            }
                        });
                        this.on("queuecomplete", function() {
                            checkUploadding = false;
                        });
                    }
                };

                $('#price').mask("#.##0", {reverse: true});
                checkNunber(['#floorSize'],',');
                jQuery.validator.addMethod("images", function (value, element) {
                    console.log(checkUploadding);
                    if(checkUploadding){
                        alert('Chờ quá trình tải ảnh hoành thành mới được thực hiện tao tác gửi thông tin');
                    }
                    if(value.length==0 || checkUploadding)
                        return false;
                    return true;
                });
                $("#formAgent").validate({
                    rules: {
                        'photos[]': {images: true}
                    },
                    messages: {
                        'photos[]': {
                            images: "chưa tải ảnh xong, hoặc quá trình tải anh đã bị lỗi",
                        }
                    },
                    submitHandler: function(form) {
                        $(".btn-send").attr("disabled", true);
                        form.submit();
                    }
                });
            });
            var input = document.getElementById("address");
            var options_auto = {
                componentRestrictions: {country: 'vn'},
                language: 'vi',
            };
            var searchBox = new google.maps.places.Autocomplete(input,options_auto);

        </script>
    <?php }else{ ?>
        <div class="text-center" style="margin-top:200px; padding: 30px; box-shadow: 1px 1px 45px -22px #000; color: #fff; background-color: #03A9F4;">
            <h3>Thông tin đã được cập nhật thành công. Cảm ơn bạn đã gửi thông tin cho chúng tôi !</h3>
            <a  class="continue" href="<?php echo $url ?>">Tiếp tục gửi</a>
        </div>
    <?php } ?>
    </body>
    </html>
<?php } else { ?>
    <div style="text-align: center">Đã có sự nhầm lẫn</div>
<?php } ?>
