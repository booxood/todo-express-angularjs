TESTS = $(shell find test -type f -name "*.js")
install:
	@npm install
test: install
	mocha --timeout 5000 --reporter spec $(TESTS)

.PHONY: test
