// will be compiled
var lessSheets = {
    'build/css/style.css': 'dev/less/style.less'
};

// will be compiled
var sassSheets = {
    'build/css/screen.css': 'dev/sass/screen.scss'
};

// will be combined and minified
var styleSheets = [
    'bower_components/bootstrap/dist/css/bootstrap.css',
    'bower_components/bootstrap/dist/css/bootstrap-theme.css',
    'build/css/style.css',
    'build/css/screen.css'
];

// will be combined and minified
var scripts = [
    'bower_components/jquery/dist/jquery.js',
    'bower_components/bootstrap/dist/js/bootstrap.js',
    'dev/js/page.js'
];

// will be minified
var htmlFiles = {
    'build/index.html': 'dev/index.html'
};


// GRUNT CONFIGURATION
module.exports = function (grunt) {

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        htmlhint: {
            build: {
                options: {
                    'tag-pair': true,
                    'tagname-lowercase': true,
                    'attr-lowercase': true,
                    'attr-value-double-quotes': true,
                    'doctype-first': true,
                    'spec-char-escape': true,
                    'id-unique': true,
                    'head-script-disabled': true,
                    'style-disabled': true
                },
                src: ['dev/*.html']
            }
        },

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
                files: lessSheets
            }
        },

        sass: {
            build: {
                files: sassSheets
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
                files: htmlFiles
            }
        },

        watch: {
            html: {
                files: ['dev/*.html'],
                tasks: ['buildhtml', 'htmlhint']
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
    grunt.registerTask('buildcss', ['less', 'sass', 'concat', 'cssc', 'uncss', 'cssmin']);
    grunt.registerTask('buildjs', ['uglify']);
    grunt.registerTask('buildhtml', ['htmlmin']);
    grunt.registerTask('build', ['buildhtml', 'buildcss', 'buildjs']);

};