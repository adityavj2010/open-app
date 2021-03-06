docker stop openapp_server
docker rm openapp_server
docker stop db
docker rm db
docker build . -t open-app-backend
docker network rm open-app
docker network create -d bridge open-app
username="$(whoami)"
if [ $username == "adityavj2010" ]
then
  echo "Running with platform option"
  docker run --detach --name db -e MYSQL_ROOT_PASSWORD="password" -e MYSQL_DATABASE="openapp"  -p 3306:3306 --network=open-app --platform linux/x86_64 mysql
else
  docker run --detach --name db -e MYSQL_ROOT_PASSWORD="password" -e MYSQL_DATABASE="openapp"  -p 3306:3306 --network=open-app mysql
fi

sleep 5
docker run --detach --name openapp_server -p 5001:3000 --network=open-app -t open-app-backend npm start