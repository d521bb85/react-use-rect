.PHONY: clean build-lib build-dts build
.DEFAULT_GOAL := build

clean:
	rm -rf dist

build-lib:
	npx esbuild src/index.ts \
		--outdir=dist \
		--format=esm \
		--target=es6 \
		--external:react \
		--bundle \
		--minify

build-dts:
	npx tsc

build: clean build-lib build-dts
