FROM node:lts-alpine

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

RUN npm install --legacy-peer-deps

RUN npm install -g @angular/cli

COPY . .

EXPOSE 4200

RUN chown -R node /usr/src/app
USER node

CMD ["ng", "serve", "--host", "0.0.0.0"]
