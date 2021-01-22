FROM node:14
COPY ["package.json","package-lock.json","/usr/src/"]
WORKDIR /usr/src/
RUN npm ci --no-cache --pull
EXPOSE 3000
CMD ["npx", "ts-node-dev", "--transpile-only","-r" ,"tsconfig-paths/register","--respawn","--poll", "index.ts"]