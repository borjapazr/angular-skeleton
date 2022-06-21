## Include .env file
include .env

## Root directory
ROOT_DIR := $(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))

## Set 'bash' as default shell
SHELL := $(shell which bash)

## Set 'help' target as the default goal
.DEFAULT_GOAL := help

.PHONY: help
help: ## Show this help
	@egrep -h '^[a-zA-Z0-9_\/-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort -d | awk 'BEGIN {FS = ":.*?## "; printf "Usage: make \033[0;34mTARGET\033[0m \033[0;35m[ARGUMENTS]\033[0m\n\n"; printf "Targets:\n"}; {printf "  \033[33m%-25s\033[0m \033[0;32m%s\033[0m\n", $$1, $$2}'

## Target specific variables
%/csr: MODE = csr
%/ssr: MODE = ssr
build/%: TAG ?= $(MODE)

.PHONY: build/csr build/ssr
build/csr: ## Build csr image
build/ssr: ## Build ssr image
build/csr build/ssr:
	@echo "📦 Building project Docker image..."
	@docker build --build-arg PORT=$(PORT) --target $(MODE) -t $(APP_NAME):$(TAG) -f ./docker/Dockerfile .

.PHONY: start/csr start/ssr
start/csr: ## Start application in Client Side Rendering mode
start/ssr: ## Start application in Server Side Rendering mode
start/csr start/ssr:
	@echo "▶️ Starting app in $(MODE) mode (Docker)..."
	@docker-compose -f ./docker/docker-compose.$(MODE).yml --env-file .env up --build

.PHONY: stop/csr stop/ssr
stop/csr: ## Stop application in Client Side Rendering mode
stop/ssr: ## Stop application in Server Side Rendering mode
stop/csr stop/ssr:
	@echo "🛑 Stopping app..."
	@docker-compose -f ./docker/docker-compose.$(MODE).yml --env-file .env down

.PHONY: clean/csr clean/ssr
clean/csr: ## Clean CSR application
clean/ssr: ## Clean SSR application
clean/csr clean/ssr:
	@echo "🧼 Cleaning all resources..."
	@docker-compose -f ./docker/docker-compose.$(MODE).yml --env-file .env down --rmi local --volumes --remove-orphans
