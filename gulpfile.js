var gulp = require("gulp"),
    scss = require("gulp-sass"),
    csscomb = require('gulp-csscomb'),
    autoprefixer = require("autoprefixer"),
    changed = require('gulp-changed'),
    minify = require("gulp-csso"),
    rename = require("gulp-rename"),
    clean = require("gulp-clean"),
    notify = require("gulp-notify"),
    plumber = require("gulp-plumber"),
    sourcemaps = require("gulp-sourcemaps"),
    useref = require("gulp-useref"),
    svgstore = require("gulp-svgstore"),
    svgmin = require("gulp-svgmin"),
    cheerio = require("gulp-cheerio"),
    replace = require("gulp-replace"),
    mqsort = require("gulp-group-css-media-queries"),
    postcss = require("gulp-postcss"),
    imagemin = require("gulp-imagemin"),
    flexibility = require("postcss-flexibility"),
    tinypng = require('gulp-tinypng'),
    image = require('gulp-image'),
    cache = require('gulp-cache'),
    imacss = require('gulp-imacss'),
    svgspriter = require('svgspriter'),
    browserSync = require("browser-sync").create();

//Svg
gulp.task("symbols", function() {
    return gulp.src("./src/assets/img/svg/*.svg")
        .pipe(svgmin())
        .pipe(cheerio({
            run: function ($) {
                $('[fill]').removeAttr('fill');
            },
            parserOptions: { xmlMode: true }
        }))
        .pipe(svgstore({
            inlineSvg: true
        }))
        .pipe(rename('symbols.svg'))
        .pipe(gulp.dest('./build/assets/img/svg/svg-sprite/'));
});

// Создаем data uri ссылки для svg
gulp.task('imacss', function() {
    gulp.src('./src/assets/img/svg/*.svg')
        .pipe(imacss('images.svg.css'))
        .pipe(gulp.dest('./src/assets/img/svg/'));
});



//Css
gulp.task("styles", function() {
    return gulp.src("./src/scss/style.scss")
        .pipe(sourcemaps.init())
        .pipe(plumber({
            errorHandler: notify.onError(function(err) {
                return {
                    title: 'Styles',
                    message: err.message
                }
            })
        }))
        .pipe(scss())
        .pipe(postcss([flexibility()]))
        .pipe(postcss([
            autoprefixer({
                browsers: ['last 3 versions', '> 1%', 'ie 9', 'ie 10']
            })

        ]))
        .pipe(mqsort())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/css/'))
        .pipe(notify({ message: "Styles task complete" }));

});

//HTML
gulp.task("html", function() {

    gulp.src("./src/*.html")
        .pipe(gulp.dest("./build/"))
});

//Js
gulp.task("scripts", function() {
    gulp.src('./src/js/**/*.js')
        .pipe(gulp.dest('./build/js/'))
});

//Оптимизируем png
gulp.task('tinypng', function () {
    gulp.src('./src/assets/img/png/*.png')
        .pipe(tinypng('1hmpsNGY4RD2doQVd0HJkwho-gYu0scQ'))
        .pipe(gulp.dest('./build/assets/img/png/'));
});


//Оптимизируем jpg
gulp.task('image', function () {
   gulp.src(['./src/assets/img/**/*.jpg','./src/assets/img/**/*.jpeg'])
    .pipe(image())
    .pipe(gulp.dest('./build/assets/img/'));
});

//Остальное
gulp.task("assets", function() {
    return gulp.src("./src/assets/**/*.*")
        .pipe(gulp.dest('./build/assets/'));
});

//Локальный сервер
gulp.task("browser-sync", function() {
    return browserSync.init({
        server: {
            baseDir: './build/'
        },
        startPath: '404.html'
    });
});


//Очистка build
gulp.task('clean', function() {
    return gulp.src('./build/')
        .pipe(clean())
})


//Запуск
gulp.task("default", ["clean"], function() {
    gulp.run("dev");
});

gulp.task("production", ["clean"], function() {
    gulp.run("build");
});



//Cлежка
gulp.task("watch", function() {
    gulp.watch("./src/scss/**/*.scss", ["styles"]);
    gulp.watch("./src/js/*.js", ["scripts"]);
    gulp.watch("./src/*.html", ["html"]);
    gulp.watch("./src/assets/**/*.*", ["assets"]);
    gulp.watch("./src/**/*.*").on("change", browserSync.reload);

});




//Запуск сборки
gulp.task("dev", ["build", "watch", "browser-sync"]);
gulp.task("build", ["html", "styles", "scripts","image","tinypng", "imacss", "symbols", "assets"]);
