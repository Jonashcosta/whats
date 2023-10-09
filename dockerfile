FROM node:16

WORKDIR /usr/app
#COPY package*.json ./
COPY  . .
RUN npm install  && npx prisma generate && npx prisma migrate dev --name init


CMD node dist/index.js

EXPOSE 3000:5699