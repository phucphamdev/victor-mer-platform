<?php

namespace WebbyTroops\AdvancedOrderNumber\Console\Commands;

use Illuminate\Console\Command;
use WebbyTroops\AdvancedOrderNumber\Helpers\SequenceNumberHelper;
use Webkul\Core\Models\Channel;

class ResetCounter extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'reset:numbers';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Reset Order/Invoice/Shipment/Refund numbers.';

    /**
     * Create a new command instance.
     *
     * @param  SequenceNumberHelper $sequenceNumberHelper
     * @return void
     */
    public function __construct(
        protected SequenceNumberHelper $sequenceNumberHelper
    )
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $channels = Channel::query()->pluck('code', 'id')->toArray();
        foreach ($channels as $channelId => $channelCode) {
            $isModuleEnabled = core()->getConfigData('sales.advancedOrderNumberSetting.general.advance-order-number-enable', $channelCode);
            if($isModuleEnabled){
                $this->sequenceNumberHelper->resetCounter($channelId, $channelCode);
            }
        }
        
    }
}