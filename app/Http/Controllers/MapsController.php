<?php

namespace App\Http\Controllers;

class MapsController extends BaseController {

    public function __construct() {
        parent::__construct();
    }

    public function index() {
        return view("maps");
    }
}
