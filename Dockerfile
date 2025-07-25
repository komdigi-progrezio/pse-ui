## FROM registry.dev.layanan.go.id/base/node:12-alpine
FROM node:16-alpine

RUN apk add --update --no-cache python3 g++ make && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools
RUN python --version
RUN npm info node-gyp version

## install simple http server for serving static content
RUN npm install -g http-server

#FROM registry.dev.layanan.go.id/base/node:12-alpine-pse

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY . .

# install project dependencies
RUN npm install cross-env --save-dev
##RUN npm install --legacy-peer-deps

#ENV NODE_OPTIONS=--openssl-legacy-provider

# copy project files and folders to the current working directory (i.e. 'app' folder)
#COPY . .

# build app for production with minification
RUN npm run build

# Set the base image to nginx
FROM nginx:latest

# Remove the default nginx static content
RUN rm -rf /usr/share/nginx/html/*
COPY ./docker/nginx/default.conf /etc/nginx/nginx.conf

# Copy the built Vue.js application from the previous stage
COPY --from=0 /app/dist /usr/share/nginx/html

# Expose the application's port (optional, if using default NGINX configuration)
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
