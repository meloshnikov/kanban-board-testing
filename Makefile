install:
	npm ci
start:
	npm run dev
lint:
	npx eslint .
test: 
	npm run test
	
.PHONY: test
