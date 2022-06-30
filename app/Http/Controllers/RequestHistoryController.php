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
use Storage;

class RequestHistoryController extends BaseController {
	public function __construct() {
	    parent::__construct();
	    //
	}

	public function index($requestId){
		
		$viewData = ['type' => 'REQUEST', 'id' => $requestId];
		return View::make('deal-history.indexv2')->with($viewData);
	}

	
}