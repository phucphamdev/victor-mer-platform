# Multi-stage build for Laravel backend

# Stage 1: Development
FROM php:8.3-apache AS development

# Cài đặt thư viện cần thiết cho Bagisto
RUN apt-get update && apt-get install -y \
    libpng-dev libonig-dev libxml2-dev zip unzip git curl \
    libicu-dev libjpeg62-turbo-dev libwebp-dev libfreetype6-dev default-mysql-client \
    libzip-dev

# Cài đặt PHP Extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd intl soap calendar zip

# Bật mod_rewrite của Apache
RUN a2enmod rewrite

# Cài Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Thiết lập thư mục làm việc
WORKDIR /var/www/html

# Cấu hình Apache trỏ vào thư mục public
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf

# Phân quyền (sẽ chạy lệnh này khi container khởi động)
CMD chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache && apache2-foreground