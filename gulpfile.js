const distFolder = "dist";
const appFolder = "app";
let fs = require("fs");
const path = {
  build: {
    html: distFolder + "/",
    css: distFolder + "/css/",
    js: distFolder + "/js/",
    img: distFolder + "/img/",
    fonts: distFolder + "/fonts/",
  },
  src: {
    html: [appFolder + "/*.html", "!" + appFolder + "/_*.html"],
    css: appFolder + "/scss/main.scss",
    js: appFolder + "/js/main.js",
    img: appFolder + "/img/**/*.+(png|jpg|gif|ico|svg|webp)",
    fonts: appFolder + "/fonts/*.ttf",
  },
  watch: {
    html: appFolder + "/**/*.html",
    css: appFolder + "/scss/main.scss",
    js: appFolder + "/js/**/*.js",
    img: appFolder + "/img/**/*.+(png|jpg|gif|ico|svg|webp)",
  },
  clean: "./" + distFolder + "/",
};
const { src, dest } = require("gulp"),
  gulp = require("gulp");
const rename = require("gulp-rename");
const concat = require("gulp-concat"),
  uglify = require("gulp-uglify-es").default,
  scss = require("gulp-sass"),
  autoprefixer = require("gulp-autoprefixer"),
  cleanCss = require("gulp-clean-css"),
  imagemin = require("gulp-imagemin"),
  newer = require("gulp-newer"),
  fileInclude = require("gulp-file-include"),
  del = require("del"),
  groupMedia = require("gulp-group-css-media-queries"),
  webp = require("gulp-webp"),
  webpHtml = require("gulp-webp-html"),
  webpCss = require("gulp-webp-css"),
  svgSprite = require("gulp-svg-sprite"),
  ttf2woff = require("gulp-ttf2woff"),
  ttf2woff2 = require("gulp-ttf2woff2"),
  fonter = require("gulp-fonter"),
  browserSync = require("browser-sync").create();

function browserSyncFunc() {
  browserSync.init({
    server: {
      baseDir: "./" + distFolder + "/",
    },
    port: 3000,
    notify: false,
  });
}

function stylesFunc() {
  return src(path.src.css)
    .pipe(
      scss({
        outputStyle: "expanded",
      })
    )
    .pipe(groupMedia())
    .pipe(
      autoprefixer({
        overrideBrowserlist: ["last 25 versions"],
        grid: true,
        cascade: true,
      })
    )
    .pipe(
      cleanCss({
        level: {
          1: {
            specialComments: 0,
          },
        },
        format: "beautify",
      })
    )
    .pipe(
      webpCss({
        webpClass: ".webp",
        noWebpClass: ".no-webp",
      })
    )
    .pipe(dest(path.build.css))
    .pipe(
      scss({
        outputStyle: "compressed",
      })
    )
    .pipe(
      cleanCss({
        level: {
          1: {
            specialComments: 0,
          },
        },
      })
    )
    .pipe(
      rename({
        extname: ".min.css",
      })
    )
    .pipe(dest(path.build.css))
    .pipe(browserSync.stream());
}

function scriptsFunc() {
  return src(path.src.js)
    .pipe(fileInclude())
    .pipe(dest(path.build.js))
    .pipe(uglify())
    .pipe(
      rename({
        extname: ".min.js",
      })
    )
    .pipe(dest(path.build.js))
    .pipe(browserSync.stream());
}

function imgFunc() {
  return src(path.src.img)
    .pipe(
      webp({
        quality: 70,
      })
    )
    .pipe(dest(path.build.img))
    .pipe(newer(path.build.img))
    .pipe(src(path.src.img))
    .pipe(
      imagemin({
        progressive: true,
        svgPlugins: [
          {
            removeViewBox: false,
          },
        ],
        interlaced: true,
        optimizationLevel: 3, //0 to 7,
      })
    )
    .pipe(dest(path.build.img))
    .pipe(browserSync.stream());
}

function fontsFunc() {
  src(path.src.fonts)
    .pipe(ttf2woff())
    .pipe(dest(path.build.fonts))
    .pipe(ttf2woff2())
    .pipe(dest(path.build.fonts));
}

gulp.task("otf2ttf", function () {
  return src([appFolder + "/fonts/*.{otf,eot}"])
    .pipe(
      fonter({
        formats: ["ttf"],
      })
    )
    .pipe(dest(appFolder + "/fonts/"));
});

function htmlFunc() {
  return src(path.src.html)
    .pipe(fileInclude())
    .pipe(webpHtml())
    .pipe(dest(path.build.html))
    .pipe(browserSync.stream());
}

function watchFiles() {
  gulp.watch([path.watch.html], htmlFunc);
  gulp.watch([path.watch.css], stylesFunc);
  gulp.watch([path.watch.js], scriptsFunc);
  gulp.watch([path.watch.img], imgFunc);
}

function clean() {
  return del(path.clean);
}

let build = gulp.series(
  clean,
  gulp.parallel(scriptsFunc, stylesFunc, htmlFunc, imgFunc, fontsFunc)
);
let watch = gulp.parallel(build, watchFiles, browserSyncFunc);

exports.build = build;
exports.watch = watch;
exports.default = watch;
exports.imgFunc = imgFunc;
exports.htmlFunc = htmlFunc;
exports.fontsFunc = fontsFunc;
exports.stylesFunc = stylesFunc;
exports.scriptsFunc = scriptsFunc;
