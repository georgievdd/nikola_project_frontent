FROM node:18-alpine as build
LABEL maintainer="vanek"
LABEL t="frontend"

WORKDIR /app/frontend

RUN npm install -g npm@10.4.0
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
FROM nginx:alpine
COPY default.conf /etc/nginx/conf.d/
COPY --from=build /app/frontend/build /usr/share/nginx/html
