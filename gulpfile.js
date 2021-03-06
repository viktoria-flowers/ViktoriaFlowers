const gulp = require('gulp');
const istanbul = require('gulp-istanbul');
const mocha = require('gulp-mocha');

gulp.task('server:start', () => {
    return require('./server');
});

gulp.task('pre-test', () => {
    return gulp.src([
        './data/**/*.js',
        './app/**/*.js',
        './db/**/*.js',
        './config/**/*.js',
        './models/**/*.js',
        './server.js',
    ])
        .pipe(istanbul({
            includeUntested: true,
        }))
        .pipe(istanbul.hookRequire());
});

gulp.task('tests:unit', ['pre-test'], () => {
    return gulp.src([
        './test/unit/**/*.js',
        './test/integration/**/*.js',
    ])
        .pipe(mocha({
            reporter: 'spec',
            timeout: 10000,
        }))
        .pipe(istanbul.writeReports())
        .on('end', () => {
            /* eslint-disable no-undef */
            process.exit(0);
        });
});

const config = {
    connectionString: 'mongodb://localhost/viktoria-flowers-test',
    port: 3002,
};

gulp.task('test-server:start', () => {
    return Promise.resolve()
        .then(() => require('./db').init(config.connectionString))
        .then((db) => require('./test/utils/seed-data').seed(db))
        .then((db) => require('./data').init(db))
        .then((data) => require('./app').init(data))
        .then((app) => {
            app.listen(
                config.port,
                () => console.log(`Server running to port: ${config.port}`));
        });
});

const { MongoClient } = require('mongodb');

gulp.task('test-server:stop', () => {
    return MongoClient.connect(config.connectionString)
        .then((db) => {
            return db.dropDatabase();
        });
});

gulp.task('tests:browser', ['test-server:stop', 'test-server:start'], () => {
    return gulp.src(['./test/browser/**/*tests.js'])
        .pipe(mocha({
            reporter: 'spec',
            timeout: 10000,
        }))
        .once('end', () => {
            gulp.start('test-server:stop', () => {
                    console.log('Test database cleared!');
                    /* eslint-disable no-undef */
                    process.exit(0);
            });
        });
});
