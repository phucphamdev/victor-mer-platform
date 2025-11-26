<?php

namespace Webkul\VictorMer\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Event;

class VictorMerServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        $this->loadMigrationsFrom(__DIR__ . '/../Database/Migrations');

        $this->loadRoutesFrom(__DIR__ . '/../Routes/admin-routes.php');
        $this->loadRoutesFrom(__DIR__ . '/../Routes/api-routes.php');

        $this->loadTranslationsFrom(__DIR__ . '/../Resources/lang', 'victor_mer');

        $this->loadViewsFrom(__DIR__ . '/../Resources/views', 'victor_mer');

        $this->publishes([
            __DIR__ . '/../Resources/views' => resource_path('views/vendor/victor_mer'),
        ], 'victor-mer-views');

        Event::listen('bagisto.admin.layout.head', function($viewRenderEventManager) {
            $viewRenderEventManager->addTemplate('victor_mer::layouts.style');
        });

        $this->app->register(EventServiceProvider::class);
    }

    /**
     * Register services.
     */
    public function register(): void
    {
        $this->registerConfig();
    }

    /**
     * Register package config.
     */
    protected function registerConfig(): void
    {
        $this->mergeConfigFrom(
            dirname(__DIR__) . '/Config/menu.php', 'menu.admin'
        );

        $this->mergeConfigFrom(
            dirname(__DIR__) . '/Config/acl.php', 'acl'
        );

        $this->mergeConfigFrom(
            dirname(__DIR__) . '/Config/system.php', 'core'
        );
    }
}
