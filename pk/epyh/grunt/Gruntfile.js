/**
 * Aprile 2014 Alessandro Miliucci lifeisfoo@gmail.com
 * ----------------------------------------------------------------------------
 * Modificato pesantemente da Lorenzo De Santis il 10/08/2015 lorenzo@bemind.me
 */
(function() {
    'use strict';
    module.exports = function(grunt) {
        /**
         * Carico tutti i task di grunt automaticamente
         * senza dovere usare i singoli require e.g.
         * grunt.loadNpmTasks('grunt-contrib-connect');
         * vedi https://github.com/sindresorhus/load-grunt-tasks
         * I task vengono presi dal file package.json del progetto
         * Questa chiamata è equivalente a questa
         * require('load-grunt-tasks')(grunt, {pattern: 'grunt-*'});
         */
        require('load-grunt-tasks')(grunt);

        // Carico tutti i task contrib
        //require('load-grunt-tasks')(grunt, {pattern: 'grunt-contrib-*'});

        // Carico tutti i task contrib e altri
        //require('load-grunt-tasks')(grunt, {pattern: ['grunt-contrib-*', 'grunt-shell']});

        grunt.initConfig({
            connect: {
                options: {
                    port: 9001,
                    // cambia hostaname a 'localhost' pre prevenire accesso dall'esterno
                    // '0.0.0.0' permette accesso dall'esterno
                    //hostname: '10.192.48.112',
                    hostname: '127.0.0.1',
                    livereload: 35729
                },
                livereload: {
                    options: {
                        open: true,
                        base: ['./']
                    }
                }
            },
            less: {
                development: {
                    options: {
                        paths: ['assets/less'] //path base per import
                    },
                    files: {
                        'assets/css/main.css': 'assets/less/main.less',
                        'assets/css/wt-dinamico.css': 'assets/less/wt-dinamico/style.less',
                        'assets/css/wt-statico.css': 'assets/less/wt-statico/style.less'
                    }
                },
                production: {
                    options: {
                        paths: ['assets/less'],
                        cleancss: true
                    },
                    files: {
                        'assets/css/main.css': 'assets/less/main.less',
                        'assets/css/wt-dinamico.css': 'assets/less/wt-dinamico/style.less',
                        'assets/css/wt-statico.css': 'assets/less/wt-statico/style.less'
                    }
                }
            },
            autoprefixer: {
                options: {
                    browsers: [
                        'Android >= 4',
                        'Chrome >= 27'
                        //'Firefox >= 26',
                        //'Explorer >= 10',
                        //'iOS >= 5',
                        //'Opera >= 12',
                        //'Safari >= 5'
                    ]
                },
                mainCss: {
                    src: 'assets/css/main.css'
                        //se non imposti dest, il file di partenza viene sovrascritto
                }
            },
            clean: {
                dist: ['dist/**','!dist']
            },
            uglify: {
                js: {
                    files: [{
                        expand: true,
                        cwd: 'dist',
                        src: [
                            'assets/js/**/*.js',
                            'sella-shell/commons.js'
                        ],
                        dest: 'dist'
                    }]
                }
            },
            //tolgo perché questa ulteriore minificazione porta problemi su vecchi android (es: la carta non si vede)
            /*cssmin: {
             minify: {
             expand: true,
             cwd: 'assets/css/',
             src: ['*.css'],
             dest: 'dist/assets/css/',
             ext: '.css'
             }
             },*/
            copy: {
                main: {
                    files: [
                        // includes files within path and its sub-directories
                        {
                            expand: true,
                            src: [
                                'assets/css/**',
                                'assets/images/**',
                                'assets/sounds/**',
                                'assets/js/**/*.js',
                                'sella-shell/commons.js',
                                'assets/js/vendor/**/*.css',
                                'cordova-android/**/*.js',
                                'cordova-ios/**/*.js',
                                'index{,*}.html',
                                '!indexpre.html'
                            ],
                            dest: 'dist/'
                        }
                    ]
                }
            },
            watch: {
                js: {
                    files: [
                        'assets/js/app.js',
                        'assets/js/require*.js',
                        'assets/js/entities/*.js',
                        'assets/js/common/**/*.js',
                        'assets/js/apps/**/*.js',
                        '!assets/templates.js'
                    ],
                    tasks: ['handlebars:compile'],
                    options: {
                        livereload: true
                    }
                },
                templates: {
                    files: ['assets/js/**/*.html'],
                    tasks: ['handlebars:compile'],
                    options: {
                        livereload: true
                    }
                },
                css: {
                    files: ['assets/less/*.less', 'assets/less/wt-dinamico/*.less', 'assets/less/wt-statico/*.less'],
                    tasks: ['less', 'autoprefixer'],
                    options: { //ricarica la pagina automaticamente
                        livereload: true
                    }
                },
                gruntfile: {
                    files: ['Gruntfile.js']
                },
                livereload: {
                    options: {
                        livereload: '<%= connect.options.livereload %>'
                    },
                    files: [
                        'index.html'
                    ]
                }
            },
            webfont: { //doc https://github.com/sapegin/grunt-webfont
                icons: {
                    src: 'assets/raw/icons/svg/*.svg',
                    dest: 'assets/css/fonts',
                    destCss: 'assets/less',
                    options: {
                        type: 'eot,woff2,woff,ttf,svg',
                        syntax: 'bootstrap', // naming classi
                        hashes: false,
                        engine: 'node', //'node' ha problemi con un carattere
                        font: 'Hype-icon',
                        stylesheet: 'less',
                        templateOptions: {
                            classPrefix: 'icon-'
                        }
                    }
                }
            },
            handlebars: {
                compile: {
                    options: {
                        namespace: "JST",
                        amd: true
                    },
                    files: {
                        'assets/js/templates.js': 'assets/js/**/*.html'
                    }
                }
            },
            strip_code: {
                options: {
                    // Task-specific options go here.
                    start_comment: 'start-test-block',
                    end_comment: 'end-test-block'
                },
                production: {
                    // Target-specific file lists and/or options go here.
                    src: 'dist/assets/js/app.js'
                }
            }
        });
        grunt.registerTask('serve', [
            'handlebars:compile',
            'less:development',
            'autoprefixer',
            'connect:livereload',
            'watch'
        ]);
        grunt.registerTask('dist', [
            'clean:dist',
            'handlebars:compile',
            'less:production',
            'autoprefixer',
            'copy:main',
            'strip_code:production',
            'uglify:js'
        ]);
        grunt.registerTask('dist-debug', [
            'clean:dist',
            'handlebars:compile',
            'less:production',
            'autoprefixer',
            'copy:main',
            'strip_code:production'
        ]);
    };
}());
