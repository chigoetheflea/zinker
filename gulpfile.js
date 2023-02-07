"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var replace = require("gulp-replace");

var less = require("gulp-less");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var csso = require("gulp-csso");
var rename = require("gulp-rename");

var jsmin = require("gulp-jsmin");
var htmlmin = require("gulp-htmlmin");

var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");

var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");

var del = require("del");

var server = require("browser-sync").create();

gulp.task("css", function () {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("js", function () {
  return gulp.src([
      "source/js/scripts.js",
      ],
      {
        base: "source/js"
      })
    .pipe(jsmin())
    .pipe(rename(function (path) {
      path.basename = path.basename + ".min";
    }))
    .pipe(gulp.dest("build/js"))
});

gulp.task("images", function () {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.mozjpeg({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("source/img"));
});

gulp.task("webp", function () {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({quality: 85}))
    .pipe(gulp.dest("source/img"));
});

gulp.task("sprite", function () {
  return gulp.src([
      "source/img/**/icon_*.svg",
      "source/img/**/logo_*.svg",
    ], {
      base: "source"
    })
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    // .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest("build"))
});

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/js/**",
    "source/*.ico",
    "source/lib/**",
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});
/*
gulp.task("cssPathReplace", function () {
  return gulp.src([
    "build/css/style.min.css",
  ], {
    base: "build"
  })
  .pipe(replace("../fonts", "./assets/fonts"))
  .pipe(gulp.dest("../theme/assets"));
});
*/
gulp.task("themeBuild", function () {
  return gulp.src([
    "build/js/**",
    "build/img/**",
    "build/fonts/**",
    "build/css/**",
  ], {
    base: "build"
  })
  .pipe(gulp.dest("../theme/assets"));
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/less/**/*.less", gulp.series("css"));
  gulp.watch("source/img/icon-*.svg", gulp.series("sprite", "html", "refresh"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
  gulp.watch("source/js/**", gulp.series("js", "refresh"));
});

gulp.task("build", gulp.series(
  "clean",
  "copy",
  "css",
  "js",
  "sprite",
  "html"
));

gulp.task("wp", gulp.series("build", "themeBuild"));
gulp.task("start", gulp.series("build", "server"));
