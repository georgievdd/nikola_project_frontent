FROM node:16-alpine as build
LABEL maintainer="vanek"
LABEL t="frontend"

WORKDIR /app/frontend

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alphine
COPY default.conf /etc/nginx/conf.d/
COPY --from=build /app/frontend/build /usr/share/nginx/html
