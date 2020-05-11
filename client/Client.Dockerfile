FROM node:current-slim

RUN mkdir -p /app/client
WORKDIR /app/client

ENV PATH /app/client/node_modules/.bin:$PATH

COPY /client/package.json ./

RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent

CMD [ "npm", "run", "start" ]
