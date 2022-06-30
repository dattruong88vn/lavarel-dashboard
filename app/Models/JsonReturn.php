<?php
namespace App\Models;

class JsonReturn {

    public function __construct() {
        if (!empty($result)) {
            $this->result = $result;
        }

        if (!empty($message)) {
            $this->message = $message;
        }

        if (!empty($code)) {
            $this->code = $code;
        }
    }

    public $result = true;
    public $message = "Thao tác thành công";
    public $data = null;
    public $code = 10000;

}
