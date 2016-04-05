.DELETE_ON_ERROR:

BIN           = ./node_modules/.bin
TESTS         = $(shell find src -path '*/__tests__/*-test.js')
SRC           = $(filter-out $(TESTS), $(shell find src -name '*.js'))
LIB           = $(SRC:src/%=lib/%)
MOCHA_OPTS    = -R dot --require babel-core/register 

build::
	@$(MAKE) -j 8 $(LIB)

lint::
	@$(BIN)/eslint src

check::
	@$(BIN)/flow --show-all-errors src

test::
	@$(BIN)/mocha $(MOCHA_OPTS) $(TESTS)

ci::
	@$(BIN)/mocha $(MOCHA_OPTS) --watch --watch-extensions json,md $(TESTS)

version-major version-minor version-patch:: lint test
	@npm version $(@:version-%=%)

push::
	@git push --tags origin HEAD:master

clean::
	@rm -rf lib

lib/%: src/%
	@echo "Building $<"
	@mkdir -p $(@D)
	@$(BIN)/babel $(BABEL_OPTIONS) -o $@ $<

PARSE_FIXTURES_MD := $(shell find src/parse/__tests__ -name '*.md')
PARSE_FIXTURES_JSON := $(PARSE_FIXTURES_MD:%.md=%.json)

build-parse-fixtures:: $(PARSE_FIXTURES_JSON)
clean-parse-fixtures::
	rm -f $(PARSE_FIXTURES_JSON)

src/parse/__tests__/%.json: src/parse/__tests__/%.md
	@echo "Parsing $<"
	@$(BIN)/babel-node ./bin/reactdown-parse $< > $@

RENDER_FIXTURES_MD := $(shell find src/render/__tests__ -name '*.md')
RENDER_FIXTURES_JSON := $(RENDER_FIXTURES_MD:%.md=%.json)
RENDER_FIXTURES_JS := $(RENDER_FIXTURES_MD:%.md=%.js)

build-render-fixtures:: $(RENDER_FIXTURES_JS) $(RENDER_FIXTURES_JSON)
clean-render-fixtures::
	rm -f $(RENDER_FIXTURES_JSON) $(RENDER_FIXTURES_JS)

src/render/__tests__/%.json: src/render/__tests__/%.md
	@echo "Parsing $<"
	@$(BIN)/babel-node ./bin/reactdown-parse $< > $@

src/render/__tests__/%.js: src/render/__tests__/%.md
	@echo "Rendering $<"
	@$(BIN)/babel-node ./bin/reactdown-render $< > $@
