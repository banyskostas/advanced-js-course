FROM node:8.9.4
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY dist ./dist

EXPOSE 8888

CMD [ "npm", "run", "start:prod" ]
