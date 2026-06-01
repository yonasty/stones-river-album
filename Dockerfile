FROM node:20-alpine AS build
WORKDIR /app
ARG VITE_SHOPIFY_DOMAIN
ARG VITE_SHOPIFY_STOREFRONT_TOKEN
ENV VITE_SHOPIFY_DOMAIN=$VITE_SHOPIFY_DOMAIN
ENV VITE_SHOPIFY_STOREFRONT_TOKEN=$VITE_SHOPIFY_STOREFRONT_TOKEN
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
