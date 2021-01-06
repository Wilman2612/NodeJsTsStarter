FROM node:14
COPY ["package.json","package-lock.json","/usr/src/"]
WORKDIR /usr/src/
RUN npm install
EXPOSE 3000
CMD ["npx", "ts-node-dev","--poll","--respawn", "--transpile-only", "index.ts"]