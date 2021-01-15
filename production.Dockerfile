FROM node:14 as builder
COPY ["package.json","package-lock.json","/usr/src/"]
WORKDIR /usr/src/
RUN npm install --only=production
COPY ["./","/usr/src/"]
RUN npm install --only=development

RUN npm run test
RUN tsc 

#Productive image
FROM node:14
COPY ["package.json","package-lock.json","/usr/src/"]
WORKDIR /usr/src/
RUN npm install --only=production
COPY --from=builder ["/usr/src/build/index.js","/usr/src/"]

EXPOSE 3000
CMD ["node", "index.js"]