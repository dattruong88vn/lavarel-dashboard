<?php
	if (strpos($_SERVER['SERVER_PORT'], "8787") > -1) {
		define('GG_KEY', 'AIzaSyD2mFGqxpEhKmZ7ZmwD4lzePXLiCtMqBYE');
		define('UPLOAD_URL', 'http://10.158.14.20:7777/');
		//define('BASE_API', 'http://124.158.14.30:8080/dashboardcrm/api/'); // server crm sprint 2
		// define('BASE_API', 'http://10.158.14.20:8080/dashboard/api/'); // server develop
		define('BASE_API', 'http://10.158.14.20:8080/dashboard/api/');
		define('BASE_WEB_SOCKET_API', 'http://45.117.162.60:8080/dashboard/api/'); // server develop
		//define('BASE_API', 'http://124.158.14.30:8080/dashboardcrmv2/api/');
		// define('BASE_API', 'http://124.158.14.32:8080/dashboardv2/api/');
//		define('BASE_WEB_SOCKET_API', 'http://45.117.162.49:8080/dashboard/api/');
        define('FILE_UPLOAD_API', 'http://45.117.162.49:8080/file/api/');
		define('BASE_UPLOAD_API', 'http://45.117.162.60:8080/file/api/'); // upload image
		define('UPLOAD_PATH', __DIR__ . '/../public/media_test/');
		define('PRODUCT_URL', 'http://10.158.14.20/');
		define('SITE_URL', 'http://10.158.14.20:8787/');
		define('SMS_LISTING_URL', 'http://10.158.14.20:8787/listing-sms/');
		// define('AGENT_SITE_URL', 'http://45.117.162.49:9999/');
		define('AGENT_SITE_URL', 'https://dev.propzy.vn/');
		define('CRAWLER_API', 'http://10.158.14.19:8060/v1/');

		//define('BASE_API', 'http://112.213.94.242:8080/dashboard_test/api/');		
	} else if (strpos($_SERVER['SERVER_ADDR'], "10.158.14.18") > -1 || strpos($_SERVER['SERVER_ADDR'], "10.158.14.34") > -1) {
		// 45.117.162.49 laravel dev trên con .18 nhưng service chạy trên con .20 (public 60)
		define('GG_KEY', 'AIzaSyD2mFGqxpEhKmZ7ZmwD4lzePXLiCtMqBYE');
        define('UPLOAD_URL', 'http://45.117.162.49:7777/');
        define('UPLOAD_URL_PRIVATE', 'http://10.158.14.18:7777/');
		define('BASE_API', 'http://45.117.162.60:8080/dashboard/api/'); // server develop
		define('BASE_API_EXPORT', 'http://45.117.162.60:8080/dashboard/api/');		        
        define('BASE_SAM_API', 'http://45.117.162.60:8080/sam/api/');
        define('BASE_WEB_SOCKET_API', 'http://45.117.162.60:8080/dashboard/api/'); // server develop
        define('FILE_UPLOAD_API', 'http://45.117.162.49:8080/file/api/');
        define('BASE_UPLOAD_API', 'http://45.117.162.49:8080/file/api/'); // upload image
        define('UPLOAD_PATH', __DIR__ . '/../public/media_test/');
        define('PRODUCT_URL', 'http://10.158.14.20/');
        define('SITE_URL', 'http://10.158.14.20:8888/');
        define('SMS_LISTING_URL', 'http://10.158.14.20:8888/listing-sms/');
        define('AGENT_SITE_URL', 'http://dev.propzy.vn/');
		define('CRAWLER_API', 'http://10.158.14.34:8060/v1/');
        //define('BASE_API', 'http://112.213.94.242:8080/dashboard_test/api/');
	} else if (strpos($_SERVER['SERVER_ADDR'], "10.158.14.19") > -1) {
        // chạy trên con server 45.117.162.50 -> staging
		// php run on 50, service run on 39
		define('GG_KEY', 'AIzaSyD2mFGqxpEhKmZ7ZmwD4lzePXLiCtMqBYE');
		define('UPLOAD_URL', 'http://45.117.162.50:7777/');
        define('UPLOAD_URL_PRIVATE', 'http://10.158.14.19:7777/');
		// define('BASE_API', 'http://10.158.14.43:8080/dashboarduserrole/api/');
		define('BASE_API', 'http://45.117.162.39:8080/dashboard/api/');	
		define('BASE_API_EXPORT', 'http://45.117.162.39:8080/dashboard/api/');		        
        define('BASE_SAM_API', 'http://45.117.162.39:8080/sam/api/');
		//define('BASE_API', 'http://45.117.162.60:8080/dashboardstagingclosedeal/api/'); 
		// define('BASE_WEB_SOCKET_API', 'http://45.117.162.39:8080/dashboard/api/');
		define('BASE_WEB_SOCKET_API', 'http://10.158.14.43:8080/dashboard/api/');
		// define('BASE_UPLOAD_API', 'http://45.117.162.50:8080/file/api/');
		// define('FILE_UPLOAD_API', 'http://45.117.162.50:8080/file/api/');
		define('BASE_UPLOAD_API', 'http://cdn.propzy.vn:9090/file/api/');
		define('FILE_UPLOAD_API', 'http://cdn.propzy.vn:9090/file/api/');
		define('UPLOAD_PATH', __DIR__ . '/../public/media_test/');
		define('PRODUCT_URL', 'http://10.158.14.43/');
		define('SITE_URL', 'http://10.158.14.43:8787/');
		define('SMS_LISTING_URL', 'http://10.158.14.39:8787/listing-sms/');
		// define('AGENT_SITE_URL', 'http://45.117.162.50:9999/');
		define('AGENT_SITE_URL', 'https://test.propzy.vn/');
		// define('CRAWLER_API', 'http://10.158.14.20:8060/v1/');
		define('CRAWLER_API', 'http://10.158.14.34:8060/v1/');
	}  else if (strpos($_SERVER['SERVER_NAME'], "localhost") > -1 || strpos($_SERVER['SERVER_NAME'], "192.168.1") > -1 || strpos($_SERVER['SERVER_NAME'], ".dev") > -1 || strpos($_SERVER['SERVER_NAME'], ".local") > -1) {

		// trỏ config vô server dev

/*         define('UPLOAD_URL', 'http://45.117.162.49:7777/');
		define('UPLOAD_URL_PRIVATE', 'http://45.117.162.49:7777/');
         define('UPLOAD_PATH', '/var/www/html/media/');
         define('BASE_API', 'http://45.117.162.60:8080/dashboard/api/');
         // define('BASE_API', 'http://45.117.162.49:8080/dashboard/api/');
         define('BASE_WEB_SOCKET_API', 'http://45.117.162.60:8080/dashboard/api/');

        define('FILE_UPLOAD_API', 'http://45.117.162.49:8080/file/api/');
         // upload image
         define('BASE_UPLOAD_API', 'http://45.117.162.49:8080/file/api/');

         define('SITE_URL', 'http://45.117.162.60:8888/');
         define('SMS_LISTING_URL', 'http://45.117.162.60:8888/listing-sms/');
         //define('BASE_API', 'localhost:8080/dashboard_test_v2/api/');
         define('PRODUCT_URL', 'http://45.117.162.60/');
         define('AGENT_SITE_URL', 'http://45.117.162.60:9999/');
		define('CRAWLER_API', 'http://45.117.162.50:8060/v1/');
*/
//		-----------------------------------------
//--------------------------------------------------------------
		// trỏ config vô server stagin
		define('GG_KEY', 'AIzaSyD2mFGqxpEhKmZ7ZmwD4lzePXLiCtMqBYE');
        define('UPLOAD_URL', 'http://45.117.162.50:7777/');
        define('UPLOAD_URL_PRIVATE', 'http://45.117.162.50:7777/');
        define('UPLOAD_PATH', '/var/www/html/media/');
		define('BASE_API', 'http://45.117.162.39:8080/dashboard/api/'); // server develop
		define('BASE_API_EXPORT', 'http://45.117.162.39:8080/dashboard/api/');
        //define('BASE_API', 'http://45.117.162.39:8080/dashboardtimecounter/api/'); // server develop time counter sale site
        define('BASE_SAM_API', 'http://45.117.162.60:8080/sam/api/');
        define('BASE_WEB_SOCKET_API', 'http://45.117.162.39:8080/dashboard/api/'); // server develop
		// Upload file
		define('FILE_UPLOAD_API', 'http://45.117.162.50:8080/file/api/');

//        // upload image
        define('BASE_UPLOAD_API', 'http://45.117.162.50:8080/file/api/');

        define('SITE_URL', 'http://45.117.162.39:8888/');
        define('SMS_LISTING_URL', 'http://45.117.162.39:8888/listing-sms/');
        //define('BASE_API', 'localhost:8080/dashboard_test_v2/api/');
        define('PRODUCT_URL', 'http://45.117.162.39/');
        define('AGENT_SITE_URL', 'https://test.propzy.vn/');
		define('CRAWLER_API', 'http://45.117.162.49:8060/v1/');
//		-----------------------------------------
	} else {
		// var_dump("ASE_API"); die();
		define('GG_KEY', 'AIzaSyAWo3Ezy6Me2RoefB0dhy1NKLW3HiY7PLM');
		define('UPLOAD_URL', 'https://cdn.propzy.vn/');
        define('UPLOAD_URL_PRIVATE', 'https://cdn.propzy.vn/');
		define('UPLOAD_PATH', '/var/www/html/media/');

		// define('BASE_API', 'http://10.158.14.15:9090/dashboard/api/'); //10.158.14.13  
		define('BASE_API', 'http://10.158.14.46:9090/dashboard/api/'); //10.158.14.13
		define('BASE_API_EXPORT', 'http://10.158.14.15:9090/dashboard/api/'); //10.158.14.13 
        define('BASE_SAM_API', 'http://10.158.14.13:9090/sam/api/');

		define('BASE_WEB_SOCKET_API', 'https://dashboardws.propzy.vn:8443/dashboard/api/');
		// upload image
		define('BASE_UPLOAD_API', 'https://cdn.propzy.vn:8443/file/api/');
        define('FILE_UPLOAD_API', 'https://cdn.propzy.vn:8443/file/api/');

		define('PRODUCT_URL', 'http://propzy.vn/');
		define('SITE_URL', 'https://dashboard.propzy.vn/');
		define('SMS_LISTING_URL', 'https://listingsms.propzy.vn/');
		// define('AGENT_SITE_URL', 'http://agents.propzy.vn/');
		define('AGENT_SITE_URL', 'https://propzy.vn/');
		define('CRAWLER_API', 'http://10.158.14.11:8060/v1/'); //45.117.162.46
	}


$source = BASE_API;
// echo BASE_API; die;
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL,$source."/relatelisting/list/listing-by-code/".$_GET['id']);
// curl_setopt($ch, CURLOPT_POST, 1);
// curl_setopt($ch, CURLOPT_POSTFIELDS,
            // "postvar1=value1&postvar2=value2&postvar3=value3");

// in real life you should use something like:
// curl_setopt($ch, CURLOPT_POSTFIELDS, 
//          http_build_query(array('postvar1' => 'value1')));

// receive server response ...
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec ($ch);

curl_close ($ch);

$response = json_decode($response);
if(isset($response->result) && $response->result != null){
  $data = $response->data;
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Show listing</title>
                <!-- Latest compiled and minified CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
        <link href="./dist/css/lightgallery.css" rel="stylesheet">
        <meta name="robots" content="noindex">
        <meta name="googlebot" content="noindex">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style type="text/css">
            body{
                background-color: #dedede;
            }
            .demo-gallery > ul {
              margin-bottom: 0;
              text-align: center;
            }
            .demo-gallery > ul > li {
              padding: 0px;
                float: none;
                margin-bottom: 15px;
                _margin-right: 20px;
                width: 170px;
                display: inline-block;
            }
            .demo-gallery > ul > li a {
              border: 3px solid #FFF;
              border-radius: 3px;
              display: block;
              overflow: hidden;
              position: relative;
              float: left;
            }
            .demo-gallery > ul > li a > img {
              -webkit-transition: -webkit-transform 0.15s ease 0s;
              -moz-transition: -moz-transform 0.15s ease 0s;
              -o-transition: -o-transform 0.15s ease 0s;
              transition: transform 0.15s ease 0s;
              -webkit-transform: scale3d(1, 1, 1);
              transform: scale3d(1, 1, 1);
              height: 100%;
              width: 100%;
            }
            .demo-gallery > ul > li a:hover > img {
              -webkit-transform: scale3d(1.1, 1.1, 1.1);
              transform: scale3d(1.1, 1.1, 1.1);
            }
            .demo-gallery > ul > li a:hover .demo-gallery-poster > img {
              opacity: 1;
            }
            .demo-gallery > ul > li a .demo-gallery-poster {
              background-color: rgba(0, 0, 0, 0.1);
              bottom: 0;
              left: 0;
              position: absolute;
              right: 0;
              top: 0;
              -webkit-transition: background-color 0.15s ease 0s;
              -o-transition: background-color 0.15s ease 0s;
              transition: background-color 0.15s ease 0s;
            }
            .demo-gallery > ul > li a .demo-gallery-poster > img {
              left: 50%;
              margin-left: -10px;
              margin-top: -10px;
              opacity: 0;
              position: absolute;
              top: 50%;
              -webkit-transition: opacity 0.3s ease 0s;
              -o-transition: opacity 0.3s ease 0s;
              transition: opacity 0.3s ease 0s;
            }
            .demo-gallery > ul > li a:hover .demo-gallery-poster {
              background-color: rgba(0, 0, 0, 0.5);
            }
            .demo-gallery .justified-gallery > a > img {
              -webkit-transition: -webkit-transform 0.15s ease 0s;
              -moz-transition: -moz-transform 0.15s ease 0s;
              -o-transition: -o-transform 0.15s ease 0s;
              transition: transform 0.15s ease 0s;
              -webkit-transform: scale3d(1, 1, 1);
              transform: scale3d(1, 1, 1);
              height: 100%;
              width: 100%;
            }
            .demo-gallery .justified-gallery > a:hover > img {
              -webkit-transform: scale3d(1.1, 1.1, 1.1);
              transform: scale3d(1.1, 1.1, 1.1);
            }
            .demo-gallery .justified-gallery > a:hover .demo-gallery-poster > img {
              opacity: 1;
            }
            .demo-gallery .justified-gallery > a .demo-gallery-poster {
              background-color: rgba(0, 0, 0, 0.1);
              bottom: 0;
              left: 0;
              position: absolute;
              right: 0;
              top: 0;
              -webkit-transition: background-color 0.15s ease 0s;
              -o-transition: background-color 0.15s ease 0s;
              transition: background-color 0.15s ease 0s;
            }
            .demo-gallery .justified-gallery > a .demo-gallery-poster > img {
              left: 50%;
              margin-left: -10px;
              margin-top: -10px;
              opacity: 0;
              position: absolute;
              top: 50%;
              -webkit-transition: opacity 0.3s ease 0s;
              -o-transition: opacity 0.3s ease 0s;
              transition: opacity 0.3s ease 0s;
            }
            .demo-gallery .justified-gallery > a:hover .demo-gallery-poster {
              background-color: rgba(0, 0, 0, 0.5);
            }
            .demo-gallery .video .demo-gallery-poster img {
              height: 48px;
              margin-left: -24px;
              margin-top: -24px;
              opacity: 0.8;
              width: 48px;
            }
            .demo-gallery.dark > ul > li a {
              border: 3px solid #04070a;
            }
            .home .demo-gallery {
              padding-bottom: 80px;
            }
            .carousel-inner>.item>a>img, .carousel-inner>.item>img, .img-responsive, .thumbnail a>img, .thumbnail>img{height: 190px !important;
                      width: 100%;
                      object-fit: cover;}
            .lg-outer .lg-thumb-item.active, .lg-outer .lg-thumb-item:hover{border-color: blue;}
        </style>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
    </head>
    <body class="home">
        <div class="container">
          <div class="row">
            <div style="text-align: center; padding: 20px 0px 10px;">
              <img src="/images/logo-propzy.png">
            </div>
            <!-- <div style="background-color:#f6f6f6;">
              <h5 style="background-color: #173e69; color: #fffefe; padding: 5px;">Các khu vực đang “hot” có thể bạn quan tâm</h5>
              <h5 style="padding: 10px 100px 10px 0px;"><img style="" src="https://propzy.vn/assets/images/icons/favicon.ico"> Propzy sở hữu cổng thông tin bất động sản chất lượng và được thẩm định đầy đủ, cung cấp cho khách hàng đa dạng sản phẩm để lựa chọn tại các khu vực đang “hot” trên thị trường</h5>
            </div> -->
            <div class="demo-gallery">
                <?php foreach ($data as $key => $listing) {
                ?>
                <h4 style="text-align: center;background-color: #202831; color: #fffefe; padding: 5px;">#<?php echo $listing->rlistingId; ?> - <?php echo $listing->title; ?> <a href="<?php echo $listing->link; ?>"> Bấm để xem chi tiết</a></h4>
                <ul  class="lightgallery list-unstyled row">
                    <?php foreach($listing->photos as $item) {?>
                    <li class="col-xs-6 col-sm-4 col-md-3" data-responsive="<?php echo $item->link; ?>" data-src="<?php echo $item->link; ?>" data-sub-html="<?php echo $item->caption; ?>"><!-- RENDER HTML  -->
                        <a href="">
                            <img onerror='imgError(this);' class="img-responsive" src="<?php echo $item->link; ?>">
                        </a>
                    </li>
                    <?php } ?>
                    
                </ul>
                <?php } ?>
                
                <div style="background-color: #202831; color: #fffefe; padding: 5px; text-align: center;">
                  <h3>CÔNG TY TNHH PROPZY VIỆT NAM</h3>
                  <p>Tầng 4, tòa nhà Flemington, 182 Lê Đại Hành, Phường 15, Quận 11, TP. Hồ Chí Minh</p>
                  <p>Hotline: <a href="tel:02873066099" itemprop="telephone">(028) 73 066 099</a> Email: <a class="mailto" href="mailto:vietnam@propzy.com?Subject=Liên hệ" itemprop="email">vietnam@propzy.com</a></p>
                </div>
            </div>
          </div>
        </div>
        <script type="text/javascript">
          function imgError(image){
              $(image).attr('src','/images/404image.webp');
              var parent = $(image).parents('li');
              $(parent).attr('data-responsive','/images/404image.webp');
              $(parent).attr('data-src','/images/404image.webp');
              // image.style.display = 'none';
          }
        $(document).ready(function(){
            $('.lightgallery').lightGallery();
        });
        </script>
        <script src="https://cdn.jsdelivr.net/picturefill/2.3.1/picturefill.min.js"></script>
        <script src="./dist/js/lightgallery-all.min.js"></script>
        <script src="./lib/jquery.mousewheel.min.js"></script>
    </body>
</html>
<?php }else{ ?>
  <input type="hidden" name="baseApi" value="<?php echo BASE_API; ?>">
  <h2 style="text-align: center;">Trang này hiện không khả dụng !!</h2>
 <?php } ?>