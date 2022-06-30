<?php

namespace App\Http\Controllers;

class CalendarTaskController extends BaseController {

    public function __construct() {
        parent::__construct();
    }

    public function index() {
        return view("calendar-task");
    }
    public function detail() {
        return view("calendar-task");
    }
}
