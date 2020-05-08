'use strict';

module.exports = {
  name: require('./package').name,

  contentFor: function(type) {
    if (type === 'head') {
      return '<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>';
    }
  }
};
