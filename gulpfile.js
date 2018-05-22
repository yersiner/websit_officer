const gulp = require("gulp")
const babel = require("gulp-babel")
const uglify = require("gulp-uglify")
const rename = require("gulp-rename")
const minifyCss = require("gulp-clean-css")
const concat = require("gulp-concat")
const browserify = require("browserify")
const source = require("vinyl-source-stream")
const autoprefixer = require("gulp-autoprefixer")
const sass = require("gulp-sass")
const imagemin = require('gulp-imagemin')
const cache = require('gulp-cache')
const pngquant = require("imagemin-pngquant");
function catchError(error) {
    console.log(error.toString())
    this.emit("end")
}
//
//http://soft.download.zxxk.com/download/getscripts?softids=' + softids + '&userid=' + userid + '&iscart=' + iscart + '&source=' + source + '&ext=' + ext + '&pageType=' + pageType + '&r=' + Math.random()
//合并压缩js
gulp.task("convertJs",function () {
    return gulp.src("dev/js/isIE.js")
        // .pipe(babel({
        //     presets : ['es2015','stage-3']
        // }))
        .pipe(uglify())
        .pipe(concat("microtech.js"))
        .pipe(rename(function (path) {
            path.basename +=".min"
        }))
        .on("error",catchError)
        .pipe(gulp.dest("public/js"))
})
//合并压缩css
gulp.task("convertCss",function () {
    return gulp.src("dev/css/app.css")
        .pipe(concat("app.css"))
        .pipe(minifyCss({compatibility:'ie8'}))
        .on("error",catchError)
        .pipe(autoprefixer({
            browsers : ["last 10 versions"],
            cascade : false
        }))
        .pipe(rename(function (path) {
            path.basename +=".min"
        }))
        .pipe(gulp.dest('public/css'))
})
//sass
gulp.task("convertSass",function () {
    return gulp.src("dev/scss/*.scss")
        .pipe(sass())
        .on("error",catchError)
        .pipe(autoprefixer({
            browsers : ["last 10 versions"],
            cascade : false
        }))
        .pipe(gulp.dest('dev/css'))
})
//browserify 用户把gulp解析require/module.export/export 变为 import
gulp.task("browserify",function () {
    const browser = browserify({
        entries : ["public/js/index.js","public/js/state.js"]
    })
    return browser.bundle()
        .pipe(source("bundle.js"))
        .pipe(gulp.dest("public/js"))
})
gulp.task("imageMin",function () {
    return gulp.src("dev/image/*.{png,jpg,gif,ico}")
        .pipe(cache(imagemin({
            progressive :true,
            use : [pngquant]
        })))
        .pipe(gulp.dest("public/image"))
})
//监听文件变化自动执行
gulp.task("watch",function () {
    gulp.watch('dev/js/isIE.js',["convertJs"])
    gulp.watch('dev/scss/*.scss',["convertSass"])
    gulp.watch('dev/css/*.css',["convertCss"])
    gulp.watch('dev/image/*.{png,jpg,gif,icon}',["imageMin"])
})

gulp.task("start",["convertCss","watch","convertSass","imageMin","convertJs"])
