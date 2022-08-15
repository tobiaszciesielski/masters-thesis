FROM node:16

WORKDIR /usr/src/app

ENV PORT 4000

COPY . .

RUN npm ci

RUN npx prisma generate

EXPOSE 4000

RUN npm run build

CMD ["node", "./build/src/index.js"]