FROM node:12-alpine

# Create app directory
WORKDIR /usr/node-app


COPY . .

WORKDIR ./

RUN npm install

RUN npm run build

EXPOSE 3000

ENTRYPOINT ["npm", "run", "start:prod" ]
