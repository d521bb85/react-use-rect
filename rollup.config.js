import path from 'path';
import resolve from '@rollup/plugin-node-resolve';
import esbuild from 'rollup-plugin-esbuild';
import pkg from './package.json';

const INPUT = './src/index.ts';
const DIST_DIR = './dist';
const ESBUILD_TARGET = 'es2018';
const EXTERNALS = [
  ...Object.keys(pkg.dependencies ?? {}),
  ...Object.keys(pkg.peerDependencies ?? {})
];

export default [bundleESM(), bundleCJS()];

function bundleESM() {
  return {
    input: INPUT,
    output: {
      file: path.join(DIST_DIR, `${pkg.name}.esm.js`),
      format: 'esm',
      sourcemap: true
    },
    external: EXTERNALS,
    plugins: [resolve(), esbuild({ target: ESBUILD_TARGET })]
  };
}

function bundleCJS() {
  return {
    input: INPUT,
    output: {
      file: path.join(DIST_DIR, `index.js`),
      format: 'cjs',
      sourcemap: true
    },
    external: EXTERNALS,
    plugins: [resolve(), esbuild({ target: ESBUILD_TARGET })]
  };
}
