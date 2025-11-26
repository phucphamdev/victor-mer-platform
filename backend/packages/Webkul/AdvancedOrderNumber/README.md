# Bagisto Advance Order Number Module

## Requirements
- [PHP >= 8.1](http://php.net/)
- Bagisto >= 1.4  
## Quick Installation

```bash
composer require webbytroopstechnologies/advanced-order-number
```
#### Service Provider & Facade 

Register provider and facade on your `config/app.php` file.
```php
'providers' => [
    ...,
   WebbyTroops\AdvancedOrderNumber\Providers\AdvancedOrderNumberServiceProvider::class
]

```
#### Composer

```bash
composer dump-autoload
```
#### For Migration table in database

```bash
php artisan migrate
```

Run this command to make the database changes!
#### For Route & Config cache

```bash
php artisan optimize
```

Run this command to clear the route and config cache!
## Documentations
- [Docs](https://store.webbytroops.com/downloadable/download/sample/sample_id/27/)

## Support and Discussion:
If you have any query/concern/issues you can contact us anytime at
contact@webbytroops.com
## License

The MIT License (MIT). Please see [License File](https://github.com/webbytroopstechnologies/advanced-order-number/blob/main/LICENSE.md)
