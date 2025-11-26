<?php

namespace WebbyTroops\AdvancedOrderNumber\Generators;

use Webkul\Sales\Models\Refund;
use Webkul\Sales\Generators\Sequencer;
use WebbyTroops\AdvancedOrderNumber\Helpers\SequenceNumberHelper;

class RefundSequencer extends Sequencer
{
    /**
     * Create order sequencer instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->setAllConfigs();
    }

    /**
     * Set all configs.
     *
     * @param  string  $configKey
     * @return void
     */
    public function setAllConfigs()
    {
        $currentChannel = SequenceNumberHelper::getCurrentChannelCode();
        $isModuleEnabled = core()->getConfigData('sales.advancedOrderNumberSetting.general.advance-order-number-enable', $currentChannel);
        if($isModuleEnabled) {
            $this->generatorClass = \WebbyTroops\AdvancedOrderNumber\Generators\RefundNumberGenerator::class;
        } 
    }

}
