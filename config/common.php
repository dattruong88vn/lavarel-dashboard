<?php

namespace App;

class Common
{

    /**
     * TO-DO: Clean up code
     * Upload image
     *
     * @return array list of file names
     */
    public static function uploadImage()
    {
        $fileNames = [];
        try {
            foreach ($_FILES['photos']['name'] as $key => $value) {
                $sourcePath = $_FILES['photos']['tmp_name'][$key];
                $fileId = md5(mt_rand(10, 100) . time()) . '_image';
                $path = pathinfo($_FILES['photos']['name'][$key], PATHINFO_EXTENSION);
                $filename = $fileId . '.' . $path;

                $targetPath = UPLOAD_PATH . "images/" . $filename; // Target path 
                if (move_uploaded_file($sourcePath, $targetPath)) {
                    // Moving Uploaded file
                    array_push($fileNames, UPLOAD_URL . "images/" . $filename);
                } else {
                    // In case error
                    array_push($fileNames, $_FILES['photos']['error']);
                }
            }
            return $fileNames;
        } catch (\Exception $e) {
            return $e->getMessage;
        }
    }

    /**
     * Decode JWT to an Array contain information of user: ['name' => 'viet vo', 'iss' => 'example']
     * @return array
     */
    public static function decodeJwt($jwtCode)
    {
        if (empty($jwtCode)) {
            return [
                'name' => '',
                'iss' => ''
            ];
        }
        $array = explode('.', $jwtCode);
        if (count($array) < 2) {
            return  [
                'name' => '',
                'iss' => ''
            ];
        }
        return json_decode(base64_decode(str_replace('_', '/', str_replace('-', '+', $array[1]))), true);
    }
}
