/**
 * Created by JonatanElias on 22/02/16.
 */
exports.init = function( grunt ) {
  function Error (file, message, line, col) {
    this.file = file;
    this.message = message;
    this.line = line;
    this.col = col;
  }

  Error.prototype.getErrorText = function() {
    var lines = grunt.file.read(this.file).split('\n');
    var text = this.message;
    if (this.line === undefined) {
      return text;
    }
    text += ':\n';
    var lineNo = this.line - 2;
    if (this.line > 1) {
      text += ' ' + lineNo;
      if ((lineNo + '').length < ((this.line + 2) + '').length) {
        text += ' ';
      }
      text += ' | ' + lines[lineNo] + '\n';
    }
    lineNo = this.line - 1;
    if (this.line > 0) {
      text += ' ' + lineNo;
      if ((lineNo + '').length < ((this.line + 2) + '').length) {
        text += ' ';
      }
      text += ' | ' + lines[lineNo] + '\n';
    }
    lineNo = this.line;
    text += ' ' + lineNo;
    var padding = (' ' + lineNo).length;
    if ((lineNo + '').length < ((this.line + 2) + '').length) {
      text += ' ';
      padding++
    }
    text += ' | ' + lines[lineNo] + '\n';
    for (var i = 0; i < this.col + padding + 3; i++) {
      text += '-';
    }
    text += '^\n';
    if (lines.length > this.line + 1) {
      text += ' ' + (this.line + 1) + ' | ';
      text += lines[this.line + 1] + '\n';
    }
    if (lines.length > this.line + 2) {
      text += ' ' + (this.line + 2) + ' | ';
      text += lines[this.line + 2];
    }
    return text;
  };

  return Error;
};