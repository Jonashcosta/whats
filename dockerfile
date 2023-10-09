FROM node:16

WORKDIR /usr/app
COPY package*.json ./
RUN npm install 
COPY  . .
RUN  npx prisma generate
#CMD npx prisma migrate dev --name init

CMD node dist/index.js

EXPOSE 5699:5699