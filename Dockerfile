FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install -g typescript

RUN npm install

COPY . .

# Se usar TypeScript
RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]
