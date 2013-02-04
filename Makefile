
# Group targets
all: deps lint test
ci: lint test

# Install dependencies
deps:
	@echo "Installing dependencies..."
	@npm install

# Lint JavaScript
lint:
	@echo "Linting JavaScript..."
	@./node_modules/.bin/jshint \
		--config ./test/config/jshint.json \
		./{lib,test}/*

# Run all tests
test: test-unit test-integ

# Run unit tests
test-unit:
	@echo "Running unit tests..."
	@./node_modules/.bin/mocha \
		--ui tdd \
		--reporter spec \
		--colors \
		--recursive \
		./test/unit

# Run integration tests
test-integ:
	@echo "Running integration tests..."
	@./node_modules/.bin/mocha \
		--ui tdd \
		--reporter spec \
		--colors \
		--recursive \
		./test/integ

# Run the Node Test app for browser testing
test-server:
	@echo "Running test server..."
	@./node_modules/.bin/supervisor -q ./test/runner/boot.js
