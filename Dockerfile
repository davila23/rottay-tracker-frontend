### BASE
FROM node:dubnium-alpine AS base
LABEL maintainer "Daniel Avila <daniel.avila@rottay.com>"
# Set the working directory
WORKDIR /app
# Copy project specification and dependencies lock files
COPY package.json yarn.lock tsconfig.json /tmp/
# Install yarn
RUN apk --no-cache add yarn

### DEPENDENCIES
FROM base AS dependencies
# Install Node.js dependencies
RUN cd /tmp && yarn --pure-lockfile


COPY init.sql /docker-entrypoint-initdb.d/

### RELEASE
FROM base AS development

COPY init.sql /docker-entrypoint-initdb.d/
# Copy app sources
COPY . .
# Copy dependencies
COPY --from=dependencies /tmp/node_modules ./node_modules
# Expose application port
EXPOSE 7070





