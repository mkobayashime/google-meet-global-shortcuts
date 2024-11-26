wxt = bunx wxt

deps: PHONY
	bun install

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
