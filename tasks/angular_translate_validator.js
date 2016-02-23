/*
 * grunt-angular-translate-validator
 * https://github.com/JonatanElias/grunt-angular-translate-validator
 *
 * Copyright (c) 2016 jon-eliaslr
 * Licensed under the MIT license.
 */

'use strict';

var xmlBuilder = require('xmlbuilder');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks
  var Error = require('./Error').init(grunt);

  grunt.registerMultiTask('angular_translate_validator', 'Checks that all the translations id exist and are been used', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      regex: '',
      translations: [],
      ordered: false
    });

    var errorCollection = [];
    var errors = {};

    if (options.translations === undefined) {
      grunt.fail.warn('translations option is required');
    }
    var translationIds = {};
    var notUsedIds = {};

    var filterFunction = function(element) {
      for (var i = 0; i < this.length; i++) {
        if (this[i] == element) return false;
      }
      return true;
    };

    var findId = function(fileArray, key) {
      for (var i = 0; i < fileArray.length; i++) {
        var index = fileArray[i].indexOf('"' + key + '"');
        if (index >= 0) {
          return {line: i, col: index + 1};
        }
      }
    };

    options.translations.forEach(function(file) {
      var json = grunt.file.readJSON(file);
      var rawJSON = grunt.file.read(file).split('\n');
      var ids = Object.keys(json);
      errors[file] = [];
      for (var i = 0; i < ids.length; i++) {
        if (translationIds[ids[i]]) {
          translationIds[ids[i]].push(file);
        } else {
          translationIds[ids[i]] = [file];
          notUsedIds[ids[i]] = true;
        }
        if (i > 0 && options.ordered && ids[i - 1] > ids[i]) {
          grunt.log.errorlns(ids[i - 1] + ': is not sorted in ' + file);
          var position = findId(rawJSON, ids[i]);
          addError(file, 'Id is not sorted', position.line, position.col);
        }
      }
    });

    var maxLanguages = options.translations.length;
    var ids = Object.keys(translationIds);
    ids.forEach(function(id) {
      if (translationIds[id].length < maxLanguages) {
        var missingIn = options.translations.filter(filterFunction, translationIds[id]);
        grunt.log.errorlns(id + ': is declared in ' + translationIds[id].join(', ') + ' but not in ' + missingIn.join(', '));
        for (var i = 0; i < missingIn.length; i++) {
          addError(missingIn[i], id + ': is declared in ' + translationIds[id].join(', ') + ' but not in this file');
        }
      }
    });

    // Iterate over all specified file groups.
    this.filesSrc.forEach(function(file) {
      errors[file] = [];
      // Get translation ids
      var content = grunt.file.read(file).split('\n');

      var regex = new RegExp(options.regex, 'g');

      for (var i = 0; i < content.length; i++) {
        var ids = content[i].match(regex);
        if (ids === null) {
          continue;
        }

        for (var j = 0; j < ids.length; j++) {
          if (!translationIds[ids[j]]) {
            grunt.log.errorlns(file +': ' + ids[j] + ' is not declared in translations files');
            var index = content[i].indexOf(ids[j]);
            addError(file, 'Id is not declared in translations files', i, index);
          } else {
            if (notUsedIds[ids[j]]) {
              delete notUsedIds[ids[j]]
            }
          }
        }
      }
    });

    ids = Object.keys(notUsedIds);
    ids.forEach(function(id) {
      grunt.log.errorlns(id + ': is never used ' + translationIds[id].join(', '));
      for (var i = 0; i < translationIds[id].length; i++) {
        var rawJSON = grunt.file.read(translationIds[id][i]).split('\n');
        var position = findId(rawJSON, id);
        addError(translationIds[id][i], 'Id is never used', position.line, position.col);
      }
    });

    if (options.reporterOutput) {
      report();
    }

    function report () {
      var xml = xmlBuilder.create('testsuite')
        .att('name', 'translate')
        .att('failures', errorCollection.length);
      var keys = Object.keys(errors);
      for (var i = 0; i < keys.length; i++) {
        var testcase = xml.ele('testcase');
        testcase.att('name', keys[i]);
        var failures = errors[keys[i]];
        testcase.att('failures', failures.length);
        for (var j = 0; j < failures.length; j++) {
          testcase.ele('failure').dat(failures[j].getErrorText());
        }
      }
      grunt.file.write(options.reporterOutput, xml.end({ pretty: true, indent: '  ', newline: '\n' }))
    }

    function addError(file, msg, line, col) {
      var error = new Error(file, msg, line, col);
      if (errors[file]) {
        errors[file].push(error)
      } else {
        errors[file] = [error];
      }
    }

  });

};
