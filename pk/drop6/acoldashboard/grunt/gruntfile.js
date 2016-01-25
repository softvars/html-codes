var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
    'use strict';
    return connect.static(require('path').resolve(dir));
};

var scriptfiles = [
    '../source/scripts/utils/*.js',
    '../source/scripts/common/app.js',
    '../source/scripts/common/app-run.js',
    '../source/scripts/common/routing.js',
    '../source/scripts/controller/*.js',
    '../source/scripts/service/*.js',
    '../source/scripts/htmleditor/*.js'
];

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
                files: [scriptfiles,'<%= jshint.all %>'],
                tasks: ['jshint','concat', /*'uglify',*/'copy']
            },
            css: {
                files: ['../source/css/**/*.css'],
                tasks: ['cssmin','copy'],
            },
            express: {
                files:  ['mock/**/*.js'],
                tasks:  [ 'express'],
                options: {
                    nospawn: true
                }
            },
            livereload: {
                options: {
                    livereload: LIVERELOAD_PORT
                },
                files: ['*.html']
            }
        },
        connect: {
            server:{
            options: {
                hostname: '0.0.0.0',
                port: 1001,
                base: "../"
            }},
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                           /* mountFolder(connect, '../source'),
                            mountFolder(connect, '../acol'),*/
                        ];
                    }
                }
            }
        },

        express: {
            mock: {
                options: {
                    script: 'mockdata.js'
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
                scriptfiles
            ]
        },

        uglify: {
            dist: {
                options: {
                    sourceMap: true,
                    sourceMapIncludeSources: true,
                    //beautify: true,
                    compress: {
                        drop_console: false
                    }
                },
                files: [{
                    '../acol/app/scripts/acol.min.js': scriptfiles
                }]
            }
        },

        cssmin: {
            combine: {
                files: {
                    '../acol/app/css/acol.min.css': '../source/css/**/*.css'
                }
            }
        },
        copy: {
            images: {
            files: [{
                cwd: '../source/templates/',
                src: '**/*',
                dest: '../acol/app/templates/',
                expand: true,
                flatten: false
            },{
                cwd: '../source/images/',
                src: '**/*',
                dest: '../acol/app/images/',
                expand: true,
                flatten: false
            }]
            }
        },

        concat: {
            dist: {
                src: scriptfiles,
                dest: '../acol/app/scripts/acol.min.js',
            },
        }
    });

    grunt.registerTask('server', ['concat','copy', /*'uglify',*/'cssmin','express', 'connect', 'watch' ]);


}
/*var sys = require("sys"),
my_http = require("http"),
path = require("path"),
url = require("url"),
filesys = require("fs");
my_http.createServer(function(request,response){
    var my_path = url.parse(request.url).pathname;
    var full_path = path.join(process.cwd(),my_path);
    path.exists(full_path,function(exists){
        if(!exists){
            response.writeHeader(404, {"Content-Type": "text/plain"});  
            response.write("404 Not Found\n");  
            response.end();
        }
        else{
            filesys.readFile(full_path, "binary", function(err, file) {  
                 if(err) {  
                     response.writeHeader(500, {"Content-Type": "text/plain"});  
                     response.write(err + "\n");  
                     response.end();  
                
                 }  
                 else{
                    response.writeHeader(200);  
                    response.write(file, "binary");  
                    response.end();
                }
                      
            });
        }
    });
})
/*my_http.createServer(function(request,response){
    var my_path = url.parse(request.url).pathname;
    load_file(my_path,response);
})*//*.listen(8080);
sys.puts("Server Running on 8080");  */
