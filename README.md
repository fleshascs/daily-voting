# Voting Bot For **[cs-servers.lt](http://cs-servers.lt)** And **[cstops.lt](https://cstops.lt)**

## Dependencies

- Tesseract OCR https://github.com/tesseract-ocr/tesseract

## run using cron job

```shell script
docker build -t fleshas/voting .
docker run -d -e PROXY_API_KEY=123 -d --name voting fleshas/voting:latest
```

## run AWS Lambda locally

https://github.com/aws/aws-lambda-nodejs-runtime-interface-client

```shell script
docker build -f Dockerfile.lambda -t voting .

docker run -e PROXY_API_KEY=123 -d -v ~/.aws-lambda-rie:/aws-lambda -p 9000:8080 \
 --entrypoint /aws-lambda/aws-lambda-rie \
 voting:latest \
 /usr/local/bin/npx aws-lambda-ric build/src/aws_lambda.handler

curl -XPOST "http://localhost:9000/2015-03-31/functions/function/invocations" -d '{}'
```

## run dev container

```shell script
docker-compose -f docker-compose.local.yml build
docker-compose -f docker-compose.local.yml up
```
