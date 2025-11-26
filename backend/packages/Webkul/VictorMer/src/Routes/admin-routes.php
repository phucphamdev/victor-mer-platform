<?php

use Illuminate\Support\Facades\Route;
use Webkul\VictorMer\Http\Controllers\VictorMerController;

Route::group(['middleware' => ['admin'], 'prefix' => config('app.admin_url')], function () {
    Route::controller(VictorMerController::class)->prefix('victor-mer/{slug?}/{slug2?}')->group(function () {
        Route::get('', 'index')->name('admin.victor_mer.index');
        Route::post('', 'store')->name('admin.victor_mer.store');
        Route::get('statistics', 'statistics')->name('admin.victor_mer.statistics');
    });
});
