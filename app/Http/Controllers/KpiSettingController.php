<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
// use App\Http\Requests;
// use App\Http\Input;
use App\Http\Controllers\BaseController;
use GuzzleHttp\Client;
use Session;
use View;
use Intervention\Image\ImageManagerStatic as Image;
use Input;
use Validator;
class KpiSettingController extends BaseController
{
	public function __construct()
	{
		parent::__construct();
	}
	public function index()
	{
		//return view("kpi-setting.kpi-ba");
		return view("kpi-setting.kpi-bsa");
	}
	public function kpiba()
	{
		return view("kpi-setting.kpi-ba");
	}
	public function kpibsa()
	{
		return view("kpi-setting.kpi-bsa");
	}
	public function getBsa()
	{
		$request = \Request::all();
		// $url = $request->fullUrlWithQuery(['apikey' => 'apikey']);
		$date = explode(" ", $request["date"]);
		$textSearch = $request["textSearch"];
		$month = explode("/", $date[1])[0];
		$year = explode("/", $date[1])[1];
		$request2 = array(
			'textSearch' => $textSearch ? $textSearch : '',
			'month' => $month,
			'year' => $year,
			'listingTypes' => $request["listingTypes"]
		);
		//offset
		//limit
		$resp = post_json("user/config-listing-kpi/" . $request['currentPage'] . "/10", $request2);
		return json_encode($resp);
	}
	public function getDetailBsa()
	{
		$request = \Request::all();
		$request2 = array(
			'userIds' => [$request["userIds"]],
			'configTime' => $request["configTime"],
		);
		//dd($request2);
		$resp = post_json("report/seller/kpi", $request2);
		return json_encode($resp);
	}
	public function getDetailBa()
	{
		$request = \Request::all();
		$request2 = array(
			'userIds' => [$request["userIds"]],
		);
		//dd($request2);
		$resp =  post_json("report/user-kpi-month-date-deal", $request2);
		return json_encode($resp);
		// $json = array (
		// 	'result' => true,
		// 	'code' => '200',
		// 	'message' => 'Thao tác thành công',
		// 	'validatedMessage' => NULL,
		// 	'data' => 
		// 	array (
		// 	  'numberDealConfig' => 120,
		// 	  'commissionConfig' => 11000000.0,
		// 	  'formatCommissionConfig' => '11 triệu',
		// 	  'totalDeal' => 7,
		// 	  'totalCommission' => 96040000.0,
		// 	  'formatTotalCommission' => '96,04 triệu',
		// 	  'sell' => 
		// 	  array (
		// 		'numberDeal' => 6,
		// 		'totalCommission' => 96000000.0,
		// 		'formatTotalCommission' => '96 triệu',
		// 		'numberDealPercent' => 0.05,
		// 		'totalCommissionPercent' => 8.727272727272727,
		// 	  ),
		// 	  'rent' => 
		// 	  array (
		// 		'numberDeal' => 1,
		// 		'totalCommission' => 40000.0,
		// 		'formatTotalCommission' => '40 ngàn',
		// 		'numberDealPercent' => 0.008333333333333333,
		// 		'totalCommissionPercent' => 0.0036363636363636364,
		// 	  ),
		// 	),
		// 	'additional' => NULL,
		// );
		// return json_encode($json);
	}
	public function getBa() {
		$request = \Request::all();
		$textSearch = $request["textSearch"];
		$date = explode(" ", $request["date"]);
		$month = explode("/", $date[1])[0];
		$year = explode("/", $date[1])[1];
		$request2 = array(
			'textSearch' => $textSearch ? $textSearch : '',
			'month' => $month,
			'year' => $year,
			'listingTypes' => $request["listingTypes"]
		);
		//offset
		//limit
		$resp = post_json("user/config-deal-kpi/".$request['currentPage']."/10", $request2);
		return json_encode($resp);
	}
	public function editBa() {
		$request = \Request::all();
		$date = explode(" ", $request["date"]);
		$month = explode("/", $date[1])[0];
		$year = explode("/", $date[1])[1];
		$request2 = array(
			'userId' => $request["userId"],
			'month' => $month,
			'year' => $year,
			'numberDeal' => str_replace(',', '', $request["numberDeal"]),
			'commission' => str_replace(',', '', $request["commission"])
		);
		$resp = post_json("user/config-deal-kpi/", $request2);
		return json_encode($resp);
	}
	public function editBsa() {
		$request = \Request::all();
		$date = explode(" ", $request["date"]);
		$month = explode("/", $date[1])[0];
		$year = explode("/", $date[1])[1];
		$request2 = array(
			'userId' => $request["userId"],
			'month' => $month,
			'year' => $year,
			'liveListingBalance' => str_replace(',', '', $request["liveListingBalance"]),
			'liveListingChurnOut' => str_replace(',', '', $request["liveListingChurnOut"]),
			'newLiveListingXL' => str_replace(',', '', $request["newLiveListingXL"]),
			'monetizeXL' => str_replace(',', '', $request["monetizeXL"]),
			'monetize' => str_replace(',', '', $request["monetize"])
		);
		$resp = post_json("user/config-listing-kpi/", $request2);
		return json_encode($resp);
	}
}
