const gulp = require('gulp');
const gulp_ts = require('gulp-typescript');
const tslint = require('gulp-tslint');
const jshint = require('gulp-jshint');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const nodemon = require('gulp-nodemon');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const nunjucks = require('gulp-nunjucks');

const tsProject = gulp_ts.createProject('./tsconfig.json');

/** ----------------------------------- Gulp Tasks ------------------------------*/
// lint typescript files using tslint
gulp.task('lint_ts', () => {
    return gulp.src('./src/**/*')
        .pipe(tslint({
            formatter: 'stylish'
                // "json" prints stringified JSON to console.log.
                // "prose" prints short human-readable failures to console.log.
                // "verbose" prints longer human-readable failures to console.log.
                // "msbuild" for Visual Studio
                // "vso" outputs failures in a format that can be integrated with Visual Studio Online.
                // "checkstyle" for the Checkstyle development tool
                // "pmd" for the PMD source code analyzer
                // "stylish" human-readable formatter which creates stylish messages.

        }))
        .pipe(tslint.report({}));
});

// use typescript "tsconfig.json" to transpile all .ts files to js
gulp.task('compile_ts', () => {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest('dist'));
});

// minify .js files: backend.min.js will be used in production
// gulp.task('minify_js', () => {
//     return gulp.src('./dist/**/*.js')
//         .pipe(concat('backend.min.js')) // concat all js files and rename as backend.min.js
//         .pipe(uglify()) // uglify backend.min.js
//         .pipe(gulp.dest('dist')); // save backend.min.js in dist folder
// });

// restart dev server using nodemon
gulp.task('dev_server', ['lint_js'], () => {
    const stream = nodemon({
        script: 'dist/server.js',
        ext: 'njk html js',
        ignore: ['ignored.js'],
        // tasks: ['lint_js']
    });

    stream.on('start', () => {
            gulp.task('browser_sync', ['sass'], () => {
                browserSync.init({
                    // options
                    server: {
                        baseDir: "views",
                        directory: true,
                        serveStaticOptions: {
                            extensions: ["njk"]
                        }
                    },
                    port: 3000,
                    proxy: 'localhost:3000'
                }, (err, bs) => {

                });

                // watch for html changes
                // gulp.watch("views/**/*.njk").on('change', browserSync.reload);
                // watch for njk changes
                gulp.watch("views/**/*.njk").on('change', browserSync.reload);
                // watch for css or sass changes
                gulp.watch("public/scss/style.scss", ['sass']);
            });
        })
        .on('crash', () => {
            console.error('Application has crashed!\n');
            stream.emit('restarting in 10 secs...', 10); // restart the server in 10 seconds
        });
});

// lint .js file with hintjs
gulp.task('lint_js', () => {
    return gulp.src('dist/**/*.js')
        .pipe(jshint());
});

// scss. css
gulp.task('sass', () => {
    return gulp.src('public/scss/style.scss')
        .pipe(sass())
        .pipe(gulp.dest('public/css'))
        .pipe(browserSync.stream()); // notify browser sync to be aware
});

// minify css
gulp.task('minify_css', () => {
    return gulp.src('public/css/style.css')
        .pipe(uglify())
        .pipe(rename('public/css/style.min.css'))
        .pipe(gulp.dest('public/css'));
});

// precompile nunjucks: template.js
gulp.task('precompile_njk', () => {
    return gulp.src('views/**/*')
        .pipe(nunjucks.precompile())
        .pipe(gulp.dest('views'));
});

// watch ts src
gulp.task('watch', () => {
    console.log('watching for file changes...');
    gulp.watch('src/**/*', ['lint_ts']);
    gulp.watch('src/**/*', ['compile_ts']);
    // gulp.watch('dist/**/*.js', ['minify_js']);
    gulp.watch('public/css', ['minify_css']);
});

// run all gulp tasks as default: run gulp as npx gulp or npm run gulp
gulp.task('default', ['lint_ts', 'compile_ts', 'sass', 'minify_css', 'precompile_njk', 'dev_server', 'watch']);

// In version 4: use this to run all tasks
// gulp.task('default', gulp.parallel('lint_ts', 'compile_ts', 'minify_js', 'lint_js', 'dev_server', 'watch'));