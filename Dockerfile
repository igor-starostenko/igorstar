FROM node:10

WORKDIR /opt

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 8000

CMD ["yarn", "develop"]
