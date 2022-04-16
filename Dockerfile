FROM node:16-alpine
RUN apk add --no-cache python3 g++ make
WORKDIR /app
COPY . .
RUN npm install
# RUN npm run build
EXPOSE 8000 4000 3001