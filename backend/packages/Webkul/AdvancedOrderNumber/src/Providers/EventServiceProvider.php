<?php

namespace WebbyTroops\AdvancedOrderNumber\Providers;

use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;
use Webkul\Theme\ViewRenderEventManager;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event handler mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        'core.configuration.save.before'           => [
            'WebbyTroops\AdvancedOrderNumber\Listeners\CoreConfig@executeBefore'
        ],
        'core.configuration.save.after'           => [
            'WebbyTroops\AdvancedOrderNumber\Listeners\CoreConfig@executeAfter'
        ]
    ];
    
    public function boot()
    {
        $serverValues = request()->server();
        if (str_contains($serverValues['REQUEST_URI'], 'configuration/sales/advancedOrderNumberSetting')) { 
            Event::listen('bagisto.admin.layout.body.after', static function (ViewRenderEventManager $viewRenderEventManager) {
                $viewRenderEventManager->addTemplate('advanced-order::admin.configuration.reset-button-js');
            });
        }
        
    }
    
    
    
}
