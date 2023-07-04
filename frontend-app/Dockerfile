FROM node:20 AS build
WORKDIR /usr/local/app

COPY ./ /usr/local/app/

RUN npm install --force
RUN npm run build

FROM nginx:latest

COPY --from=build /usr/local/app/dist/frontend-app /usr/share/nginx/html

EXPOSE 80
