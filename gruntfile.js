module.exports = function (grunt) {
    var mozJpeg = require('imagemin-mozjpeg');

    grunt.initConfig({
        vars: {
            favicons: {
                src: 'temp/images/favicon.png',
                dest: 'build/images/favicons'
            }
        },

        pkg: grunt.file.readJSON('package.json'),

        bower: {
            install: {}
        },

        clean: {
            generatedResources: 'build'
        },

        copy: {
            html: {
                expand: true,
                flatten: true,
                src: [
                    'src/index.html'
                ],
                dest: 'dist',
            },

            images: {
                expand: true,
                flatten: true,
                src: [
                    'images/**'
                ],
                dest: 'dist/images',
            },

            fonts: {
                expand: true,
                flatten: true,
                cwd: 'bower_components/font-awesome/fonts',
                src: [
                    'fontawesome-webfont.eot',
                    'fontawesome-webfont.svg',
                    'fontawesome-webfont.ttf',
                    'fontawesome-webfont.woff',
                    'fontawesome-webfont.woff2'
                ],
                dest: 'dist/fonts',
                filter: 'isFile'
            }
        },

        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            lint: {
                options: {
                    import: 2
                },
                src: ['dist/css/main.css']
            }
        },

        cssmin: {
            options: {
                rebase: false
            },
            minify: {
                src: 'dist/css/main.css',
                dest: 'dist/css/main.min.css'
            }
        },

        less: {
            compile: {
                options: {
                    paths: ['src/less'],
                    cleancss: false
                },
                files: {
                    'dist/css/main.css': 'src/less/main.less'
                }
            }
        },

        watch: {
            styles: {
                files: ['src/less/**/*.less'],
                tasks: ['buildStyles']
            }
        }
    });

    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-image-resize');
    grunt.loadNpmTasks('grunt-mkdir');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-svg-to-png');

    grunt.registerTask('default', [
        'clean:generatedResources',
        'bower:install',
        'buildStyles',
        'copy:html',
        'copy:images',
        'copy:fonts'
    ]);

    grunt.registerTask('buildStyles', [
        'less:compile',
        'csslint:lint',
        'cssmin:minify'
    ]);
};
