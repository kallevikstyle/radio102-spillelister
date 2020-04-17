module.exports = function(grunt) {
    const sass = require('node-sass');

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        sass: {
            options: {
                implementation: sass,
                outputStyle: 'expanded'
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'assets/sass/',
                    src: '**/*.scss',
                    dest: 'assets/css/',
                    ext: '.css'
                }]
            }
        },
        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer')({
                        
                    })
                ]
            },
            dist: {
                src: 'assets/css/**/*.css'
            }
        },
        watch: {
            files: 'assets/sass/**/*.scss',
            tasks: 'css'
        }
    });
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('css', ['sass', 'postcss']);
    grunt.registerTask('default', ['css', 'watch']);
};