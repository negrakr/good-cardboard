var gulp = require('gulp');
var bs = require('browser-sync').create();
var sass = require('gulp-sass');
var gutil = require('gulp-util');
var ftp = require('vinyl-ftp');
var autoprefixer = require('gulp-autoprefixer');

/*gulp.task('default', async function() {
  console.log('Прuвеmикu))0)')
});*/

/*gulp.task('styles', function() {
  return gulp.src('./src/css/*.css')
    .pipe(gulp.dest('production/css'));
});*/

/*gulp.task('bs', function() {
  bs.init({
    server: {
      baseDir: './src'
    }
  });
});*/

/*gulp.task('bs', function() {
  bs.init({
    server: './src'
  });

  gulp.watch('src/*.html').on('change', bs.reload);
});*/

/*
// Static Server + watching scss/html files
// Запускаем статичный сервер, предварительно скомпилировав SASS
gulp.task('serve', ['sass'], function() {
  bs.init({
      server: "./src"
  });

  gulp.watch("src/sass/*.sass", ['sass']);
  gulp.watch("src/*.html").on('change', bs.reload);
});

// Compile sass into CSS & auto-inject into browsers
// Компиляция SASS в CSS
gulp.task('sass', function() {
  return gulp.src("src/sass/*.sass")
      .pipe(sass())
      .pipe(gulp.dest("src/css"))
      .pipe(bs.stream());
});

gulp.task('default', ['serve']);
*/

gulp.task('sass', function(done) {
    gulp.src('src/sass/*.sass')
      .pipe(sass())
      .pipe(autoprefixer({
        overridebrowserslist: ['last 2 versions'],
        cascade: false
      }))
      .pipe(gulp.dest('src/css'))
      .pipe(bs.stream());

    done();
});

gulp.task('serve', function(done) {
    bs.init({
        server: 'src/'
    });

    gulp.watch("src/sass/*.sass", gulp.series('sass'));
    gulp.watch("src/*.html").on('change', () => {
      bs.reload();
      done();
    });
  
    done();
});

gulp.task('default', gulp.series('sass', 'serve'));

// выгрузка с помощью ftp
/*gulp.task('deploy', function() {
  var conn = ftp.create( {
    host: '123.54.23.64',
    user: 'login',
    password: 'password',
    log: gutil.log
  });

  var globs = [
    'src/**'
  ];

  // using base = '.' will transfer everything to /public_html correctly
  // turn off buffering in gulp.src for best perfomance

  return gulp.src(globs, { base: '.', buffer: false })
    .pipe(conn.newer('/www/islamov-artem.ru/lesson-10')) //only upload newer files ...
    .pipe(conn.dest('/www/islamov-artem.ru/lesson-10'));
});*/