FROM node:16-alpine  AS BUILD_IMAGE
WORKDIR /user/app
COPY . /user/app

RUN apk update 
RUN apk --no-cache add \
    g++ \
    make \
    cmake \
    unzip \
    curl-dev \
    autoconf \
    automake \
    libtool \
    libexecinfo-dev \
    python3

RUN npm install && npm run build

RUN npm prune --production

FROM node:16-alpine

WORKDIR /user/app

COPY --from=BUILD_IMAGE /user/app/build ./build
COPY --from=BUILD_IMAGE /user/app/node_modules ./node_modules

RUN apk update 
RUN apk --no-cache add \
    curl-dev \
    tesseract-ocr

RUN echo '* * * * * node /user/app/build/src/index.js' > /etc/crontabs/root

CMD ["crond", "-f", "-d", "8"]

# CMD ["node","build/src/index.js"]
