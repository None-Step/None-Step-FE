FROM node:20.12.2-alpine3.18 AS base
WORKDIR /react
COPY . .
RUN npm install -g serve
CMD npm run dev -- --host
