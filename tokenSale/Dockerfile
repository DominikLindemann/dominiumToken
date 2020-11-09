FROM node:12.16.1 AS builder
WORKDIR /app
COPY . .
RUN  npm install
# RUN npm install -g @angular/cli
RUN npm run build


FROM nginx:1.15.8-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist/tokensale/ /usr/share/nginx/html

