wxt = bunx wxt
oxlint = bunx oxlint
oxfmt = bunx oxfmt

deps: PHONY
ifeq ($(CI), true)
	bun install --frozen-lockfile
else
	bun install
endif

lint: deps PHONY
	$(oxfmt) --check
	$(oxlint) --type-aware

lint.fix: deps PHONY
	$(oxfmt)
	$(oxlint) --fix --type-aware

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
