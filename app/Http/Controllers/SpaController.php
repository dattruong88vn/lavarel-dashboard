<?php

namespace App\Http\Controllers;

use function GuzzleHttp\json_decode;

class SpaController extends BaseController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function index()
    {
        $user = \Session::has("user") ? \Session::get("user") : null;
        $isAccessPermissionPage = false;
        for ($i = 0; $i < count($user->entities); $i++) {
            if ($user->entities[$i]->code == "pos_sa" && !empty($user->entities[$i]->features)) {
                $isAccessPermissionPage = true;
            }
        }
        if (!$isAccessPermissionPage) {
            abort(401);
        }
        return view("spa-main", ['user' => \Session::has("user") ? \Session::get("user") : null]);
    }

    public function baDashboard()
    {
        $user = \Session::has("user") ? \Session::get("user") : null; 
        $isAccessPermissionPage = false;
        for ($i = 0; $i < count($user->entities); $i++) {
            if ($user->entities[$i]->code == "deal" && !empty($user->entities[$i]->features)) {
                $isAccessPermissionPage = true;
            }
        }
        if (!$isAccessPermissionPage) {
            abort(401);
        }
        return view("spa-main", ['user' => \Session::has("user") ? \Session::get("user") : null]);
    }

    public function getCurrentUser()
    {
        $user = \Session::has("user") ? \Session::get("user") : null;
        return response()->json($user);
    }
}
