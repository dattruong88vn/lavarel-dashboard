<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Lib\ImageLib;

class ImageLibServiceProvider extends ServiceProvider
{
	/**
	 * Bootstrap the application services.
	 *
	 * @return void
	 */
	public function boot()
	{
		//
	}

	/**
	 * Register the application services.
	 *
	 * @return void
	 */
	public function register()
	{
		$this->app->singleton('imageLib', function () {
			return new ImageLib();
		});
	}
}