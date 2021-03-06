/**
  npm install grunt-express --save-dev
*/
module.exports = function(grunt) {

  // Grunt configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Tests with Jasmine.
    jasmine: {
      task: {
        src: 'src/*.js',
        options: {
          specs: './spec/*spec.js',
          template: require('grunt-template-jasmine-requirejs'),
          templateOptions: {
            requireConfig: {
              baseUrl: './',
              paths: {
                jquery: 'src/vendor/jquery',
                lodash: 'src/vendor/lodash',
                backbone: 'src/vendor/backbone',
                carousel: 'src/vendor/owl.carousel',
                text: 'src/vendor/text'
              },
              shim: {
                backbone: {
                  deps: ['jquery', 'lodash'],
                  exports: 'Backbone'
                }
              }
            }
          }
        }
      }
    },

    //JSHint options
    jshint: {
      files: [
        'src/js/models/*.js',
        'src/js/provides/*.js',
        'src/js/routers/*.js',
        'src/js/utils/*.js',
        'src/js/views/*.js',
        'src/js/*.js',
        'spec/**/*.js'
      ],
      options: {
        curly: true,
        // Strict equal (===) is not mandatory.
        eqeqeq: false,
        undef: true,
        // We are running in a browser.
        browser: true,
        // Ignore "expected an assignment or 
        // function call and instead saw an expression."
        '-W030': false,
        '-W058': false,
        eqnull: true,
        globals: {
          /* RequireJS */
          define: true,
          require: true,
          /* Jasmine */
          it: true,
          spyOn: true,
          expect: true,
          beforeEach: true,
          describe: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.registerTask('default', [
    'jshint',
    'jasmine'
  ]);
};
