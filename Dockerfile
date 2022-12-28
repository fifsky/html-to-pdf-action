FROM ghcr.io/puppeteer/puppeteer:16.1.0

LABEL MAINTAINER="Xudong Cai <fifsky@gmail.com>"

COPY . .

#RUN mv simsun.ttf /usr/local/share/fonts/

RUN npm install --production

ENTRYPOINT ["node", "/lib/main.js"]
