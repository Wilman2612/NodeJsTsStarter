FROM node:14
WORKDIR /usr/src/
COPY ["package.json","package-lock.json","/usr/src/"]
RUN npm ci
EXPOSE 3000
CMD ["npx", "ts-node-dev", "--transpile-only","-r" ,"tsconfig-paths/register","--respawn","--poll","--watch","openapi.yml", "index.ts"]