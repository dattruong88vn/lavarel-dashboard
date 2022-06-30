<?php

namespace App\Http\Controllers;

class ContractManagementController extends BaseController {

    public function __construct(){
        parent::__construct();
    }

    public function index(){
        return view('contract-management.index');
    }
}