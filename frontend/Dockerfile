
FROM nginx:1.21.0-alpine
 

WORKDIR /usr/app
  
COPY ./app/* /usr/share/nginx/html/

EXPOSE 80

# ENTRYPOINT [ "/usr/local/bin/entrypoint.sh" ]

CMD [ "nginx", "-g", "daemon off;"]


## Documentação
# https://somatorio.org/pt-br/post/docker_react_multi_ambiente/