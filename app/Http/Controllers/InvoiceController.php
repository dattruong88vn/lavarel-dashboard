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

class InvoiceController extends BaseController {

  public function __construct() {
      parent::__construct();
    
  }

  public function create() {
    return view('invoice.create');
  }

}
