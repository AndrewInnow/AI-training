FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["node", "./dist/index.js"]