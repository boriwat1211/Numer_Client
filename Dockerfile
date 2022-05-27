FROM node:17.4.0

WORKDIR /usr/local/bin/web

ENV PATH /usr/local/bin/web/node_modules/.bin:$PATH

COPY . /usr/local/bin/web/


RUN npm install

RUN npm run build

CMD ["npm","start"]