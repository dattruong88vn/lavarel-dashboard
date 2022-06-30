<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    public $fillable=["user_id","name","description","estimated_time","start_date","end_date"];
}
