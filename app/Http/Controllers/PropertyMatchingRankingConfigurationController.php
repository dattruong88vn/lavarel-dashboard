<?php
namespace App\Http\Controllers;
use App\Task;
use DB;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use GuzzleHttp\Client;
use Session;
use View;
class PropertyMatchingRankingConfigurationController extends BaseController {
    public function __construct() {
        parent::__construct();
    }
    public function index() {
        return view("property-matching-ranking-configuration/index");
    }
    //get list
    public function getCriteriaList($screenId, $propId) {
        $data = get_json_search_listing(MATCHING . '/screen/'.$screenId.'/type/'.$propId);
        return json_encode($data);
    }
    //init
    public function getCriteriaItems($screenId, $propId) {
        $data = get_json_search_listing(MATCHING . '/setup/screen/'.$screenId.'/type/'.$propId);
        return json_encode($data);
    }
    
    public function saveCriteria() {
    }
    //get eachitem
    public function getCriteriaItem($code, $screenId, $propId) {
        $data = get_json_search_listing(MATCHING . '/screen/'.$screenId.'/type/'.$propId.'/factor/'. $code);
        return json_encode($data);
    }
    public function setCriteria($screenId, $propId) {
        $requestData = \Request::input();
        $result = post_json_search_listing(MATCHING . '/setup/screen/'.$screenId.'/type/'.$propId, $requestData);
        return json_encode($result);
    }
}
