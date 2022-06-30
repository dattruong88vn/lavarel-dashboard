FROM php:7.2-fpm

ENV TZ=Asia/Ho_Chi_Minh

# Set working directory
WORKDIR /var/www

RUN apt-get update && apt-get install -y libzip-dev 

# Extension zip for laravel
RUN docker-php-ext-install zip 

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Expose port 9000 and start php-fpm server
EXPOSE 9000
CMD ["php-fpm"] 