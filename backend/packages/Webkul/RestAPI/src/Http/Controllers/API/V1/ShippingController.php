<?php

namespace Webkul\RestAPI\Http\Controllers\API\V1;

use Illuminate\Http\Request;
use Webkul\Shipping\Facades\Shipping;

class ShippingController extends BaseController
{
    public function methods()
    {
        $shippingMethods = Shipping::getShippingMethods();
        
        return $this->success($shippingMethods, 'Shipping methods retrieved successfully');
    }

    public function calculate(Request $request)
    {
        $data = $request->validate([
            'address_id' => 'required|integer',
        ]);

        // Implement shipping calculation
        return $this->success(null, 'Shipping calculated successfully');
    }
}
