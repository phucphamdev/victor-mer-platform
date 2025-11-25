<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Tester Route - Must be before Shop routes
|--------------------------------------------------------------------------
*/

Route::prefix('_api')->group(function () {
    Route::get('/tester', function () {
        return <<<'HTML'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bagisto API Tester</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f5f5f5; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 2rem; text-align: center; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header h1 { font-size: 2rem; margin-bottom: 0.5rem; }
        .container { max-width: 1200px; margin: 2rem auto; padding: 0 1rem; }
        .card { background: white; border-radius: 8px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .card h2 { margin-bottom: 1rem; color: #333; }
        .input-group { margin-bottom: 1rem; }
        input[type="text"], input[type="email"], input[type="password"] { width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 4px; font-size: 1rem; }
        input:focus { outline: none; border-color: #667eea; }
        .btn { padding: 0.75rem 1.5rem; border: none; border-radius: 4px; font-size: 1rem; cursor: pointer; transition: all 0.3s; }
        .btn-primary { background: #667eea; color: white; }
        .btn-primary:hover { background: #5568d3; }
        .btn-success { background: #10b981; color: white; }
        .btn-success:hover { background: #059669; }
        .btn-info { background: #3b82f6; color: white; margin: 0.25rem; }
        .btn-info:hover { background: #2563eb; }
        .btn-block { width: 100%; }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; }
        .endpoint-group { border-left: 4px solid #667eea; padding-left: 1rem; margin-bottom: 1.5rem; }
        .endpoint-group h3 { margin-bottom: 0.75rem; color: #333; }
        .response-box { background: #1a1a1a; color: #00ff00; padding: 1rem; border-radius: 4px; overflow-x: auto; max-height: 400px; font-family: 'Courier New', monospace; font-size: 0.875rem; white-space: pre-wrap; word-wrap: break-word; }
        .status { display: inline-block; padding: 0.5rem 1rem; border-radius: 4px; font-weight: 600; margin-bottom: 1rem; }
        .status-success { background: #d1fae5; color: #065f46; }
        .status-error { background: #fee2e2; color: #991b1b; }
        .flex { display: flex; gap: 1rem; align-items: center; }
        .flex-1 { flex: 1; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🚀 Bagisto REST API Tester</h1>
        <p>Test and explore all API endpoints</p>
    </div>

    <div class="container">
        <div class="card">
            <h2>🔑 Authentication Token</h2>
            <div class="flex">
                <input type="text" id="token" placeholder="Paste your Bearer token here..." class="flex-1">
                <button class="btn btn-primary" onclick="saveToken()">Save Token</button>
            </div>
            <p style="margin-top: 0.5rem; color: #666; font-size: 0.875rem;">💡 Get token by calling /api/v1/auth/login or /api/v1/auth/register</p>
        </div>

        <div class="grid">
            <div class="card">
                <h2>📝 Register</h2>
                <div class="input-group">
                    <input type="text" id="reg_first_name" placeholder="First Name" value="John">
                </div>
                <div class="input-group">
                    <input type="text" id="reg_last_name" placeholder="Last Name" value="Doe">
                </div>
                <div class="input-group">
                    <input type="email" id="reg_email" placeholder="Email" value="john.doe@example.com">
                </div>
                <div class="input-group">
                    <input type="password" id="reg_password" placeholder="Password" value="password123">
                </div>
                <div class="input-group">
                    <input type="password" id="reg_password_confirmation" placeholder="Confirm Password" value="password123">
                </div>
                <button class="btn btn-success btn-block" onclick="register()">Register</button>
            </div>

            <div class="card">
                <h2>🔐 Login</h2>
                <div class="input-group">
                    <input type="email" id="login_email" placeholder="Email" value="admin@example.com">
                </div>
                <div class="input-group">
                    <input type="password" id="login_password" placeholder="Password" value="admin123">
                </div>
                <button class="btn btn-success btn-block" onclick="login()">Login</button>
            </div>
        </div>

        <div class="card">
            <h2>📡 API Endpoints</h2>
            
            <div class="endpoint-group">
                <h3>Products</h3>
                <button class="btn btn-info" onclick="callAPI('GET', '/api/v1/products')">GET /products</button>
                <button class="btn btn-info" onclick="callAPI('GET', '/api/v1/products/1')">GET /products/1</button>
                <button class="btn btn-info" onclick="callAPI('GET', '/api/v1/search?q=laptop')">Search</button>
            </div>

            <div class="endpoint-group">
                <h3>Categories</h3>
                <button class="btn btn-info" onclick="callAPI('GET', '/api/v1/categories')">GET /categories</button>
                <button class="btn btn-info" onclick="callAPI('GET', '/api/v1/categories/1')">GET /categories/1</button>
            </div>

            <div class="endpoint-group">
                <h3>Cart 🔒</h3>
                <button class="btn btn-info" onclick="callAPI('GET', '/api/v1/cart', true)">GET /cart</button>
                <button class="btn btn-info" onclick="addToCart()">POST /cart/add</button>
            </div>

            <div class="endpoint-group">
                <h3>User Profile 🔒</h3>
                <button class="btn btn-info" onclick="callAPI('GET', '/api/v1/auth/me', true)">GET /auth/me</button>
                <button class="btn btn-info" onclick="callAPI('GET', '/api/v1/customer/profile', true)">GET /profile</button>
                <button class="btn btn-info" onclick="callAPI('GET', '/api/v1/orders', true)">GET /orders</button>
            </div>

            <div class="endpoint-group">
                <h3>Settings</h3>
                <button class="btn btn-info" onclick="callAPI('GET', '/api/v1/settings')">GET /settings</button>
                <button class="btn btn-info" onclick="callAPI('GET', '/api/v1/settings/currencies')">Currencies</button>
                <button class="btn btn-info" onclick="callAPI('GET', '/api/v1/settings/locales')">Locales</button>
            </div>
        </div>

        <div class="card">
            <h2>📋 Response</h2>
            <div id="status-container"></div>
            <div class="response-box" id="response">Waiting for API call...</div>
        </div>
    </div>

    <script>
        const baseURL = window.location.origin;
        let authToken = localStorage.getItem('api_token') || '';
        if (authToken) document.getElementById('token').value = authToken;

        function saveToken() {
            authToken = document.getElementById('token').value;
            localStorage.setItem('api_token', authToken);
            alert('✅ Token saved!');
        }

        async function register() {
            const data = {
                first_name: document.getElementById('reg_first_name').value,
                last_name: document.getElementById('reg_last_name').value,
                email: document.getElementById('reg_email').value,
                password: document.getElementById('reg_password').value,
                password_confirmation: document.getElementById('reg_password_confirmation').value,
            };
            const result = await callAPI('POST', '/api/v1/auth/register', false, data);
            if (result && result.data && result.data.token) {
                authToken = result.data.token;
                document.getElementById('token').value = authToken;
                localStorage.setItem('api_token', authToken);
                alert('✅ Registration successful! Token saved.');
            }
        }

        async function login() {
            const data = {
                email: document.getElementById('login_email').value,
                password: document.getElementById('login_password').value,
            };
            const result = await callAPI('POST', '/api/v1/auth/login', false, data);
            if (result && result.data && result.data.token) {
                authToken = result.data.token;
                document.getElementById('token').value = authToken;
                localStorage.setItem('api_token', authToken);
                alert('✅ Login successful! Token saved.');
            }
        }

        async function addToCart() {
            const productId = prompt('Enter Product ID:', '1');
            const quantity = prompt('Enter Quantity:', '1');
            if (productId && quantity) {
                await callAPI('POST', '/api/v1/cart/add', true, {
                    product_id: parseInt(productId),
                    quantity: parseInt(quantity)
                });
            }
        }

        async function callAPI(method, endpoint, requiresAuth = false, body = null) {
            const startTime = Date.now();
            try {
                const headers = {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                };
                if (requiresAuth) {
                    if (!authToken) {
                        alert('⚠️ Please login first!');
                        return;
                    }
                    headers['Authorization'] = `Bearer ${authToken}`;
                }
                const options = { method, headers };
                if (body) options.body = JSON.stringify(body);

                const response = await fetch(baseURL + endpoint, options);
                const data = await response.json();
                const endTime = Date.now();

                const statusEl = document.getElementById('status-container');
                const responseEl = document.getElementById('response');

                if (response.ok) {
                    statusEl.innerHTML = `<span class="status status-success">✅ ${response.status} ${response.statusText} (${endTime - startTime}ms)</span>`;
                } else {
                    statusEl.innerHTML = `<span class="status status-error">❌ ${response.status} ${response.statusText} (${endTime - startTime}ms)</span>`;
                }

                responseEl.textContent = JSON.stringify(data, null, 2);
                return data;
            } catch (error) {
                document.getElementById('status-container').innerHTML = '<span class="status status-error">❌ Error</span>';
                document.getElementById('response').textContent = error.message;
            }
        }
    </script>
</body>
</html>
HTML;
    })->name('api.tester');
});

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// API Tester - Inline HTML
Route::get('/api-tester', function () {
    return <<<'HTML'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bagisto API Tester</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f5f5f5; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 2rem; text-align: center; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header h1 { font-size: 2rem; margin-bottom: 0.5rem; }
        .container { max-width: 1200px; margin: 2rem auto; padding: 0 1rem; }
        .card { background: white; border-radius: 8px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .card h2 { margin-bottom: 1rem; color: #333; }
        .input-group { margin-bottom: 1rem; }
        .input-group label { display: block; margin-bottom: 0.5rem; font-weight: 500; color: #555; }
        input[type="text"], input[type="email"], input[type="password"] { width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 4px; font-size: 1rem; }
        input:focus { outline: none; border-color: #667eea; }
        .btn { padding: 0.75rem 1.5rem; border: none; border-radius: 4px; font-size: 1rem; cursor: pointer; transition: all 0.3s; }
        .btn-primary { background: #667eea; color: white; }
        .btn-primary:hover { background: #5568d3; }
        .btn-success { background: #10b981; color: white; }
        .btn-success:hover { background: #059669; }
        .btn-info { background: #3b82f6; color: white; margin: 0.25rem; }
        .btn-info:hover { background: #2563eb; }
        .btn-block { width: 100%; }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; }
        .endpoint-group { border-left: 4px solid #667eea; padding-left: 1rem; margin-bottom: 1.5rem; }
        .endpoint-group h3 { margin-bottom: 0.75rem; color: #333; }
        .response-box { background: #1a1a1a; color: #00ff00; padding: 1rem; border-radius: 4px; overflow-x: auto; max-height: 400px; font-family: 'Courier New', monospace; font-size: 0.875rem; white-space: pre-wrap; word-wrap: break-word; }
        .status { display: inline-block; padding: 0.5rem 1rem; border-radius: 4px; font-weight: 600; margin-bottom: 1rem; }
        .status-success { background: #d1fae5; color: #065f46; }
        .status-error { background: #fee2e2; color: #991b1b; }
        .flex { display: flex; gap: 1rem; align-items: center; }
        .flex-1 { flex: 1; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🚀 Bagisto REST API Tester</h1>
        <p>Test and explore all API endpoints</p>
    </div>

    <div class="container">
        <!-- Token Section -->
        <div class="card">
            <h2>🔑 Authentication Token</h2>
            <div class="flex">
                <input type="text" id="token" placeholder="Paste your Bearer token here..." class="flex-1">
                <button class="btn btn-primary" onclick="saveToken()">Save Token</button>
            </div>
            <p style="margin-top: 0.5rem; color: #666; font-size: 0.875rem;">💡 Get token by calling /api/v1/auth/login or /api/v1/auth/register</p>
        </div>

        <!-- Quick Actions -->
        <div class="grid">
            <div class="card">
                <h2>📝 Register</h2>
                <div class="input-group">
                    <input type="text" id="reg_first_name" placeholder="First Name" value="John">
                </div>
                <div class="input-group">
                    <input type="text" id="reg_last_name" placeholder="Last Name" value="Doe">
                </div>
                <div class="input-group">
                    <input type="email" id="reg_email" placeholder="Email" value="john.doe@example.com">
                </div>
                <div class="input-group">
                    <input type="password" id="reg_password" placeholder="Password" value="password123">
                </div>
                <div class="input-group">
                    <input type="password" id="reg_password_confirmation" placeholder="Confirm Password" value="password123">
                </div>
                <button class="btn btn-success btn-block" onclick="register()">Register</button>
            </div>

            <div class="card">
                <h2>🔐 Login</h2>
                <div class="input-group">
                    <input type="email" id="login_email" placeholder="Email" value="admin@example.com">
                </div>
                <div class="input-group">
                    <input type="password" id="login_password" placeholder="Password" value="admin123">
                </div>
                <button class="btn btn-success btn-block" onclick="login()">Login</button>
            </div>
        </div>

        <!-- API Endpoints -->
        <div class="card">
            <h2>📡 API Endpoints</h2>
            
            <div class="endpoint-group">
                <h3>Products</h3>
                <button class="btn btn-info" onclick="callAPI('GET', '/api/v1/products')">GET /products</button>
                <button class="btn btn-info" onclick="callAPI('GET', '/api/v1/products/1')">GET /products/1</button>
                <button class="btn btn-info" onclick="callAPI('GET', '/api/v1/search?q=laptop')">Search</button>
            </div>

            <div class="endpoint-group">
                <h3>Categories</h3>
                <button class="btn btn-info" onclick="callAPI('GET', '/api/v1/categories')">GET /categories</button>
                <button class="btn btn-info" onclick="callAPI('GET', '/api/v1/categories/1')">GET /categories/1</button>
            </div>

            <div class="endpoint-group">
                <h3>Cart 🔒</h3>
                <button class="btn btn-info" onclick="callAPI('GET', '/api/v1/cart', true)">GET /cart</button>
                <button class="btn btn-info" onclick="addToCart()">POST /cart/add</button>
            </div>

            <div class="endpoint-group">
                <h3>User Profile 🔒</h3>
                <button class="btn btn-info" onclick="callAPI('GET', '/api/v1/auth/me', true)">GET /auth/me</button>
                <button class="btn btn-info" onclick="callAPI('GET', '/api/v1/customer/profile', true)">GET /profile</button>
                <button class="btn btn-info" onclick="callAPI('GET', '/api/v1/orders', true)">GET /orders</button>
            </div>

            <div class="endpoint-group">
                <h3>Settings</h3>
                <button class="btn btn-info" onclick="callAPI('GET', '/api/v1/settings')">GET /settings</button>
                <button class="btn btn-info" onclick="callAPI('GET', '/api/v1/settings/currencies')">Currencies</button>
                <button class="btn btn-info" onclick="callAPI('GET', '/api/v1/settings/locales')">Locales</button>
            </div>
        </div>

        <!-- Response -->
        <div class="card">
            <h2>📋 Response</h2>
            <div id="status-container"></div>
            <div class="response-box" id="response">Waiting for API call...</div>
        </div>
    </div>

    <script>
        const baseURL = window.location.origin;
        let authToken = localStorage.getItem('api_token') || '';
        if (authToken) document.getElementById('token').value = authToken;

        function saveToken() {
            authToken = document.getElementById('token').value;
            localStorage.setItem('api_token', authToken);
            alert('✅ Token saved!');
        }

        async function register() {
            const data = {
                first_name: document.getElementById('reg_first_name').value,
                last_name: document.getElementById('reg_last_name').value,
                email: document.getElementById('reg_email').value,
                password: document.getElementById('reg_password').value,
                password_confirmation: document.getElementById('reg_password_confirmation').value,
            };
            const result = await callAPI('POST', '/api/v1/auth/register', false, data);
            if (result && result.data && result.data.token) {
                authToken = result.data.token;
                document.getElementById('token').value = authToken;
                localStorage.setItem('api_token', authToken);
                alert('✅ Registration successful! Token saved.');
            }
        }

        async function login() {
            const data = {
                email: document.getElementById('login_email').value,
                password: document.getElementById('login_password').value,
            };
            const result = await callAPI('POST', '/api/v1/auth/login', false, data);
            if (result && result.data && result.data.token) {
                authToken = result.data.token;
                document.getElementById('token').value = authToken;
                localStorage.setItem('api_token', authToken);
                alert('✅ Login successful! Token saved.');
            }
        }

        async function addToCart() {
            const productId = prompt('Enter Product ID:', '1');
            const quantity = prompt('Enter Quantity:', '1');
            if (productId && quantity) {
                await callAPI('POST', '/api/v1/cart/add', true, {
                    product_id: parseInt(productId),
                    quantity: parseInt(quantity)
                });
            }
        }

        async function callAPI(method, endpoint, requiresAuth = false, body = null) {
            const startTime = Date.now();
            try {
                const headers = {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                };
                if (requiresAuth) {
                    if (!authToken) {
                        alert('⚠️ Please login first!');
                        return;
                    }
                    headers['Authorization'] = `Bearer ${authToken}`;
                }
                const options = { method, headers };
                if (body) options.body = JSON.stringify(body);

                const response = await fetch(baseURL + endpoint, options);
                const data = await response.json();
                const endTime = Date.now();

                const statusEl = document.getElementById('status-container');
                const responseEl = document.getElementById('response');

                if (response.ok) {
                    statusEl.innerHTML = `<span class="status status-success">✅ ${response.status} ${response.statusText} (${endTime - startTime}ms)</span>`;
                } else {
                    statusEl.innerHTML = `<span class="status status-error">❌ ${response.status} ${response.statusText} (${endTime - startTime}ms)</span>`;
                }

                responseEl.textContent = JSON.stringify(data, null, 2);
                return data;
            } catch (error) {
                document.getElementById('status-container').innerHTML = '<span class="status status-error">❌ Error</span>';
                document.getElementById('response').textContent = error.message;
            }
        }
    </script>
</body>
</html>
HTML;
})->name('api.tester');

Route::get('/api-docs', function () {
    return view('rest-api::swagger.index');
})->name('api.documentation');

Route::get('/api-docs/json', function () {
    $baseUrl = config('app.url');
    
    return response()->json([
        'openapi' => '3.0.0',
        'info' => [
            'title' => 'Bagisto REST API',
            'description' => 'Complete REST API for Bagisto E-Commerce Platform',
            'version' => '1.0.0',
        ],
        'servers' => [
            ['url' => $baseUrl . '/api/v1', 'description' => 'API Server'],
        ],
        'components' => [
            'securitySchemes' => [
                'bearerAuth' => [
                    'type' => 'http',
                    'scheme' => 'bearer',
                    'bearerFormat' => 'JWT',
                ],
            ],
        ],
        'paths' => [
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
                                        'email' => ['type' => 'string', 'example' => 'john@example.com'],
                                        'password' => ['type' => 'string', 'example' => 'password123'],
                                        'password_confirmation' => ['type' => 'string', 'example' => 'password123'],
                                    ],
                                ],
                            ],
                        ],
                    ],
                    'responses' => [
                        '201' => ['description' => 'User registered successfully'],
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
                                        'email' => ['type' => 'string', 'example' => 'john@example.com'],
                                        'password' => ['type' => 'string', 'example' => 'password123'],
                                    ],
                                ],
                            ],
                        ],
                    ],
                    'responses' => [
                        '200' => ['description' => 'Login successful'],
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
                        '200' => ['description' => 'User retrieved'],
                        '401' => ['description' => 'Unauthenticated'],
                    ],
                ],
            ],
            '/products' => [
                'get' => [
                    'tags' => ['Products'],
                    'summary' => 'Get all products',
                    'parameters' => [
                        ['name' => 'page', 'in' => 'query', 'schema' => ['type' => 'integer']],
                        ['name' => 'per_page', 'in' => 'query', 'schema' => ['type' => 'integer']],
                    ],
                    'responses' => [
                        '200' => ['description' => 'Products retrieved'],
                    ],
                ],
            ],
            '/products/{id}' => [
                'get' => [
                    'tags' => ['Products'],
                    'summary' => 'Get product by ID',
                    'parameters' => [
                        ['name' => 'id', 'in' => 'path', 'required' => true, 'schema' => ['type' => 'integer']],
                    ],
                    'responses' => [
                        '200' => ['description' => 'Product retrieved'],
                        '404' => ['description' => 'Not found'],
                    ],
                ],
            ],
            '/cart' => [
                'get' => [
                    'tags' => ['Cart'],
                    'summary' => 'Get cart',
                    'security' => [['bearerAuth' => []]],
                    'responses' => ['200' => ['description' => 'Cart retrieved']],
                ],
            ],
            '/cart/add' => [
                'post' => [
                    'tags' => ['Cart'],
                    'summary' => 'Add to cart',
                    'security' => [['bearerAuth' => []]],
                    'requestBody' => [
                        'required' => true,
                        'content' => [
                            'application/json' => [
                                'schema' => [
                                    'type' => 'object',
                                    'properties' => [
                                        'product_id' => ['type' => 'integer', 'example' => 1],
                                        'quantity' => ['type' => 'integer', 'example' => 2],
                                    ],
                                ],
                            ],
                        ],
                    ],
                    'responses' => ['200' => ['description' => 'Added to cart']],
                ],
            ],
            '/orders' => [
                'get' => [
                    'tags' => ['Orders'],
                    'summary' => 'Get orders',
                    'security' => [['bearerAuth' => []]],
                    'responses' => ['200' => ['description' => 'Orders retrieved']],
                ],
            ],
            '/search' => [
                'get' => [
                    'tags' => ['Search'],
                    'summary' => 'Search products',
                    'parameters' => [
                        ['name' => 'q', 'in' => 'query', 'required' => true, 'schema' => ['type' => 'string']],
                    ],
                    'responses' => ['200' => ['description' => 'Search results']],
                ],
            ],
        ],
        'tags' => [
            ['name' => 'Authentication', 'description' => 'User authentication'],
            ['name' => 'Products', 'description' => 'Product management'],
            ['name' => 'Cart', 'description' => 'Shopping cart'],
            ['name' => 'Orders', 'description' => 'Order management'],
            ['name' => 'Search', 'description' => 'Search functionality'],
        ],
    ]);
})->name('api.documentation.json');
