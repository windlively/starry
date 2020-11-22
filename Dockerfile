FROM node:alpine as builder
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN ng build --aot --prod

FROM nginx:latest
COPY nginx.conf /etc/nginx
COPY --from=builder /app/dist/starry /usr/share/nginx/html
