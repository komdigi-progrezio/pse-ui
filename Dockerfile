FROM node:lts-alpine

RUN apk add --no-cache python3 g++ make

# install simple http server for serving static content
RUN npm install -g http-server

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY . .

# install project dependencies
RUN yarn upgrade
RUN yarn install

ENV NODE_OPTIONS=--openssl-legacy-provider

# copy project files and folders to the current working directory (i.e. 'app' folder)
#COPY . .

# build app for production with minification
RUN yarn build

# Set the base image to nginx
FROM nginx:alpine

# Remove the default nginx static content
RUN rm -rf /usr/share/nginx/html/*
COPY ./docker/nginx/default.conf /etc/nginx/nginx.conf

# Copy the built Vue.js application from the previous stage
COPY --from=0 /app/dist /usr/share/nginx/html

# Expose the application's port (optional, if using default NGINX configuration)
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
