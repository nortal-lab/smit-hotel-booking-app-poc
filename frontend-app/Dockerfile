FROM node:20 AS build
WORKDIR /usr/local/app

COPY ./ /usr/local/app/

RUN npm install --force
RUN npm run build

FROM nginx:alpine

COPY default.conf /etc/nginx/conf.d
RUN apk add --no-cache dos2unix && dos2unix /etc/nginx/conf.d/default.conf && apk del dos2unix

COPY --from=build /usr/local/app/dist/frontend-app /usr/share/nginx/html

EXPOSE 80
