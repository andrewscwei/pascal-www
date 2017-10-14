# © Andrew Wei

FROM nginx

COPY config/nginx.conf /etc/nginx/nginx.conf
COPY public /usr/share/nginx/html

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
