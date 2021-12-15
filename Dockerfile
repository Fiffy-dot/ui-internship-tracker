# Stage 1
FROM node:17-alpine3.12 as build-stage

WORKDIR /app-ui
COPY package.json .
RUN npm install
COPY . .

# ARG REACT_APP_API_BASE_URL
# ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL

RUN npm run build

# Stage 2
FROM nginx:1.21.4

COPY --from=build-stage /app-ui/build /usr/share/nginx/html
EXPOSE $REACT_DOCKER_PORT

CMD nginx -g 'daemon off;'
