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
class FeatureController extends BaseController
{
    
    public function __construct()
    {
        parent::__construct();
    }

    public function checkListings() {
        return view('features.listing-available');
    }
    
}


