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


// GRUNT CONFIGURATION
module.exports = function (grunt) {

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

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
        }
    });

    grunt.registerTask('default', []);
    grunt.registerTask('buildcss', ['less', 'concat', 'cssc', 'uncss', 'cssmin']);
    grunt.registerTask('buildjs', ['uglify']);
    grunt.registerTask('buildhtml', ['includes', 'htmlmin']);
    grunt.registerTask('build', ['buildhtml', 'buildcss', 'buildjs']);

};