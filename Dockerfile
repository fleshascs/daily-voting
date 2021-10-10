FROM node:16 AS BUILD_IMAGE
RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin
WORKDIR /usr/app
COPY . /usr/app

RUN npm install && npm run build

RUN npm prune --production
RUN /usr/local/bin/node-prune

FROM node:16-alpine
WORKDIR /usr/app
# RUN chown -R cron /usr/app
# RUN chown -R cron /var/log
# USER cron

COPY --from=BUILD_IMAGE /usr/app/build ./build
COPY --from=BUILD_IMAGE /usr/app/node_modules ./node_modules
COPY --from=BUILD_IMAGE /usr/app/crontab ./crontab

# # FROM alpine:3.6

# # copy crontabs for root user
# COPY /cronjobs /etc/crontabs/root

# # start crond with log level 8 in foreground, output to stderr
# CMD ["crond", "-f", "-d", "8"]


#Specify a base image
# FROM node:16-alpine
# WORKDIR '/usr/app'

# RUN chown -R cron /usr/app


# COPY . /usr/app

# RUN npm install && npm run build

# # # copy crontabs for root user
# COPY /cronjobs /etc/crontabs/root

# # start crond with log level 8 in foreground, output to stderr
# CMD ["crond", "-f", "-d", "8"]
# CMD cron && tail -f /var/log/cron.log

CMD /usr/sbin/crond -f -l 0 -c /usr/app/crontab -L /var/log/cron.log
# CMD [ "node", "./build/src/index.js" ]