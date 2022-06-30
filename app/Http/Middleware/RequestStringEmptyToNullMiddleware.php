<?php

namespace App\Http\Middleware;

use Closure;
use Session;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Requests;
use View;

class RequestStringEmptyToNullMiddleware {

    /**
     * Run the request filter.
     * trim all request input string and if it is empty then will convert it to null
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next) {

        $input = $request->all();
        if ($input) {
            array_walk_recursive($input, function (&$item, $key) {
                if (is_string($item)) {
                    $item = trim($item);
                    $item =  $item == "" ? null : $item;
                }
            });
            $request->merge($input);
        }
        return $next($request);
    }

}
