
FROM node:22-alpine

ENV NODE_ENV=production
ENV PORT=3000

WORKDIR /app

COPY package.json ./

COPY app.js ./

COPY test/ ./test/

USER node

EXPOSE 3000

CMD ["npm", "start"]

