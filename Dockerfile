FROM node:24-bookworm

WORKDIR /opt

RUN npm install -g --force corepack && corepack enable

COPY .yarn ./.yarn
COPY .yarnrc.yml ./
COPY package.json yarn.lock ./

RUN yarn install --immutable

COPY .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
