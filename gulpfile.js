const gulp = require('gulp');
const babel = require('gulp-babel');

const distFiles = './';

/*
* BABEL
* */
const babelFiles = ['./src/**/*.js', './src/**/*.jsx'];
gulp.task('babel', () => {
  return gulp.src(babelFiles)
    .pipe(babel())
    .pipe(gulp.dest(distFiles));
});

gulp.task('babel:watch', () => {
  gulp.watch([babelFiles], ['babel']);
});

gulp.task('build', ['babel']);
gulp.task('default', () => {
  gulp.start('build', () => {
    console.log('build finished, starting watches...');
    gulp.start(['babel:watch'], () => {
      console.log('Watching...');
    });
  });
});
