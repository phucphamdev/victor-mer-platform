<?php

namespace WebbyTroops\AdvancedOrderNumber\Traits;

use Illuminate\Support\Facades\Mail;
use Webkul\Admin\Mail\InvoiceOverdueReminder;
use WebbyTroops\AdvancedOrderNumber\Helpers\SequenceNumberHelper;

trait Common
{
    
 
    
    /**
     * Check if module is enabled
     *
     * @return bool
     */
    public function isModuleEnabled()
    {
        $currentChannel = SequenceNumberHelper::getCurrentChannelCode();
        return core()->getConfigData('sales.advancedOrderNumberSetting.general.advance-order-number-enable', $currentChannel);
    }

    
}
