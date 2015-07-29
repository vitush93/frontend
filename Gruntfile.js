module.exports = function (grunt) {

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
    require('time-grunt')(grunt);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        cssmin: {
            build: {
                src: 'build/css/master.css',
                dest: 'build/css/master.css'
            }
        },

        less: {
            build: {
                options: {
                    paths: 'node_modules/bootstrap/less'
                },
                files: {
                    'build/css/master.css': 'dev/less/main.less'
                }
            }
        },

        uncss: {
            dist: {
                src: ['build/*.html'],
                dest: 'build/css/master.css',
                options: {
                    report: 'min'
                }
            }
        },

        autoprefixer: {
            dist: {
                files: {
                    'build/css/master.css': 'build/css/master.css'
                }
            }
        },

        uglify: {
            build: {
                files: {
                    'build/js/master.js': 'build/js/master.js'
                }
            }
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                expand: true,
                cwd: 'build',
                src: ['**/*.html'],
                dest: 'build/'
            }
        },

        includes: {
            files: {
                src: ['dev/*.html'],
                dest: 'build',
                flatten: true
            }
        },

        watch: {
            html: {
                files: ['dev/*.html', 'dev/partials/*.html'],
                tasks: ['includes']
            },
            js: {
                files: ['dev/js/*.js'],
                tasks: ['browserify']
            },
            css: {
                files: ['dev/less/**/*.less'],
                tasks: ['less', 'autoprefixer']
            }
        },

        browserSync: {
            bsFiles: {
                src: ['build/css/*.css', 'build/js/*.js', 'build/*.html']
            },
            options: {
                server: {
                    baseDir: "./build"
                },
                watchTask: true
            }
        },

        browserify: {
            dist: {
                files: {
                    './build/js/master.js': ['./dev/js/main.js']
                }
            }
        },

        copy: {
            main: {
                files: [
                    {expand: true, cwd: 'dev/', src: ['img/*'], dest: 'build/'},
                    {expand: true, cwd: 'dev/', src: ['fonts/*'], dest: 'build/'}
                ]
            }
        }
    });

    grunt.registerTask('default', [
        'copy',
        'includes',
        'browserify',
        'less',
        'autoprefixer',
        'browserSync',
        'watch'
    ]);

    grunt.registerTask('build', [
        'copy',
        'includes',
        'htmlmin',
        'less',
        'uncss',
        'autoprefixer',
        'cssmin',
        'browserify',
        'uglify'
    ]);

};
