var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var browserSync = require('browser-sync');
var del = require('del');
var wiredep = require('wiredep').stream;
var $ = gulpLoadPlugins();
var reload = browserSync.reload;
var fs = require('fs');
var mkdirp = require('mkdirp');

gulp.task('styles', function () {
  return gulp.src('src/styles/*.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('build/styles'))
    .pipe(reload({stream: true}));
});

function lint(files, options) {
  return function () {
    return gulp.src(files)
      .pipe(reload({stream: true, once: true}))
      .pipe($.eslint(options))
      .pipe($.eslint.format())
      .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
  };
}
const testLintOptions = {
  env: {
    mocha: true
  }
};

gulp.task('lint', lint('src/app/**/*.js', {
    env: {
        "es6": true  
    },
    rules: {
        'strict': 0,
        'no-undef': 0,
        'no-use-before-define': 0,
        'quotes': 0
    }
}));

gulp.task('lint:test', lint('test/spec/**/*.js', testLintOptions));

gulp.task('html', ['styles'], function () {
  const assets = $.useref.assets({searchPath: ['build', '.']});

  return gulp.src('src/*.html')
    .pipe(assets)
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.minifyCss({compatibility: '*'})))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', function () {
  return gulp.src('src/images/**/*')
    .pipe($.if($.if.isFile, $.cache($.imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}]
    }))
    .on('error', function (err) {
      console.log(err);
      this.end();
    })))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', function () {
  return gulp.src(require('main-bower-files')('**/*.{eot,svg,ttf,woff,woff2}', function (err) {})
    .concat('src/fonts/**/*'))
    .pipe(gulp.dest('build/fonts'))
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('extras', function () {
  return gulp.src([
    'src/*.*',
    '!src/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('clean', del.bind(null, ['build', 'dist']));

gulp.task('serve', ['babel', 'styles', 'fonts', 'inject', 'clearTemplate', 'iisexpress'], function () {
  browserSync({
      notify: false,
      proxy: 'http://localhost:9500',
      port:  '9600'
  });

  gulp.watch([
    'src/**/*.html',
    'build/**/*.js',
    'src/images/**/*',
    'build/fonts/**/*'
  ]).on('change', reload);

  gulp.watch('src/styles/**/*.scss', ['styles']);
  gulp.watch('src/fonts/**/*', ['fonts']);
  gulp.watch('bower.json', ['wiredep', 'fonts']);
  gulp.watch('src/**/*.js', ['babel', 'inject']);

});

gulp.task('serve:dist', ['iisexpress'], function () {
  browserSync({
    notify: false,
    proxy: 'http://localhost:9500',
    port: 9600
  });
});

gulp.task('serve:test', function () {
  browserSync({
    notify: false,
    port: 9000,
    ui: false,
    server: {
      baseDir: 'test',
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch('test/spec/**/*.js').on('change', reload);
  gulp.watch('test/spec/**/*.js', ['lint:test']);
});

// inject bower components
gulp.task('wiredep', function () {
  gulp.src('src/styles/*.scss')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)+/
    }))
    .pipe(gulp.dest('src/styles'));

  gulp.src('src/*.html')
    .pipe(wiredep({
      exclude: ['bootstrap-sass'],
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('src'));
});

gulp.task('build', ['lint', 'babel', 'wiredep', 'inject', 'templateCache', 'html', 'images', 'fonts', 'extras'], function () {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], function () {
  gulp.start('build');
});

gulp.task('inject', function () {
  var target = gulp.src('src/index.html');
  var sources = gulp.src([
    'src/app/installer.js',
    'src/app/**/*.js'
  ], {read: false});

  return target.pipe($.inject(sources, { relative: true }))
    .pipe(gulp.dest('src'));
});

gulp.task('templateCache', function () {
  return gulp.src('src/app/**/*.html')
    .pipe($.angularTemplatecache({
      module: 'ultraModernWebDev',
      root: 'app/'
    }))
    .pipe(gulp.dest('build/app'));
});

gulp.task('clearTemplate', function(cb) {
    mkdirp('build/app', function() {
        fs.writeFile('build/app/templates.js',
        '//gulp will build the templates for distribution',
        cb);      
    });
});

gulp.task('iisexpress', function() {
    gulp.src('')
        .pipe($.shell([
            '"C:\\Program Files\\IIS Express\\iisexpress.exe" /config:..\\.vs\\config\\applicationhost.config /site:UltraModernWebDev /systray:false'
        ]));
});

gulp.task('babel', function() {
    return gulp.src('src/**/*.js')
        .pipe($.babel())
        .pipe(gulp.dest('build'));
})