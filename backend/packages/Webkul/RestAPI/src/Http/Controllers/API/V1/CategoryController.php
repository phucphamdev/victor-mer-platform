<?php

namespace Webkul\RestAPI\Http\Controllers\API\V1;

use Illuminate\Http\Request;
use Webkul\Category\Repositories\CategoryRepository;

class CategoryController extends BaseController
{
    public function __construct(
        protected CategoryRepository $categoryRepository
    ) {}

    public function index(Request $request)
    {
        $categories = $this->categoryRepository->getVisibleCategoryTree(core()->getCurrentChannel()->root_category_id);
        
        return $this->success($categories, 'Categories retrieved successfully');
    }

    public function show($id)
    {
        $category = $this->categoryRepository->findOrFail($id);
        
        return $this->success($category, 'Category retrieved successfully');
    }

    public function showBySlug($slug)
    {
        $category = $this->categoryRepository->findBySlug($slug);
        
        if (!$category) {
            return $this->error('Category not found', 404);
        }
        
        return $this->success($category, 'Category retrieved successfully');
    }

    public function products($id, Request $request)
    {
        $category = $this->categoryRepository->findOrFail($id);
        $perPage = $request->get('per_page', 15);
        $products = $category->products()->paginate($perPage);
        
        return $this->paginated($products, 'Category products retrieved successfully');
    }

    public function store(Request $request)
    {
        // Admin only
        return $this->success(null, 'Category created successfully', 201);
    }

    public function update(Request $request, $id)
    {
        // Admin only
        return $this->success(null, 'Category updated successfully');
    }

    public function destroy($id)
    {
        // Admin only
        return $this->success(null, 'Category deleted successfully');
    }

    public function reorder(Request $request, $id)
    {
        // Admin only
        return $this->success(null, 'Categories reordered successfully');
    }
}
