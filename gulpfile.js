const gulp = require("gulp"),
  sass = require("gulp-sass")(require("sass")),
  uglify = require("gulp-uglify"),
  concat = require("gulp-concat"),
  connect = require("gulp-connect"),
  ghPages = require("gulp-gh-pages");

const jsSources = ["app/js/*.js"],
  sassSources = ["app/styles/*.scss"],
  htmlSources = ["app/*.html"],
  outputDir = "dist";

gulp.task("scss", function () {
  return gulp
    .src(sassSources)
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest(outputDir + "/styles/"))
    .pipe(connect.reload());
});

gulp.task("js", function () {
  return gulp
    .src(jsSources)
    .pipe(uglify())
    .pipe(concat("scripts.js"))
    .pipe(gulp.dest(outputDir + "/scripts/"))
    .pipe(connect.reload());
});

gulp.task("html", function () {
  return gulp
    .src(htmlSources)
    .pipe(gulp.dest(outputDir))
    .pipe(connect.reload());
});

gulp.task("commonhtml", function () {
  return gulp
    .src(["app/common/*.html"])
    .pipe(gulp.dest(outputDir + "/common/"))
    .pipe(connect.reload());
});

gulp.task("assets", function () {
  return gulp
    .src([
      "app/assets/*.svg",
      "app/assets/*.png",
      "app/assets/*.jpg",
      "app/assets/*.mp4",
      "app/assets/*.gif",
    ])
    .pipe(gulp.dest(outputDir + "/assets/"))
    .pipe(connect.reload());
});

gulp.task("connect", function () {
  connect.server({
    root: "dist",
    livereload: true,
    host: "localhost",
    port: "8080",
  });
});

gulp.task("watch", function () {
  gulp.watch("app/js/*.js", gulp.series("js"));
  gulp.watch("app/styles/*.scss", gulp.series("scss"));
  gulp.watch("app/**.html", gulp.series("html"));
  gulp.watch("app/common/*.html", gulp.series("commonhtml"));
  gulp.watch("app/assets/*.svg", gulp.series("commonhtml"));
  gulp.watch("app/assets/*.png", gulp.series("commonhtml"));
  gulp.watch("app/assets/*.jpg", gulp.series("commonhtml"));
  gulp.watch("app/assets/*.mp4", gulp.series("commonhtml"));
  gulp.watch("app/assets/*.gif", gulp.series("commonhtml"));
});

gulp.task("deploy", function () {
  return gulp.src("./dist/**/*").pipe(ghPages());
});

gulp.task(
  "default",
  gulp.series(
    "js",
    "scss",
    "html",
    "commonhtml",
    "assets",
    gulp.parallel("connect", "watch")
  )
);
