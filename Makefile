.PHONY: clean build-esm build-cjs build-dts build
.DEFAULT_GOAL := build

clean:
	rm -rf dist

build-esm:
	npx esbuild src/index.ts \
		--outfile=dist/index.mjs \
		--format=esm \
		--target=es6 \
		--external:react \
		--bundle \
		--minify

build-cjs:
	npx esbuild src/index.ts \
		--outfile=dist/index.js \
		--format=cjs \
		--target=es6 \
		--external:react \
		--bundle \
		--minify

build-dts:
	npx tsc

build: clean build-esm build-cjs build-dts
