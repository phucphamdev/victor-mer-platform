<?php

namespace Webkul\RestAPI\Http\Controllers\API\V1;

use Illuminate\Http\Request;
use Webkul\CartRule\Repositories\CartRuleRepository;

class CouponController extends BaseController
{
    public function __construct(
        protected CartRuleRepository $cartRuleRepository
    ) {}

    public function index()
    {
        $coupons = $this->cartRuleRepository
            ->where('status', 1)
            ->where('coupon_type', 1)
            ->get();
        
        return $this->success($coupons, 'Coupons retrieved successfully');
    }

    public function validate(Request $request)
    {
        $data = $request->validate([
            'code' => 'required|string',
        ]);

        $coupon = $this->cartRuleRepository
            ->where('coupon_code', $data['code'])
            ->where('status', 1)
            ->first();

        if (!$coupon) {
            return $this->error('Invalid coupon code', 400);
        }

        return $this->success($coupon, 'Coupon is valid');
    }
}
