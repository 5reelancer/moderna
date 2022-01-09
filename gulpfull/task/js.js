const { src, dest } = require("gulp");

// Конфигурация
const path = require("../config/path.js");
const app = require("../config/app.js");

// Плагины
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const babel = require("gulp-babel");
const webpack = require("webpack-stream");

const uglify = require("gulp-uglify")

// Обработка JS
const js = () => {
  return src(path.js.src, { sourcemaps: true })
    .pipe(plumber({
      errorHandler: notify.onError(error => ({
        title: "JavaScript",
        message: error.message
      }))
    }))
    .pipe(dest(path.js.dest, { sourcemaps: true }))
    .pipe(babel())
    .pipe(webpack(app.webpack))
    .pipe(uglify())
    .pipe(plumber())
    .pipe(dest(path.js.dest, { sourcemaps: true }));
};

module.exports = js;
