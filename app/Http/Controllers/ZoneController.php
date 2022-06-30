<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use GuzzleHttp\Client;
use Session;
use View;
use Intervention\Image\ImageManagerStatic as Image;
use Input;

class ZoneController extends BaseController {

    public function __construct() {
        parent::__construct();
    }

    public function getRegions() {
        $response = get_json(GET_REGIONS);
        return response()->json($response);
    }

    public function getCitiesByRegions() {
        $requestData = \Request::json()->all();
        $response = post_json(GET_CITIES_BY_REGIONS, $requestData);
        return response()->json($response);
    }

    public function getCites() {
        $response = get_json(GET_CITY_LIST);
        return response()->json($response);
    }

    /**
     * 
     * @param $requestData = {
     *            "regionIdsList": null,
     *            "cityIdsList": [1]
     * };
     * 
     */
    public function getDistrictsByCities() {
        $requestData = \Request::json()->all();
        $response = post_json(GET_DISTRICTS_BY_CITIES, $requestData);
        return response()->json($response);
    }

    /**
    * Api get districts by cites
    */
    public function getDistrictListByCity($id) {
        $response = get_json(GET_DISTRICT_LIST_BY_CITY . '/' . $id);
        return response()->json($response);
    }

    /**
     * 
     * @param int $id ward_id
     * @return json streets
     */
    public function getStreets($id) {

        if ($id == 'null') $id = 0;
        $response = get_json(GET_STREETS . "/$id");
        return response()->json($response);
    }

    /**
    * {
    *   "wardIdsList": [1,2]
    *  }
    */
    public function getStreetsByWardIds(){
        $postData = \Request::json()->all();
        // return response()->json($postData);
        $response = post_json('streets/list', $postData);
        return response()->json($response);
    }

    public function getWardsByRegions() {
        $postData = \Request::json()->all();
        $response = get_json('wards/list', $postData);
        return response()->json($response);
    }

    public function getWards($districtId) {
        if ($districtId == 'null') $districtId = 0;
        $wardList = get_json(GET_WARD_LIST . "/" . $districtId);
        return response()->json($wardList);
    }

    public function getDistrictByUser($userId) {
        if ($userId == 'null') $userId = 0;
        $districtList = get_json(sprintf(GET_DISTRICT_LIST_BY_USER, $userId));
        return response()->json($districtList);
    }

    public function getAlleyByStreet($streetId) {
        $request = \Request::all();
        $districtList = post_json('/alleys', [
            "cityId" =>  null,
            "districtId" => null,
            "wardId" => null,
            "streetId"=> isset($streetId) ? $streetId : null,
            "alleyName" => !empty($request['alleyName']) ? $request['alleyName'] : null,
        ]);
        return response()->json($districtList);

    }

    public function getDistrictsByDepartment() {
        $deparments = \Request::get('department');
        $districtList = post_json('/district/department', [
            'deparmentIds' => !empty($deparments) ? $deparments : ''
        ]);
        return response()->json($districtList);
    }

}
