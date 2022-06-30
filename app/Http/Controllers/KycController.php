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
use Carbon\Carbon;

/**
 * Đây là đầu vào cho ứng dụng KYC. Đừng có ai code trong controller này.
 */
class KycController extends BaseController {

    public function __construct() {
        parent::__construct();
    }

    private function renderSPAView(){
        return view("kyc.index");
    }

    public function index($slug=""){
        return $this->renderSPAView();
    }
}