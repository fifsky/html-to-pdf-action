FROM node:10-alpine
LABEL MAINTAINER="Xudong Cai <fifsky@gmail.com>"
ENV TZ=Asia/Shanghai
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

RUN apk update && apk upgrade && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
    apk --no-cache add \
    tzdata \
    curl \
    ca-certificates \
    chromium@edge \
    nss@edge \
    fontconfig \
    freetype \
    ttf-dejavu \
    ttf-droid \
    ttf-freefont \
    mesa-egl \
    mesa-gles \
    && mkdir /usr/lib/chromium/swiftshader/ \
    && cp /usr/lib/libGLESv2.so.2 /usr/lib/chromium/swiftshader/libGLESv2.so \
    && cp /usr/lib/libEGL.so.1 /usr/lib/chromium/swiftshader/libEGL.so \
    && ln -sf /usr/bin/chromium-browser /usr/local/bin/chrome \
    && ln -sf /usr/share/zoneinfo/$TZ /etc/localtime \
    && echo $TZ > /etc/timezone \
    && mkdir -p /usr/share/fonts/chinese/TrueType/
COPY simsun.ttf /usr/share/fonts/chinese/TrueType/simsun.ttf
RUN fc-cache -fv

COPY . .

RUN npm install --production

ENTRYPOINT ["node", "/lib/main.js"]
