FROM node:10

WORKDIR /usr/src/app

COPY ./server/package*.json ./

RUN npm install
# RUN npm ci --only=production

COPY ./server .
COPY ./client/build ./client/build

EXPOSE 5000

CMD [ "node", "index.js" ]