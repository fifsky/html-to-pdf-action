FROM fifsky/html-to-pdf
LABEL MAINTAINER="Xudong Cai <fifsky@gmail.com>"

ENTRYPOINT ["node", "/lib/main.js"]
