<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
// use App\Http\Input;
use App\Http\Controllers\Controller;
use GuzzleHttp\Client;
use Session;
use View;
use Intervention\Image\ImageManagerStatic as Image;
use Input;
use App\Libraries\CacheManager;

class TestAppController extends BaseController {

    public function __construct() {
        parent::__construct();
    }

    public function Index() {
        $config_cache['cache_path'] = '/var/www/html/cache/';
        $cache = new CacheManager($config_cache);
        $cache->set('1', array(
            'a' => 'b',
            'b' => 'c'
        ));
        $data = $cache->get('1');
        /*
         * Xóa cache listing.
         */
        $cache->delete_by_tag('listing_' . $listing_id);
        var_dump($data);
    }
    
    public function phoneCall(){
        return view("test-app/call");
    }

    public function formDataToJson(){
        $requestData = \Request::input();
        return response()->json($requestData);
    }

    public function react(){
        return view("test-app/react");
    }

}
