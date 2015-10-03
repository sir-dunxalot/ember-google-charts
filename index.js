/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-google-charts',

  contentFor: function(type) {
    if (type === 'body-footer') {
      return '<script type="text/javascript" src="https://www.google.com/jsapi"></script>';
    }
  }
};
