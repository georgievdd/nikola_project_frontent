FROM node:14 AS build

LABEL maintainer="vanek"
LABEL t="frontend"

WORKDIR /app/frontend

COPY . .
RUN npm install

RUN npm run build

CMD ["npm", "run", "start"]
