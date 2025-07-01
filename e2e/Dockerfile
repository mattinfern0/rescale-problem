FROM mcr.microsoft.com/playwright:v1.53.1-noble

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

CMD ["npx", "playwright", "test", "--reporter=dot"]
