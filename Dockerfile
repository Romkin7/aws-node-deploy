FROM node:lts-alpine-22.14.0
WORKDIR '/app'
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm ci --only=production
COPY . .
CMD ["npm", "run", "start"]