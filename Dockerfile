FROM node:16-alpine  AS BUILD_IMAGE
WORKDIR /function
COPY . /function

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

RUN npm install aws-lambda-ric

RUN npm install && npm run build

RUN npm prune --production

FROM node:16-alpine

WORKDIR /function

COPY --from=BUILD_IMAGE /function/build ./build
COPY --from=BUILD_IMAGE /function/node_modules ./node_modules

RUN apk update 
RUN apk --no-cache add \
    curl-dev \
    tesseract-ocr

RUN ln -s /usr/share/aclocal /usr/local/share/aclocal

ENTRYPOINT ["/usr/local/bin/npx", "aws-lambda-ric"]
CMD ["build/src/index.handler"]
# CMD [ "node", "./build/src/index.js" ]
# CMD ["tesseract", "--version"]