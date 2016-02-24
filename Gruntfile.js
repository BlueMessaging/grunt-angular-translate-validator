/*
 * grunt-angular-translate-validator
 * https://github.com/JonatanElias/grunt-angular-translate-validator
 *
 * Copyright (c) 2016 jon-eliaslr
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    angular_translate_validator: {
      default_options: {
        options: {
          reporterOutput: 'tmp/default_options.xml'
        },
        files: {
          'tmp/default_options': ['test/fixtures/testing', 'test/fixtures/123']
        }
      },
      custom_options: {
        options: {
          translations: ['test/fixtures/en.json', 'test/fixtures/es.json'],
          regex: 'LABEL_[A-Z0-9_-]*',
          reporterOutput: 'tmp/custom_options.xml'
        },
        src: ['test/fixtures/page.html']
      },
      missing_translations: {
        options: {
          translations: ['test/fixtures/en.json', 'test/fixtures/es.json', 'test/fixtures/fr.json'],
          regex: 'LABEL_[A-Z0-9_-]*',
          reporterOutput: 'tmp/missing_translations.xml'
        },
        src: ['test/fixtures/page.html']
      },
      wrong_order: {
        options: {
          translations: ['test/fixtures/it.json'],
          regex: 'LABEL_[A-Z0-9_-]*',
          ordered: 'true',
          reporterOutput: 'tmp/wrong_order.xml'
        },
        src: ['test/fixtures/page.html']
      },
      missing_ids: {
        options: {
          translations: ['test/fixtures/en.json', 'test/fixtures/es.json'],
          regex: 'LABEL_[A-Z0-9_-]*',
          ordered: 'true',
          reporterOutput: 'tmp/missing_ids.xml'
        },
        src: ['test/fixtures/*.html']
      },
      not_used: {
        options: {
          translations: ['test/fixtures/de.json'],
          regex: 'LABEL_[A-Z0-9_-]*',
          ordered: 'true',
          reporterOutput: 'tmp/not_used.xml'
        },
        src: ['test/fixtures/page.html']
      },
      missing_ids_exception: {
        options: {
          translations: ['test/fixtures/en.json', 'test/fixtures/es.json'],
          regex: 'LABEL_[A-Z0-9_-]*',
          ordered: 'true',
          reporterOutput: 'tmp/missing_ids_exception.xml',
          exceptions: ['LABEL_MISSING']
        },
        src: ['test/fixtures/*.html']
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'angular_translate_validator', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
