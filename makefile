# make 
run:
	cd server-nestjs;\
		npm run dev;

client-install:
	cd client;\
		npm i --legacy-peer-deps;

server-nestjs-install:
	cd server-nestjs;\
		npm i --legacy-peer-deps;

root-install:
	npm i --legacy-peer-deps;

install-all:
	make root-install
	make server-nestjs-install
	make client-install

app-init:
	make install-all
	make run