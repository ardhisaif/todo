FROM node:16.17.1-alpine
ENV MYSQL_HOST=localhost
ENV MYSQL_PORT=3307
ENV MYSQL_USER=todo
ENV MYSQL_PASSWORD=roots
ENV MYSQL_DBNAME=todo_list
RUN mkdir -p /app
WORKDIR /app

COPY package*.json ./

RUN npm install
COPY . .

EXPOSE 3030

CMD ["npm", "start"]