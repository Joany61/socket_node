FROM node:20-alpine

USER root 

WORKDIR /app

RUN chown -R node /app

COPY package.json .

COPY package-lock.json .

RUN npm install

COPY . .

RUN chmod a+rwx /app

USER node

EXPOSE 8080

CMD [ "npm", "start" ]
