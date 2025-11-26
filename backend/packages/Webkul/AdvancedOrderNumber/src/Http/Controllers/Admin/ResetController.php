<?php

namespace WebbyTroops\AdvancedOrderNumber\Http\Controllers\Admin;

use Webkul\Product\Repositories\ProductRepository;
use Webkul\Velocity\DataGrids\ContentDataGrid;
use Webkul\Velocity\Repositories\ContentRepository;
use Webkul\Admin\Http\Controllers\Controller;
use WebbyTroops\AdvancedOrderNumber\Models\SequenceNumber;
use Webkul\Core\Models\Channel;
use WebbyTroops\AdvancedOrderNumber\Helpers\SequenceNumberHelper;

class ResetController extends Controller
{

    /**
     * To mass update the content.
     *
     * @return \Illuminate\Http\Response
     */
    public function resetCounter()
    {
        $isModuleEnabled = core()->getConfigData('sales.advancedOrderNumberSetting.general.advance-order-number-enable', core()->getRequestedChannelCode());
        if($isModuleEnabled){
            $params = request()->all();
            $channel = Channel::query()->where('code', core()->getRequestedChannelCode())->first();
            $sequenceNumber = SequenceNumber::query()
                            ->where('entity_type', $params['entity'])
                            ->where('channel_id', $channel->id)
                            ->orderBy('id', 'desc')->limit(1)->first();
            if($sequenceNumber) {
                $sequenceNumber->sequence_number = NULL; 
                $sequenceNumber->save();
            }
            session()->flash('success', trans('advanced-order-number::app.admin.system.reset_message'));
        }
        return redirect()->back();
    }
}
