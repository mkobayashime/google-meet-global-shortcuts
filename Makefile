wxt = bunx wxt
biome = yarn run biome

deps: PHONY
	bun install

lint: deps PHONY
	$(biome) check .

lint.fix: deps PHONY
	$(biome) check --fix .

dev: deps PHONY
	$(wxt)

build: deps PHONY
	$(wxt) build

zip: deps PHONY
	$(wxt) zip

typecheck: deps PHONY
	bunx tsc --noEmit

typecheck.watch: deps PHONY
	bunx tsc --noEmit --watch

PHONY:
