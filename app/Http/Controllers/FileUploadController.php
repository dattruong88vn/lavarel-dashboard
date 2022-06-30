<?php

namespace App\Http\Controllers;

use DB;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Input;

class FileUploadController extends BaseController{

    public function __construct() {
        parent::__construct();
    }

    /**
     * Upload Image via API
     *
     * @param Array $request
     * @return JSON $data
    */
    public function uploadFile(Request $request) {
      $type = $request->input('type') ? $request->input('type') : 'listing';

      // Get upload image
      $image = $request->file($request->input('upload_field'));

      // Upload image via API
      $uploadRs = uploadImageFilesUseApi($image, $type);

      return json_encode($data);
    }

    public function uploadDocument(Request $request) {
        $type = $request->input('type') ? $request->input('type') : 'document';

        $file = Input::file('file');
  
        $uploadRs = uploadFile($file, $type);
  
        return json_encode($uploadRs);
      }
}