# make 
run:
	cd server-nestjs;\
		yarn run dev;

client-install:
	cd client;\
		yarn install;

server-nestjs-install:
	cd server-nestjs;\
		yarn install;

root-install:
	yarn install;

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
