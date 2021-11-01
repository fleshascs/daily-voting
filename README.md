# Voting Bot For **[cs-servers.lt](http://cs-servers.lt)** And **[cstops.lt](https://cstops.lt)**

## Dependencies

- Tesseract OCR https://github.com/tesseract-ocr/tesseract

## run AWS Lambda locally

https://github.com/aws/aws-lambda-nodejs-runtime-interface-client

```shell script
docker build -t voting .

docker run -d -v ~/.aws-lambda-rie:/aws-lambda -p 9000:8080 \
 --entrypoint /aws-lambda/aws-lambda-rie \
 voting:latest \
 /usr/local/bin/npx aws-lambda-ric build/src/index.handler

curl -XPOST "http://localhost:9000/2015-03-31/functions/function/invocations" -d '{}'
```
