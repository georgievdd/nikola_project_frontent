# Стадия сборки
FROM node:20 as builder

# Устанавливаем рабочую директорию
WORKDIR /app

ARG NEXT_PUBLIC_BACKEND_URL
ARG NEXT_PUBLIC_INTERNAL_BACKEND_URL
ARG NEXT_PUBLIC_BACKEND_DOMAIN

ENV NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL}
ENV NEXT_PUBLIC_INTERNAL_BACKEND_URL=${NEXT_PUBLIC_INTERNAL_BACKEND_URL}
ENV NEXT_PUBLIC_BACKEND_DOMAIN=${NEXT_PUBLIC_BACKEND_DOMAIN}

RUN ls -a

# Копируем файлы package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы
COPY . ./

# Выполняем сборку
RUN npm run build

# Запускаем
CMD ["npm", "start"]