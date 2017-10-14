# © Andrew Wei

.PHONY: all clean build run

SHELL:=/bin/bash

COLOR_PREFIX="\\033["
COLOR_RESET="$(COLOR_PREFIX)0m"
COLOR_BLACK="$(COLOR_PREFIX)0;30m"
COLOR_RED="$(COLOR_PREFIX)0;31m"
COLOR_GREEN="$(COLOR_PREFIX)0;32m"
COLOR_YELLOW="$(COLOR_PREFIX)0;33m"
COLOR_BLUE="$(COLOR_PREFIX)0;34m"
COLOR_PURPLE="$(COLOR_PREFIX)0;35m"
COLOR_CYAN="$(COLOR_PREFIX)0;36m"
COLOR_LIGHT_GRAY="$(COLOR_PREFIX)0;37m"

namespace:=andrewscwei
project:=calculator3-www
image:=$(namespace)/$(project)
version:=$(shell cat package.json | grep version | head -1 | awk -F: '{ print $$2 }' | sed 's/[",]//g' | tr -d '[[:space:]]')
env:=production
net:=bridge
port:=8080

ENV:=$(shell echo $$(([[ "$(env)" = "dev" ]] || [[ "$(env)" = "devel" ]] || [[ "$(env)" = "development" ]]) && echo "development" || echo "production"))
SUFFIX:=$(shell echo $$(([[ "$(ENV)" = "development" ]]) && echo "-dev" || echo $(SUFFIX)))

all: build

clean: CONTAINERS:=$(shell echo $$(docker ps -a -q))
clean: IMAGE_NAME:=$(shell echo $(subst /,\\/,$(image)))
clean: IMAGES:=$(shell echo $$(docker images | awk '$$1 ~ /^$(IMAGE_NAME)$$/ {print $$3}'))
clean:
	@docker system prune -f
	@COUNT=$(strip $(shell echo $(CONTAINERS) | wc -w)); \
	if [[ "$$COUNT" != "0" ]]; then \
		echo -e $(COLOR_YELLOW)"Removing $$COUNT container(s)..."$(COLOR_RESET); \
		docker stop $(CONTAINERS); \
		docker rm $(CONTAINERS); \
	else \
		echo -e $(COLOR_YELLOW)"No running containers to remove"$(COLOR_RESET); \
	fi
	@COUNT=$(strip $(shell echo $(IMAGES) | wc -w)); \
	if [[ "$$COUNT" != "0" ]]; then \
		echo -e $(COLOR_YELLOW)"Removing $$COUNT image(s)..."$(COLOR_RESET); \
		docker rmi -f $(IMAGES); \
	else \
		echo -e $(COLOR_YELLOW)"No images with name "$(COLOR_CYAN)$(IMAGE_NAME)$(COLOR_YELLOW)" to remove"$(COLOR_RESET); \
	fi

build:
	@echo -e "Building "$(COLOR_CYAN)artifacts$(COLOR_RESET)"..."
	@NODE_ENV=$(ENV) npm run build
	@echo -e "Building "$(COLOR_CYAN)"$(image):$(version)$(SUFFIX)"$(COLOR_RESET)"..."
	@docker build -f Dockerfile --rm=false -t $(image):latest$(SUFFIX) .
	@docker tag $(image):latest$(SUFFIX) $(image):$(version)$(SUFFIX)

run:
	@echo -e "Running "$(COLOR_CYAN)"$(image):latest$(SUFFIX)"$(COLOR_RESET)"..."

ifeq ($(ENV), development)
	@docker run -it --rm --net=$(net) -p $(port):$(port) --name $(project) $(image):latest$(SUFFIX)
else
	@docker run -it --rm --net=$(net) -p $(port):$(port) --name $(project) $(image):latest$(SUFFIX)
endif
