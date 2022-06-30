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

class SaleFunelSettingController extends BaseController {

	public function __construct() {
        parent::__construct();
        date_default_timezone_set('Asia/Ho_Chi_Minh');
    }

    public function index(){
        $data["num_ba_active"] = get_json('/report/ba/active')->data;
        $data["list_ba_active"] = get_json('/report/ba/target/active')->data;
        //var_dump(get_json('/report/ba/target/active')); die();
    	return view('sale-funel-setting')->with($data);
    }

    public function storeSetting(){

    	$requestData = \Request::input();
    	// return (float) str_replace(',','',$requestData['target']);
        $target = (float) str_replace(',','',$requestData['target']);

        $from_month = $requestData['from-month'];
        // return "01/".$from_month;
    	$from_month = strtotime("01-".$from_month);
        $from_month = $from_month*1000;

        $to_month = $requestData['to-month'];

        $lastday = CrmDashboardController::days_in_month(explode('-', $to_month)[0],explode('-', $to_month)[1]);
        // return $lastday."/".$to_month;
    	$to_month = strtotime("26-".$to_month);
        $to_month = $to_month*1000;

		$dataPost = (object) ['value' => $target, 'fromDate' => $from_month, 'toDate' => $to_month];
		// return response()->json($dataPost);
		$result = post_json('report/ba/target', $dataPost);
		if($result->result){
			return redirect()->to($this->getRedirectUrl())->with('status', 'Thiết lập target thành công!')->withInput();
		}else{
			return redirect()->to($this->getRedirectUrl())->with('status', 'Opps!')->withInput();;
		}
    	// return response()->json();
    }
}