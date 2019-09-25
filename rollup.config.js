const commonjs = require('rollup-plugin-commonjs');

const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');

const path = require('path');

module.exports = {
  input: 'src/index.js',
  output: {
    file: 'umd/bundle.umd.js',
    format: 'umd',
    name: 'jsActions',
  },
  plugins: [
    babel({ configFile: path.resolve(__dirname, 'babel.config.js') }),
    resolve(),
    commonjs(),
  ],
};
