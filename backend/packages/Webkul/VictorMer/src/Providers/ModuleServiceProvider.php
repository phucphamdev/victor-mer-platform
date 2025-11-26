<?php

namespace Webkul\VictorMer\Providers;

use Konekt\Concord\BaseModuleServiceProvider;

class ModuleServiceProvider extends BaseModuleServiceProvider
{
    protected $models = [
        \Webkul\VictorMer\Models\VictorMerSetting::class,
    ];
}
