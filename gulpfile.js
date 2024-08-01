const { src, dest, series, watch } = require("gulp");
const concat = require("gulp-concat");
const htmlMin = require("gulp-htmlmin");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const svgSprite = require("gulp-svg-sprite");
const browserSync = require("browser-sync").create();
const webp = require("gulp-webp");
const uglify = require("gulp-uglify-es").default;
const notify = require("gulp-notify");
const sourcemaps = require("gulp-sourcemaps");
const del = require("del");
const babel = require("gulp-babel");
const ttfToWoff = require('gulp-ttf2woff');
const ttfToWoff2 = require('gulp-ttf2woff2');

const clean = () => {
  return del(["dist"]);
};

const fonts = () => {
  src('src/fonts/**/*.ttf')
      .pipe(ttfToWoff())
      .pipe(dest('dist/fonts'))
  return src('src/fonts/**/*.woff2')
      .pipe(ttfToWoff2())
      .pipe(dest('dist/fonts'))
      .pipe(browserSync.stream());
  }

const styles = () => {
  return src("src/css/**/*.css")
    .pipe(sourcemaps.init())
    .pipe(concat("main.css"))

    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(
      cleanCSS({
        level: 2,
      })
    )
    .pipe(sourcemaps.write())
    .pipe(dest("dist"))
    .pipe(browserSync.stream());
};

const htmlMinify = () => {
  return src("src/**/*.html")
    .pipe(
      htmlMin({
        collapseWhitespace: true,
      })
    )
    .pipe(dest("dist"))
    .pipe(browserSync.stream());
};

const scripts = () => {
  return src(["src/js/main.js", "./src/js/tabs.js"])
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(concat("app.js"))
    .pipe(uglify().on("error", notify.onError()))
    .pipe(sourcemaps.write())
    .pipe(dest("dist"))
    .pipe(browserSync.stream());
};

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: "dist",
    },
  });
};

const img = () => {
  return src("src/img/**/*", { encoding: false })
    .pipe(webp())
    .pipe(dest("dist/img"));
};

watch("src/**/*.html", htmlMinify);
watch("src/css/**/*.css", styles);
watch("src/js/**/*.js", scripts);

exports.styles = styles;
exports.scripts = scripts;
exports.htmlMinify = htmlMinify;
exports.default = series(clean, fonts , htmlMinify, styles, scripts, img, watchFiles);
