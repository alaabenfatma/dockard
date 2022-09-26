# Node image
FROM node:alpine AS builder

WORKDIR /app

COPY package.json package.json

RUN npm install --production

COPY . .

RUN npm run build


# NGINX image
FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf *

COPY --from=builder /app/build .

# To run the image: docker run -p 80:80 <image_id>