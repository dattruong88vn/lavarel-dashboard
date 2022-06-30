#Set permission
sudo chmod -R 777 ${PWD}/services/dashboard_web/storage
#Retrieve an authentication token and authenticate your Docker client to your registry.
aws ecr get-login-password --region ap-southeast-1 | sudo docker login --username AWS --password-stdin $1
#Delete container before build
sudo docker container rm -f dashboard-app
sudo docker container rm -f dashboard-web
#Run docker compose
sudo AWSRepo=$1 TAG=$2 PORT=$3 docker-compose -f ${PWD}/services/dashboard_web/docker-compose.yml pull
sudo AWSRepo=$1 TAG=$2 PORT=$3 docker-compose -f ${PWD}/services/dashboard_web/docker-compose.yml up -d