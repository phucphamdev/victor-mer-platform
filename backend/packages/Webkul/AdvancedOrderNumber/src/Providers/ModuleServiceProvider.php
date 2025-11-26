<?php

namespace WebbyTroops\AdvancedOrderNumber\Providers;

use Webkul\Core\Providers\CoreModuleServiceProvider;

class ModuleServiceProvider extends CoreModuleServiceProvider
{
    protected $models = [
        \WebbyTroops\AdvancedOrderNumber\Models\SequenceNumber::class
    ];
}