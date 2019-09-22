FROM nginx

COPY nginx.conf /etc/nginx/
COPY dist /usr/share/nginx/html
COPY betextips.crt /etc/ssl/
COPY betextips.key /etc/ssl/

EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
