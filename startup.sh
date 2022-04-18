git pull --recurse-submodules
cd frontend
npm run build:prod
cd ..
sh docker.sh