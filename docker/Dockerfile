ARG PORT=5000

# Base image stage
FROM node:18-alpine as node

RUN apk --no-cache -U upgrade
RUN apk update
RUN apk add --no-cache curl
RUN npm install npm@latest -g

# Builder stage
FROM node AS builder
ENV PATH /code/node_modules/.bin:$PATH

WORKDIR /code
COPY package*.json ./
RUN npm install --omit=optional --ignore-scripts && npm cache clean --force

WORKDIR /code/app
COPY . ./

# csr builder stage
FROM builder as csr-builder
RUN npm run build:prod

# ssr builder stage
FROM builder as ssr-builder
RUN npm run build:ssr:prod

# csr stage
FROM nginx:alpine as csr

LABEL maintainer "Borja Paz Rodríguez (@borjapazr)"

ARG PORT
ENV PORT $PORT

EXPOSE $PORT

RUN apk add --no-cache curl

COPY --from=csr-builder /code/app/dist/browser /usr/share/nginx/html
COPY ./docker/nginx/nginx.conf /etc/nginx/conf.d/default.template

HEALTHCHECK --interval=30s --timeout=60s --start-period=10s --retries=3 CMD curl --fail localhost:$PORT || exit 1

CMD ["/bin/sh" , "-c" , "envsubst \"`env | awk -F = '{printf \" \\\\$%s\", $1}'`\" < /etc/nginx/conf.d/default.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]

# ssr stage
FROM node as ssr

LABEL maintainer "Borja Paz Rodríguez (@borjapazr)"

ARG PORT
ENV PORT $PORT
ENV NODE_ENV=production
ENV PATH /home/node/app/node_modules/.bin:$PATH

EXPOSE $PORT

WORKDIR /home/node/app

RUN mkdir dist logs
RUN chown -R node:node /home/node/app
RUN npm install -g pm2

USER node

COPY --chown=node:node package*.json ./docker/pm2/process.json ./
COPY --chown=node:node --from=ssr-builder /code/app/dist ./dist

RUN npm ci --production --ignore-scripts --omit=optional

HEALTHCHECK --interval=30s --timeout=60s --start-period=10s --retries=3 CMD curl --fail localhost:$PORT || exit 1

CMD pm2-runtime ./process.json
