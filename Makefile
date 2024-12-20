install:
	npm ci
start:
	npm run dev
lint:
	npx eslint .
test-coverage:
	npm test -- --coverage
test: 
	npm run test
	
.PHONY: test
