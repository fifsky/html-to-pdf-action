FROM buildkite/puppeteer:v1.15.0

LABEL MAINTAINER="Xudong Cai <fifsky@gmail.com>"

COPY . .

#RUN mv simsun.ttf /usr/local/share/fonts/

RUN node -v
RUN npm -v
RUN npm install --production
RUN cat /node_modules/@actions/http-client/node_modules/undici/package.json

ENTRYPOINT ["node", "/lib/main.js"]
