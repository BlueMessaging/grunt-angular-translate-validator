# grunt-angular-translate-validator

> Checks that all the translations id exist and are been used

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-angular-translate-validator --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-angular-translate-validator');
```

## The "angular_translate_validator" task

### Overview
In your project's Gruntfile, add a section named `angular_translate_validator` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  angular_translate_validator: {
    options: {
      translations: [],
      regex: '',
      reporterOutput: ''
    },
    src: [
      // Target-specific file lists and/or options go here.
    ],
  },
});
```

### Options

#### options.translations
Type: `Array`
Default value: `[]`

Array of file names that has the JSON with the translation for each language.

#### options.regex
Type: `String`
Default value: `''`

A regular expression that matches all your translation ids

#### options.reporterOutput
Type: `String`
Default value: ``

File that outputs the result in junit format.

#### options.ordered
Type: `Boolean`
Default value: `false`

Optionally checks if the files are alphabetically sorted

#### options.exceptions
Type: `Array`
Default value: `[]`

Translation ids in this array that match the regex and are not declared in the language files are ignored.

### Usage Examples

#### Default Options
In this example, nothing will checked because there is no file languages defined.

```js
grunt.initConfig({
  angular_translate_validator: {
    options: {},
    files: [ 'app/**/*.html', 'app/**/*.js' ],
  },
});
```

#### Custom Options
In this example, en.json and es.json will be check if they contain the same translation ids, if al the text matching 
the regex in page.html are declared in the language files and if the language files have and id that is never used.

```js
grunt.initConfig({
  angular_translate_validator: {
    options: {
      translations: ['languages/en.json', 'languages/es.json'],
      regex: 'TRANSLATION_[A-Z]+',
      reporterOutput: '',
      exceptions: []
    },
    files: [ 'app/page.html', ],
  },
});
```

## Release History
_(Nothing yet)_
