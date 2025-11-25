<?php

namespace Webkul\RestAPI\Http\Controllers\API\V1;

use Illuminate\Http\Request;
use Webkul\Product\Repositories\ProductRepository;

class SearchController extends BaseController
{
    public function __construct(
        protected ProductRepository $productRepository
    ) {}

    public function search(Request $request)
    {
        $query = $request->get('q', '');
        $perPage = $request->get('per_page', 15);

        $products = $this->productRepository
            ->where('name', 'like', "%{$query}%")
            ->orWhere('description', 'like', "%{$query}%")
            ->paginate($perPage);
        
        return $this->paginated($products, 'Search results retrieved successfully');
    }

    public function suggestions(Request $request)
    {
        $query = $request->get('q', '');

        $suggestions = $this->productRepository
            ->where('name', 'like', "%{$query}%")
            ->limit(10)
            ->get(['id', 'name', 'url_key']);
        
        return $this->success($suggestions, 'Suggestions retrieved successfully');
    }
}
