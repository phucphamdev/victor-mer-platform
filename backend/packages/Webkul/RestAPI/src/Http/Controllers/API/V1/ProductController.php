<?php

namespace Webkul\RestAPI\Http\Controllers\API\V1;

use Illuminate\Http\Request;
use Webkul\Product\Repositories\ProductRepository;

class ProductController extends BaseController
{
    public function __construct(
        protected ProductRepository $productRepository
    ) {}

    public function index(Request $request)
    {
        $perPage = $request->get('per_page', 15);
        $products = $this->productRepository->paginate($perPage);
        
        return $this->paginated($products, 'Products retrieved successfully');
    }

    public function show($id)
    {
        $product = $this->productRepository->findOrFail($id);
        
        return $this->success($product, 'Product retrieved successfully');
    }

    public function showBySlug($slug)
    {
        $product = $this->productRepository->findBySlug($slug);
        
        if (!$product) {
            return $this->error('Product not found', 404);
        }
        
        return $this->success($product, 'Product retrieved successfully');
    }

    public function related($id)
    {
        $product = $this->productRepository->findOrFail($id);
        $relatedProducts = $product->related_products;
        
        return $this->success($relatedProducts, 'Related products retrieved successfully');
    }

    public function reviews($id)
    {
        $product = $this->productRepository->findOrFail($id);
        $reviews = $product->reviews()->paginate(10);
        
        return $this->paginated($reviews, 'Product reviews retrieved successfully');
    }

    public function store(Request $request)
    {
        // Admin only - implement product creation
        return $this->success(null, 'Product created successfully', 201);
    }

    public function update(Request $request, $id)
    {
        // Admin only - implement product update
        return $this->success(null, 'Product updated successfully');
    }

    public function destroy($id)
    {
        // Admin only - implement product deletion
        return $this->success(null, 'Product deleted successfully');
    }

    public function duplicate($id)
    {
        // Admin only - implement product duplication
        return $this->success(null, 'Product duplicated successfully');
    }

    public function bulkUpdate(Request $request)
    {
        // Admin only - implement bulk update
        return $this->success(null, 'Products updated successfully');
    }

    public function bulkDelete(Request $request)
    {
        // Admin only - implement bulk delete
        return $this->success(null, 'Products deleted successfully');
    }
}
