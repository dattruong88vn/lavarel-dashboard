#Build source by npm
npm run build --prefix ${PWD}/services/$3
#Create cache folder
sudo mkdir -p ${PWD}/services/$3/storage/cache
sudo mkdir -p ${PWD}/services/$3/storage/framework/views
#Set permission
sudo chmod -R 777 ${PWD}/services/$3/storage
sudo chmod -R 777 ${PWD}/services/$3/bootstrap
#Remove docker container
sudo docker container rm -f $3-app
sudo docker container rm -f $3-web
#Run docker compose
sudo TAG=$1 PORT=$2 NAME=$3 PHP_PORT=$4 SUB_NET=$5 docker-compose -f ${PWD}/services/$3/docker-compose.yml pull
sudo TAG=$1 PORT=$2 NAME=$3 PHP_PORT=$4 SUB_NET=$5 docker-compose -f ${PWD}/services/$3/docker-compose.yml up -d