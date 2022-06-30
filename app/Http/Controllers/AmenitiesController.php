<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Session;
use View;

class AmenitiesController extends BaseController {
    private $_API = [
        'get-amenities' => '/amenities/%d',
        'amenities' => '/amenities'
    ];
    public function __construct() {
        parent::__construct();
    }

    public function getAmenities($type=15) {
        $response = get_json(sprintf($this->_API['get-amenities'], $type));
        return response()->json($response);
    }
    
    public function getAroundAmenities($type = 16) {
        $response = get_json(sprintf($this->_API['get-amenities'], $type));
        return response()->json($response);
    }

    public function addAroundAmenities(Request $request) {
        $type = 16;
        $control = 'add_value_if_checked';
        $name = trim($request->get('name'));
        if (empty($name)) {
            return response()->json([
                'result' => 500,
                'message' => 'Tên tiện tích không được để trống'
            ]);
        } else {
            $response = post_json($this->_API['amenities'], ['name' => $name, 'control' => $control, 'type' => $type]);
            return response()->json($response);
        }
    }

}
