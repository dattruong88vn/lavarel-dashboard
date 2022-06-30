var gulp = require('gulp');
var run = require('gulp-run');

var runWebPack = function(){
    return run('webpack --mode none').exec();
  ;
}

gulp.task('build-reactjs', function(){
    try{
        return runWebPack();
    }catch(ex){
        return false;
    }
});

var watch = function(){
	return gulp.watch([
		'./src/*.*',
		'./src/**/*.*'
	], gulp.series('build-reactjs'));
}

gulp.task('watch', function() {
    return watch();
});