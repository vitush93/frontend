// will be combined and minified in specific order
var styleSheets = [
    'bower_components/bootstrap/dist/css/bootstrap.css',
    'bower_components/bootstrap/dist/css/bootstrap-theme.css',
    'build/css/less.css'
];

// will be combined and minified in specific order
var scripts = [
    'bower_components/jquery/dist/jquery.js',
    'bower_components/bootstrap/dist/js/bootstrap.js',
    'dev/js/page.js'
];

// remote folder on the production server
var deployServer = 'ftp_server';
var deployFolder = '/www';


// GRUNT CONFIGURATION
module.exports = function (grunt) {

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
    require('time-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        cssc: {
            build: {
                options: {
                    sortSelectors: true,
                    lineBreaks: true,
                    sortDeclarations: true,
                    consolidateViaDeclarations: false,
                    consolidateViaSelectors: false,
                    consolidateMediaQueries: false
                },
                files: {
                    'build/css/master.css': 'build/css/master.css'
                }
            }
        },

        cssmin: {
            build: {
                src: 'build/css/master.css',
                dest: 'build/css/master.css'
            }
        },

        less: {
            build: {
                files: {
                    'build/css/less.css': 'dev/less/main.less'
                }
            }
        },

        concat: {
            dist: {
                src: styleSheets,
                dest: 'build/css/master.css'
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
                    'build/js/master.js': scripts
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
                tasks: ['buildhtml']
            },
            js: {
                files: ['dev/js/*.js'],
                tasks: ['buildjs']
            },
            css: {
                files: ['dev/less/*.less', 'dev/css/*.css'],
                tasks: ['buildcss']
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

        'ftp-deploy': {
            build: {
                auth: {
                    host: deployServer,
                    port: 21,
                    authKey: 'key'
                },
                src: 'build',
                dest: deployFolder
            }
        }
    });

    grunt.registerTask('default', ['build', 'browserSync', 'watch']);
    grunt.registerTask('buildcss', ['less', 'concat', 'cssc', 'uncss', 'autoprefixer', 'cssmin']);
    grunt.registerTask('buildjs', ['uglify']);
    grunt.registerTask('buildhtml', ['includes', 'htmlmin']);
    grunt.registerTask('build', ['buildhtml', 'buildcss', 'buildjs']);
    grunt.registerTask('deploy', ['build', 'ftp-deploy'])

};