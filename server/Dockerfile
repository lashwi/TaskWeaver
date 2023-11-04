FROM node:18-alpine

COPY ./node_modules /app/node_modules
COPY ./prisma /app/prisma
COPY ./src /app/src
COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
COPY ./tsconfig.json /app/tsconfig.json
WORKDIR /app

EXPOSE 3000

RUN npm ci

CMD ["npm", "start"]