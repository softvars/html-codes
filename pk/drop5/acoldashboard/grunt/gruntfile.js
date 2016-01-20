var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
    'use strict';
    return connect.static(require('path').resolve(dir));
};

module.exports = function(grunt) {
    'use strict';
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    grunt.initConfig({
        watch: {
            options: {
                livereload: true,
                interval: 5007
            },
            js: {
                files: ['../source/scripts/**/*.js','<%= jshint.all %>'],
                tasks: ['jshint','concat', 'uglify']
            },
            express: {
                files:  [ 'mock/**/*.js'],
                tasks:  [ 'express' ],
                options: {
                    nospawn: true
                }
            },
            livereload: {
                options: {
                    livereload: LIVERELOAD_PORT
                },
                files: ['../index.html']
            }
        },
        connect: {
            options: {
                hostname: '0.0.0.0',
                port: 1001,
                base: "/"
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '../source'),
                            mountFolder(connect, '../'),
                        ];
                    }
                }
            }
        },

        express: {
            mock: {
                options: {
                    script: '../mockdata.js'
                }
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc',
                "force": true
            },
            all: [
                'Gruntfile.js',
                "../source/scripts/**/*.js"
            ]
        },

        uglify: {
            dist: {
                options: {
                    sourceMap: true,
                    sourceMapIncludeSources: true,
                    //beautify: true,
                    compress: {
                        drop_console: true
                    }
                },
                files: [{
                    '../acol/app/scripts/acol.min.js': "../source/scripts/**/*.js"
                }]
            }
        },

        concat: {
            dist: {
                src: "../source/scripts/**/*.js",
                dest: '../acol/app/scripts/acol.min.js',
            },
        },

    });

    grunt.registerTask('server', [  'concat', 'uglify','express', 'connect', 'watch' ]);


}
