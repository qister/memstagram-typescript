# make 
run:
	cd server;\
		npm run dev;

client-install:
	cd client;\
		npm i --legacy-peer-deps;

server-install:
	cd server;\
		npm i --legacy-peer-deps;

root-install:
	npm i --legacy-peer-deps;

install-all:
	make root-install
	make server-install
	make client-install

app-init:
	make install-all
	make run