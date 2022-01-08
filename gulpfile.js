const { watch, series, parallel } = require("gulp");
const browserSync = require("browser-sync").create();

// Конфигурация
const path = require("./gulpfull/config/path.js");

// Задачи
const clear = require('./gulpfull/task/clear.js');
const pug = require('./gulpfull/task/pug.js');
const scss = require('./gulpfull/task/scss.js');
const js = require('./gulpfull/task/js.js');
const img = require('./gulpfull/task/img.js');
const font = require('./gulpfull/task/font.js');

// Сервер
const server = () => {
  browserSync.init({
    server: {
      baseDir: path.root
    }
  })
}

// Наблюдение
const watcher = () => {
  watch(path.pug.watch, pug).on("all", browserSync.reload);
  watch(path.scss.watch, scss).on("all", browserSync.reload);
  watch(path.js.watch, js).on("all", browserSync.reload);
  watch(path.img.watch, img).on("all", browserSync.reload);
  watch(path.font.watch, font).on("all", browserSync.reload);
}

// Задачи
exports.pug = pug;
exports.scss = scss;
exports.js = js;
exports.img = img;
exports.font = font;


// Сборка
exports.dev = series(
  clear,
  parallel(pug, scss, js, img, font),
  parallel(watcher, server),
);
