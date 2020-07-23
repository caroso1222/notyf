const fs = require('fs');
const del = require('del');
const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const uglify = require('rollup-plugin-uglify');
const pkg = require('./package.json');
const typescript = require('rollup-plugin-typescript2');
var sass = require('node-sass');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var postcss = require('postcss');

const bundles = [
  {
    format: 'es',
    plugins: [],
    babelPresets: ['stage-1'],
    file: pkg.module,
    input: 'src/index.ts',
  },
  {
    format: 'cjs',
    plugins: [],
    babelPresets: ['stage-1'],
    file: pkg.main,
    input: 'src/index.ts',
  },
  {
    format: 'iife',
    plugins: [uglify.uglify()],
    babelPresets: ['es2015-rollup', 'stage-1'],
    babelPlugins: [],
    name: 'Notyf',
    minify: true,
    file: 'notyf.min.js',
    input: 'src/notyf.ts',
  },
  {
    format: 'umd',
    babelPresets: ['es2015-rollup', 'stage-1'],
    babelPlugins: [],
    name: 'Notyf',
    file: 'notyf.umd.js',
    input: 'src/notyf.ts',
  },
];

let promise = Promise.resolve();

// Clean up the output directory
promise = promise.then(() => del(['dist/*']));

// Compile source code into a distributable format with Babel and Rollup
for (const config of bundles) {
  promise = promise.then(() =>
    rollup
      .rollup({
        input: config.input,
        external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
        plugins: [
          babel({
            babelrc: false,
            exclude: 'node_modules/**',
            presets: config.babelPresets,
            plugins: config.babelPlugins,
          }),
          typescript({
            typescript: require('typescript'),
          }),
        ].concat(config.plugins),
      })
      .then((bundle) => {
        compileSass();
        return bundle.write({
          file: 'dist/' + config.file,
          format: config.format,
          sourceMap: !config.minify,
          ...(config.name && { name: config.name }),
        });
      }),
  );
}

// Copy package.json and LICENSE.md
promise = promise.then(() => {
  delete pkg.private;
  delete pkg.prettier;
  delete pkg.devDependencies;
  delete pkg.scripts;
  fs.writeFileSync('dist/package.json', JSON.stringify(pkg, null, '  '), 'utf-8');
  fs.writeFileSync('dist/LICENSE.md', fs.readFileSync('LICENSE.md', 'utf-8'), 'utf-8');
  fs.writeFileSync('dist/README.md', fs.readFileSync('README.md', 'utf-8'), 'utf-8');
});

promise.catch((err) => console.error(err.stack));

const stylesSrc = 'src/notyf.scss';
const stylesMin = 'dist/notyf.min.css';

function compileSass() {
  sass.render(
    {
      file: stylesSrc,
      outFile: stylesMin,
    },
    function (error, result) {
      if (!error) {
        postcss([autoprefixer, cssnano])
          .process(result.css, {
            from: stylesSrc,
            to: stylesMin,
          })
          .then(function (result) {
            result.warnings().forEach(function (warn) {
              console.warn(warn.toString());
            });
            // No errors during the compilation, write this result on the disk
            fs.writeFile(stylesMin, result.css, function (err) {
              if (err) {
                console.warn(err);
              }
            });
          });
      }
    },
  );
}
