<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use GuzzleHttp\Client;
use Session;
use View;
use Input;

class PriceTagController extends BaseController
{

    public function __construct()
    {
        parent::__construct();
    }

    public function addTagToListing()
    {
        $postData = \Request::json()->all();
        $response = post_json_pricetag(PRICE_TAG_LISTING_ADD, $postData);
        return response()->json($response);
    }

    public function getDefaultDisplayTag()
    {
        $response = get_json_pricetag(PRICE_TAG_DISPLAY_DEF);
        return response()->json($response);
    }

    public function getDisplayTagListing($rlistingId = '')
    {
        $str = PRICE_TAG_DISPLAY_LIST;
        if (strlen($str) > 0) {
            $str = str_replace('{rlistingId}', trim($rlistingId), $str);
        }
        $response = get_json_pricetag($str);
        return response()->json($response);
    }

    public function postTrackingTagListing()
    {
        $postData = \Request::json()->all();
        $response = post_json_pricetag(PRICE_TAG_TRACKING_LIST, $postData);
        return response()->json($response);
    }
}
