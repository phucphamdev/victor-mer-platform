<?php

use Illuminate\Support\Facades\Route;
use Webkul\VictorMer\Http\Controllers\Api\SiteSettingApiController;

Route::group(['prefix' => 'api/v1', 'middleware' => ['api']], function () {
    Route::prefix('site-settings')->group(function () {
        /**
         * Public API endpoints for frontend
         */
        Route::get('general', [SiteSettingApiController::class, 'general']);
        Route::get('seo', [SiteSettingApiController::class, 'seo']);
        Route::get('all', [SiteSettingApiController::class, 'all']);
        Route::get('contact', [SiteSettingApiController::class, 'contact']);
        Route::get('branding', [SiteSettingApiController::class, 'branding']);
        Route::get('tracking', [SiteSettingApiController::class, 'tracking']);
    });
});
