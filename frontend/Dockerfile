FROM node:18-bullseye-slim AS development

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
EXPOSE 3000

CMD ["npm", "run", "dev"]
