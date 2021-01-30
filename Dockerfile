FROM nginx:1.19.6-alpine

WORKDIR /usr/share/nginx/html

COPY ./build .
