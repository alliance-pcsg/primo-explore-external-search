import gulp from 'gulp'
import footer from 'gulp-footer'
import concat from 'gulp-concat'
import merge from 'gulp-merge'
import bs from 'browser-sync'
import json from 'rollup-plugin-json'
import html from 'rollup-plugin-html'
import babel from 'rollup-plugin-babel'
import { rollup } from 'rollup'

import pkg from './package.json'

const serve = () => bs.init({
    name: 'primo-proxy',
    proxy: pkg.config.primo_host,
    serveStatic: [{
      route: `/primo-explore/custom/${pkg.config.primo_view}`,
      dir: 'tmp',
    }],
    startPath: `/primo-explore/search?vid=${pkg.config.primo_view}`,
})

const build = () => rollup({
    input: pkg.module,
    external: ['angular'],
    plugins: [json(), html(), babel()],
})
.then(bundle => {
    bundle.write({
        file: pkg.browser,
        format: 'iife',
        name: 'extsearch',
        sourcemap: true,
        globals: {
            angular: 'angular',
        },
    })
})

const buildCustomJS = () => merge(
    gulp.src(pkg.browser)
    .pipe(footer(`\n\nangular.module('viewCustom', ['externalSearch'])`)),
    gulp.src(['tmp/js/*.js', '!tmp/js/custom.js'])
)
.pipe(concat('custom.js'))
.pipe(gulp.dest('tmp/js'))

const watchPlugin = () => gulp.watch('src/**/*', build)

const watchCustomJS = () => gulp.watch(['tmp/js/*.js', '!tmp/js/custom.js', pkg.browser], buildCustomJS)

const watchPackage = () => gulp.watch('tmp/**/*', bs.reload)

const watch = gulp.parallel(watchPlugin, watchCustomJS, watchPackage)

const develop = gulp.series(
    gulp.series(build, buildCustomJS),
    gulp.parallel(watch, serve)
)

export {
    serve,
    build,
    buildCustomJS,
    watchPlugin,
    watchCustomJS,
    watchPackage,
    watch,
    develop,
}

export default develop
