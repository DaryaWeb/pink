"use strict";

var gulp = require("gulp"),
    sass = require("gulp-sass"),
    plumber = require("gulp-plumber"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    server = require("browser-sync").create(),
    gulpautoprefixer = require("gulp-autoprefixer");

gulp.task("style", function(){
    gulp.src("sass/style.scss")
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss([
            autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })
            ]))
        .pipe(gulp.dest("css"))
        .pipe(server.stream())
        .pipe(gulpautoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
});

gulp.task("serve", ["style"], function () {
    server.init({
        server: ".",
        notify: false,
        open: true,
        cors: true,
        ui: false
    });
    gulp.watch("sass/**/*.{scss,sass}", ["style"]);
    gulp.watch("*.html").on("change", server.reload);
});