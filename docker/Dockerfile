FROM php:7.2-fpm

ENV TZ=Asia/Ho_Chi_Minh

# Copy composer.lock and composer.json
#COPY composer.lock composer.json package.json /var/www/

# Set working directory
WORKDIR /var/www

RUN apt-get update && apt-get install -y libzip-dev 

#RUN apt-get install -y vim nano

# Extension zip for laravel
RUN docker-php-ext-install zip 

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

USER root

# Copy existing application directory contents
COPY . /var/www

RUN chmod -R 777 /var/www/storage
RUN chmod -R 777 /var/www/bootstrap

# Expose port 9000 and start php-fpm server
EXPOSE 9000
CMD ["php-fpm"] 