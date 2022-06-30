<?php
Route::get('/exp', 'SpaController@index');
Route::get('/contract-management/{slug}', 'ContractManagementController@index');
Route::get('/contract-management/edit/{slug}', 'ContractManagementController@index');
