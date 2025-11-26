<?php

namespace WebbyTroops\AdvancedOrderNumber\Observers;

use Webkul\Sales\Models\Order;
use WebbyTroops\AdvancedOrderNumber\Generators\ShipmentSequencer;
use WebbyTroops\AdvancedOrderNumber\Repositories\SequenceNumberRepository;
use WebbyTroops\AdvancedOrderNumber\Models\SequenceNumber;
use WebbyTroops\AdvancedOrderNumber\Traits\Common;

class OrderObserver
{
    use Common;
    
    /**
     * Create a new controller instance.
     *
     * @param  \WebbyTroops\AdvancedOrderNumber\Repositories\SequenceNumberRepository  $sequenceRepository
     * @return void
     */
    public function __construct(protected SequenceNumberRepository $sequenceRepository)
    {
       
    }
    
    /**
     * Handle the Order "created" event.
     *
     * @param  \Webkul\Sales\Models\Order $order
     * @return void
     */
    public function created(Order $order)
    {
        $entityType = SequenceNumber::ENTITY_TYPE_ORDER;
        $sequenceNumber = session()->get('sequence_number_'.$entityType);
        if($this->isModuleEnabled() && !empty($sequenceNumber)) {
            $payload = [
                'increment_id' => $order->increment_id,
                'channel_id' => $order->channel_id,
                'entity_type' =>  $entityType,
                'entity_id' => $order->id,
                'sequence_number' => $sequenceNumber,
            ];
            $this->sequenceRepository->create($payload);
            session()->forget('sequence_number_'.$entityType);
        }
    }

    /**
     * Generate increment id.
     *
     * @return mixed
     */
    public function generateIncrementId()
    {
        return app(ShipmentSequencer::class)->resolveGeneratorClass();
    }
}
