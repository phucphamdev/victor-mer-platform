<?php

namespace Webkul\RestAPI\Http\Controllers\API\V1;

use Illuminate\Http\Request;
use Webkul\Payment\Facades\Payment;

class PaymentController extends BaseController
{
    public function index()
    {
        $paymentMethods = Payment::getPaymentMethods();
        
        return $this->success($paymentMethods, 'Payment methods retrieved successfully');
    }

    public function store(Request $request)
    {
        // Implement payment method storage
        return $this->success(null, 'Payment method added successfully', 201);
    }

    public function destroy($id)
    {
        // Implement payment method deletion
        return $this->success(null, 'Payment method removed successfully');
    }
}
