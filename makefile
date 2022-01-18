# make 
run:
	cd server-nestjs;\
		npm run dev;

client-install:
	cd client;\
		npm i;

server-nestjs-install:
	cd server-nestjs;\
		npm i;

root-install:
	npm i;

install-all:
	make root-install
	make server-nestjs-install
	make client-install

app-init:
	make install-all
	make run

image-build:
	docker-compose up --build

image-run:
	docker-compose up -d

image-down:
	docker-compose down
