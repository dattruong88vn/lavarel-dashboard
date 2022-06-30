<?php
namespace App\Lib\Facade;

use Illuminate\Support\Facades\Facade;

class ImageLibFacade extends Facade
{
	protected static function getFacadeAccessor()
	{
		return 'imageLib';
	}
}