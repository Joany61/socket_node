FROM node:20-alpine

USER root 

WORKDIR /app

RUN chown -R node /app && chmod -R a-rwx /app

USER node 

COPY package*json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm", "start" ]
