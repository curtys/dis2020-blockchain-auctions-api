FROM node:14.2.0-alpine3.11

WORKDIR /app

COPY . .
RUN npm install
RUN npm install truffle
RUN npx truffle compile --config truffle-config-docker.js

CMD [ "npm", "start" ]
