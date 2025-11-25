<?php

namespace Webkul\RestAPI\Http\Controllers\API\V1;

use Illuminate\Http\Request;
use Webkul\Customer\Repositories\WishlistRepository;

class WishlistController extends BaseController
{
    public function __construct(
        protected WishlistRepository $wishlistRepository
    ) {}

    public function index(Request $request)
    {
        $wishlist = $this->wishlistRepository
            ->where('customer_id', $request->user()->id)
            ->with('product')
            ->get();
        
        return $this->success($wishlist, 'Wishlist retrieved successfully');
    }

    public function add(Request $request)
    {
        $data = $request->validate([
            'product_id' => 'required|integer|exists:products,id',
        ]);

        $wishlist = $this->wishlistRepository->create([
            'customer_id' => $request->user()->id,
            'product_id' => $data['product_id'],
            'channel_id' => core()->getCurrentChannel()->id,
        ]);
        
        return $this->success($wishlist, 'Product added to wishlist successfully', 201);
    }

    public function remove($id)
    {
        $wishlist = $this->wishlistRepository->findOrFail($id);
        
        if ($wishlist->customer_id !== auth()->user()->id) {
            return $this->error('Unauthorized', 403);
        }

        $this->wishlistRepository->delete($id);
        
        return $this->success(null, 'Product removed from wishlist successfully');
    }

    public function moveToCart($id)
    {
        // Implement move to cart
        return $this->success(null, 'Product moved to cart successfully');
    }
}
