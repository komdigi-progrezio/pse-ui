FROM nginx:stable-alpine as production-stage
VOLUME /tmp
ADD /dist /usr/share/nginx/html
COPY .deploy/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
