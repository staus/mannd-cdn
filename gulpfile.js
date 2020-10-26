var gulp = require('gulp'); 
var cssnano = require('gulp-cssnano'); 
var sass = require('gulp-sass'); 
var concat = require('gulp-concat'); 
var uglify = require('gulp-uglify-es').default;

gulp.task('sass', function(){    
    return gulp.src('app/style.scss')       
        .pipe(sass())       
        .pipe(cssnano())       
        .pipe(gulp.dest('dist')); 
});

gulp.task('js', function(){    
    return gulp.src(['app/js/**/*.js', 'app/*.js'])          
        .pipe(concat('main.js'))       
        .pipe(uglify())       
        .pipe(gulp.dest('dist')); 
});

gulp.task('watch', function(){
    gulp.watch('app/**/*.scss', gulp.series('sass') )
    gulp.watch('app/**/*.js', gulp.series('js') )
})

gulp.task('default', gulp.series('sass', 'js', 'watch'));