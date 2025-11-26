<?php
namespace WebbyTroops\AdvancedOrderNumber\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Event;
use WebbyTroops\AdvancedOrderNumber\Console\Commands\ResetCounter;
use Illuminate\Console\Scheduling\Schedule;

use WebbyTroops\AdvancedOrderNumber\Observers\{
  OrderObserver,
  InvoiceObserver,
  ShipmentObserver,
  RefundObserver,
};
use Webkul\Sales\Models\{
  Order,
  Invoice,
  Shipment,
  Refund,
};

/**
* AdvancedOrderNumberServiceProvider
*
* @copyright 2023 WebbyTroops Technologies Pvt. Ltd. (http://www.webbytroops.com)
*/
class AdvancedOrderNumberServiceProvider extends ServiceProvider
{
    /**
    * Bootstrap services.
    *
    * @return void
    */
    public function boot()
    {
        $this->loadRoutesFrom(__DIR__ . '/../Http/admin-routes.php');

        
        $this->loadTranslationsFrom(__DIR__ . '/../Resources/lang', 'advanced-order-number');
        
        Event::listen('bagisto.admin.layout.head', function($viewRenderEventManager) {
            $viewRenderEventManager->addTemplate('helloworld::helloworld.layouts.style');
        });

        $this->loadMigrationsFrom(__DIR__ .'/../Database/Migrations');
        
        $this->mergeConfigFrom(
            dirname(__DIR__) . '/Config/system.php', 'core'
        );
        
        $this->app->bind(
            \Webkul\Sales\Generators\OrderSequencer::class, 
            \WebbyTroops\AdvancedOrderNumber\Generators\OrderSequencer::class
        );
        $this->app->bind(
            \Webkul\Sales\Generators\InvoiceSequencer::class, 
            \WebbyTroops\AdvancedOrderNumber\Generators\InvoiceSequencer::class
        );
        $this->app->register(EventServiceProvider::class);
        $this->app->register(ModuleServiceProvider::class);
        
        $this->callAfterResolving(Schedule::class, function (Schedule $schedule) {
            $schedule->command('reset:numbers')->daily();
        });
        $this->app->bind(
            \Webkul\Admin\DataGrids\OrderShipmentsDataGrid::class, 
            \WebbyTroops\AdvancedOrderNumber\DataGrids\OrderShipmentsDataGrid::class
        );
        $this->app->bind(
            \Webkul\Admin\DataGrids\OrderRefundDataGrid::class, 
            \WebbyTroops\AdvancedOrderNumber\DataGrids\OrderRefundDataGrid::class
        );
        Order::observe(OrderObserver::class);
        Invoice::observe(InvoiceObserver::class);
        Shipment::observe(ShipmentObserver::class);
        Refund::observe(RefundObserver::class);
        
        $this->loadViewsFrom(__DIR__ . '/../Resources/views', 'advanced-order');
        
        
    }

    /**
    * Register services.
    *
    * @return void
    */
    public function register()
    {
        if ($this->app->runningInConsole()) {
            $this->commands([ResetCounter::class]);
        }
    }
}