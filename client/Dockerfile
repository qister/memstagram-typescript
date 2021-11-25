FROM node:16

WORKDIR /src

ADD package.json /src 

RUN npm i --silent

ADD . /src 

# RUN npm run build 

CMD ["npm", "run", "start"]
