const gulp = require('gulp')
const browserify = require('browserify')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const watchify = require('watchify')
const sass = require('gulp-sass')
const chalk = require('chalk')
const tsify = require('tsify')
const browserifyShim = require('browserify-shim')
const { spawn } = require('child_process')

gulp.task('html', [], function() {
    return gulp.src('src/**/*.html', { base: 'src' })
        .pipe(gulp.dest('dist'))
})

gulp.task('html:watch', ['html'], function() {
    return gulp.watch(['src/**/*.html'], ['html'])
})

function createBundler() {
    return browserify({
        debug: true,
        entries: './src/app/app.ts',
        cache: {},
        packageCache: {}
    }).plugin(tsify).transform(browserifyShim, {
        global: true
    })
}

function bundle(bundler) {
    return bundler.bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(gulp.dest('./dist/scripts/'))
}

gulp.task('js', [], function() {
    return bundle(createBundler())
})

gulp.task('js:watch', [], function() {
    const bundler = createBundler().plugin(watchify)
    function watch() {
        console.log('Js change detected. Rebuilding.')
        return bundle(bundler)
                .on('error', m => console.log(chalk.red('Browserify: ' + m)))
    }

    bundler.on('update', watch)
    bundler.on('log', m => console.log(chalk.cyan('Browserify: ' + m)))

    return bundle(bundler)
})

gulp.task('sass', function () {
    return gulp.src('./src/styles/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/styles'));
});
 
gulp.task('sass:watch', ['sass'], function () {
    gulp.watch('./src/styles/**/*.scss', ['sass']);
});

gulp.task('build', ['html', 'js', 'sass'])
gulp.task('watch', ['html:watch', 'js:watch', 'sass:watch', 'server'])

let server
gulp.task('server', [], function() {
    if (server) server.kill()
    server = spawn('node', ['node_modules/.bin/http-server', 'dist', { stdio: 'inherit' }])
    server.on('close', code => {
        if (code === 8) {
            console.log(chalk.red('Error running http server'))
            server = null
        }
    })
})
