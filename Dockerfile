# Стадия сборки
FROM node:18 as builder

# Устанавливаем рабочую директорию
WORKDIR /app

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