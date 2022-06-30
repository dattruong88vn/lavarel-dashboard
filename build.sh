
rm -rf ./storage/framework/cache/*
rm -rf ./storage/framework/views/*
rm -rf ./vendor/*
composer install
chmod -R 0777 ./storage
