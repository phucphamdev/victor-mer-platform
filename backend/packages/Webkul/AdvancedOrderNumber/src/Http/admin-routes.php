<?php
use WebbyTroops\AdvancedOrderNumber\Http\Controllers\Admin\ResetController;

Route::group(['middleware' => ['web', 'admin']], function () {
    Route::get('/wt/reset-counter', [ResetController::class, 'resetCounter']);
});