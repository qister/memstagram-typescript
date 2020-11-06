run:
	cd server;\
		npm run dev;

client-install:
	cd client;\
		npm i;

server-install:
	cd server;\
		npm i;

install-all:
	make server-install
	make client-install

app-init:
	make install-all
	make run