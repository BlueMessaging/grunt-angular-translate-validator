'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.angular_translate_validator = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  default_options: function(test) {
    test.expect(1);
    var actual = grunt.file.read('tmp/default_options.xml');
    var expected = grunt.file.read('test/expected/default_options.xml');
    test.equal(actual, expected, 'Result must be empty');
    test.done();
  },
  custom_options: function(test) {
    test.expect(1);
    var actual = grunt.file.read('tmp/custom_options.xml');
    var expected = grunt.file.read('test/expected/custom_options.xml');
    test.equal(actual, expected, 'Must have 0 exceptions');
    test.done();
  },
  missing_translations: function(test) {
    test.expect(1);
    var actual = grunt.file.read('tmp/missing_translations.xml');
    var expected = grunt.file.read('test/expected/missing_translations.xml');
    test.equal(actual, expected, 'Must report missing translation ids');
    test.done();
  },
  wrong_order: function(test) {
    test.expect(1);
    var actual = grunt.file.read('tmp/wrong_order.xml');
    var expected = grunt.file.read('test/expected/wrong_order.xml');
    test.equal(actual, expected, 'Must reporter wrong json order');
    test.done();
  },
  missing_ids: function(test) {
    test.expect(1);
    var actual = grunt.file.read('tmp/missing_ids.xml');
    var expected = grunt.file.read('test/expected/missing_ids.xml');
    test.equal(actual, expected, 'Must report one missing id');
    test.done();
  },
  not_used: function(test) {
    test.expect(1);
    var actual = grunt.file.read('tmp/not_used.xml');
    var expected = grunt.file.read('test/expected/not_used.xml');
    test.equal(actual, expected, 'Must report one not used id');
    test.done();
  },
  missing_ids_exception: function(test) {
    test.expect(1);
    var actual = grunt.file.read('tmp/missing_ids_exception.xml');
    var expected = grunt.file.read('test/expected/missing_ids_exception.xml');
    test.equal(actual, expected, 'Must have 0 exceptions');
    test.done();
  }
};
