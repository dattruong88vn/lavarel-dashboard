<?php

namespace App\Http\Controllers;

use App\Option;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use \Illuminate\Database\Eloquent\ModelNotFoundException;
use View;

class OptionController extends BaseController {

    private $config = null;

    public function __construct() {
        parent::__construct();

        try {
            $option = Option::where('name', 'dashboard_config')->first();
            if (isset($option) && $option != NULL) {
                $this->config = json_decode($option->value);
            }
        } catch (\Exception $ex) {
            
        }
    }

    public function getDashBoardStatitics() {
        $option = null;
        if (\Request::session()->has('user')) {
            try {
                $data['remainingListing'] = get_json(GET_REMAINING_LISTING);
                $date = date('y-m-d H:i:s');
                try {
                    $option = Option::whereRaw("DATE(created_at)='" . date('Y-m-d') . "' AND name='statitics' ")->firstOrFail();
                } catch (ModelNotFoundException $ex) {
                    $option = new Option();
                }
                $option->name = "statitics";
                $option->value = json_encode($data);
                $option->updated_at = date('Y-m-d H:i:s');
                if (!isset($option->created_at)) {
                    $option->created_at = $option->updated_at;
                }
                $option->save();
            } catch (\Exception $ex) {
                
            }
        }
        return response()->json($option);
    }

    public function showLatestDashBoardStatitics() {
        $status = 'success';
        try {
            if (\Request::session()->has('user')) {
                $options = Option::where('name', '=', 'statitics')->orderBy('created_at', 'desc')->take($this->config->latest_statitics_count)->get();
                $statitics = [];
                foreach ($options as $op) {
                    $item = json_decode($op->value);
                    $item->createdDate = date('Y-m-d', strtotime($op->created_at . ''));
                    $statitics[] = $item;
                }
                $data['statitics'] = $statitics;
            } else {
                $status = 'unauthorized';
            }
            $data['status'] = $status;
            return response()->json($data);
        } catch (\Exception $ex) {
            
        }
    }

    public function getEveryDayListingCount() {

        $option = null;
        if (\Session::has('user')) {
            try {
                $response = get_json(GET_LISTING_COUNT);
                //return response()->json($response);
                $count = $response->data->value;
                $date = date('y-m-d H:i:s');
                try {
                    $option = Option::whereRaw("DATE(created_at)='" . date('Y-m-d') . "' AND name='everyday_listing_count' ")->firstOrFail();
                } catch (ModelNotFoundException $ex) {
                    $option = new Option();
                }
                $option->name = "everyday_listing_count";
                $option->value = $count;
                $option->updated_at = date('Y-m-d H:i:s');
                if (!isset($option->created_at)) {
                    $option->created_at = $option->updated_at;
                }
                $option->save();
            } catch (\Exception $ex) {
                
            }
        }
        return response()->json($option);
    }

    public function showEverydayListingCount() {
        $status = 'success';
        $data = NULL;
        if (\Session::has('user')) {
            try {
                $options = Option::where('name', '=', 'everyday_listing_count')->orderBy('created_at', 'desc')->take($this->config->latest_listing_statitics_count)->get();
                foreach ($options as $op) {
                    $op->createdDate = date('Y-m-d', strtotime($op->created_at));
                }
                $data['items'] = $options;
            } catch (\Exception $ex) {
                
            }
        } else {
            $status = 'unauthorized';
        }
        $data['status'] = $status;
        return response()->json($data);
    }

    public function configDashBoard() {
        $option = Option::where('name', '=', 'dashboard_config')->first();
        if ($option == NULL) {
            $option = new Option();
        }
        if (\Request::isMethod('POST')) {
            $postedData = $request->input();
            unset($postedData['_token']);
            $option->name = 'dashboard_config';
            $option->value = json_encode($postedData);
            $option->updated_at = date('Y-m-d H:i:s');
            if (!isset($option->created_at)) {
                $option->created_at = $option->updated_at;
            }
            $option->save();
        }
        $data['item'] = json_decode($option->value);
        return view('option.configDashboard')->with($data);
    }

}
