var gulp = require('gulp');

gulp.task('default', function() {
  // 将你的默认的任务代码放在这
});

gulp.task('travis',['build','testServerJS'], function() {
  process.process.exit(0);
});