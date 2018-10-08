var gulp = require('gulp');
var clean = require('gulp-clean');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var mq4HoverShim = require('mq4-hover-shim');
var browser = require('browser-sync');
var panini = require('panini');
var concat = require('gulp-concat');
var purgeSourcemaps = require('gulp-purge-sourcemaps');
var port = process.env.SERVER_PORT || 8080;
var nodepath =  'node_modules/';

// Starts a BrowerSync instance
gulp.task('server', function(){
    browser.init({server: './', port: port});
});

function reload(done) {
    browser.reload;
    done();
}

// Watch files for changes
gulp.task('watch:scss', function() {
    gulp.watch('scss/**/*', gulp.series('compile-scss', reload));
});

// Watch files for changes
gulp.task('watch:html', function() {
    gulp.watch('html/**/*', gulp.series('compile-html:reset','compile-html', reload));
});


// Watch files for changes
gulp.task('watch', gulp.parallel('watch:scss','watch:html'));

// Copy Bulma filed into Bulma development folder
gulp.task('setupBulma', function() {
    //Get Bulma from node modules
    gulp.src([nodepath + 'bulma/*.sass']).pipe(gulp.dest('bulma/'));
    gulp.src([nodepath + 'bulma/**/*.sass']).pipe(gulp.dest('bulma/'));
});

// Copy js plugins
gulp.task('copy-plugins', function() {
    return gulp.src([nodepath + 'aos/dist/aos.css']).pipe(gulp.dest('./css'));
});

//Theme Sass variables
var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'compressed',
    includePaths: [nodepath + 'bulma/sass']
};

//Theme Scss variables
var scssOptions = {
    errLogToConsole: true,
    outputStyle: 'compressed',
    includePaths: ['./scss/partials']
};

// Compile Bulma Sass
gulp.task('compile-sass', function () {
    var processors = [
        mq4HoverShim.postprocessorFor({ hoverSelectorPrefix: '.is-true-hover ' }),
        autoprefixer({
            browsers: [
                "Chrome >= 45",
                "Firefox ESR",
                "Edge >= 12",
                "Explorer >= 10",
                "iOS >= 9",
                "Safari >= 9",
                "Android >= 4.4",
                "Opera >= 30"
            ]
        })//,
        //cssnano(),
    ];
    //Watch me get Sassy
    return gulp.src('./bulma/bulma.sass')
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./css/'));
});

// Compile Theme Scss
gulp.task('compile-scss', function () {
    var processors = [
        mq4HoverShim.postprocessorFor({ hoverSelectorPrefix: '.is-true-hover ' }),
        autoprefixer({
            browsers: [
                "Chrome >= 45",
                "Firefox ESR",
                "Edge >= 12",
                "Explorer >= 10",
                "iOS >= 9",
                "Safari >= 9",
                "Android >= 4.4",
                "Opera >= 30"
            ]
        })//,
        //cssnano(),
    ];
    //Watch me get Sassy
    return gulp.src('./scss/core.scss')
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(purgeSourcemaps())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./css/'));
});

// Compile Html
gulp.task('compile-html', function() {
    return gulp.src('html/pages/**/*.html')
        .pipe(panini({
        root: 'html/pages/',
        layouts: 'html/layouts/',
        partials: 'html/includes/',
        helpers: 'html/helpers/',
        data: 'html/data/'
    }))
        .pipe(gulp.dest('./'))
        .on('finish', browser.reload);
});

gulp.task('compile-html:reset', function(done) {
    panini.refresh();
    done();
});

// Compile js from node modules
gulp.task('compile-js', function() {
    return gulp.src([ 
        nodepath + 'jquery/dist/jquery.min.js', 
        nodepath + 'feather-icons/dist/feather.min.js',
        nodepath + 'jquery.easing/jquery.easing.min.js',
        nodepath + 'aos/dist/aos.js'
    ])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./js/'));
});

gulp.task('init', gulp.series('setupBulma', function (done) {
    done();
}));
gulp.task('build', gulp.series('copy-plugins', 'compile-js', 'compile-sass', 'compile-scss', 'compile-html', function (done) {
    done();
}));
gulp.task('default', gulp.parallel('server', 'watch', function (done) {
    done();
}));
