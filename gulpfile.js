const gulp = require('gulp')
const sass = require('gulp-sass')
const sassLint = require('gulp-sass-lint')
const autoprefixer = require('gulp-autoprefixer')
const eslint = require('gulp-eslint')
const babel = require('gulp-babel')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const browserSync = require('browser-sync').create()
const sassOptions = {
  errLogToConsole: true,
  outputStyle: 'compressed'
}

gulp.task('sass', () => {
  return gulp
    .src('resources/sass/*.sass')
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('public'))
})

gulp.task('watch-sass', () => {
  return gulp
    .watch('src/sass/**/*.sass', ['sass'])
    .on('change', event => `File ${event.path} was ${event.type}.`)
})

gulp.task('lint', () => {
  return gulp
    .src(['**/*.js', '!public/*.js', '!node_modules/**/*'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})

gulp.task('sass-lint', () => {
  return gulp
    .src(['resources/sass/**/*.sass', '!resources/sass/partials/_reset.sass'])
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
})

gulp.task('build-scripts', () => {
  return gulp
    .src('resources/scripts/*.js')
    .pipe(babel({ presets: ['env'] }))
    .pipe(concat('bundle.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public'))
})

gulp.task('watch-scripts', () => {
  return gulp
    .watch('resources/scripts/*.js', ['build-scripts'])
})

gulp.task('sync', () => {
  browserSync.init({
    proxy: 'localhost:3333'
  })

  gulp.watch('resources/view/**/*.edge').on('change', browserSync.reload)
  gulp.watch('public/*.js').on('change', browserSync.reload)
  gulp.watch('public/*.css').on('change', browserSync.reload)
})
