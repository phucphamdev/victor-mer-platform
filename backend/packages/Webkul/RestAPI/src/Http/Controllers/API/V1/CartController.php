<?php

namespace Webkul\RestAPI\Http\Controllers\API\V1;

use Illuminate\Http\Request;
use Webkul\Checkout\Repositories\CartRepository;
use Webkul\Checkout\Repositories\CartItemRepository;

class CartController extends BaseController
{
    public function __construct(
        protected CartRepository $cartRepository,
        protected CartItemRepository $cartItemRepository
    ) {}

    public function index(Request $request)
    {
        $cart = $this->cartRepository->getCart();
        
        return $this->success($cart, 'Cart retrieved successfully');
    }

    public function add(Request $request)
    {
        $data = $request->validate([
            'product_id' => 'required|integer',
            'quantity' => 'required|integer|min:1',
        ]);

        try {
            $cart = $this->cartRepository->addProduct($data['product_id'], $data);
            
            return $this->success($cart, 'Product added to cart successfully');
        } catch (\Exception $e) {
            return $this->error($e->getMessage(), 400);
        }
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        try {
            $cartItem = $this->cartItemRepository->update($data, $id);
            
            return $this->success($cartItem, 'Cart item updated successfully');
        } catch (\Exception $e) {
            return $this->error($e->getMessage(), 400);
        }
    }

    public function remove($id)
    {
        try {
            $this->cartItemRepository->delete($id);
            
            return $this->success(null, 'Cart item removed successfully');
        } catch (\Exception $e) {
            return $this->error($e->getMessage(), 400);
        }
    }

    public function clear()
    {
        try {
            $cart = $this->cartRepository->getCart();
            
            if ($cart) {
                $this->cartRepository->delete($cart->id);
            }
            
            return $this->success(null, 'Cart cleared successfully');
        } catch (\Exception $e) {
            return $this->error($e->getMessage(), 400);
        }
    }

    public function applyCoupon(Request $request)
    {
        $data = $request->validate([
            'code' => 'required|string',
        ]);

        try {
            $cart = $this->cartRepository->setCouponCode($data['code']);
            
            return $this->success($cart, 'Coupon applied successfully');
        } catch (\Exception $e) {
            return $this->error($e->getMessage(), 400);
        }
    }

    public function removeCoupon()
    {
        try {
            $cart = $this->cartRepository->removeCouponCode();
            
            return $this->success($cart, 'Coupon removed successfully');
        } catch (\Exception $e) {
            return $this->error($e->getMessage(), 400);
        }
    }
}
