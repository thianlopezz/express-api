docker stop api-jm
docker rm api-jm
docker rmi thianlopezz/express-api
docker build --tag thianlopezz/express-api .
# docker run --name ecodelivery.api -p 3001:3001 -d ecodelivery/ecodelivery.api
docker run --name api-jm -e PORT=80 -p 3001:80 -d thianlopezz/express-api
