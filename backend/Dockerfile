FROM node:22-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

COPY prisma ./prisma/
RUN npx prisma generate

COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]