FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache openssl

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

RUN npx --no-install prisma generate
RUN mkdir -p uploads

EXPOSE 5000

CMD ["sh", "-c", "npx --no-install prisma migrate deploy && node src/server.js"]
