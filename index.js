'use strict';

module.exports = {
  name: 'ember-google-charts',

  contentFor: function(type) {
    if (type === 'body-footer') {
      return '<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>';
    }
  }
};
