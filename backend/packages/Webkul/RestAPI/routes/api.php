<?php

use Illuminate\Support\Facades\Route;
use Webkul\RestAPI\Http\Controllers\SwaggerController;
use Webkul\RestAPI\Http\Controllers\TestController;
use Webkul\RestAPI\Http\Controllers\API\V1\{
    AuthController,
    ProductController,
    CategoryController,
    CustomerController,
    OrderController,
    CartController,
    WishlistController,
    ReviewController,
    AddressController,
    PaymentController,
    ShippingController,
    CouponController,
    SearchController,
    SettingController,
    DashboardController
};

/*
|--------------------------------------------------------------------------
| API Documentation & Testing Routes
|--------------------------------------------------------------------------
*/

Route::get('/api-test', [TestController::class, 'index'])->name('api.test');
Route::get('/api-docs', [SwaggerController::class, 'index'])->name('api.documentation');
Route::get('/api-docs/json', [SwaggerController::class, 'docs'])->name('api.documentation.json');

/*
|--------------------------------------------------------------------------
| API Routes - Version 1
|--------------------------------------------------------------------------
*/

Route::prefix('api/v1')->middleware(['api'])->group(function () {
    
    // Public routes
    Route::prefix('auth')->group(function () {
        Route::post('register', [AuthController::class, 'register']);
        Route::post('login', [AuthController::class, 'login']);
        Route::post('forgot-password', [AuthController::class, 'forgotPassword']);
        Route::post('reset-password', [AuthController::class, 'resetPassword']);
        Route::post('social-login', [AuthController::class, 'socialLogin']);
    });

    // Public product routes
    Route::prefix('products')->group(function () {
        Route::get('/', [ProductController::class, 'index']);
        Route::get('/{id}', [ProductController::class, 'show']);
        Route::get('/{id}/related', [ProductController::class, 'related']);
        Route::get('/{id}/reviews', [ProductController::class, 'reviews']);
        Route::get('/slug/{slug}', [ProductController::class, 'showBySlug']);
    });

    // Public category routes
    Route::prefix('categories')->group(function () {
        Route::get('/', [CategoryController::class, 'index']);
        Route::get('/{id}', [CategoryController::class, 'show']);
        Route::get('/{id}/products', [CategoryController::class, 'products']);
        Route::get('/slug/{slug}', [CategoryController::class, 'showBySlug']);
    });

    // Search
    Route::get('search', [SearchController::class, 'search']);
    Route::get('search/suggestions', [SearchController::class, 'suggestions']);

    // Settings
    Route::get('settings', [SettingController::class, 'index']);
    Route::get('settings/currencies', [SettingController::class, 'currencies']);
    Route::get('settings/locales', [SettingController::class, 'locales']);
    Route::get('settings/countries', [SettingController::class, 'countries']);

    // Protected routes
    Route::middleware(['auth:sanctum'])->group(function () {
        
        // Auth
        Route::prefix('auth')->group(function () {
            Route::post('logout', [AuthController::class, 'logout']);
            Route::get('me', [AuthController::class, 'me']);
            Route::put('update-profile', [AuthController::class, 'updateProfile']);
            Route::put('change-password', [AuthController::class, 'changePassword']);
        });

        // Dashboard
        Route::get('dashboard', [DashboardController::class, 'index']);
        Route::get('dashboard/stats', [DashboardController::class, 'stats']);

        // Customer
        Route::prefix('customer')->group(function () {
            Route::get('profile', [CustomerController::class, 'profile']);
            Route::put('profile', [CustomerController::class, 'updateProfile']);
            Route::get('orders', [CustomerController::class, 'orders']);
            Route::get('addresses', [CustomerController::class, 'addresses']);
        });

        // Cart
        Route::prefix('cart')->group(function () {
            Route::get('/', [CartController::class, 'index']);
            Route::post('add', [CartController::class, 'add']);
            Route::put('update/{id}', [CartController::class, 'update']);
            Route::delete('remove/{id}', [CartController::class, 'remove']);
            Route::delete('clear', [CartController::class, 'clear']);
            Route::post('apply-coupon', [CartController::class, 'applyCoupon']);
            Route::delete('remove-coupon', [CartController::class, 'removeCoupon']);
        });

        // Wishlist
        Route::prefix('wishlist')->group(function () {
            Route::get('/', [WishlistController::class, 'index']);
            Route::post('add', [WishlistController::class, 'add']);
            Route::delete('remove/{id}', [WishlistController::class, 'remove']);
            Route::post('move-to-cart/{id}', [WishlistController::class, 'moveToCart']);
        });

        // Orders
        Route::prefix('orders')->group(function () {
            Route::get('/', [OrderController::class, 'index']);
            Route::post('/', [OrderController::class, 'store']);
            Route::get('/{id}', [OrderController::class, 'show']);
            Route::post('/{id}/cancel', [OrderController::class, 'cancel']);
            Route::post('/{id}/reorder', [OrderController::class, 'reorder']);
            Route::get('/{id}/invoice', [OrderController::class, 'invoice']);
        });

        // Reviews
        Route::prefix('reviews')->group(function () {
            Route::get('/', [ReviewController::class, 'index']);
            Route::post('/', [ReviewController::class, 'store']);
            Route::put('/{id}', [ReviewController::class, 'update']);
            Route::delete('/{id}', [ReviewController::class, 'destroy']);
        });

        // Addresses
        Route::prefix('addresses')->group(function () {
            Route::get('/', [AddressController::class, 'index']);
            Route::post('/', [AddressController::class, 'store']);
            Route::get('/{id}', [AddressController::class, 'show']);
            Route::put('/{id}', [AddressController::class, 'update']);
            Route::delete('/{id}', [AddressController::class, 'destroy']);
            Route::post('/{id}/set-default', [AddressController::class, 'setDefault']);
        });

        // Payment Methods
        Route::prefix('payment-methods')->group(function () {
            Route::get('/', [PaymentController::class, 'index']);
            Route::post('/', [PaymentController::class, 'store']);
            Route::delete('/{id}', [PaymentController::class, 'destroy']);
        });

        // Shipping
        Route::prefix('shipping')->group(function () {
            Route::post('calculate', [ShippingController::class, 'calculate']);
            Route::get('methods', [ShippingController::class, 'methods']);
        });

        // Coupons
        Route::prefix('coupons')->group(function () {
            Route::get('/', [CouponController::class, 'index']);
            Route::post('validate', [CouponController::class, 'validate']);
        });
    });

    // Admin routes
    Route::prefix('admin')->middleware(['auth:sanctum', 'admin'])->group(function () {
        
        // Products Management
        Route::apiResource('products', ProductController::class);
        Route::post('products/{id}/duplicate', [ProductController::class, 'duplicate']);
        Route::post('products/bulk-update', [ProductController::class, 'bulkUpdate']);
        Route::post('products/bulk-delete', [ProductController::class, 'bulkDelete']);
        
        // Categories Management
        Route::apiResource('categories', CategoryController::class);
        Route::post('categories/{id}/reorder', [CategoryController::class, 'reorder']);
        
        // Orders Management
        Route::apiResource('orders', OrderController::class);
        Route::post('orders/{id}/status', [OrderController::class, 'updateStatus']);
        Route::post('orders/{id}/refund', [OrderController::class, 'refund']);
        
        // Customers Management
        Route::apiResource('customers', CustomerController::class);
        Route::post('customers/{id}/suspend', [CustomerController::class, 'suspend']);
        Route::post('customers/{id}/activate', [CustomerController::class, 'activate']);
        
        // Dashboard & Analytics
        Route::get('dashboard/overview', [DashboardController::class, 'overview']);
        Route::get('dashboard/sales', [DashboardController::class, 'sales']);
        Route::get('dashboard/customers', [DashboardController::class, 'customers']);
        Route::get('dashboard/products', [DashboardController::class, 'products']);
        
        // Settings
        Route::get('settings', [SettingController::class, 'adminIndex']);
        Route::put('settings', [SettingController::class, 'update']);
    });
});
