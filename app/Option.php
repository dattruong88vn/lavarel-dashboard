<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Option extends Model
{
    public $fillable = ['name','value','created_at','updated_at'];
}
