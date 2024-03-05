# Base image
FROM node:20-alpine as base
RUN apk update

# Building image
FROM base AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
 
# Runner image
FROM base AS runner
USER node

WORKDIR /app

COPY --from=builder --chown=node:node /app/package.json .
COPY --from=builder --chown=node:node /app/yarn.lock .
COPY --from=builder --chown=node:node /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/dist ./dist

CMD ["npm", "run", "start:prod"]
