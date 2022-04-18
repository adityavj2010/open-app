FROM node:16-alpine
RUN apk add --no-cache python3 g++ make
WORKDIR /app
COPY . .
WORKDIR /app/frontend
RUN npm install
RUN npm run build:prod
WORKDIR /app
RUN npm install
