<?php

namespace Webkul\RestAPI\Http\Controllers;

use Illuminate\Routing\Controller;

class SwaggerController extends Controller
{
    public function index()
    {
        return view('rest-api::swagger.index');
    }

    public function docs()
    {
        $swagger = $this->generateSwaggerJson();
        
        return response()->json($swagger);
    }

    private function generateSwaggerJson()
    {
        $baseUrl = config('app.url');
        
        return [
            'openapi' => '3.0.0',
            'info' => [
                'title' => 'Bagisto REST API',
                'description' => 'Complete REST API for Bagisto E-Commerce Platform',
                'version' => '1.0.0',
                'contact' => [
                    'name' => 'API Support',
                    'email' => 'support@bagisto.com',
                ],
            ],
            'servers' => [
                [
                    'url' => $baseUrl . '/api/v1',
                    'description' => 'API Server',
                ],
            ],
            'components' => [
                'securitySchemes' => [
                    'bearerAuth' => [
                        'type' => 'http',
                        'scheme' => 'bearer',
                        'bearerFormat' => 'JWT',
                    ],
                ],
                'schemas' => $this->getSchemas(),
            ],
            'paths' => $this->getPaths(),
            'tags' => $this->getTags(),
        ];
    }

    private function getTags()
    {
        return [
            ['name' => 'Authentication', 'description' => 'User authentication endpoints'],
            ['name' => 'Products', 'description' => 'Product management'],
            ['name' => 'Categories', 'description' => 'Category management'],
            ['name' => 'Cart', 'description' => 'Shopping cart operations'],
            ['name' => 'Orders', 'description' => 'Order management'],
            ['name' => 'Wishlist', 'description' => 'Wishlist operations'],
            ['name' => 'Customer', 'description' => 'Customer profile'],
            ['name' => 'Reviews', 'description' => 'Product reviews'],
            ['name' => 'Addresses', 'description' => 'Customer addresses'],
            ['name' => 'Search', 'description' => 'Search functionality'],
            ['name' => 'Settings', 'description' => 'System settings'],
        ];
    }

    private function getSchemas()
    {
        return [
            'Error' => [
                'type' => 'object',
                'properties' => [
                    'success' => ['type' => 'boolean', 'example' => false],
                    'message' => ['type' => 'string', 'example' => 'Error message'],
                    'errors' => ['type' => 'object'],
                ],
            ],
            'Success' => [
                'type' => 'object',
                'properties' => [
                    'success' => ['type' => 'boolean', 'example' => true],
                    'message' => ['type' => 'string', 'example' => 'Success message'],
                    'data' => ['type' => 'object'],
                ],
            ],
        ];
    }

    private function getPaths()
    {
        return [
            '/auth/register' => [
                'post' => [
                    'tags' => ['Authentication'],
                    'summary' => 'Register new user',
                    'requestBody' => [
                        'required' => true,
                        'content' => [
                            'application/json' => [
                                'schema' => [
                                    'type' => 'object',
                                    'required' => ['first_name', 'last_name', 'email', 'password', 'password_confirmation'],
                                    'properties' => [
                                        'first_name' => ['type' => 'string', 'example' => 'John'],
                                        'last_name' => ['type' => 'string', 'example' => 'Doe'],
                                        'email' => ['type' => 'string', 'format' => 'email', 'example' => 'john@example.com'],
                                        'password' => ['type' => 'string', 'format' => 'password', 'example' => 'password123'],
                                        'password_confirmation' => ['type' => 'string', 'format' => 'password', 'example' => 'password123'],
                                    ],
                                ],
                            ],
                        ],
                    ],
                    'responses' => [
                        '201' => [
                            'description' => 'User registered successfully',
                            'content' => [
                                'application/json' => [
                                    'schema' => [
                                        'type' => 'object',
                                        'properties' => [
                                            'success' => ['type' => 'boolean', 'example' => true],
                                            'message' => ['type' => 'string', 'example' => 'Registration successful'],
                                            'data' => [
                                                'type' => 'object',
                                                'properties' => [
                                                    'token' => ['type' => 'string', 'example' => '1|abc123...'],
                                                    'customer' => ['type' => 'object'],
                                                ],
                                            ],
                                        ],
                                    ],
                                ],
                            ],
                        ],
                        '422' => ['description' => 'Validation error'],
                    ],
                ],
            ],
            '/auth/login' => [
                'post' => [
                    'tags' => ['Authentication'],
                    'summary' => 'Login user',
                    'requestBody' => [
                        'required' => true,
                        'content' => [
                            'application/json' => [
                                'schema' => [
                                    'type' => 'object',
                                    'required' => ['email', 'password'],
                                    'properties' => [
                                        'email' => ['type' => 'string', 'format' => 'email', 'example' => 'john@example.com'],
                                        'password' => ['type' => 'string', 'format' => 'password', 'example' => 'password123'],
                                    ],
                                ],
                            ],
                        ],
                    ],
                    'responses' => [
                        '200' => [
                            'description' => 'Login successful',
                            'content' => [
                                'application/json' => [
                                    'schema' => [
                                        'type' => 'object',
                                        'properties' => [
                                            'success' => ['type' => 'boolean', 'example' => true],
                                            'message' => ['type' => 'string', 'example' => 'Login successful'],
                                            'data' => [
                                                'type' => 'object',
                                                'properties' => [
                                                    'token' => ['type' => 'string', 'example' => '1|abc123...'],
                                                    'customer' => ['type' => 'object'],
                                                ],
                                            ],
                                        ],
                                    ],
                                ],
                            ],
                        ],
                        '401' => ['description' => 'Invalid credentials'],
                    ],
                ],
            ],
            '/auth/me' => [
                'get' => [
                    'tags' => ['Authentication'],
                    'summary' => 'Get current user',
                    'security' => [['bearerAuth' => []]],
                    'responses' => [
                        '200' => ['description' => 'User retrieved successfully'],
                        '401' => ['description' => 'Unauthenticated'],
                    ],
                ],
            ],
            '/products' => [
                'get' => [
                    'tags' => ['Products'],
                    'summary' => 'Get all products',
                    'parameters' => [
                        [
                            'name' => 'page',
                            'in' => 'query',
                            'schema' => ['type' => 'integer', 'default' => 1],
                        ],
                        [
                            'name' => 'per_page',
                            'in' => 'query',
                            'schema' => ['type' => 'integer', 'default' => 15],
                        ],
                    ],
                    'responses' => [
                        '200' => ['description' => 'Products retrieved successfully'],
                    ],
                ],
            ],
            '/products/{id}' => [
                'get' => [
                    'tags' => ['Products'],
                    'summary' => 'Get product by ID',
                    'parameters' => [
                        [
                            'name' => 'id',
                            'in' => 'path',
                            'required' => true,
                            'schema' => ['type' => 'integer'],
                        ],
                    ],
                    'responses' => [
                        '200' => ['description' => 'Product retrieved successfully'],
                        '404' => ['description' => 'Product not found'],
                    ],
                ],
            ],
            '/cart' => [
                'get' => [
                    'tags' => ['Cart'],
                    'summary' => 'Get cart items',
                    'security' => [['bearerAuth' => []]],
                    'responses' => [
                        '200' => ['description' => 'Cart retrieved successfully'],
                    ],
                ],
            ],
            '/cart/add' => [
                'post' => [
                    'tags' => ['Cart'],
                    'summary' => 'Add item to cart',
                    'security' => [['bearerAuth' => []]],
                    'requestBody' => [
                        'required' => true,
                        'content' => [
                            'application/json' => [
                                'schema' => [
                                    'type' => 'object',
                                    'required' => ['product_id', 'quantity'],
                                    'properties' => [
                                        'product_id' => ['type' => 'integer', 'example' => 1],
                                        'quantity' => ['type' => 'integer', 'example' => 2],
                                    ],
                                ],
                            ],
                        ],
                    ],
                    'responses' => [
                        '200' => ['description' => 'Product added to cart'],
                        '400' => ['description' => 'Bad request'],
                    ],
                ],
            ],
            '/orders' => [
                'get' => [
                    'tags' => ['Orders'],
                    'summary' => 'Get user orders',
                    'security' => [['bearerAuth' => []]],
                    'responses' => [
                        '200' => ['description' => 'Orders retrieved successfully'],
                    ],
                ],
            ],
            '/search' => [
                'get' => [
                    'tags' => ['Search'],
                    'summary' => 'Search products',
                    'parameters' => [
                        [
                            'name' => 'q',
                            'in' => 'query',
                            'required' => true,
                            'schema' => ['type' => 'string'],
                            'example' => 'laptop',
                        ],
                    ],
                    'responses' => [
                        '200' => ['description' => 'Search results'],
                    ],
                ],
            ],
        ];
    }
}
