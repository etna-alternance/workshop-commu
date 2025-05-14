FROM node:20-alpine3.21

WORKDIR /app

RUN apk add --no-cache libc6-compat libpq gcc g++ make python3

COPY package.json .
RUN npm install --production

COPY app.js .

CMD ["npm", "start"]
