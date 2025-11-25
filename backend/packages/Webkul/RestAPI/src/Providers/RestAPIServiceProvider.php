<?php

namespace Webkul\RestAPI\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Route;

class RestAPIServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        $this->loadMigrationsFrom(__DIR__ . '/../../database/migrations');
        
        $this->loadRoutesFrom(__DIR__ . '/../../routes/api.php');
        
        $this->loadTranslationsFrom(__DIR__ . '/../../lang', 'rest-api');
        
        $this->loadViewsFrom(__DIR__ . '/../../resources/views', 'rest-api');
        
        $this->publishes([
            __DIR__ . '/../../config/rest-api.php' => config_path('rest-api.php'),
        ], 'rest-api-config');
        
        $this->publishes([
            __DIR__ . '/../../resources/views' => resource_path('views/vendor/rest-api'),
        ], 'rest-api-views');
    }

    /**
     * Register services.
     */
    public function register(): void
    {
        $this->mergeConfigFrom(
            __DIR__ . '/../../config/rest-api.php', 'rest-api'
        );
    }
}
