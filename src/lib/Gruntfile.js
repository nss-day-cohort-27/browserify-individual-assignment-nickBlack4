module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        watch: {
            scripts: {
                files: ["../index.html", "../scripts/**/*.js", "../styles/**/*.css", "!node_modules/**/*.js"],
                tasks: ["eslint", "browserify", "copy"],
                options: {
                    spawn: false,
                },
            }
        },
        browserify: {
            options: {
                browserifyOptions: {
                    debug: true,
                    paths: ["../scripts"],
                }
            },
            dist: {
                files: {
                    "../../dist/bundle.js": ["../scripts/main.js", "./node_modules"]
                }
            }
        },
        eslint: {
            src: ["../scripts/**/*.js", "!node_modules/**/*.js"]
        },
        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: "..",
                    src: "./styles/*",
                    dest: "../../dist/"
                }, {
                    expand: true,
                    cwd: "..",
                    src: "./index.html",
                    dest: "../../dist/"
                }]
            }
        }
    });
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-eslint");
    grunt.loadNpmTasks("grunt-browserify");
    grunt.registerTask("default", ["eslint", "browserify", "copy", "watch"]);
};