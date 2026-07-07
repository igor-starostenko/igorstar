FROM node:24-bookworm

WORKDIR /opt

RUN npm install -g --force corepack && corepack enable

# Install Chromium for Lighthouse tests
RUN apt-get update && apt-get install -y \
    chromium \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

COPY .yarn ./.yarn
COPY .yarnrc.yml ./
COPY package.json yarn.lock ./

RUN yarn install --immutable

COPY .

RUN yarn build

EXPOSE 3000

# Default: run lighthouse tests
CMD ["yarn", "test:lighthouse"]
