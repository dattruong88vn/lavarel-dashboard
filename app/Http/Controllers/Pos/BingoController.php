<?php

namespace App\Http\Controllers\Pos;

use Illuminate\Http\Request;
use App\Http\Requests;
// use App\Http\Input;
use App\Http\Controllers\BaseController;
use GuzzleHttp\Client;
use Session;
use View;
use Intervention\Image\ImageManagerStatic as Image;
use Input;
use Validator;

class BingoController extends CommonPosController
{

	private $api = [
		'loadDistrictIdListByHCMArea' => 'district/list/area',
		'loadBingoReportData' => 'report/get-bingo-report',
		'getExport' => 'report/generate-excel-bingo'
	];

	public function __construct()
	{
		parent::__construct();
	}

	public function index()
	{
		return view("pos.bingo.index");
	}

	public function loadDistrictIdListByHCMArea()
	{
		$response = get_json($this->api['loadDistrictIdListByHCMArea'] . '/1');

		return response()->json($response);
	}

	public function loadBingoReportData()
	{
		$requestData = \Request::json()->all();

		$response = post_json($this->api['loadBingoReportData'], $requestData);

		return response()->json($response);
	}

	public function getExport()
	{
		$requestData = \Request::json()->all();

		$response = post_json($this->api['getExport'], $requestData);

		return response()->json($response);
	}

}
