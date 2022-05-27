FROM node:17.4.0

RUN mkdir  /usr/src/app

WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY . /usr/src/app/

EXPOSE 3000

RUN npm install

CMD ["npm","start"]