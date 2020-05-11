FROM node:8.7.0-alpine

RUN mkdir -p app/server
WORKDIR /app/server

COPY /server/package.json ./

RUN npm install

CMD ["npm", "run", "server"]