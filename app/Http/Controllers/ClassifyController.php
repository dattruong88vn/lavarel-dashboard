<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use GuzzleHttp\Client;
use Session;
use View;
use Input;

class ClassifyController extends BaseController {

    public function __construct() {
        parent::__construct();
    }

    public function importDealHml(){
        return view("classify/import-deal-html");
    }

}
