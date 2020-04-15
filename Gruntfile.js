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
        watch: {
            files: 'assets/sass/**/*.scss',
            tasks: 'sass'
        }
    });
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['sass', 'watch']);
};