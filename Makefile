.PHONY: clean check build-esm build-cjs build-dts build
.DEFAULT_GOAL := build

clean:
	rm -rf dist

check:
	npm run check

build-esm:
	npx esbuild src/index.ts \
		--outfile=dist/index.esm.js \
		--format=esm \
		--target=es6 \
		--external:react \
		--bundle

build-cjs:
	npx esbuild src/index.ts \
		--outfile=dist/index.js \
		--format=cjs \
		--target=es6 \
		--external:react \
		--bundle

build-dts:
	npx tsc

build: clean check build-esm build-cjs build-dts
