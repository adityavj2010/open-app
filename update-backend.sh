git pull --recurse-submodules
docker stop openapp_server
docker rm openapp_server
docker build . -t open-app-backend
docker run --detach --name openapp_server -p 5001:3000 --network=open-app -t open-app-backend npm start
