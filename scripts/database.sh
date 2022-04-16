#Docker database script
docker rmi -f openapp_db
docker run --name openapp_db -e MYSQL_ROOT_PASSWORD="password" -e MYSQL_DATABASE="openapp"  -p 3306:3306 --platform linux/x86_64 mysql