FROM node:24-bookworm

WORKDIR /opt

RUN npm install -g --force corepack && corepack enable

RUN apt-get update && apt-get install -y \
    chromium \
    ca-certificates \
    fonts-liberation \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

ENV CHROME_PATH=/usr/bin/chromium

COPY .yarn ./.yarn
COPY .yarnrc.yml ./
COPY package.json yarn.lock ./

RUN yarn install --immutable

COPY . .

RUN yarn build

CMD ["yarn", "lhci", "autorun", "--config=./lighthouserc.cjs"]

