<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bagisto REST API Documentation</title>
    <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5.10.0/swagger-ui.css">
    <style>
        body {
            margin: 0;
            padding: 0;
        }
        .topbar {
            display: none;
        }
        .swagger-ui .info {
            margin: 50px 0;
        }
        .swagger-ui .info .title {
            font-size: 36px;
            color: #3b4151;
        }
        .custom-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .custom-header h1 {
            margin: 0;
            font-size: 32px;
            font-weight: 600;
        }
        .custom-header p {
            margin: 10px 0 0 0;
            font-size: 16px;
            opacity: 0.9;
        }
        .auth-section {
            background: #f7f7f7;
            padding: 20px;
            margin: 20px;
            border-radius: 8px;
            border-left: 4px solid #667eea;
        }
        .auth-section h3 {
            margin-top: 0;
            color: #3b4151;
        }
        .auth-section code {
            background: #fff;
            padding: 2px 6px;
            border-radius: 3px;
            color: #667eea;
            font-family: monospace;
        }
        .quick-links {
            display: flex;
            justify-content: center;
            gap: 20px;
            padding: 20px;
            background: #fff;
            border-bottom: 1px solid #e8e8e8;
        }
        .quick-links a {
            padding: 10px 20px;
            background: #667eea;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            transition: all 0.3s;
        }
        .quick-links a:hover {
            background: #764ba2;
            transform: translateY(-2px);
        }
    </style>
</head>
<body>
    <div class="custom-header">
        <h1>🚀 Bagisto REST API Documentation</h1>
        <p>Complete RESTful API for E-Commerce Platform</p>
    </div>

    <div class="quick-links">
        <a href="#/Authentication">🔐 Authentication</a>
        <a href="#/Products">📦 Products</a>
        <a href="#/Cart">🛒 Cart</a>
        <a href="#/Orders">📋 Orders</a>
    </div>

    <div class="auth-section">
        <h3>🔑 How to Get API Token</h3>
        <ol>
            <li>Register a new account using <code>POST /api/v1/auth/register</code></li>
            <li>Or login with existing account using <code>POST /api/v1/auth/login</code></li>
            <li>Copy the <code>token</code> from the response</li>
            <li>Click the <strong>"Authorize"</strong> button at the top</li>
            <li>Enter: <code>Bearer YOUR_TOKEN_HERE</code></li>
            <li>Click <strong>"Authorize"</strong> and then <strong>"Close"</strong></li>
            <li>Now you can test all protected endpoints! 🎉</li>
        </ol>
        
        <h4>📝 Quick Test Credentials</h4>
        <p>You can use these test credentials to quickly get started:</p>
        <ul>
            <li><strong>Email:</strong> <code>test@example.com</code></li>
            <li><strong>Password:</strong> <code>password123</code></li>
        </ul>
        
        <h4>🌐 Base URL</h4>
        <p><code>{{ config('app.url') }}/api/v1</code></p>
    </div>

    <div id="swagger-ui"></div>

    <script src="https://unpkg.com/swagger-ui-dist@5.10.0/swagger-ui-bundle.js"></script>
    <script src="https://unpkg.com/swagger-ui-dist@5.10.0/swagger-ui-standalone-preset.js"></script>
    <script>
        window.onload = function() {
            const ui = SwaggerUIBundle({
                url: "{{ url('/api-docs/json') }}",
                dom_id: '#swagger-ui',
                deepLinking: true,
                presets: [
                    SwaggerUIBundle.presets.apis,
                    SwaggerUIStandalonePreset
                ],
                plugins: [
                    SwaggerUIBundle.plugins.DownloadUrl
                ],
                layout: "StandaloneLayout",
                defaultModelsExpandDepth: 1,
                defaultModelExpandDepth: 1,
                docExpansion: "list",
                filter: true,
                showRequestHeaders: true,
                persistAuthorization: true,
                tryItOutEnabled: true,
                requestInterceptor: (request) => {
                    // Add custom headers if needed
                    request.headers['Accept'] = 'application/json';
                    return request;
                },
                responseInterceptor: (response) => {
                    // Handle responses
                    return response;
                }
            });

            window.ui = ui;
        }
    </script>
</body>
</html>
