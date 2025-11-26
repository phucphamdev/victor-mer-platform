<?php

namespace WebbyTroops\AdvancedOrderNumber\Observers;

use Webkul\Sales\Models\Shipment;
use WebbyTroops\AdvancedOrderNumber\Generators\ShipmentSequencer;
use WebbyTroops\AdvancedOrderNumber\Repositories\SequenceNumberRepository;
use WebbyTroops\AdvancedOrderNumber\Models\SequenceNumber;
use WebbyTroops\AdvancedOrderNumber\Traits\Common;

class ShipmentObserver
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
     * Handle the Shipment "creating" event.
     *
     * @param  \Webkul\Sales\Models\Shipment  $shipment
     * @return void
     */
    public function creating(Shipment $shipment)
    {
       $shipment->increment_id = $this->generateIncrementId();
    }
    
    /**
     * Handle the Shipment "created" event.
     *
     * @param  \Webkul\Sales\Models\Shipment  $shipment
     * @return void
     */
    public function created(Shipment $shipment)
    {
        $entityType = SequenceNumber::ENTITY_TYPE_SHIPMENT;
        $sequenceNumber = session()->get('sequence_number_'.$entityType);
        if($this->isModuleEnabled() && !empty($sequenceNumber)) {
            $payload = [
                'increment_id' => $shipment->increment_id,
                'channel_id' => $shipment->order->channel_id,
                'entity_type' =>  $entityType,
                'entity_id' => $shipment->id,
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
