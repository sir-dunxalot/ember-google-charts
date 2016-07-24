'use strict';

module.exports = function(/* environment, appConfig */) {
  /*
    Have to provide ember-resize defaults due to https://github.com/mike-north/ember-resize/issues/23
  */
  return {
    resizeServiceDefaults: {
      debounceTimeout    : 200,
      heightSensitive    : true,
      widthSensitive     : true,
      injectionFactories : [ 'view', 'component'],
    },
  };
};
