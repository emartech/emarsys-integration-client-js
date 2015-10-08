'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');
var config = require('./tasks.config');
var tasks = require('boar-tasks').getTasks(gulp, config);
var mocha = require('gulp-mocha');

gulp.task('test', function(done) {
  runSequence([
    'client-code-style',
    'client-jshint',
    'client-test'
  ], done);
});

gulp.task('client-test', function() {
  gulp.src('lib/**/*.js')
    .pipe(mocha({
      ui: 'bdd',
      reporter: 'spec'
    }));
});
gulp.task('client-code-style', function() { return tasks.client.codeStyle(); });
gulp.task('client-jshint', function() { return tasks.client.jshint(); });
